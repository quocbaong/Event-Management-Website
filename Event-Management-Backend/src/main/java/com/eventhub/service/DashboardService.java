package com.eventhub.service;

import com.eventhub.domain.entity.Event;
import com.eventhub.domain.entity.Registration;
import com.eventhub.domain.entity.User;
import com.eventhub.domain.enums.RegistrationStatus;
import com.eventhub.repository.EventRepository;
import com.eventhub.repository.RegistrationRepository;
import com.eventhub.web.dto.response.DashboardAttendeesResponse;
import com.eventhub.web.dto.response.DashboardOverviewResponse;
import com.eventhub.web.dto.response.RevenueEntry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardService {

    private final EventRepository eventRepository;
    private final RegistrationRepository registrationRepository;

    public DashboardOverviewResponse getOverview(User organizer) {
        List<Event> events = eventRepository.findByOrganizerIdOrderByCreatedAtDesc(organizer.getId());

        long totalEvents = events.size();

        long upcomingEvents = events.stream()
                .filter(e -> e.getStartDate() != null && e.getStartDate().isAfter(Instant.now()))
                .count();

        if (events.isEmpty()) {
            return DashboardOverviewResponse.builder()
                    .totalEvents(0)
                    .totalRevenue(BigDecimal.ZERO)
                    .totalAttendees(0)
                    .upcomingEvents(0)
                    .build();
        }

        List<UUID> eventIds = events.stream().map(Event::getId).toList();
        List<Registration> allRegistrations = registrationRepository.findByEventIdIn(eventIds);

        Instant now = Instant.now();

        BigDecimal totalRevenue = allRegistrations.stream()
                .filter(r -> r.getStatus() == RegistrationStatus.CONFIRMED && r.getCreatedAt() != null && r.getCreatedAt().isBefore(now))
                .map(Registration::getFinalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Set<UUID> uniqueAttendees = allRegistrations.stream()
                .filter(r -> r.getStatus() == RegistrationStatus.CONFIRMED && r.getCreatedAt() != null && r.getCreatedAt().isBefore(now))
                .map(r -> r.getAttendee().getId())
                .collect(Collectors.toSet());

        return DashboardOverviewResponse.builder()
                .totalEvents(totalEvents)
                .totalRevenue(totalRevenue)
                .totalAttendees(uniqueAttendees.size())
                .upcomingEvents(upcomingEvents)
                .build();
    }

    public List<RevenueEntry> getRevenue(User organizer, String groupBy) {
        UUID organizerId = organizer.getId();
        String status = RegistrationStatus.CONFIRMED.name();

        return switch (groupBy) {
            case "event" -> registrationRepository.groupRevenueByEvent(organizerId, RegistrationStatus.CONFIRMED);
            case "day" -> mapNativeResults(registrationRepository.groupRevenueByDayNative(organizerId, status));
            case "month" -> mapNativeResults(registrationRepository.groupRevenueByMonthNative(organizerId, status));
            default -> throw new IllegalArgumentException(
                    "Invalid groupBy: " + groupBy + ". Use: event, day, month");
        };
    }

    public DashboardAttendeesResponse getAttendees(User organizer) {
        String status = RegistrationStatus.CONFIRMED.name();
        Object[] row = registrationRepository.getAttendeeStats(organizer.getId(), status);
        long registrationCount = row[0] != null ? ((Number) row[0]).longValue() : 0L;
        long checkinCount = row[1] != null ? ((Number) row[1]).longValue() : 0L;
        double participationRate = registrationCount > 0
                ? (double) checkinCount / registrationCount * 100.0
                : 0.0;
        participationRate = Math.round(participationRate * 100.0) / 100.0;
        return DashboardAttendeesResponse.builder()
                .registrationCount(registrationCount)
                .checkinCount(checkinCount)
                .participationRate(participationRate)
                .build();
    }

    private List<RevenueEntry> mapNativeResults(List<Object[]> rows) {
        List<RevenueEntry> result = new ArrayList<>();
        for (Object[] row : rows) {
            BigDecimal revenue = row[2] != null ? ((java.math.BigDecimal) row[2]) : BigDecimal.ZERO;
            long count = row[3] != null ? ((Number) row[3]).longValue() : 0L;
            result.add(RevenueEntry.builder()
                    .groupKey(row[0] != null ? row[0].toString() : null)
                    .groupLabel(row[1] != null ? row[1].toString() : null)
                    .revenue(revenue)
                    .count(count)
                    .build());
        }
        return result;
    }
}
