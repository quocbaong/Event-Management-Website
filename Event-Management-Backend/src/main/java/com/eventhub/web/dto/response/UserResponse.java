package com.eventhub.web.dto.response;

import com.eventhub.domain.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private UUID id;
    private String email;
    private String fullName;
    private UserRole role;
    private Boolean isVerified;
    private String phone;
    private String website;
    private String address;
}
