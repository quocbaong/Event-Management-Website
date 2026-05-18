package com.eventhub.web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvitationResponse {
    private UUID id;
    private UUID eventId;
    private String eventTitle;
    private String email;
    private String token;
    private String status;
    private Instant sentAt;
    private Instant respondedAt;
    private Instant createdAt;
}
