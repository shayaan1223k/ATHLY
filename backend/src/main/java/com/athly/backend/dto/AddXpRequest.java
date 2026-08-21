package com.athly.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * Request payload for manually or programmatically awarding XP to a user.
 */
public class AddXpRequest {

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotNull(message = "XP amount is required")
    @Min(value = 1, message = "XP amount must be at least 1")
    private Integer xpAmount;

    @NotBlank(message = "Action type is required (e.g. WORKOUT_LOGGED, STEP_GOAL_MET, WATER_GOAL_MET)")
    private String actionType;

    private String description;

    public AddXpRequest() {
    }

    public AddXpRequest(String userId, Integer xpAmount, String actionType, String description) {
        this.userId = userId;
        this.xpAmount = xpAmount;
        this.actionType = actionType;
        this.description = description;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getXpAmount() {
        return xpAmount;
    }

    public void setXpAmount(Integer xpAmount) {
        this.xpAmount = xpAmount;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
