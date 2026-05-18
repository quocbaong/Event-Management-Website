package com.eventhub.repository;

import com.eventhub.domain.entity.EventSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EventScheduleRepository extends JpaRepository<EventSchedule, UUID> {

    List<EventSchedule> findByEventIdOrderBySortOrderAscStartTimeAsc(UUID eventId);
}
