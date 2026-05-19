package com.eventhub.web.controller;

import com.eventhub.domain.entity.User;
import com.eventhub.domain.entity.OrganizerProfile;
import com.eventhub.domain.entity.AttendeeProfile;
import com.eventhub.repository.UserRepository;
import com.eventhub.repository.OrganizerProfileRepository;
import com.eventhub.repository.AttendeeProfileRepository;
import com.eventhub.web.dto.response.UserResponse;
import com.eventhub.web.mapper.UserMapper;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final OrganizerProfileRepository organizerProfileRepository;
    private final AttendeeProfileRepository attendeeProfileRepository;
    private final UserMapper userMapper;

    @PutMapping("/profile")
    public ResponseEntity<UserResponse> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody UpdateProfileRequest request) {
        
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getOrganizerProfile() != null) {
            OrganizerProfile profile = user.getOrganizerProfile();
            if (request.getFullName() != null) {
                profile.setCompanyName(request.getFullName());
            }
            if (request.getPhone() != null) {
                profile.setPhone(request.getPhone());
            }
            if (request.getWebsite() != null) {
                profile.setWebsite(request.getWebsite());
            }
            if (request.getAddress() != null) {
                profile.setBio(request.getAddress()); // Ánh xạ address sang bio của DB
            }
            organizerProfileRepository.save(profile);
        } else if (user.getAttendeeProfile() != null) {
            AttendeeProfile profile = user.getAttendeeProfile();
            if (request.getFullName() != null) {
                profile.setDisplayName(request.getFullName());
            }
            if (request.getPhone() != null) {
                profile.setPhone(request.getPhone());
            }
            attendeeProfileRepository.save(profile);
        }

        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(userMapper.toResponse(savedUser));
    }

    @Data
    public static class UpdateProfileRequest {
        private String fullName;
        private String phone;
        private String website;
        private String address;
    }
}
