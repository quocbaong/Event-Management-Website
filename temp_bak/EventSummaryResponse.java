package com.eventhub.web.dto.response;

import com.eventhub.domain.enums.EventCategory;
import com.eventhub.domain.enums.EventStatus;
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
public class EventSummaryResponse {
    private UUID id;
    private String title;
    private String slug;
    private String shortDesc;
    private EventCategory category;
    private EventStatus status;
    private String thumbnailUrl;
    private String city;
    private Instant startDate;
    private Instant endDate;
    private Integer maxAttendees;
    private Integer currentAttendees;
    private Boolean isFeatured;
    private Instant publishedAt;
}
