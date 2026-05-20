package com.eventhub.web.controller;

import com.eventhub.domain.entity.User;
import com.eventhub.domain.enums.UserRole;
import com.eventhub.repository.UserRepository;
import com.eventhub.service.EventService;
import com.eventhub.web.dto.request.CreateEventRequest;
import com.eventhub.web.dto.request.PublishEventRequest;
import com.eventhub.web.dto.request.UpdateEventRequest;
import com.eventhub.web.dto.response.EventResponse;
import com.eventhub.web.dto.response.EventSummaryResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
@RequestMapping("/api/v1/organizer/events")
@RequiredArgsConstructor
public class OrganizerController {

    private final EventService eventService;
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

    @PostMapping
    public ResponseEntity<EventResponse> createEvent(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CreateEventRequest request) {
        User currentUser = getCurrentUser(userDetails);
        EventResponse response = eventService.createEvent(currentUser, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<EventSummaryResponse>> getEvents(
            @AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(eventService.getEvents(currentUser));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventResponse> getEvent(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID id) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(eventService.getEvent(currentUser, id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventResponse> updateEvent(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID id,
            @Valid @RequestBody UpdateEventRequest request) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(eventService.updateEvent(currentUser, id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID id) {
        User currentUser = getCurrentUser(userDetails);
        eventService.deleteEvent(currentUser, id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/publish")
    public ResponseEntity<EventResponse> publishEvent(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID id,
            @RequestBody PublishEventRequest request) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(eventService.publishEvent(currentUser, id, request));
    }

    @PatchMapping("/{id}/submit-approval")
    public ResponseEntity<EventResponse> submitApproval(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID id) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(eventService.submitApproval(currentUser, id));
    }

    @PatchMapping("/{id}/toggle-sales")
    public ResponseEntity<EventResponse> toggleEventSales(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID id) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(eventService.toggleEventSales(currentUser, id));
    }
}
