package com.eventhub.repository;

import com.eventhub.domain.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {

    List<Event> findByOrganizerIdOrderByCreatedAtDesc(UUID organizerId);

    Optional<Event> findByIdAndOrganizerId(UUID id, UUID organizerId);

    boolean existsBySlug(String slug);
}
