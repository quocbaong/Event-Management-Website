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
public class UpdateScheduleRequest {

    private String title;

    private String description;

    private Instant startTime;

    private Instant endTime;

    private String speaker;

    private String location;

    private String icon;

    private Integer sortOrder;
}
