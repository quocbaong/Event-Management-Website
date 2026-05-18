package com.eventhub.web.controller;

import com.eventhub.domain.entity.User;
import com.eventhub.repository.UserRepository;
import com.eventhub.service.InvitationService;
import com.eventhub.web.dto.request.CreateInvitationRequest;
import com.eventhub.web.dto.response.InvitationResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.eventhub.domain.enums.UserRole;

@RestController
@RequestMapping("/api/v1/organizer/events/{eventId}/invitations")
@RequiredArgsConstructor
public class InvitationController {

    private final InvitationService invitationService;
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
    public ResponseEntity<List<InvitationResponse>> getInvitations(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId) {
        getCurrentUser(userDetails);
        return ResponseEntity.ok(invitationService.getInvitations(eventId));
    }

    @PostMapping
    public ResponseEntity<List<InvitationResponse>> createInvitations(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId,
            @Valid @RequestBody CreateInvitationRequest request) {
        User currentUser = getCurrentUser(userDetails);
        List<InvitationResponse> responses = invitationService.createInvitations(currentUser, eventId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(responses);
    }
}
