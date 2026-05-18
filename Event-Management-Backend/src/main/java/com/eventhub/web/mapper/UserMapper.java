package com.eventhub.web.mapper;

import com.eventhub.domain.entity.User;
import com.eventhub.web.dto.response.UserResponse;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toResponse(User user) {
        if (user == null) return null;

        String fullName = null;
        String phone = null;
        String website = null;
        String address = null;
        
        if (user.getAttendeeProfile() != null) {
            fullName = user.getAttendeeProfile().getDisplayName();
            phone = user.getAttendeeProfile().getPhone();
        } else if (user.getOrganizerProfile() != null) {
            fullName = user.getOrganizerProfile().getCompanyName();
            phone = user.getOrganizerProfile().getPhone();
            website = user.getOrganizerProfile().getWebsite();
            address = user.getOrganizerProfile().getBio(); // Ánh xạ bio sang address
        }

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(fullName)
                .role(user.getRole())
                .isVerified(user.getIsVerified())
                .phone(phone)
                .website(website)
                .address(address)
                .build();
    }
}
