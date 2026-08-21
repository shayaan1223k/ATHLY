package com.athly.backend.dto;

import com.athly.backend.model.MealLog;

import java.util.ArrayList;
import java.util.List;

/**
 * Response DTO returned after AI meal image analysis.
 * Contains recognized food items, estimated macros, AI confidence, and the saved MealLog.
 */
public class MealAnalysisResponse {

    private String mealName;
    private Integer estimatedCalories;
    private Double estimatedProteinGrams;
    private Double estimatedCarbsGrams;
    private Double estimatedFatGrams;
    private Double estimatedFiberGrams;
    private List<String> detectedFoods = new ArrayList<>();
    private Double confidenceScore;
    private String healthInsight;
    private MealLog savedMealLog;

    public MealAnalysisResponse() {
    }

    public String getMealName() {
        return mealName;
    }

    public void setMealName(String mealName) {
        this.mealName = mealName;
    }

    public Integer getEstimatedCalories() {
        return estimatedCalories;
    }

    public void setEstimatedCalories(Integer estimatedCalories) {
        this.estimatedCalories = estimatedCalories;
    }

    public Double getEstimatedProteinGrams() {
        return estimatedProteinGrams;
    }

    public void setEstimatedProteinGrams(Double estimatedProteinGrams) {
        this.estimatedProteinGrams = estimatedProteinGrams;
    }

    public Double getEstimatedCarbsGrams() {
        return estimatedCarbsGrams;
    }

    public void setEstimatedCarbsGrams(Double estimatedCarbsGrams) {
        this.estimatedCarbsGrams = estimatedCarbsGrams;
    }

    public Double getEstimatedFatGrams() {
        return estimatedFatGrams;
    }

    public void setEstimatedFatGrams(Double estimatedFatGrams) {
        this.estimatedFatGrams = estimatedFatGrams;
    }

    public Double getEstimatedFiberGrams() {
        return estimatedFiberGrams;
    }

    public void setEstimatedFiberGrams(Double estimatedFiberGrams) {
        this.estimatedFiberGrams = estimatedFiberGrams;
    }

    public List<String> getDetectedFoods() {
        return detectedFoods;
    }

    public void setDetectedFoods(List<String> detectedFoods) {
        this.detectedFoods = detectedFoods;
    }

    public Double getConfidenceScore() {
        return confidenceScore;
    }

    public void setConfidenceScore(Double confidenceScore) {
        this.confidenceScore = confidenceScore;
    }

    public String getHealthInsight() {
        return healthInsight;
    }

    public void setHealthInsight(String healthInsight) {
        this.healthInsight = healthInsight;
    }

    public MealLog getSavedMealLog() {
        return savedMealLog;
    }

    public void setSavedMealLog(MealLog savedMealLog) {
        this.savedMealLog = savedMealLog;
    }
}
