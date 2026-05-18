package com.eventhub.web.dto.response;

import com.eventhub.domain.enums.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    private UUID id;
    private NotificationType type;
    private String title;
    private String body;
    private Map<String, Object> data;
    private Boolean isRead;
    private Instant readAt;
    private Instant createdAt;
}
