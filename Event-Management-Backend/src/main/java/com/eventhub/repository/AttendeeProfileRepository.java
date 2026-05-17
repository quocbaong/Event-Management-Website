package com.eventhub.repository;

import com.eventhub.domain.entity.AttendeeProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AttendeeProfileRepository extends JpaRepository<AttendeeProfile, UUID> {
}
