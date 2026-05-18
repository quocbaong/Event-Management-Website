package com.eventhub.repository;

import com.eventhub.domain.entity.Event;
import com.eventhub.domain.enums.EventStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<Event, UUID>, JpaSpecificationExecutor<Event> {

    Optional<Event> findBySlugAndStatus(String slug, EventStatus status);

    Page<Event> findByIsFeaturedTrueAndStatus(EventStatus status, Pageable pageable);

    Page<Event> findByStatusOrderByStartDateAsc(EventStatus status, Pageable pageable);
}
