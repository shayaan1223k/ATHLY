package com.athly.backend.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * Request payload for logging a weight milestone.
 */
public class WeightLogRequest {

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotNull(message = "Weight is required")
    @DecimalMin(value = "20.0", message = "Weight must be at least 20 kg")
    @DecimalMax(value = "500.0", message = "Weight cannot exceed 500 kg")
    private Double weightKg;

    private String recordDate; // Optional: Format YYYY-MM-DD (defaults to today)
    private String notes;

    public WeightLogRequest() {
    }

    public WeightLogRequest(String userId, Double weightKg, String recordDate, String notes) {
        this.userId = userId;
        this.weightKg = weightKg;
        this.recordDate = recordDate;
        this.notes = notes;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Double getWeightKg() {
        return weightKg;
    }

    public void setWeightKg(Double weightKg) {
        this.weightKg = weightKg;
    }

    public String getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(String recordDate) {
        this.recordDate = recordDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
