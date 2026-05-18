package com.eventhub.web.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackPageResponse {
    private SentimentDTO sentiment;
    private List<TrendDTO> trendsThisMonth;
    private List<TrendDTO> trendsLastMonth;
    private List<FeedbackItemDTO> items;
    private List<CommunicationLogDTO> logs;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SentimentDTO {
        private int positive;
        private int neutral;
        private int negative;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TrendDTO {
        private String category;
        private int count;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FeedbackItemDTO {
        private UUID id;
        private String name;
        private String username;
        private String avatarUrl;
        private String category;
        private String categoryLabel; // BÁO CÁO NỘI DUNG, LỖI KỸ THUẬT, ĐÓNG GÓP Ý KIẾN
        private String categoryColor; // red, blue, slate
        private String timeText;
        private String message;
        private String status;
        private String sentiment; // Tích cực, Trung lập, Tiêu cực
        private String severity; // Thấp, Trung bình, Cao
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CommunicationLogDTO {
        private String sender;
        private String receiver;
        private String message;
        private String timeText;
        private boolean isRead;
        private String logType; // user, system, alert
    }
}
