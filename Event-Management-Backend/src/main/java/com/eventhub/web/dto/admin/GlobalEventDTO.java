package com.eventhub.web.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GlobalEventDTO {
    private String id;
    private UUID dbId;
    private String name;
    private String image;
    private OrganizerDTO organizer;
    private StatusDTO status;
    private JoinedDTO joined;
    private String date;
    private String time;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrganizerDTO {
        private String name;
        private String role;
        private String avatar;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StatusDTO {
        private String text;
        private String color;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class JoinedDTO {
        private String current;
        private String total;
        private Integer percent;
    }
}
