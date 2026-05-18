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
public class WithdrawalResponse {
    private UUID id;
    private BigDecimal amount;
    private String bankName;
    private String bankAccount;
    private String accountOwner;
    private String status;
    private String note;
    private Instant requestedAt;
    private Instant processedAt;
    private Instant createdAt;
}
