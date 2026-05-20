package com.eventhub.web.dto.response;

import com.eventhub.domain.enums.EventCategory;
import com.eventhub.domain.enums.EventStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventResponse {

    private UUID id;
    private UUID organizerId;
    private String organizerName;
    private String organizerEmail;
    private String title;
    private String slug;
    private String description;
    private String shortDesc;
    private EventCategory category;
    private EventStatus status;
    private Boolean isApproved;
    private Boolean isPendingApproval;
    private Boolean isSalesActive;
    private String bannerUrl;
    private String thumbnailUrl;
    private String venue;
    private String address;
    private String city;
    private Double latitude;
    private Double longitude;
    private Instant startDate;
    private Instant endDate;
    private Instant registrationDeadline;
    private Integer maxAttendees;
    private Integer currentAttendees;
    private Boolean isFeatured;
    private List<String> tags;
    private Instant publishedAt;
    private Instant createdAt;
    private Instant updatedAt;
    private BigDecimal revenue;
    private List<TicketTypeInfo> ticketTypes;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TicketTypeInfo {
        private UUID id;
        private String name;
        private String description;
        private BigDecimal price;
        private Integer totalQuantity;
        private Integer soldQuantity;
        private Integer maxPerOrder;
        private Boolean isActive;
    }
}
