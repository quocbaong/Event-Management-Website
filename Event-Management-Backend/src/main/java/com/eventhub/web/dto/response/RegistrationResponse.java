package com.eventhub.web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationResponse {
    private UUID id;
    private UUID eventId;
    private String eventTitle;
    private UUID attendeeId;
    private String attendeeName;
    private String attendeeEmail;
    private String status;
    private BigDecimal totalAmount;
    private BigDecimal finalAmount;
    private Instant createdAt;
}
