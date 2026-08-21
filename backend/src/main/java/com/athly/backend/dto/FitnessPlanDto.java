package com.athly.backend.dto;

import com.athly.backend.model.FitnessPlan;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Data Transfer Object representing the calculated Fitness and Nutrition Plan response.
 */
public class FitnessPlanDto {

    private String userId;
    private Integer bmr;
    private Integer tdee;
    private Integer targetCalories;
    private Integer targetProteinGrams;
    private Integer targetCarbsGrams;
    private Integer targetFatGrams;
    private Integer targetSteps;
    private Integer targetWaterMl;
    private String workoutSplitName;
    private List<FitnessPlan.WorkoutDay> weeklyWorkoutSchedule;
    private List<String> dietaryRecommendations;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public FitnessPlanDto() {
    }

    public static FitnessPlanDto fromEntity(FitnessPlan plan) {
        FitnessPlanDto dto = new FitnessPlanDto();
        dto.setUserId(plan.getUserId());
        dto.setBmr(plan.getBmr());
        dto.setTdee(plan.getTdee());
        dto.setTargetCalories(plan.getTargetCalories());
        dto.setTargetProteinGrams(plan.getTargetProteinGrams());
        dto.setTargetCarbsGrams(plan.getTargetCarbsGrams());
        dto.setTargetFatGrams(plan.getTargetFatGrams());
        dto.setTargetSteps(plan.getTargetSteps());
        dto.setTargetWaterMl(plan.getTargetWaterMl());
        dto.setWorkoutSplitName(plan.getWorkoutSplitName());
        dto.setWeeklyWorkoutSchedule(plan.getWeeklyWorkoutSchedule());
        dto.setDietaryRecommendations(plan.getDietaryRecommendations());
        dto.setCreatedAt(plan.getCreatedAt());
        dto.setUpdatedAt(plan.getUpdatedAt());
        return dto;
    }

    // Getters and Setters

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getBmr() {
        return bmr;
    }

    public void setBmr(Integer bmr) {
        this.bmr = bmr;
    }

    public Integer getTdee() {
        return tdee;
    }

    public void setTdee(Integer tdee) {
        this.tdee = tdee;
    }

    public Integer getTargetCalories() {
        return targetCalories;
    }

    public void setTargetCalories(Integer targetCalories) {
        this.targetCalories = targetCalories;
    }

    public Integer getTargetProteinGrams() {
        return targetProteinGrams;
    }

    public void setTargetProteinGrams(Integer targetProteinGrams) {
        this.targetProteinGrams = targetProteinGrams;
    }

    public Integer getTargetCarbsGrams() {
        return targetCarbsGrams;
    }

    public void setTargetCarbsGrams(Integer targetCarbsGrams) {
        this.targetCarbsGrams = targetCarbsGrams;
    }

    public Integer getTargetFatGrams() {
        return targetFatGrams;
    }

    public void setTargetFatGrams(Integer targetFatGrams) {
        this.targetFatGrams = targetFatGrams;
    }

    public Integer getTargetSteps() {
        return targetSteps;
    }

    public void setTargetSteps(Integer targetSteps) {
        this.targetSteps = targetSteps;
    }

    public Integer getTargetWaterMl() {
        return targetWaterMl;
    }

    public void setTargetWaterMl(Integer targetWaterMl) {
        this.targetWaterMl = targetWaterMl;
    }

    public String getWorkoutSplitName() {
        return workoutSplitName;
    }

    public void setWorkoutSplitName(String workoutSplitName) {
        this.workoutSplitName = workoutSplitName;
    }

    public List<FitnessPlan.WorkoutDay> getWeeklyWorkoutSchedule() {
        return weeklyWorkoutSchedule;
    }

    public void setWeeklyWorkoutSchedule(List<FitnessPlan.WorkoutDay> weeklyWorkoutSchedule) {
        this.weeklyWorkoutSchedule = weeklyWorkoutSchedule;
    }

    public List<String> getDietaryRecommendations() {
        return dietaryRecommendations;
    }

    public void setDietaryRecommendations(List<String> dietaryRecommendations) {
        this.dietaryRecommendations = dietaryRecommendations;
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
