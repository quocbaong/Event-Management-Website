package com.eventhub.web.dto.response;

import com.eventhub.domain.enums.EventCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TemplateResponse {
    private UUID id;
    private String name;
    private String description;
    private EventCategory category;
    private String venue;
    private String address;
    private String city;
    private String bannerUrl;
    private List<String> tags;
    private Object ticketTypes;
    private Object schedules;
    private Object timelines;
    private Instant createdAt;
}
