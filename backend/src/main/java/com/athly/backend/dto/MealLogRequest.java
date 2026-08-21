package com.athly.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;

/**
 * Request payload for manually logging a meal with its nutritional breakdown.
 */
public class MealLogRequest {

    @NotBlank(message = "User ID is required")
    private String userId;

    private String mealDate; // Optional: Format YYYY-MM-DD (defaults to today)

    @NotBlank(message = "Meal type is required (e.g. BREAKFAST, LUNCH, DINNER, SNACK)")
    private String mealType;

    @NotBlank(message = "Meal name is required")
    private String mealName;

    private String imageUrl;

    @NotNull(message = "Calories count is required")
    @Min(value = 0, message = "Calories cannot be negative")
    private Integer calories;

    @NotNull(message = "Protein amount is required")
    @DecimalMin(value = "0.0", message = "Protein cannot be negative")
    private Double proteinGrams;

    @NotNull(message = "Carbohydrates amount is required")
    @DecimalMin(value = "0.0", message = "Carbs cannot be negative")
    private Double carbsGrams;

    @NotNull(message = "Fat amount is required")
    @DecimalMin(value = "0.0", message = "Fat cannot be negative")
    private Double fatGrams;

    private Double fiberGrams = 0.0;
    private List<String> foodItems = new ArrayList<>();
    private String healthNotes;

    public MealLogRequest() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMealDate() {
        return mealDate;
    }

    public void setMealDate(String mealDate) {
        this.mealDate = mealDate;
    }

    public String getMealType() {
        return mealType;
    }

    public void setMealType(String mealType) {
        this.mealType = mealType;
    }

    public String getMealName() {
        return mealName;
    }

    public void setMealName(String mealName) {
        this.mealName = mealName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getCalories() {
        return calories;
    }

    public void setCalories(Integer calories) {
        this.calories = calories;
    }

    public Double getProteinGrams() {
        return proteinGrams;
    }

    public void setProteinGrams(Double proteinGrams) {
        this.proteinGrams = proteinGrams;
    }

    public Double getCarbsGrams() {
        return carbsGrams;
    }

    public void setCarbsGrams(Double carbsGrams) {
        this.carbsGrams = carbsGrams;
    }

    public Double getFatGrams() {
        return fatGrams;
    }

    public void setFatGrams(Double fatGrams) {
        this.fatGrams = fatGrams;
    }

    public Double getFiberGrams() {
        return fiberGrams;
    }

    public void setFiberGrams(Double fiberGrams) {
        this.fiberGrams = fiberGrams;
    }

    public List<String> getFoodItems() {
        return foodItems;
    }

    public void setFoodItems(List<String> foodItems) {
        this.foodItems = foodItems;
    }

    public String getHealthNotes() {
        return healthNotes;
    }

    public void setHealthNotes(String healthNotes) {
        this.healthNotes = healthNotes;
    }
}
