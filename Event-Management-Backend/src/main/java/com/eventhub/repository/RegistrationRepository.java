package com.eventhub.repository;

import com.eventhub.domain.entity.Registration;
import com.eventhub.domain.enums.RegistrationStatus;
import com.eventhub.repository.projection.RevenueProjection;
import com.eventhub.web.dto.response.RevenueEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface RegistrationRepository extends JpaRepository<Registration, UUID> {
    List<Registration> findByEventIdOrderByCreatedAtDesc(UUID eventId);

    List<Registration> findByEventIdIn(List<UUID> eventIds);

    @Query("""
            SELECT new com.eventhub.web.dto.response.RevenueEntry(
                   CAST(r.event.id AS string),
                   r.event.title,
                   SUM(r.finalAmount),
                   COUNT(r))
            FROM Registration r
            WHERE r.event.organizer.id = :organizerId
              AND r.status = :status
              AND r.createdAt <= CURRENT_TIMESTAMP
            GROUP BY r.event.id, r.event.title
            ORDER BY SUM(r.finalAmount) DESC
            """)
    List<RevenueEntry> groupRevenueByEvent(
            @Param("organizerId") UUID organizerId,
            @Param("status") RegistrationStatus status);

    @Query(value = """
            SELECT CAST(r.created_at AS DATE)::text AS group_key,
                   CAST(r.created_at AS DATE)::text AS group_label,
                   SUM(r.final_amount) AS revenue,
                   COUNT(*) AS count
            FROM registrations r
            JOIN events e ON r.event_id = e.id
            WHERE e.organizer_id = :organizerId
              AND r.status::text = :status
              AND r.created_at <= CURRENT_TIMESTAMP
            GROUP BY CAST(r.created_at AS DATE)
            ORDER BY group_key
            """, nativeQuery = true)
    List<Object[]> groupRevenueByDayNative(
            @Param("organizerId") UUID organizerId,
            @Param("status") String status);

    @Query(value = """
            SELECT TO_CHAR(r.created_at, 'YYYY-MM') AS group_key,
                   TO_CHAR(r.created_at, 'YYYY-MM') AS group_label,
                   SUM(r.final_amount) AS revenue,
                   COUNT(*) AS count
            FROM registrations r
            JOIN events e ON r.event_id = e.id
            WHERE e.organizer_id = :organizerId
              AND r.status::text = :status
              AND r.created_at <= CURRENT_TIMESTAMP
            GROUP BY TO_CHAR(r.created_at, 'YYYY-MM')
            ORDER BY group_key
            """, nativeQuery = true)
    List<Object[]> groupRevenueByMonthNative(
            @Param("organizerId") UUID organizerId,
            @Param("status") String status);

    @Query(value = """
            SELECT COUNT(DISTINCT r.id) AS registration_count,
                   COUNT(t.id) FILTER (WHERE t.checked_in_at IS NOT NULL) AS checkin_count
            FROM registrations r
            JOIN events e ON r.event_id = e.id
            LEFT JOIN tickets t ON t.registration_id = r.id
            WHERE e.organizer_id = :organizerId
              AND r.status::text = :status
              AND r.created_at <= CURRENT_TIMESTAMP
            """, nativeQuery = true)
    Object[] getAttendeeStats(
            @Param("organizerId") UUID organizerId,
            @Param("status") String status);

    @Query("""
            SELECT r FROM Registration r
            JOIN FETCH r.event e
            LEFT JOIN FETCH r.attendee a
            LEFT JOIN FETCH a.attendeeProfile
            LEFT JOIN FETCH r.tickets t
            WHERE e.organizer.id = :organizerId
            """)
    List<Registration> findAllAnalyticsByOrganizer(@Param("organizerId") UUID organizerId);

    List<Registration> findByAttendeeIdOrderByCreatedAtDesc(UUID attendeeId);

    boolean existsByEventIdAndAttendeeId(UUID eventId, UUID attendeeId);
}
