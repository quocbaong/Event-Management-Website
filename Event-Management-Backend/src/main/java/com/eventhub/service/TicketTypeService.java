package com.eventhub.service;

import com.eventhub.domain.entity.Event;
import com.eventhub.domain.entity.TicketType;
import com.eventhub.domain.entity.User;
import com.eventhub.exception.InvalidOperationException;
import com.eventhub.exception.ResourceNotFoundException;
import com.eventhub.repository.EventRepository;
import com.eventhub.repository.TicketRepository;
import com.eventhub.repository.TicketTypeRepository;
import com.eventhub.web.dto.request.CreateTicketTypeRequest;
import com.eventhub.web.dto.request.UpdateTicketTypeRequest;
import com.eventhub.web.dto.response.TicketTypeResponse;
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
public class TicketTypeService {

    private final TicketTypeRepository ticketTypeRepository;
    private final EventRepository eventRepository;
    private final TicketRepository ticketRepository;

    public TicketTypeResponse createTicketType(User organizer, UUID eventId, CreateTicketTypeRequest request) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        if (request.getSaleStartDate() != null && request.getSaleEndDate() != null
                && !request.getSaleStartDate().isBefore(request.getSaleEndDate())) {
            throw new InvalidOperationException("Sale start date must be before sale end date");
        }

        TicketType ticketType = TicketType.builder()
                .event(event)
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .totalQuantity(request.getTotalQuantity())
                .soldQuantity(0)
                .maxPerOrder(request.getMaxPerOrder() != null ? request.getMaxPerOrder() : 10)
                .saleStartDate(request.getSaleStartDate())
                .saleEndDate(request.getSaleEndDate())
                .isActive(true)
                .build();

        ticketType = ticketTypeRepository.save(ticketType);
        return toResponse(ticketType);
    }

    @Transactional(readOnly = true)
    public List<TicketTypeResponse> getTicketTypes(User organizer, UUID eventId) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        return ticketTypeRepository.findByEventIdOrderByCreatedAtAsc(event.getId())
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public TicketTypeResponse updateTicketType(User organizer, UUID eventId, UUID ticketTypeId, UpdateTicketTypeRequest request) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        TicketType ticketType = ticketTypeRepository.findById(ticketTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket type not found with id: " + ticketTypeId));

        if (!ticketType.getEvent().getId().equals(event.getId())) {
            throw new ResourceNotFoundException("Ticket type not found for this event");
        }

        if (request.getName() != null) ticketType.setName(request.getName());
        if (request.getDescription() != null) ticketType.setDescription(request.getDescription());
        if (request.getPrice() != null) ticketType.setPrice(request.getPrice());
        if (request.getMaxPerOrder() != null) ticketType.setMaxPerOrder(request.getMaxPerOrder());
        if (request.getIsActive() != null) ticketType.setIsActive(request.getIsActive());

        if (request.getTotalQuantity() != null) {
            if (request.getTotalQuantity() < ticketType.getSoldQuantity()) {
                throw new InvalidOperationException(
                        "Cannot reduce total quantity below sold quantity (" + ticketType.getSoldQuantity() + ")");
            }
            ticketType.setTotalQuantity(request.getTotalQuantity());
        }

        if (request.getSaleStartDate() != null || request.getSaleEndDate() != null) {
            Instant start = request.getSaleStartDate() != null ? request.getSaleStartDate() : ticketType.getSaleStartDate();
            Instant end = request.getSaleEndDate() != null ? request.getSaleEndDate() : ticketType.getSaleEndDate();
            if (start != null && end != null && !start.isBefore(end)) {
                throw new InvalidOperationException("Sale start date must be before sale end date");
            }
            if (request.getSaleStartDate() != null) ticketType.setSaleStartDate(request.getSaleStartDate());
            if (request.getSaleEndDate() != null) ticketType.setSaleEndDate(request.getSaleEndDate());
        }

        ticketType = ticketTypeRepository.save(ticketType);
        return toResponse(ticketType);
    }

    public void deleteTicketType(User organizer, UUID eventId, UUID ticketTypeId) {
        Event event = eventRepository.findByIdAndOrganizerId(eventId, organizer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        TicketType ticketType = ticketTypeRepository.findById(ticketTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket type not found with id: " + ticketTypeId));

        if (!ticketType.getEvent().getId().equals(event.getId())) {
            throw new ResourceNotFoundException("Ticket type not found for this event");
        }

        if (ticketRepository.existsByTicketTypeId(ticketTypeId)) {
            throw new InvalidOperationException(
                    "Cannot delete ticket type with existing registrations");
        }

        ticketTypeRepository.delete(ticketType);
    }

    private TicketTypeResponse toResponse(TicketType ticketType) {
        return TicketTypeResponse.builder()
                .id(ticketType.getId())
                .eventId(ticketType.getEvent().getId())
                .name(ticketType.getName())
                .description(ticketType.getDescription())
                .price(ticketType.getPrice())
                .totalQuantity(ticketType.getTotalQuantity())
                .soldQuantity(ticketType.getSoldQuantity())
                .maxPerOrder(ticketType.getMaxPerOrder())
                .saleStartDate(ticketType.getSaleStartDate())
                .saleEndDate(ticketType.getSaleEndDate())
                .isActive(ticketType.getIsActive())
                .createdAt(ticketType.getCreatedAt())
                .updatedAt(ticketType.getUpdatedAt())
                .build();
    }
}
