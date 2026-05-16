package com.eventhub.service;

import com.eventhub.config.JwtProperties;
import com.eventhub.domain.entity.AttendeeProfile;
import com.eventhub.domain.entity.RefreshToken;
import com.eventhub.domain.entity.User;
import com.eventhub.domain.enums.UserRole;
import com.eventhub.repository.AttendeeProfileRepository;
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
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    private final EmailService emailService;
    private final JwtProperties jwtProperties;

    @Transactional
    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.ATTENDEE)
                .isVerified(false)
                .isActive(true)
                .build();

        user = userRepository.save(user);

        AttendeeProfile profile = AttendeeProfile.builder()
                .user(user)
                .displayName(request.getFullName())
                .build();
        attendeeProfileRepository.save(profile);

        // Send verify email (Mock for now, or use a token)
        String verifyToken = UUID.randomUUID().toString();
        // In a real app, store this token in DB or Redis
        emailService.sendEmail(user.getEmail(), "Verify your email", 
                "Click here to verify: http://localhost:8080/api/v1/auth/verify-email?token=" + verifyToken);
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

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
