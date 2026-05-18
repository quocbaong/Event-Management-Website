package com.eventhub.web.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateTicketTypeRequest {

    @NotBlank(message = "Ticket type name is required")
    private String name;

    private String description;

    @NotNull(message = "Price is required")
    @Builder.Default
    private BigDecimal price = BigDecimal.ZERO;

    @NotNull(message = "Total quantity is required")
    @Positive(message = "Total quantity must be positive")
    private Integer totalQuantity;

    @Builder.Default
    private Integer maxPerOrder = 10;

    private Instant saleStartDate;

    private Instant saleEndDate;
}
