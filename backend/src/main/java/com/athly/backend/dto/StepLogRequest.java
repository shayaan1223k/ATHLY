package com.athly.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * Request payload for logging daily step count.
 */
public class StepLogRequest {

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotNull(message = "Step count is required")
    @Min(value = 1, message = "Steps must be at least 1")
    private Integer steps;

    // Optional date (YYYY-MM-DD). If omitted, backend defaults to today's date.
    private String date;

    public StepLogRequest() {
    }

    public StepLogRequest(String userId, Integer steps, String date) {
        this.userId = userId;
        this.steps = steps;
        this.date = date;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getSteps() {
        return steps;
    }

    public void setSteps(Integer steps) {
        this.steps = steps;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
