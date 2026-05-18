package com.eventhub.service;

import com.eventhub.domain.entity.Event;
import com.eventhub.domain.entity.EventSchedule;
import com.eventhub.domain.entity.User;
import com.eventhub.exception.InvalidOperationException;
import com.eventhub.exception.ResourceNotFoundException;
import com.eventhub.repository.EventRepository;
import com.eventhub.repository.EventScheduleRepository;
import com.eventhub.web.dto.request.CreateScheduleRequest;
import com.eventhub.web.dto.request.UpdateScheduleRequest;
import com.eventhub.web.dto.response.ScheduleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ScheduleService {

    private final EventScheduleRepository scheduleRepository;
    private final EventRepository eventRepository;

    public ScheduleResponse createSchedule(User organizer, UUID eventId, CreateScheduleRequest request) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        if (!request.getStartTime().isBefore(request.getEndTime())) {
            throw new InvalidOperationException("Start time must be before end time");
        }

        EventSchedule schedule = EventSchedule.builder()
                .event(event)
                .title(request.getTitle())
                .description(request.getDescription())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .speaker(request.getSpeaker())
                .location(request.getLocation())
                .icon(request.getIcon())
                .sortOrder(request.getSortOrder() != null ? request.getSortOrder() : 0)
                .build();

        schedule = scheduleRepository.save(schedule);
        return toResponse(schedule);
    }

    @Transactional(readOnly = true)
    public List<ScheduleResponse> getSchedules(User organizer, UUID eventId) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        return scheduleRepository.findByEventIdOrderBySortOrderAscStartTimeAsc(event.getId())
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ScheduleResponse updateSchedule(User organizer, UUID eventId, UUID scheduleId, UpdateScheduleRequest request) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        EventSchedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule not found with id: " + scheduleId));

        if (!schedule.getEvent().getId().equals(event.getId())) {
            throw new ResourceNotFoundException("Schedule not found for this event");
        }

        if (request.getTitle() != null) schedule.setTitle(request.getTitle());
        if (request.getDescription() != null) schedule.setDescription(request.getDescription());
        if (request.getSpeaker() != null) schedule.setSpeaker(request.getSpeaker());
        if (request.getLocation() != null) schedule.setLocation(request.getLocation());
        if (request.getIcon() != null) schedule.setIcon(request.getIcon());
        if (request.getSortOrder() != null) schedule.setSortOrder(request.getSortOrder());

        if (request.getStartTime() != null || request.getEndTime() != null) {
            Instant start = request.getStartTime() != null ? request.getStartTime() : schedule.getStartTime();
            Instant end = request.getEndTime() != null ? request.getEndTime() : schedule.getEndTime();
            if (!start.isBefore(end)) {
                throw new InvalidOperationException("Start time must be before end time");
            }
            if (request.getStartTime() != null) schedule.setStartTime(request.getStartTime());
            if (request.getEndTime() != null) schedule.setEndTime(request.getEndTime());
        }

        schedule = scheduleRepository.save(schedule);
        return toResponse(schedule);
    }

    public void deleteSchedule(User organizer, UUID eventId, UUID scheduleId) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        EventSchedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule not found with id: " + scheduleId));

        if (!schedule.getEvent().getId().equals(event.getId())) {
            throw new ResourceNotFoundException("Schedule not found for this event");
        }

        scheduleRepository.delete(schedule);
    }

    private ScheduleResponse toResponse(EventSchedule schedule) {
        return ScheduleResponse.builder()
                .id(schedule.getId())
                .eventId(schedule.getEvent().getId())
                .title(schedule.getTitle())
                .description(schedule.getDescription())
                .startTime(schedule.getStartTime())
                .endTime(schedule.getEndTime())
                .speaker(schedule.getSpeaker())
                .location(schedule.getLocation())
                .icon(schedule.getIcon())
                .sortOrder(schedule.getSortOrder())
                .createdAt(schedule.getCreatedAt())
                .updatedAt(schedule.getUpdatedAt())
                .build();
    }
}
