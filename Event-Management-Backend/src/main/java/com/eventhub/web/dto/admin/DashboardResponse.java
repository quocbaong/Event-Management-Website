package com.eventhub.web.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {
    private Double totalRevenue;
    private Integer totalEvents;
    private Integer totalAttendees;
    private Double satisfactionRate;

    private List<RevenueChartDTO> monthlyRevenue;
    private List<EventCategoryDTO> eventCategories;
}
