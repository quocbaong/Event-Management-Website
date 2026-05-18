package com.eventhub.repository;

import com.eventhub.domain.entity.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InvitationRepository extends JpaRepository<Invitation, UUID> {
    List<Invitation> findByEventIdOrderByCreatedAtDesc(UUID eventId);

    Optional<Invitation> findByToken(String token);

    boolean existsByEventIdAndEmail(UUID eventId, String email);
}
