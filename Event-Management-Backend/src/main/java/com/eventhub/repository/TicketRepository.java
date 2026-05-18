package com.eventhub.repository;

import com.eventhub.domain.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TicketRepository extends JpaRepository<Ticket, UUID> {

    boolean existsByTicketTypeId(UUID ticketTypeId);
}
