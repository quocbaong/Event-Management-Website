package com.eventhub.repository;

import com.eventhub.domain.entity.Transaction;
import com.eventhub.domain.enums.TransactionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {

    @Query("""
            SELECT t.type AS type, SUM(t.amount) AS total
            FROM Transaction t
            WHERE t.event.id IN :eventIds
              AND t.status = :status
            GROUP BY t.type
            """)
    List<Object[]> sumByTypeAndStatus(
            @Param("eventIds") List<UUID> eventIds,
            @Param("status") TransactionStatus status);

    List<Transaction> findByEventIdInOrderByCreatedAtDesc(List<UUID> eventIds);
}
