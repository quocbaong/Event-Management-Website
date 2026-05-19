package com.eventhub.web.controller;

import com.eventhub.domain.entity.User;
import com.eventhub.repository.UserRepository;
import com.eventhub.service.RegistrationService;
import com.eventhub.service.ReviewService;
import com.eventhub.web.dto.request.ReviewRequest;
import com.eventhub.web.dto.response.RegistrationDetailResponse;
import com.eventhub.web.dto.response.ReviewResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/attendee/reviews")
@RequiredArgsConstructor
public class AttendeeReviewController {

    private final ReviewService reviewService;
    private final RegistrationService registrationService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<ReviewResponse>> getMyReviews(
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }
        User currentUser = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(reviewService.getAttendeeReviews(currentUser));
    }

    @PostMapping
    public ResponseEntity<ReviewResponse> submitReview(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody ReviewRequest request) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }
        User currentUser = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(reviewService.createOrUpdateReview(currentUser, request));
    }

    @GetMapping("/events")
    public ResponseEntity<List<RegistrationDetailResponse>> getReviewableEvents(
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }
        User currentUser = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<RegistrationDetailResponse> regs = registrationService.getAttendeeRegistrations(currentUser);
        List<RegistrationDetailResponse> confirmedRegs = regs.stream()
                .filter(r -> "CONFIRMED".equalsIgnoreCase(r.getStatus()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(confirmedRegs);
    }
}
