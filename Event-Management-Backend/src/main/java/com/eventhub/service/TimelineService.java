package com.eventhub.service;

import com.eventhub.domain.entity.Event;
import com.eventhub.domain.entity.EventTimeline;
import com.eventhub.domain.entity.User;
import com.eventhub.exception.InvalidOperationException;
import com.eventhub.exception.ResourceNotFoundException;
import com.eventhub.repository.EventRepository;
import com.eventhub.repository.EventTimelineRepository;
import com.eventhub.web.dto.request.CreateTimelineRequest;
import com.eventhub.web.dto.request.UpdateTimelineRequest;
import com.eventhub.web.dto.response.TimelineResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TimelineService {

    private static final Set<String> VALID_STATUSES = Set.of("PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED");
    private static final Set<String> VALID_PRIORITIES = Set.of("LOW", "NORMAL", "HIGH", "URGENT");

    private final EventTimelineRepository timelineRepository;
    private final EventRepository eventRepository;

    public TimelineResponse createTimeline(User organizer, UUID eventId, CreateTimelineRequest request) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        if (request.getPriority() != null && !VALID_PRIORITIES.contains(request.getPriority())) {
            throw new InvalidOperationException("Invalid priority. Must be one of: " + VALID_PRIORITIES);
        }

        EventTimeline timeline = EventTimeline.builder()
                .event(event)
                .title(request.getTitle())
                .description(request.getDescription())
                .dueDate(request.getDueDate())
                .status("PENDING")
                .assignee(request.getAssignee())
                .priority(request.getPriority() != null ? request.getPriority() : "NORMAL")
                .progress(request.getProgress() != null ? request.getProgress() : 0)
                .sortOrder(request.getSortOrder() != null ? request.getSortOrder() : 0)
                .build();

        timeline = timelineRepository.save(timeline);
        return toResponse(timeline);
    }

    @Transactional(readOnly = true)
    public List<TimelineResponse> getTimelines(User organizer, UUID eventId) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        return timelineRepository.findByEventIdOrderBySortOrderAscDueDateAsc(event.getId())
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public TimelineResponse updateTimeline(User organizer, UUID eventId, UUID timelineId, UpdateTimelineRequest request) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        EventTimeline timeline = timelineRepository.findById(timelineId)
                .orElseThrow(() -> new ResourceNotFoundException("Timeline not found with id: " + timelineId));

        if (!timeline.getEvent().getId().equals(event.getId())) {
            throw new ResourceNotFoundException("Timeline not found for this event");
        }

        if (request.getTitle() != null) timeline.setTitle(request.getTitle());
        if (request.getDescription() != null) timeline.setDescription(request.getDescription());
        if (request.getDueDate() != null) timeline.setDueDate(request.getDueDate());
        if (request.getAssignee() != null) timeline.setAssignee(request.getAssignee());
        if (request.getSortOrder() != null) timeline.setSortOrder(request.getSortOrder());
        if (request.getProgress() != null) {
            if (request.getProgress() < 0 || request.getProgress() > 100) {
                throw new InvalidOperationException("Progress must be between 0 and 100");
            }
            timeline.setProgress(request.getProgress());
        }

        if (request.getStatus() != null) {
            if (!VALID_STATUSES.contains(request.getStatus())) {
                throw new InvalidOperationException("Invalid status. Must be one of: " + VALID_STATUSES);
            }
            timeline.setStatus(request.getStatus());
        }

        if (request.getPriority() != null) {
            if (!VALID_PRIORITIES.contains(request.getPriority())) {
                throw new InvalidOperationException("Invalid priority. Must be one of: " + VALID_PRIORITIES);
            }
            timeline.setPriority(request.getPriority());
        }

        timeline = timelineRepository.save(timeline);
        return toResponse(timeline);
    }

    public void deleteTimeline(User organizer, UUID eventId, UUID timelineId) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        EventTimeline timeline = timelineRepository.findById(timelineId)
                .orElseThrow(() -> new ResourceNotFoundException("Timeline not found with id: " + timelineId));

        if (!timeline.getEvent().getId().equals(event.getId())) {
            throw new ResourceNotFoundException("Timeline not found for this event");
        }

        timelineRepository.delete(timeline);
    }

    private TimelineResponse toResponse(EventTimeline timeline) {
        return TimelineResponse.builder()
                .id(timeline.getId())
                .eventId(timeline.getEvent().getId())
                .title(timeline.getTitle())
                .description(timeline.getDescription())
                .dueDate(timeline.getDueDate())
                .status(timeline.getStatus())
                .assignee(timeline.getAssignee())
                .priority(timeline.getPriority())
                .progress(timeline.getProgress())
                .sortOrder(timeline.getSortOrder())
                .createdAt(timeline.getCreatedAt())
                .updatedAt(timeline.getUpdatedAt())
                .build();
    }
}
