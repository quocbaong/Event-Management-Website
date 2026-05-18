package com.eventhub.web.dto.request;

import com.eventhub.domain.enums.EventCategory;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateTemplateRequest {
    @NotBlank
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
}
