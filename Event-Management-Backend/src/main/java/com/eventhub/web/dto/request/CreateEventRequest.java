package com.eventhub.web.dto.request;

import com.eventhub.domain.enums.EventCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class CreateEventRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    private String shortDesc;

    @Builder.Default
    private EventCategory category = EventCategory.OTHER;

    @NotBlank(message = "Venue is required")
    private String venue;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "City is required")
    private String city;

    private Double latitude;

    private Double longitude;

    @NotNull(message = "Start date is required")
    private Instant startDate;

    @NotNull(message = "End date is required")
    private Instant endDate;

    private Instant registrationDeadline;

    private Integer maxAttendees;

    private List<String> tags;

    private String bannerUrl;

    private String thumbnailUrl;
}
