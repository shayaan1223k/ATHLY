package com.athly.backend.repository;

import com.athly.backend.model.FitnessPlan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data MongoDB Repository for FitnessPlan documents.
 */
@Repository
public interface FitnessPlanRepository extends MongoRepository<FitnessPlan, String> {

    /**
     * Retrieve the fitness plan assigned to a specific user.
     */
    Optional<FitnessPlan> findByUserId(String userId);

    /**
     * Check if a fitness plan already exists for a user.
     */
    boolean existsByUserId(String userId);

    /**
     * Delete a user's fitness plan.
     */
    void deleteByUserId(String userId);
}
