package com.eventhub.web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleResponse {

    private UUID id;
    private UUID eventId;
    private String title;
    private String description;
    private Instant startTime;
    private Instant endTime;
    private String speaker;
    private String location;
    private String icon;
    private Integer sortOrder;
    private Instant createdAt;
    private Instant updatedAt;
}
