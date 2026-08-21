package com.athly.backend.repository;

import com.athly.backend.model.MealLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB Repository for MealLog documents.
 */
@Repository
public interface MealLogRepository extends MongoRepository<MealLog, String> {

    /**
     * Retrieve all meals logged by a user on a specific date (YYYY-MM-DD).
     */
    List<MealLog> findByUserIdAndMealDate(String userId, String mealDate);

    /**
     * Retrieve all meal logs for a user ordered by date descending.
     */
    List<MealLog> findByUserIdOrderByMealDateDesc(String userId);

    /**
     * Find a specific meal log by id and userId.
     */
    Optional<MealLog> findByIdAndUserId(String id, String userId);

    /**
     * Delete a specific meal log belonging to a user.
     */
    void deleteByIdAndUserId(String id, String userId);
}
