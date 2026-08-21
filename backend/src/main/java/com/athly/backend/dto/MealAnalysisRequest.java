package com.athly.backend.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * Request payload for sending a meal photo to the AI microservice for vision identification and macro estimation.
 */
public class MealAnalysisRequest {

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Meal type is required (e.g. BREAKFAST, LUNCH, DINNER, SNACK)")
    private String mealType;

    @NotBlank(message = "Image payload (Base64 or URL) is required")
    private String imageBase64;

    private String mealDate; // Optional: Defaults to today
    private String userNotes;

    public MealAnalysisRequest() {
    }

    public MealAnalysisRequest(String userId, String mealType, String imageBase64, String mealDate, String userNotes) {
        this.userId = userId;
        this.mealType = mealType;
        this.imageBase64 = imageBase64;
        this.mealDate = mealDate;
        this.userNotes = userNotes;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMealType() {
        return mealType;
    }

    public void setMealType(String mealType) {
        this.mealType = mealType;
    }

    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }

    public String getMealDate() {
        return mealDate;
    }

    public void setMealDate(String mealDate) {
        this.mealDate = mealDate;
    }

    public String getUserNotes() {
        return userNotes;
    }

    public void setUserNotes(String userNotes) {
        this.userNotes = userNotes;
    }
}
