package com.athly.backend.repository;

import com.athly.backend.model.ActivityLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB Repository for ActivityLog documents.
 */
@Repository
public interface ActivityLogRepository extends MongoRepository<ActivityLog, String> {

    /**
     * Find a user's activity log for a specific date (YYYY-MM-DD).
     */
    Optional<ActivityLog> findByUserIdAndLogDate(String userId, String logDate);

    /**
     * Retrieve all activity logs for a user ordered by date descending.
     */
    List<ActivityLog> findByUserIdOrderByLogDateDesc(String userId);

    /**
     * Retrieve activity logs within a date range for trend and analytics calculations.
     */
    List<ActivityLog> findByUserIdAndLogDateBetweenOrderByLogDateAsc(String userId, String startDate, String endDate);
}
