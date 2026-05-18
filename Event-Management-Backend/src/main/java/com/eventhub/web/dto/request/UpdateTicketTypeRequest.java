package com.eventhub.web.dto.request;

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
public class UpdateTicketTypeRequest {

    private String name;

    private String description;

    private BigDecimal price;

    private Integer totalQuantity;

    private Integer maxPerOrder;

    private Instant saleStartDate;

    private Instant saleEndDate;

    private Boolean isActive;
}
