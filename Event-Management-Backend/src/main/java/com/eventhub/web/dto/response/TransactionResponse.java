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
public class TransactionResponse {
    private UUID id;
    private UUID eventId;
    private String eventTitle;
    private String userName;
    private String userEmail;
    private BigDecimal amount;
    private BigDecimal fee;
    private String type;
    private String status;
    private String paymentMethod;
    private String description;
    private Instant createdAt;
}
