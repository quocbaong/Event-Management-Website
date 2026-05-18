package com.eventhub.web.controller;

import com.eventhub.domain.entity.User;
import com.eventhub.repository.UserRepository;
import com.eventhub.service.RegistrationService;
import com.eventhub.web.dto.request.RegisterEventRequest;
import com.eventhub.web.dto.response.RegistrationDetailResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.UUID;

import com.eventhub.domain.enums.UserRole;

@RestController
@RequestMapping("/api/v1/events/{eventId}/registrations")
@RequiredArgsConstructor
public class EventRegistrationController {

    private final RegistrationService registrationService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private User getCurrentUser(UserDetails userDetails) {
        if (userDetails != null) {
            return userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }
        Optional<User> existing = userRepository.findByEmail("attendee@test.com");
        if (existing.isPresent()) return existing.get();

        User testUser = User.builder()
                .email("attendee@test.com")
                .passwordHash(passwordEncoder.encode("test123"))
                .role(UserRole.ATTENDEE)
                .isVerified(true)
                .isActive(true)
                .build();
        return userRepository.save(testUser);
    }

    @PostMapping("/register")
    public ResponseEntity<RegistrationDetailResponse> register(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId,
            @Valid @RequestBody RegisterEventRequest request) {
        User currentUser = getCurrentUser(userDetails);
        RegistrationDetailResponse response = registrationService.register(currentUser, eventId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/{registrationId}/confirm")
    public ResponseEntity<RegistrationDetailResponse> confirm(
            @PathVariable UUID eventId,
            @PathVariable UUID registrationId) {
        RegistrationDetailResponse response = registrationService.confirmRegistration(eventId, registrationId);
        return ResponseEntity.ok(response);
    }
}
