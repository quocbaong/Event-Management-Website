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
public class BroadcastPageResponse {
    private List<BroadcastHistoryDTO> history;
    private WeeklyPerformanceDTO stats;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WeeklyPerformanceDTO {
        private String totalReach;
        private String avgOpenRate;
        private String negativeFeedback;
        private int totalReachPercent;
        private int avgOpenRatePercent;
        private int negativeFeedbackPercent;
    }
}
