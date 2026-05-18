package com.eventhub.repository;

import com.eventhub.domain.entity.WithdrawalRequest;
import com.eventhub.domain.enums.WithdrawalStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface WithdrawalRequestRepository extends JpaRepository<WithdrawalRequest, UUID> {
    List<WithdrawalRequest> findByOrganizerIdOrderByCreatedAtDesc(UUID organizerId);

    List<WithdrawalRequest> findByOrganizerIdAndStatusIn(UUID organizerId, List<WithdrawalStatus> statuses);
}
