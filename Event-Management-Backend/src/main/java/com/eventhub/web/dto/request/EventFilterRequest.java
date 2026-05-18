package com.eventhub.web.dto.request;

import com.eventhub.domain.enums.EventCategory;
import com.eventhub.domain.enums.EventStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventFilterRequest {
    private String search;
    private EventCategory category;
    private EventStatus status;
    private String city;
    private Instant startDateFrom;
    private Instant startDateTo;
    private Boolean isFeatured;
}
