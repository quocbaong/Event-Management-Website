package com.eventhub.web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventTimelineResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private UUID id;
    private String title;
    private String description;
    private Instant dueDate;
    private String status;
    private String assignee;
    private String priority;
    private Integer progress;
    private Integer sortOrder;
}
