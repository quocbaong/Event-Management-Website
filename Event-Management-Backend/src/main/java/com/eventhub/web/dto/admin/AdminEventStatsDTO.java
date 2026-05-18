package com.eventhub.web.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminEventStatsDTO {
    private long totalEvents;
    private String totalEventsTrend;
    private long ongoingEvents;
    private long pendingEvents;
    private long reportedEvents;
}
