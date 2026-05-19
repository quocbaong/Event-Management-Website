package com.eventhub.web.controller;

import com.eventhub.domain.entity.User;
import com.eventhub.repository.UserRepository;
import com.eventhub.service.RegistrationService;
import com.eventhub.web.dto.response.RegistrationDetailResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/attendee/registrations")
@RequiredArgsConstructor
public class AttendeeRegistrationController {

    private final RegistrationService registrationService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<RegistrationDetailResponse>> getMyRegistrations(
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }
        User currentUser = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(registrationService.getAttendeeRegistrations(currentUser));
    }
}
