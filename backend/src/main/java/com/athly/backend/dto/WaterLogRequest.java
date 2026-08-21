package com.athly.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * Request payload for logging water intake (e.g. +250ml, +500ml).
 */
public class WaterLogRequest {

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotNull(message = "Water amount is required")
    @Min(value = 10, message = "Amount must be at least 10 ml")
    private Integer amountMl;

    // Optional date (YYYY-MM-DD). If omitted, backend defaults to today's date.
    private String date;

    public WaterLogRequest() {
    }

    public WaterLogRequest(String userId, Integer amountMl, String date) {
        this.userId = userId;
        this.amountMl = amountMl;
        this.date = date;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getAmountMl() {
        return amountMl;
    }

    public void setAmountMl(Integer amountMl) {
        this.amountMl = amountMl;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
