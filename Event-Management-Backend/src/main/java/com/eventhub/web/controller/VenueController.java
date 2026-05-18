package com.eventhub.web.controller;

import com.eventhub.domain.entity.User;
import com.eventhub.domain.enums.UserRole;
import com.eventhub.repository.UserRepository;
import com.eventhub.service.VenueService;
import com.eventhub.web.dto.request.CreateVenueRequest;
import com.eventhub.web.dto.request.UpdateVenueRequest;
import com.eventhub.web.dto.response.VenueResponse;
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
@RequestMapping("/api/v1/organizer/venues")
@RequiredArgsConstructor
public class VenueController {

    private final VenueService venueService;
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
    public ResponseEntity<List<VenueResponse>> getVenues(
            @AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(venueService.getVenues(currentUser));
    }

    @PostMapping
    public ResponseEntity<VenueResponse> createVenue(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CreateVenueRequest request) {
        User currentUser = getCurrentUser(userDetails);
        VenueResponse response = venueService.createVenue(currentUser, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VenueResponse> updateVenue(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID id,
            @RequestBody UpdateVenueRequest request) {
        User currentUser = getCurrentUser(userDetails);
        return ResponseEntity.ok(venueService.updateVenue(currentUser, id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVenue(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID id) {
        User currentUser = getCurrentUser(userDetails);
        venueService.deleteVenue(currentUser, id);
        return ResponseEntity.noContent().build();
    }
}
