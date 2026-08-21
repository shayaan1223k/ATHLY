package com.athly.backend.repository;

import com.athly.backend.model.UserReward;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data MongoDB Repository for UserReward documents.
 */
@Repository
public interface UserRewardRepository extends MongoRepository<UserReward, String> {

    /**
     * Retrieve the reward and gamification profile for a user.
     */
    Optional<UserReward> findByUserId(String userId);

    /**
     * Check if a reward document exists for a user.
     */
    boolean existsByUserId(String userId);
}
