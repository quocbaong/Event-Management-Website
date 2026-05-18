package com.eventhub.web.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateTimelineRequest {

    private String title;

    private String description;

    private Instant dueDate;

    private String status;

    private String assignee;

    private String priority;

    private Integer progress;

    private Integer sortOrder;
}
