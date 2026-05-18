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
public class TimelineResponse {

    private UUID id;
    private UUID eventId;
    private String title;
    private String description;
    private Instant dueDate;
    private String status;
    private String assignee;
    private String priority;
    private Integer progress;
    private Integer sortOrder;
    private Instant createdAt;
    private Instant updatedAt;
}
