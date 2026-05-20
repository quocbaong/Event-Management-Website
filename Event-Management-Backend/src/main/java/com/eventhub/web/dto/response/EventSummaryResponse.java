package com.eventhub.web.dto.response;

import com.eventhub.domain.enums.EventCategory;
import com.eventhub.domain.enums.EventStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventSummaryResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private UUID id;
    private String title;
    private String slug;
    private String shortDesc;
    private EventCategory category;
    private EventStatus status;
    private Boolean isApproved;
    private Boolean isPendingApproval;
    private Boolean isSalesActive;
    private String bannerUrl;
    private String thumbnailUrl;
    private String venue;
    private String city;
    private Instant startDate;
    private Instant endDate;
    private Integer currentAttendees;
    private Integer maxAttendees;
    private Instant publishedAt;
    private BigDecimal revenue;
    private Instant createdAt;
}
