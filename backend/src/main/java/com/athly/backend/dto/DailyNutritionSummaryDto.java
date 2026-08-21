package com.athly.backend.dto;

import com.athly.backend.model.MealLog;

import java.util.ArrayList;
import java.util.List;

/**
 * Summary DTO comparing daily consumed macronutrients against the user's target fitness plan budget.
 */
public class DailyNutritionSummaryDto {

    private String userId;
    private String mealDate;

    // Caloric Budget
    private Integer totalCaloriesConsumed;
    private Integer targetCalories;
    private Integer remainingCalories;
    private Double calorieProgressPercent;

    // Protein (g)
    private Double totalProteinConsumed;
    private Integer targetProteinGrams;
    private Double remainingProteinGrams;

    // Carbohydrates (g)
    private Double totalCarbsConsumed;
    private Integer targetCarbsGrams;
    private Double remainingCarbsGrams;

    // Fats (g)
    private Double totalFatConsumed;
    private Integer targetFatGrams;
    private Double remainingFatGrams;

    // List of meals logged today
    private List<MealLog> meals = new ArrayList<>();

    public DailyNutritionSummaryDto() {
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

    public Integer getTotalCaloriesConsumed() {
        return totalCaloriesConsumed;
    }

    public void setTotalCaloriesConsumed(Integer totalCaloriesConsumed) {
        this.totalCaloriesConsumed = totalCaloriesConsumed;
    }

    public Integer getTargetCalories() {
        return targetCalories;
    }

    public void setTargetCalories(Integer targetCalories) {
        this.targetCalories = targetCalories;
    }

    public Integer getRemainingCalories() {
        return remainingCalories;
    }

    public void setRemainingCalories(Integer remainingCalories) {
        this.remainingCalories = remainingCalories;
    }

    public Double getCalorieProgressPercent() {
        return calorieProgressPercent;
    }

    public void setCalorieProgressPercent(Double calorieProgressPercent) {
        this.calorieProgressPercent = calorieProgressPercent;
    }

    public Double getTotalProteinConsumed() {
        return totalProteinConsumed;
    }

    public void setTotalProteinConsumed(Double totalProteinConsumed) {
        this.totalProteinConsumed = totalProteinConsumed;
    }

    public Integer getTargetProteinGrams() {
        return targetProteinGrams;
    }

    public void setTargetProteinGrams(Integer targetProteinGrams) {
        this.targetProteinGrams = targetProteinGrams;
    }

    public Double getRemainingProteinGrams() {
        return remainingProteinGrams;
    }

    public void setRemainingProteinGrams(Double remainingProteinGrams) {
        this.remainingProteinGrams = remainingProteinGrams;
    }

    public Double getTotalCarbsConsumed() {
        return totalCarbsConsumed;
    }

    public void setTotalCarbsConsumed(Double totalCarbsConsumed) {
        this.totalCarbsConsumed = totalCarbsConsumed;
    }

    public Integer getTargetCarbsGrams() {
        return targetCarbsGrams;
    }

    public void setTargetCarbsGrams(Integer targetCarbsGrams) {
        this.targetCarbsGrams = targetCarbsGrams;
    }

    public Double getRemainingCarbsGrams() {
        return remainingCarbsGrams;
    }

    public void setRemainingCarbsGrams(Double remainingCarbsGrams) {
        this.remainingCarbsGrams = remainingCarbsGrams;
    }

    public Double getTotalFatConsumed() {
        return totalFatConsumed;
    }

    public void setTotalFatConsumed(Double totalFatConsumed) {
        this.totalFatConsumed = totalFatConsumed;
    }

    public Integer getTargetFatGrams() {
        return targetFatGrams;
    }

    public void setTargetFatGrams(Integer targetFatGrams) {
        this.targetFatGrams = targetFatGrams;
    }

    public Double getRemainingFatGrams() {
        return remainingFatGrams;
    }

    public void setRemainingFatGrams(Double remainingFatGrams) {
        this.remainingFatGrams = remainingFatGrams;
    }

    public List<MealLog> getMeals() {
        return meals;
    }

    public void setMeals(List<MealLog> meals) {
        this.meals = meals;
    }
}
