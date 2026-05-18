package com.eventhub.web.dto.response;

import com.eventhub.domain.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Map;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {
    private UUID id;
    private String email;
    private UserRole role;
    private Boolean isVerified;
    private Boolean isActive;
    
    // Attendee Profile Fields
    private String displayName;
    private String phone;
    private String avatarUrl;
    private LocalDate dateOfBirth;
    private String address;

    // Organizer Profile Fields
    private String companyName;
    private String websiteUrl;
    private String contactEmail;
    private String contactPhone;

    // Preferences
    private Map<String, Object> preferences;
}
