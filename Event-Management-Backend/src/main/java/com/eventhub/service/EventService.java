package com.eventhub.service;

import com.eventhub.domain.entity.Event;
import com.eventhub.domain.entity.TicketType;
import com.eventhub.domain.entity.User;
import com.eventhub.domain.enums.EventCategory;
import com.eventhub.domain.enums.EventStatus;
import com.eventhub.exception.InvalidOperationException;
import com.eventhub.exception.ResourceNotFoundException;
import com.eventhub.repository.EventRepository;
import com.eventhub.web.dto.request.CreateEventRequest;
import com.eventhub.web.dto.request.PublishEventRequest;
import com.eventhub.web.dto.request.UpdateEventRequest;
import com.eventhub.web.dto.response.EventResponse;
import com.eventhub.web.dto.response.EventSummaryResponse;
import com.eventhub.web.dto.response.EventDetailResponse;
import com.eventhub.web.dto.response.EventScheduleResponse;
import com.eventhub.web.dto.response.EventTimelineResponse;
import com.eventhub.web.dto.request.EventFilterRequest;
import com.eventhub.repository.EventScheduleRepository;
import com.eventhub.repository.EventTimelineRepository;
import com.eventhub.repository.specification.EventSpecification;
import com.eventhub.web.mapper.EventMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class EventService {

    private final EventRepository eventRepository;
    private final EventScheduleRepository eventScheduleRepository;
    private final EventTimelineRepository eventTimelineRepository;
    private final EventMapper eventMapper;
    private final com.eventhub.repository.InvitationRepository invitationRepository;
    private final com.eventhub.repository.TicketTypeRepository ticketTypeRepository;

    public Page<EventSummaryResponse> getEvents(EventFilterRequest filter, Pageable pageable) {
        Page<Event> events = eventRepository.findAll(EventSpecification.filterPublicEvents(filter), pageable);
        return events.map(event -> {
            EventSummaryResponse response = eventMapper.toSummaryResponse(event);
            response.setCurrentAttendees(calculateCurrentAttendees(event));
            return response;
        });
    }

    @Cacheable(value = "featuredEvents", key = "'featured'")
    public List<EventSummaryResponse> getFeaturedEvents() {
        Pageable limit = PageRequest.of(0, 2);
        return eventRepository.findByIsFeaturedTrueAndStatusOrderByCreatedAtDesc(EventStatus.PUBLISHED, limit)
                .stream()
                .map(event -> {
                    EventSummaryResponse response = eventMapper.toSummaryResponse(event);
                    response.setCurrentAttendees(calculateCurrentAttendees(event));
                    return response;
                })
                .collect(Collectors.toList());
    }

    @Cacheable(value = "upcomingEvents", key = "'upcoming'")
    public List<EventSummaryResponse> getUpcomingEvents() {
        Pageable limit = PageRequest.of(0, 10);
        return eventRepository.findByStatusOrderByStartDateAsc(EventStatus.PUBLISHED, limit)
                .stream()
                .map(event -> {
                    EventSummaryResponse response = eventMapper.toSummaryResponse(event);
                    response.setCurrentAttendees(calculateCurrentAttendees(event));
                    return response;
                })
                .collect(Collectors.toList());
    }

    @Cacheable(value = "eventDetail", key = "#slug")
    public EventDetailResponse getEventBySlug(String slug) {
        Event event = eventRepository.findBySlugAndStatus(slug, EventStatus.PUBLISHED)
                .orElseThrow(() -> new RuntimeException("Event not found with slug: " + slug));
        EventDetailResponse response = eventMapper.toDetailResponse(event);
        response.setCurrentAttendees(calculateCurrentAttendees(event));
        return response;
    }

    @Cacheable(value = "eventSchedules", key = "#eventId")
    public List<EventScheduleResponse> getEventSchedules(UUID eventId) {
        return eventMapper.toScheduleResponseList(eventScheduleRepository.findByEventIdOrderBySortOrderAscStartTimeAsc(eventId));
    }

    @Cacheable(value = "eventTimeline", key = "#eventId")
    public List<EventTimelineResponse> getEventTimeline(UUID eventId) {
        return eventMapper.toTimelineResponseList(eventTimelineRepository.findByEventIdOrderBySortOrderAsc(eventId));
    }

    public EventResponse createEvent(User organizer, CreateEventRequest request) {
        String slug = generateSlug(request.getTitle());

        Event event = Event.builder()
                .organizer(organizer)
                .title(request.getTitle())
                .slug(slug)
                .description(request.getDescription())
                .shortDesc(request.getShortDesc())
                .category(request.getCategory() != null ? request.getCategory() : EventCategory.OTHER)
                .status(EventStatus.DRAFT)
                .venue(request.getVenue())
                .address(request.getAddress())
                .city(request.getCity())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .registrationDeadline(request.getRegistrationDeadline())
                .maxAttendees(request.getMaxAttendees())
                .tags(request.getTags())
                .bannerUrl(request.getBannerUrl())
                .thumbnailUrl(request.getThumbnailUrl())
                .build();

        event = eventRepository.save(event);
        return toEventResponse(event);
    }

    @Transactional(readOnly = true)
    public EventResponse getEvent(User organizer, UUID eventId) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));
        return toEventResponse(event);
    }

    @Transactional(readOnly = true)
    public List<EventSummaryResponse> getEvents(User organizer) {
        return eventRepository.findByOrganizerIdOrderByCreatedAtDesc(organizer.getId())
                .stream()
                .map(this::toEventSummaryResponse)
                .collect(Collectors.toList());
    }

    @CacheEvict(value = "eventDetail", key = "#result.slug")
    public EventResponse updateEvent(User organizer, UUID eventId, UpdateEventRequest request) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        if (request.getTitle() != null) {
            event.setTitle(request.getTitle());
            event.setSlug(generateSlug(request.getTitle()));
        }
        if (request.getDescription() != null) event.setDescription(request.getDescription());
        if (request.getShortDesc() != null) event.setShortDesc(request.getShortDesc());
        if (request.getCategory() != null) event.setCategory(request.getCategory());
        if (request.getVenue() != null) event.setVenue(request.getVenue());
        if (request.getAddress() != null) event.setAddress(request.getAddress());
        if (request.getCity() != null) event.setCity(request.getCity());
        if (request.getLatitude() != null) event.setLatitude(request.getLatitude());
        if (request.getLongitude() != null) event.setLongitude(request.getLongitude());
        if (request.getStartDate() != null) event.setStartDate(request.getStartDate());
        if (request.getEndDate() != null) event.setEndDate(request.getEndDate());
        if (request.getRegistrationDeadline() != null) event.setRegistrationDeadline(request.getRegistrationDeadline());
        if (request.getMaxAttendees() != null) event.setMaxAttendees(request.getMaxAttendees());
        if (request.getTags() != null) event.setTags(request.getTags());
        if (request.getBannerUrl() != null) event.setBannerUrl(request.getBannerUrl());
        if (request.getThumbnailUrl() != null) event.setThumbnailUrl(request.getThumbnailUrl());

        event = eventRepository.save(event);
        return toEventResponse(event);
    }

    public void deleteEvent(User organizer, UUID eventId) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        if (event.getStatus() != EventStatus.DRAFT && event.getStatus() != EventStatus.CANCELLED) {
            throw new InvalidOperationException(
                    "Cannot delete event with status " + event.getStatus() + ". Only DRAFT or CANCELLED events can be deleted.");
        }

        eventRepository.delete(event);
    }

    public EventResponse submitApproval(User organizer, UUID eventId) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        if (event.getIsApproved()) {
            throw new InvalidOperationException("Event is already approved");
        }

        event.setIsPendingApproval(true);
        event = eventRepository.save(event);
        return toEventResponse(event);
    }

    @CacheEvict(value = "eventDetail", key = "#result.slug")
    public EventResponse publishEvent(User organizer, UUID eventId, PublishEventRequest request) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        if (event.getStatus() == EventStatus.PUBLISHED) {
            throw new InvalidOperationException("Event is already published");
        }

        if (!Boolean.TRUE.equals(event.getIsApproved())) {
            throw new InvalidOperationException("Sự kiện chưa được Admin phê duyệt. Không thể mở bán vé.");
        }

        validatePublishable(event);

        event.setStatus(EventStatus.PUBLISHED);
        event.setPublishedAt(Instant.now());
        event = eventRepository.save(event);
        return toEventResponse(event);
    }

    @CacheEvict(value = "eventDetail", key = "#result.slug")
    @org.springframework.transaction.annotation.Transactional
    public EventResponse toggleEventSales(User organizer, java.util.UUID eventId) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        if (event.getStatus() != EventStatus.PUBLISHED) {
            throw new InvalidOperationException("Chỉ có thể tạm ngưng/mở bán vé cho sự kiện đã xuất bản (Live).");
        }

        event.setIsSalesActive(!event.getIsSalesActive());
        event = eventRepository.save(event);
        return toEventResponse(event);
    }

    private void validatePublishable(Event event) {
        if (event.getVenue() == null || event.getVenue().isBlank()) {
            event.setVenue("Online / Trực tiếp");
        }

        if (event.getTicketTypes() == null || event.getTicketTypes().isEmpty()) {
            TicketType defaultTicket = new TicketType();
            defaultTicket.setEvent(event);
            defaultTicket.setName("Vé Phổ Thông");
            defaultTicket.setPrice(java.math.BigDecimal.ZERO);
            defaultTicket.setTotalQuantity(100);
            defaultTicket.setSoldQuantity(0);
            defaultTicket.setMaxPerOrder(5);
            defaultTicket.setIsActive(true);
            ticketTypeRepository.save(defaultTicket);
            event.setTicketTypes(List.of(defaultTicket));
        }

        if (event.getStartDate() == null || event.getEndDate() == null) {
            throw new InvalidOperationException("Event must have valid start and end dates");
        }
        if (!event.getStartDate().isBefore(event.getEndDate())) {
            throw new InvalidOperationException("Start date must be before end date");
        }

        if (event.getBannerUrl() == null || event.getBannerUrl().isBlank()) {
            event.setBannerUrl("https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=1200");
        }
    }

    private String generateSlug(String title) {
        String baseSlug = title.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");
        if (baseSlug.isBlank()) {
            baseSlug = "event";
        }
        String slug = baseSlug;
        int counter = 1;
        while (eventRepository.existsBySlug(slug)) {
            slug = baseSlug + "-" + counter++;
        }
        return slug;
    }

    private int calculateCurrentAttendees(Event event) {
        List<TicketType> ticketTypes = ticketTypeRepository.findByEventIdOrderByCreatedAtAsc(event.getId());
        int ticketAttendees = ticketTypes != null
                ? ticketTypes.stream()
                        .filter(tt -> tt.getSoldQuantity() != null)
                        .mapToInt(TicketType::getSoldQuantity)
                        .sum()
                : 0;
        int inviteAttendees = invitationRepository.countByEventIdAndStatus(
                event.getId(), com.eventhub.domain.enums.InviteStatus.ACCEPTED);
        return ticketAttendees + inviteAttendees;
    }

    private EventResponse toEventResponse(Event event) {
        User organizer = event.getOrganizer();
        String organizerName = organizer.getOrganizerProfile() != null
                ? organizer.getOrganizerProfile().getCompanyName()
                : organizer.getEmail();

        List<TicketType> ticketTypes = ticketTypeRepository.findByEventIdOrderByCreatedAtAsc(event.getId());
        int currentAttendees = calculateCurrentAttendees(event);

        java.math.BigDecimal revenue = ticketTypes != null
                ? ticketTypes.stream()
                        .filter(tt -> tt.getSoldQuantity() != null && tt.getPrice() != null)
                        .map(tt -> tt.getPrice().multiply(java.math.BigDecimal.valueOf(tt.getSoldQuantity())))
                        .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add)
                : java.math.BigDecimal.ZERO;

        EventResponse response = EventResponse.builder()
                .id(event.getId())
                .organizerId(organizer.getId())
                .organizerName(organizerName)
                .organizerEmail(organizer.getEmail())
                .title(event.getTitle())
                .slug(event.getSlug())
                .description(event.getDescription())
                .shortDesc(event.getShortDesc())
                .category(event.getCategory())
                .status(event.getStatus())
                .isApproved(event.getIsApproved())
                .isPendingApproval(event.getIsPendingApproval())
                .isSalesActive(event.getIsSalesActive())
                .bannerUrl(event.getBannerUrl())
                .thumbnailUrl(event.getThumbnailUrl())
                .venue(event.getVenue())
                .address(event.getAddress())
                .city(event.getCity())
                .latitude(event.getLatitude())
                .longitude(event.getLongitude())
                .startDate(event.getStartDate())
                .endDate(event.getEndDate())
                .registrationDeadline(event.getRegistrationDeadline())
                .maxAttendees(event.getMaxAttendees())
                .currentAttendees(currentAttendees)
                .isFeatured(event.getIsFeatured())
                .tags(event.getTags())
                .publishedAt(event.getPublishedAt())
                .revenue(revenue)
                .createdAt(event.getCreatedAt())
                .updatedAt(event.getUpdatedAt())
                .build();

        if (ticketTypes != null) {
            response.setTicketTypes(ticketTypes.stream()
                    .map(tt -> EventResponse.TicketTypeInfo.builder()
                            .id(tt.getId())
                            .name(tt.getName())
                            .description(tt.getDescription())
                            .price(tt.getPrice())
                            .totalQuantity(tt.getTotalQuantity())
                            .soldQuantity(tt.getSoldQuantity())
                            .maxPerOrder(tt.getMaxPerOrder())
                            .isActive(tt.getIsActive())
                            .build())
                    .collect(Collectors.toList()));
        }

        return response;
    }

    private EventSummaryResponse toEventSummaryResponse(Event event) {
        List<TicketType> ticketTypes = ticketTypeRepository.findByEventIdOrderByCreatedAtAsc(event.getId());
        java.math.BigDecimal revenue = ticketTypes != null
                ? ticketTypes.stream()
                        .filter(tt -> tt.getSoldQuantity() != null && tt.getPrice() != null)
                        .map(tt -> tt.getPrice().multiply(java.math.BigDecimal.valueOf(tt.getSoldQuantity())))
                        .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add)
                : java.math.BigDecimal.ZERO;

        int currentAttendees = calculateCurrentAttendees(event);

        return EventSummaryResponse.builder()
                .id(event.getId())
                .title(event.getTitle())
                .slug(event.getSlug())
                .shortDesc(event.getShortDesc())
                .category(event.getCategory())
                .status(event.getStatus())
                .isApproved(event.getIsApproved())
                .isPendingApproval(event.getIsPendingApproval())
                .isSalesActive(event.getIsSalesActive())
                .bannerUrl(event.getBannerUrl())
                .thumbnailUrl(event.getThumbnailUrl())
                .venue(event.getVenue())
                .city(event.getCity())
                .startDate(event.getStartDate())
                .endDate(event.getEndDate())
                .currentAttendees(currentAttendees)
                .maxAttendees(event.getMaxAttendees())
                .publishedAt(event.getPublishedAt())
                .revenue(revenue)
                .createdAt(event.getCreatedAt())
                .build();
    }
}
