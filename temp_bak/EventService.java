package com.eventhub.service;

import com.eventhub.web.dto.request.EventFilterRequest;
import com.eventhub.web.dto.response.EventDetailResponse;
import com.eventhub.web.dto.response.EventScheduleResponse;
import com.eventhub.web.dto.response.EventSummaryResponse;
import com.eventhub.web.dto.response.EventTimelineResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface EventService {
    Page<EventSummaryResponse> getEvents(EventFilterRequest filter, Pageable pageable);
    
    List<EventSummaryResponse> getFeaturedEvents();
    
    List<EventSummaryResponse> getUpcomingEvents();
    
    EventDetailResponse getEventBySlug(String slug);
    
    List<EventScheduleResponse> getEventSchedules(UUID eventId);
    
    List<EventTimelineResponse> getEventTimeline(UUID eventId);
}
