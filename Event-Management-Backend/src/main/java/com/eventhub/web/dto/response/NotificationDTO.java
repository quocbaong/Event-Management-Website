package com.eventhub.web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
    private UUID id;
    private String type;
    private String title;
    private String description;
    private String time;
    private String date;
    private String location;
    private String actionLabel;
    private boolean unread;
    private boolean isNew;
}
