package com.eventhub.service;

import com.eventhub.domain.entity.EventTemplate;
import com.eventhub.domain.entity.User;
import com.eventhub.repository.EventTemplateRepository;
import com.eventhub.web.dto.request.CreateTemplateRequest;
import com.eventhub.web.dto.response.TemplateResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class EventTemplateService {

    private final EventTemplateRepository repository;
    private final ObjectMapper objectMapper;

    public TemplateResponse createTemplate(User organizer, CreateTemplateRequest request) {
        String ticketTypesJson = toJson(request.getTicketTypes());
        String schedulesJson = toJson(request.getSchedules());
        String timelinesJson = toJson(request.getTimelines());

        EventTemplate template = EventTemplate.builder()
                .organizer(organizer)
                .name(request.getName())
                .description(request.getDescription())
                .category(request.getCategory())
                .venue(request.getVenue())
                .address(request.getAddress())
                .city(request.getCity())
                .bannerUrl(request.getBannerUrl())
                .tags(request.getTags())
                .ticketTypesJson(ticketTypesJson)
                .schedulesJson(schedulesJson)
                .timelinesJson(timelinesJson)
                .build();

        template = repository.save(template);
        return toResponse(template);
    }

    @Transactional(readOnly = true)
    public List<TemplateResponse> getTemplates(User organizer) {
        return repository.findByOrganizerIdOrderByCreatedAtDesc(organizer.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private String toJson(Object value) {
        if (value == null) return null;
        try {
            return objectMapper.writeValueAsString(value);
        } catch (Exception e) {
            log.warn("Failed to serialize template data: {}", e.getMessage());
            return null;
        }
    }

    private Object fromJson(String json) {
        if (json == null || json.isBlank()) return null;
        try {
            return objectMapper.readTree(json);
        } catch (Exception e) {
            log.warn("Failed to deserialize template data: {}", e.getMessage());
            return null;
        }
    }

    private TemplateResponse toResponse(EventTemplate t) {
        return TemplateResponse.builder()
                .id(t.getId())
                .name(t.getName())
                .description(t.getDescription())
                .category(t.getCategory())
                .venue(t.getVenue())
                .address(t.getAddress())
                .city(t.getCity())
                .bannerUrl(t.getBannerUrl())
                .tags(t.getTags())
                .ticketTypes(fromJson(t.getTicketTypesJson()))
                .schedules(fromJson(t.getSchedulesJson()))
                .timelines(fromJson(t.getTimelinesJson()))
                .createdAt(t.getCreatedAt())
                .build();
    }
}
