package com.eventhub.web.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateTimelineRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Due date is required")
    private Instant dueDate;

    private String assignee;

    @Builder.Default
    private String priority = "NORMAL";

    @Builder.Default
    private Integer progress = 0;

    @Builder.Default
    private Integer sortOrder = 0;
}
