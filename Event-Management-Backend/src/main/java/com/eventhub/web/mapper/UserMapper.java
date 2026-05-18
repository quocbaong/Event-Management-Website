package com.eventhub.web.mapper;

import com.eventhub.domain.entity.User;
import com.eventhub.web.dto.response.UserProfileResponse;
import com.eventhub.web.dto.response.UserResponse;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toResponse(User user) {
        if (user == null) return null;

        String fullName = null;
        if (user.getAttendeeProfile() != null) {
            fullName = user.getAttendeeProfile().getDisplayName();
        } else if (user.getOrganizerProfile() != null) {
            fullName = user.getOrganizerProfile().getCompanyName();
        }

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(fullName)
                .role(user.getRole())
                .isVerified(user.getIsVerified())
                .build();
    }

    public UserProfileResponse toProfileResponse(User user) {
        if (user == null) return null;

        UserProfileResponse response = UserProfileResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .isVerified(user.getIsVerified())
                .isActive(user.getIsActive())
                .preferences(user.getPreferences())
                .build();

        if (user.getAttendeeProfile() != null) {
            response.setDisplayName(user.getAttendeeProfile().getDisplayName());
            response.setPhone(user.getAttendeeProfile().getPhone());
            response.setAvatarUrl(user.getAttendeeProfile().getAvatarUrl());
            response.setDateOfBirth(user.getAttendeeProfile().getDateOfBirth());
            response.setAddress(user.getAttendeeProfile().getAddress());
        }

        if (user.getOrganizerProfile() != null) {
            response.setCompanyName(user.getOrganizerProfile().getCompanyName());
            response.setWebsiteUrl(user.getOrganizerProfile().getWebsite());
            response.setContactEmail(user.getEmail());
            response.setContactPhone(user.getOrganizerProfile().getPhone());
        }

        return response;
    }
}
