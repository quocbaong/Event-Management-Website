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
public class EventScheduleResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private UUID id;
    private String title;
    private String description;
    private Instant startTime;
    private Instant endTime;
    private String location;
    private String speaker;
    private String icon;
    private Integer sortOrder;
}
