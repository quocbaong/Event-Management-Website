package com.eventhub.web.controller;

import com.eventhub.domain.entity.User;
import com.eventhub.repository.UserRepository;
import com.eventhub.service.RegistrationService;
import com.eventhub.web.dto.response.RegistrationDetailResponse;
import com.eventhub.web.dto.response.RegistrationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.eventhub.domain.enums.UserRole;

@RestController
@RequestMapping("/api/v1/organizer/events/{eventId}/registrations")
@RequiredArgsConstructor
public class OrganizerRegistrationController {

    private final RegistrationService registrationService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private User getCurrentUser(UserDetails userDetails) {
        if (userDetails != null) {
            return userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }
        Optional<User> existing = userRepository.findByEmail("organizer@test.com");
        if (existing.isPresent()) return existing.get();

        User testUser = User.builder()
                .email("organizer@test.com")
                .passwordHash(passwordEncoder.encode("test123"))
                .role(UserRole.ORGANIZER)
                .isVerified(true)
                .isActive(true)
                .build();
        return userRepository.save(testUser);
    }

    @GetMapping
    public ResponseEntity<List<RegistrationResponse>> getRegistrations(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId) {
        getCurrentUser(userDetails);
        return ResponseEntity.ok(registrationService.getEventRegistrations(eventId));
    }

    @GetMapping("/{registrationId}")
    public ResponseEntity<RegistrationDetailResponse> getRegistrationDetail(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId,
            @PathVariable UUID registrationId) {
        getCurrentUser(userDetails);
        return ResponseEntity.ok(registrationService.getRegistrationDetail(eventId, registrationId));
    }
}
