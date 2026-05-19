package com.eventhub.web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketTypeResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private UUID id;
    private UUID eventId;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer totalQuantity;
    private Integer soldQuantity;
    private Integer maxPerOrder;
    private Instant saleStartDate;
    private Instant saleEndDate;
    private Boolean isActive;
    private Instant createdAt;
    private Instant updatedAt;
}
