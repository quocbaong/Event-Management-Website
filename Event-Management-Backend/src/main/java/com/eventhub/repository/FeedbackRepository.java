package com.eventhub.repository;

import com.eventhub.domain.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, UUID> {
    
    List<Feedback> findAllByOrderByCreatedAtDesc();
    
    List<Feedback> findAllByStatusOrderByCreatedAtDesc(String status);
    
    @Query("SELECT COUNT(f) FROM Feedback f WHERE f.status = 'PENDING'")
    long countPendingFeedback();
}
