package com.athly.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * MongoDB Document representing a recorded weight/body composition milestone.
 * Stored in the 'progress_records' collection.
 */
@Document(collection = "progress_records")
public class ProgressRecord {

    @Id
    private String id;

    @Indexed
    private String userId;

    @Indexed
    private String recordDate; // Format: "YYYY-MM-DD"

    private Double weightKg;
    private Double bmi;
    private Double bodyFatPercentage;
    private String notes;

    private LocalDateTime createdAt;

    public ProgressRecord() {
    }

    public ProgressRecord(String userId, String recordDate, Double weightKg, Double bmi, String notes) {
        this.userId = userId;
        this.recordDate = recordDate;
        this.weightKg = weightKg;
        this.bmi = bmi;
        this.notes = notes;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(String recordDate) {
        this.recordDate = recordDate;
    }

    public Double getWeightKg() {
        return weightKg;
    }

    public void setWeightKg(Double weightKg) {
        this.weightKg = weightKg;
    }

    public Double getBmi() {
        return bmi;
    }

    public void setBmi(Double bmi) {
        this.bmi = bmi;
    }

    public Double getBodyFatPercentage() {
        return bodyFatPercentage;
    }

    public void setBodyFatPercentage(Double bodyFatPercentage) {
        this.bodyFatPercentage = bodyFatPercentage;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
