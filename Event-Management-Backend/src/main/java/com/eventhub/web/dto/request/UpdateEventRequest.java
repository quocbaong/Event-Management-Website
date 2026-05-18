package com.eventhub.web.dto.request;

import com.eventhub.domain.enums.EventCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateEventRequest {

    private String title;

    private String description;

    private String shortDesc;

    private EventCategory category;

    private String venue;

    private String address;

    private String city;

    private Double latitude;

    private Double longitude;

    private Instant startDate;

    private Instant endDate;

    private Instant registrationDeadline;

    private Integer maxAttendees;

    private List<String> tags;

    private String bannerUrl;

    private String thumbnailUrl;
}
