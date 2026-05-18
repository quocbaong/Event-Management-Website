package com.eventhub.repository;

import com.eventhub.domain.entity.EventTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EventTemplateRepository extends JpaRepository<EventTemplate, UUID> {
    List<EventTemplate> findByOrganizerIdOrderByCreatedAtDesc(UUID organizerId);
}
