package com.eventhub.repository;

import com.eventhub.domain.entity.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface VenueRepository extends JpaRepository<Venue, UUID> {

    List<Venue> findByOrganizerIdOrderByNameAsc(UUID organizerId);

    Optional<Venue> findByIdAndOrganizerId(UUID id, UUID organizerId);
}
