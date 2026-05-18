package com.eventhub.service;

import com.eventhub.config.JwtConfig;
import com.eventhub.domain.entity.AttendeeProfile;
import com.eventhub.domain.entity.OrganizerProfile;
import com.eventhub.domain.entity.RefreshToken;
import com.eventhub.domain.entity.User;
import com.eventhub.domain.enums.UserRole;
import com.eventhub.repository.AttendeeProfileRepository;
import com.eventhub.repository.OrganizerProfileRepository;
import com.eventhub.repository.RefreshTokenRepository;
import com.eventhub.repository.UserRepository;
import com.eventhub.security.JwtTokenProvider;
import com.eventhub.web.dto.auth.AuthResponse;
import com.eventhub.web.dto.auth.LoginRequest;
import com.eventhub.web.dto.auth.RegisterRequest;
import com.eventhub.web.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final AttendeeProfileRepository attendeeProfileRepository;
    private final OrganizerProfileRepository organizerProfileRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    private final EmailService emailService;
    private final JwtConfig jwtProperties;
    private final org.springframework.data.redis.core.StringRedisTemplate redisTemplate;

    private static final String OTP_PREFIX = "otp:";
    private static final long OTP_EXPIRY_MINUTES = 5;

    @Transactional
    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        UserRole role = request.getRole() != null ? request.getRole() : UserRole.ATTENDEE;

        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .isVerified(false)
                .isActive(true)
                .build();

        user = userRepository.save(user);

        if (role == UserRole.ORGANIZER) {
            OrganizerProfile profile = OrganizerProfile.builder()
                    .user(user)
                    .companyName(request.getCompanyName() != null ? request.getCompanyName() : request.getFullName())
                    .build();
            organizerProfileRepository.save(profile);
        } else {
            AttendeeProfile profile = AttendeeProfile.builder()
                    .user(user)
                    .displayName(request.getFullName())
                    .build();
            attendeeProfileRepository.save(profile);
        }

        // Generate and send OTP
        String otp = generateOtp();
        saveOtpToRedis(request.getEmail(), otp);

        emailService.sendEmail(
                request.getEmail(),
                "Xác thực tài khoản EventHub",
                "Mã OTP của bạn là: " + otp + ". Mã có hiệu lực trong " + OTP_EXPIRY_MINUTES + " phút.");
    }

    public void verifyOtp(String email, String otp) {
        String storedOtp = redisTemplate.opsForValue().get(OTP_PREFIX + email);
        if (storedOtp == null || !storedOtp.equals(otp)) {
            throw new RuntimeException("Mã OTP không chính xác hoặc đã hết hạn");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        user.setIsVerified(true);
        userRepository.save(user);

        // Delete OTP after successful verification
        redisTemplate.delete(OTP_PREFIX + email);
    }

    public void resendOtp(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        if (user.getIsVerified()) {
            throw new RuntimeException("Tài khoản đã được xác thực");
        }

        String otp = generateOtp();
        saveOtpToRedis(email, otp);

        emailService.sendEmail(
                email,
                "Gửi lại mã xác thực EventHub",
                "Mã OTP mới của bạn là: " + otp);
    }

    private String generateOtp() {
        return String.format("%06d", new java.util.Random().nextInt(1000000));
    }

    private void saveOtpToRedis(String email, String otp) {
        redisTemplate.opsForValue().set(
                OTP_PREFIX + email,
                otp,
                java.time.Duration.ofMinutes(OTP_EXPIRY_MINUTES));
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String accessToken = tokenProvider.generateAccessToken(user);
        String refreshToken = tokenProvider.generateRefreshToken(user);

        saveRefreshToken(user, refreshToken);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(userMapper.toResponse(user))
                .build();
    }

    @Transactional
    public AuthResponse refreshToken(String token) {
        RefreshToken refreshTokenEntity = refreshTokenRepository.findByTokenHash(token)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (refreshTokenEntity.getExpiresAt().isBefore(Instant.now()) || refreshTokenEntity.getIsRevoked()) {
            throw new RuntimeException("Refresh token expired or revoked");
        }

        User user = refreshTokenEntity.getUser();
        String newAccessToken = tokenProvider.generateAccessToken(user);
        String newRefreshToken = tokenProvider.generateRefreshToken(user);

        // Revoke old token
        refreshTokenEntity.setIsRevoked(true);
        refreshTokenRepository.save(refreshTokenEntity);

        // Save new token
        saveRefreshToken(user, newRefreshToken);

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .user(userMapper.toResponse(user))
                .build();
    }

    @Transactional
    public void logout(User user) {
        refreshTokenRepository.deleteByUser(user);
    }

    @Transactional
    public void verifyEmail(String token) {
        // Implementation for verification
        // For now, let's just say it works if token is valid (mock)
    }

    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String resetToken = UUID.randomUUID().toString();
        // Store resetToken in Redis or DB
        emailService.sendEmail(user.getEmail(), "Reset your password",
                "Click here to reset: http://localhost:8080/api/v1/auth/reset-password?token=" + resetToken);
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {
        // Implementation for reset
    }

    private void saveRefreshToken(User user, String token) {
        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .tokenHash(token)
                .expiresAt(Instant.now().plusMillis(jwtProperties.getRefreshTokenExpiry() * 1000))
                .isRevoked(false)
                .build();
        refreshTokenRepository.save(refreshToken);
    }
}
