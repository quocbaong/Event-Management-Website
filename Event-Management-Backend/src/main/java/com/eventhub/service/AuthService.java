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
    private final com.eventhub.infrastructure.email.EmailService emailService;
    private final com.eventhub.infrastructure.email.EmailTemplateService emailTemplateService;
    private final JwtConfig jwtProperties;
    private final org.springframework.data.redis.core.StringRedisTemplate redisTemplate;

    private static final String OTP_PREFIX = "otp:";
    private static final String RESET_OTP_PREFIX = "reset_otp:";
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

        String html = emailTemplateService.renderOtpEmail(
                "Xác thực tài khoản",
                "Cảm ơn bạn đã đăng ký tài khoản trên Prestige Planner. Vui lòng sử dụng mã OTP dưới đây để hoàn tất thủ tục xác thực.",
                otp,
                OTP_EXPIRY_MINUTES
        );
        emailService.sendHtmlMessage(request.getEmail(), "Xác thực tài khoản Prestige Planner", html);
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

        String html = emailTemplateService.renderOtpEmail(
                "Gửi lại mã xác thực",
                "Chúng tôi đã nhận được yêu cầu gửi lại mã xác thực của bạn. Vui lòng sử dụng mã OTP dưới đây để tiếp tục.",
                otp,
                OTP_EXPIRY_MINUTES
        );
        emailService.sendHtmlMessage(email, "Gửi lại mã xác thực Prestige Planner", html);
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
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

        String otp = generateOtp();
        redisTemplate.opsForValue().set(
                RESET_OTP_PREFIX + email,
                otp,
                java.time.Duration.ofMinutes(OTP_EXPIRY_MINUTES));

        String html = emailTemplateService.renderOtpEmail(
                "Khôi phục mật khẩu",
                "Chúng tôi đã nhận được yêu cầu khôi phục mật khẩu của bạn. Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email. Ngược lại, hãy sử dụng mã OTP dưới đây để đặt lại mật khẩu.",
                otp,
                OTP_EXPIRY_MINUTES
        );
        emailService.sendHtmlMessage(user.getEmail(), "Yêu cầu khôi phục mật khẩu Prestige Planner", html);
    }

    public void verifyResetOtp(String email, String otp) {
        String storedOtp = redisTemplate.opsForValue().get(RESET_OTP_PREFIX + email);
        if (storedOtp == null || !storedOtp.equals(otp)) {
            throw new RuntimeException("Mã OTP không chính xác hoặc đã hết hạn");
        }
    }

    @Transactional
    public void resetPassword(String email, String otp, String newPassword) {
        String storedOtp = redisTemplate.opsForValue().get(RESET_OTP_PREFIX + email);
        if (storedOtp == null || !storedOtp.equals(otp)) {
            throw new RuntimeException("Mã OTP không chính xác hoặc đã hết hạn");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Đăng xuất khỏi mọi thiết bị
        refreshTokenRepository.deleteByUser(user);

        redisTemplate.delete(RESET_OTP_PREFIX + email);
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
