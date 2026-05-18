package com.eventhub.repository;

import com.eventhub.domain.entity.EventTimeline;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EventTimelineRepository extends JpaRepository<EventTimeline, UUID> {

    List<EventTimeline> findByEventIdOrderBySortOrderAsc(UUID eventId);

    List<EventTimeline> findByEventIdOrderBySortOrderAscDueDateAsc(UUID eventId);
}
