package com.eventhub.web.dto.response;

import com.eventhub.domain.enums.EventCategory;
import com.eventhub.domain.enums.EventStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventDetailResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private UUID id;
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
    
    // We'll map the organizer basic info
    private OrganizerInfo organizer;
    
    // We'll map the ticket types
    private List<TicketTypeResponse> ticketTypes;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrganizerInfo implements Serializable {
        private static final long serialVersionUID = 1L;
        
        private UUID id;
        private String email;
        private String fullName;
        // In the future we can map more from OrganizerProfile if needed
    }
}
