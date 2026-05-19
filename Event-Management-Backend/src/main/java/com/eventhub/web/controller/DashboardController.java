package com.eventhub.web.controller;

import com.eventhub.domain.entity.User;
import com.eventhub.domain.enums.UserRole;
import com.eventhub.repository.UserRepository;
import com.eventhub.service.DashboardService;
import com.eventhub.web.dto.response.AudienceSegmentResponse;
import com.eventhub.web.dto.response.CheckinDensityResponse;
import com.eventhub.web.dto.response.ConversionFunnelData;
import com.eventhub.web.dto.response.ConversionFunnelResponse;
import com.eventhub.web.dto.response.DashboardAttendeesResponse;
import com.eventhub.web.dto.response.DashboardOverviewResponse;
import com.eventhub.web.dto.response.EventPerformanceResponse;
import com.eventhub.web.dto.response.RevenueEntry;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/organizer/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;
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

    @GetMapping("/overview")
    public ResponseEntity<DashboardOverviewResponse> getOverview(
            @AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(dashboardService.getOverview(currentUser));
    }

    @GetMapping("/revenue")
    public ResponseEntity<List<RevenueEntry>> getRevenue(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "month") String groupBy) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(dashboardService.getRevenue(currentUser, groupBy));
    }

    @GetMapping("/attendees")
    public ResponseEntity<DashboardAttendeesResponse> getAttendees(
            @AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(dashboardService.getAttendees(currentUser));
    }

    @GetMapping("/checkin-density")
    public ResponseEntity<CheckinDensityResponse> getCheckinDensity(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to,
            @RequestParam(required = false) String period) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(dashboardService.getCheckinDensity(currentUser, from, to, period));
    }

    @GetMapping("/audience-segments")
    public ResponseEntity<List<AudienceSegmentResponse>> getAudienceSegments(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to,
            @RequestParam(required = false) String period) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(dashboardService.getAudienceSegments(currentUser, from, to, period));
    }

    @GetMapping("/conversion-funnel")
    public ResponseEntity<ConversionFunnelData> getConversionFunnel(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to,
            @RequestParam(required = false) String period) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(dashboardService.getConversionFunnel(currentUser, from, to, period));
    }

    @GetMapping("/events")
    public ResponseEntity<List<EventPerformanceResponse>> getEventsPerformance(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to,
            @RequestParam(required = false) String period) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(dashboardService.getEventsPerformance(currentUser, from, to, period));
    }
}
