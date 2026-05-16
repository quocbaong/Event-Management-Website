package com.eventhub.web.mapper;

import com.eventhub.domain.entity.User;
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
}
