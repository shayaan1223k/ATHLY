package com.athly.backend.repository;

import com.athly.backend.model.UserProfile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data MongoDB Repository for UserProfile entities.
 * Provides out-of-the-box CRUD and query methods without requiring boilerplate implementation.
 */
@Repository
public interface UserProfileRepository extends MongoRepository<UserProfile, String> {

    /**
     * Find a user profile by the unique userId (e.g. Firebase UID).
     */
    Optional<UserProfile> findByUserId(String userId);

    /**
     * Check if a profile already exists for the given userId.
     */
    boolean existsByUserId(String userId);

    /**
     * Delete a profile by the unique userId.
     */
    void deleteByUserId(String userId);
}
