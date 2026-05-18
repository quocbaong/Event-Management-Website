package com.eventhub.web.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateWithdrawalRequest {
    @NotNull
    @DecimalMin(value = "1000", message = "Amount must be at least 1,000")
    private BigDecimal amount;

    @NotBlank
    private String bankName;

    @NotBlank
    private String bankAccount;

    @NotBlank
    private String accountOwner;
}
