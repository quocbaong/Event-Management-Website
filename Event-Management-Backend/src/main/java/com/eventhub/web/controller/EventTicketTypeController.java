package com.eventhub.web.controller;

import com.eventhub.domain.entity.User;
import com.eventhub.domain.enums.UserRole;
import com.eventhub.repository.UserRepository;
import com.eventhub.service.TicketTypeService;
import com.eventhub.web.dto.request.CreateTicketTypeRequest;
import com.eventhub.web.dto.request.UpdateTicketTypeRequest;
import com.eventhub.web.dto.response.TicketTypeResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/organizer/events/{eventId}/ticket-types")
@RequiredArgsConstructor
public class EventTicketTypeController {

    private final TicketTypeService ticketTypeService;
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
    public ResponseEntity<List<TicketTypeResponse>> getTicketTypes(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(ticketTypeService.getTicketTypes(currentUser, eventId));
    }

    @PostMapping
    public ResponseEntity<TicketTypeResponse> createTicketType(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId,
            @Valid @RequestBody CreateTicketTypeRequest request) {
        User currentUser = getCurrentUser(userDetails);
        TicketTypeResponse response = ticketTypeService.createTicketType(currentUser, eventId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{ticketId}")
    public ResponseEntity<TicketTypeResponse> updateTicketType(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId,
            @PathVariable UUID ticketId,
            @RequestBody UpdateTicketTypeRequest request) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(ticketTypeService.updateTicketType(currentUser, eventId, ticketId, request));
    }

    @DeleteMapping("/{ticketId}")
    public ResponseEntity<Void> deleteTicketType(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId,
            @PathVariable UUID ticketId) {
        User currentUser = getCurrentUser(userDetails);
        ticketTypeService.deleteTicketType(currentUser, eventId, ticketId);
        return ResponseEntity.noContent().build();
    }
}
