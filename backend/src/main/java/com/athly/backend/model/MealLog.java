package com.athly.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * MongoDB Document representing a logged meal (food items, macros, calories, and optional AI vision analysis).
 * Stored in the 'meal_logs' collection.
 */
@Document(collection = "meal_logs")
@CompoundIndex(name = "user_mealdate_idx", def = "{'userId': 1, 'mealDate': 1}")
public class MealLog {

    @Id
    private String id;

    @Indexed
    private String userId;

    @Indexed
    private String mealDate; // Format: "YYYY-MM-DD"

    private String mealType; // "BREAKFAST", "LUNCH", "DINNER", "SNACK"
    private String mealName; // e.g. "Grilled Chicken Salad with Quinoa"
    private String imageUrl; // Optional image URL or Base64 reference

    private Integer calories = 0;
    private Double proteinGrams = 0.0;
    private Double carbsGrams = 0.0;
    private Double fatGrams = 0.0;
    private Double fiberGrams = 0.0;

    private List<String> foodItems = new ArrayList<>();
    private Double aiConfidence; // e.g. 0.95 if analyzed by AI
    private String healthNotes;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public MealLog() {
    }

    public MealLog(String userId, String mealDate, String mealType, String mealName,
                   Integer calories, Double proteinGrams, Double carbsGrams, Double fatGrams) {
        this.userId = userId;
        this.mealDate = mealDate;
        this.mealType = mealType;
        this.mealName = mealName;
        this.calories = calories;
        this.proteinGrams = proteinGrams;
        this.carbsGrams = carbsGrams;
        this.fatGrams = fatGrams;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
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

    public Double getAiConfidence() {
        return aiConfidence;
    }

    public void setAiConfidence(Double aiConfidence) {
        this.aiConfidence = aiConfidence;
    }

    public String getHealthNotes() {
        return healthNotes;
    }

    public void setHealthNotes(String healthNotes) {
        this.healthNotes = healthNotes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
