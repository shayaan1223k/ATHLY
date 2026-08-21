package com.athly.backend.repository;

import com.athly.backend.model.ProgressRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB Repository for ProgressRecord documents.
 */
@Repository
public interface ProgressRecordRepository extends MongoRepository<ProgressRecord, String> {

    /**
     * Retrieve all progress records for a user ordered chronologically (oldest to newest) for chart plotting.
     */
    List<ProgressRecord> findByUserIdOrderByRecordDateAsc(String userId);

    /**
     * Retrieve the most recent progress record for a user.
     */
    Optional<ProgressRecord> findTopByUserIdOrderByRecordDateDesc(String userId);
}
