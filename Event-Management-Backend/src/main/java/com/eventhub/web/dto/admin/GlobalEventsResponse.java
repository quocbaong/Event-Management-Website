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
public class GlobalEventsResponse {
    private AdminEventStatsDTO stats;
    private List<GlobalEventDTO> events;
    private List<EventCategoryDTO> categories;
    private PaginationDTO pagination;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PaginationDTO {
        private int currentPage;
        private int totalPages;
        private long totalItems;
        private int pageSize;
    }
}
