package com.eventhub.repository;

import com.eventhub.domain.entity.Event;
import com.eventhub.domain.enums.EventStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID>, JpaSpecificationExecutor<Event> {

    List<Event> findByOrganizerIdOrderByCreatedAtDesc(UUID organizerId);

    Optional<Event> findByIdAndOrganizerId(UUID id, UUID organizerId);

    boolean existsBySlug(String slug);

    Optional<Event> findBySlugAndStatus(String slug, EventStatus status);

    Page<Event> findByIsFeaturedTrueAndStatusOrderByCreatedAtDesc(EventStatus status, Pageable pageable);

    Page<Event> findByStatusOrderByStartDateAsc(EventStatus status, Pageable pageable);
}
