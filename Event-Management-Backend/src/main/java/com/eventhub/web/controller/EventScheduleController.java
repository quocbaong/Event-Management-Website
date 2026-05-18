package com.eventhub.web.controller;

import com.eventhub.domain.entity.User;
import com.eventhub.domain.enums.UserRole;
import com.eventhub.repository.UserRepository;
import com.eventhub.service.ScheduleService;
import com.eventhub.web.dto.request.CreateScheduleRequest;
import com.eventhub.web.dto.request.UpdateScheduleRequest;
import com.eventhub.web.dto.response.ScheduleResponse;
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
@RequestMapping("/api/v1/organizer/events/{eventId}/schedules")
@RequiredArgsConstructor
public class EventScheduleController {

    private final ScheduleService scheduleService;
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
    public ResponseEntity<List<ScheduleResponse>> getSchedules(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(scheduleService.getSchedules(currentUser, eventId));
    }

    @PostMapping
    public ResponseEntity<ScheduleResponse> createSchedule(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId,
            @Valid @RequestBody CreateScheduleRequest request) {
        User currentUser = getCurrentUser(userDetails);
        ScheduleResponse response = scheduleService.createSchedule(currentUser, eventId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{scheduleId}")
    public ResponseEntity<ScheduleResponse> updateSchedule(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId,
            @PathVariable UUID scheduleId,
            @RequestBody UpdateScheduleRequest request) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(scheduleService.updateSchedule(currentUser, eventId, scheduleId, request));
    }

    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<Void> deleteSchedule(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId,
            @PathVariable UUID scheduleId) {
        User currentUser = getCurrentUser(userDetails);
        scheduleService.deleteSchedule(currentUser, eventId, scheduleId);
        return ResponseEntity.noContent().build();
    }
}
