package com.eventhub.web.controller;

import com.eventhub.service.EventService;
import com.eventhub.web.dto.request.EventFilterRequest;
import com.eventhub.web.dto.response.EventDetailResponse;
import com.eventhub.web.dto.response.EventScheduleResponse;
import com.eventhub.web.dto.response.EventSummaryResponse;
import com.eventhub.web.dto.response.EventTimelineResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/events")
@RequiredArgsConstructor
public class PublicEventController {

    private final EventService eventService;

    @GetMapping
    public ResponseEntity<Page<EventSummaryResponse>> getEvents(
            @ModelAttribute EventFilterRequest filter,
            @PageableDefault(size = 12, sort = "createdAt", direction = org.springframework.data.domain.Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(eventService.getEvents(filter, pageable));
    }

    @GetMapping("/featured")
    public ResponseEntity<List<EventSummaryResponse>> getFeaturedEvents() {
        return ResponseEntity.ok(eventService.getFeaturedEvents());
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<EventSummaryResponse>> getUpcomingEvents() {
        return ResponseEntity.ok(eventService.getUpcomingEvents());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<EventDetailResponse> getEventDetail(@PathVariable String slug) {
        return ResponseEntity.ok(eventService.getEventBySlug(slug));
    }

    @GetMapping("/{id}/schedules")
    public ResponseEntity<List<EventScheduleResponse>> getEventSchedules(@PathVariable UUID id) {
        return ResponseEntity.ok(eventService.getEventSchedules(id));
    }

    @GetMapping("/{id}/timeline")
    public ResponseEntity<List<EventTimelineResponse>> getEventTimeline(@PathVariable UUID id) {
        return ResponseEntity.ok(eventService.getEventTimeline(id));
    }
}
