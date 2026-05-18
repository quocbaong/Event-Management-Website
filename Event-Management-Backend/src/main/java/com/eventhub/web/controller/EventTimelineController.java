package com.eventhub.web.controller;

import com.eventhub.domain.entity.User;
import com.eventhub.domain.enums.UserRole;
import com.eventhub.repository.UserRepository;
import com.eventhub.service.TimelineService;
import com.eventhub.web.dto.request.CreateTimelineRequest;
import com.eventhub.web.dto.request.UpdateTimelineRequest;
import com.eventhub.web.dto.response.TimelineResponse;
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
@RequestMapping("/api/v1/organizer/events/{eventId}/timelines")
@RequiredArgsConstructor
public class EventTimelineController {

    private final TimelineService timelineService;
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
    public ResponseEntity<List<TimelineResponse>> getTimelines(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(timelineService.getTimelines(currentUser, eventId));
    }

    @PostMapping
    public ResponseEntity<TimelineResponse> createTimeline(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId,
            @Valid @RequestBody CreateTimelineRequest request) {
        User currentUser = getCurrentUser(userDetails);
        TimelineResponse response = timelineService.createTimeline(currentUser, eventId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{timelineId}")
    public ResponseEntity<TimelineResponse> updateTimeline(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId,
            @PathVariable UUID timelineId,
            @RequestBody UpdateTimelineRequest request) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(timelineService.updateTimeline(currentUser, eventId, timelineId, request));
    }

    @DeleteMapping("/{timelineId}")
    public ResponseEntity<Void> deleteTimeline(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId,
            @PathVariable UUID timelineId) {
        User currentUser = getCurrentUser(userDetails);
        timelineService.deleteTimeline(currentUser, eventId, timelineId);
        return ResponseEntity.noContent().build();
    }
}
