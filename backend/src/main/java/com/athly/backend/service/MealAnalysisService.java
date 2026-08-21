package com.athly.backend.service;

import com.athly.backend.dto.*;
import com.athly.backend.model.FitnessPlan;
import com.athly.backend.model.MealLog;
import com.athly.backend.repository.FitnessPlanRepository;
import com.athly.backend.repository.MealLogRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * Service managing meal logging, macro calculations, and integration with the
 * Python FastAPI AI Vision service for Gemini-powered food analysis.
 */
@Service
public class MealAnalysisService {

    private final MealLogRepository mealLogRepository;
    private final FitnessPlanRepository fitnessPlanRepository;
    private final RewardService rewardService;
    private final RestClient restClient;

    @Value("${athly.ai-service.url:http://localhost:8000}")
    private String aiServiceUrl;

    public MealAnalysisService(MealLogRepository mealLogRepository,
                               FitnessPlanRepository fitnessPlanRepository,
                               RewardService rewardService) {
        this.mealLogRepository = mealLogRepository;
        this.fitnessPlanRepository = fitnessPlanRepository;
        this.rewardService = rewardService;
        this.restClient = RestClient.create();
    }

    /**
     * Manually log a meal with known macronutrient values.
     */
    public MealLog logMeal(MealLogRequest request) {
        String logDate = resolveDate(request.getMealDate());

        MealLog meal = new MealLog();
        meal.setUserId(request.getUserId());
        meal.setMealDate(logDate);
        meal.setMealType(request.getMealType().toUpperCase());
        meal.setMealName(request.getMealName());
        meal.setImageUrl(request.getImageUrl());
        meal.setCalories(request.getCalories());
        meal.setProteinGrams(request.getProteinGrams());
        meal.setCarbsGrams(request.getCarbsGrams());
        meal.setFatGrams(request.getFatGrams());
        meal.setFiberGrams(request.getFiberGrams() != null ? request.getFiberGrams() : 0.0);
        meal.setFoodItems(request.getFoodItems() != null ? request.getFoodItems() : new ArrayList<>());
        meal.setHealthNotes(request.getHealthNotes());
        meal.setCreatedAt(LocalDateTime.now());
        meal.setUpdatedAt(LocalDateTime.now());

        MealLog saved = mealLogRepository.save(meal);

        // Award +30 XP for logging a meal
        rewardService.awardXp(new AddXpRequest(request.getUserId(), 30, "MEAL_LOGGED", "Logged nutrition: " + request.getMealName()));

        return saved;
    }

    /**
     * Analyze a meal image using the Python FastAPI AI microservice (or smart simulation fallback).
     */
    public MealAnalysisResponse analyzeMealImage(MealAnalysisRequest request) {
        String logDate = resolveDate(request.getMealDate());

        MealAnalysisResponse analysisResult;
        try {
            // Attempt to call Python FastAPI microservice
            ResponseEntity<MealAnalysisResponse> response = restClient.post()
                    .uri(aiServiceUrl + "/api/ai/analyze-meal")
                    .body(request)
                    .retrieve()
                    .toEntity(MealAnalysisResponse.class);

            analysisResult = response.getBody();
            if (analysisResult == null) {
                analysisResult = simulateVisionAnalysis(request);
            }
        } catch (Exception ex) {
            // Fallback gracefully when AI service is not running locally during development
            analysisResult = simulateVisionAnalysis(request);
        }

        // Persist the analyzed meal to MongoDB
        MealLog meal = new MealLog();
        meal.setUserId(request.getUserId());
        meal.setMealDate(logDate);
        meal.setMealType(request.getMealType().toUpperCase());
        meal.setMealName(analysisResult.getMealName());
        meal.setCalories(analysisResult.getEstimatedCalories());
        meal.setProteinGrams(analysisResult.getEstimatedProteinGrams());
        meal.setCarbsGrams(analysisResult.getEstimatedCarbsGrams());
        meal.setFatGrams(analysisResult.getEstimatedFatGrams());
        meal.setFiberGrams(analysisResult.getEstimatedFiberGrams());
        meal.setFoodItems(analysisResult.getDetectedFoods());
        meal.setAiConfidence(analysisResult.getConfidenceScore());
        meal.setHealthNotes(analysisResult.getHealthInsight());
        meal.setCreatedAt(LocalDateTime.now());
        meal.setUpdatedAt(LocalDateTime.now());

        MealLog saved = mealLogRepository.save(meal);
        analysisResult.setSavedMealLog(saved);

        // Award +30 XP for logging a meal
        rewardService.awardXp(new AddXpRequest(request.getUserId(), 30, "AI_MEAL_ANALYZED", "AI analyzed meal: " + meal.getMealName()));

        return analysisResult;
    }

    /**
     * Retrieve all meals logged for a given user on a specific date.
     */
    public List<MealLog> getDailyMeals(String userId, String date) {
        String logDate = resolveDate(date);
        return mealLogRepository.findByUserIdAndMealDate(userId, logDate);
    }

    /**
     * Retrieve daily nutrition summary comparing consumed nutrients against plan budget.
     */
    public DailyNutritionSummaryDto getDailyNutritionSummary(String userId, String date) {
        String logDate = resolveDate(date);
        List<MealLog> meals = mealLogRepository.findByUserIdAndMealDate(userId, logDate);

        // Fetch user plan for target budgets (or sensible defaults)
        FitnessPlan plan = fitnessPlanRepository.findByUserId(userId).orElse(null);
        int targetCalories = plan != null && plan.getTargetCalories() != null ? plan.getTargetCalories() : 2000;
        int targetProtein = plan != null && plan.getTargetProteinGrams() != null ? plan.getTargetProteinGrams() : 140;
        int targetCarbs = plan != null && plan.getTargetCarbsGrams() != null ? plan.getTargetCarbsGrams() : 220;
        int targetFat = plan != null && plan.getTargetFatGrams() != null ? plan.getTargetFatGrams() : 60;

        int totalCalories = meals.stream().mapToInt(m -> m.getCalories() != null ? m.getCalories() : 0).sum();
        double totalProtein = round(meals.stream().mapToDouble(m -> m.getProteinGrams() != null ? m.getProteinGrams() : 0.0).sum());
        double totalCarbs = round(meals.stream().mapToDouble(m -> m.getCarbsGrams() != null ? m.getCarbsGrams() : 0.0).sum());
        double totalFat = round(meals.stream().mapToDouble(m -> m.getFatGrams() != null ? m.getFatGrams() : 0.0).sum());

        double caloriePercent = calculatePercentage(totalCalories, targetCalories);

        DailyNutritionSummaryDto summary = new DailyNutritionSummaryDto();
        summary.setUserId(userId);
        summary.setMealDate(logDate);
        summary.setTotalCaloriesConsumed(totalCalories);
        summary.setTargetCalories(targetCalories);
        summary.setRemainingCalories(targetCalories - totalCalories);
        summary.setCalorieProgressPercent(caloriePercent);

        summary.setTotalProteinConsumed(totalProtein);
        summary.setTargetProteinGrams(targetProtein);
        summary.setRemainingProteinGrams(round(targetProtein - totalProtein));

        summary.setTotalCarbsConsumed(totalCarbs);
        summary.setTargetCarbsGrams(targetCarbs);
        summary.setRemainingCarbsGrams(round(targetCarbs - totalCarbs));

        summary.setTotalFatConsumed(totalFat);
        summary.setTargetFatGrams(targetFat);
        summary.setRemainingFatGrams(round(targetFat - totalFat));

        summary.setMeals(meals);
        return summary;
    }

    /**
     * Delete a logged meal.
     */
    public void deleteMeal(String mealId, String userId) {
        mealLogRepository.deleteByIdAndUserId(mealId, userId);
    }

    // --- Helpers ---

    private String resolveDate(String date) {
        if (date == null || date.trim().isEmpty()) {
            return LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
        }
        return date.trim();
    }

    private double calculatePercentage(int actual, int target) {
        if (target <= 0) return 0.0;
        double percent = (actual * 100.0) / target;
        return BigDecimal.valueOf(percent)
                .setScale(1, RoundingMode.HALF_UP)
                .doubleValue();
    }

    private double round(double val) {
        return BigDecimal.valueOf(val)
                .setScale(1, RoundingMode.HALF_UP)
                .doubleValue();
    }

    /**
     * Development simulation for vision analysis when Python FastAPI service is offline.
     */
    private MealAnalysisResponse simulateVisionAnalysis(MealAnalysisRequest request) {
        MealAnalysisResponse response = new MealAnalysisResponse();
        response.setMealName("Healthy Balanced Plate (Simulated AI)");
        response.setEstimatedCalories(580);
        response.setEstimatedProteinGrams(38.0);
        response.setEstimatedCarbsGrams(52.0);
        response.setEstimatedFatGrams(18.0);
        response.setEstimatedFiberGrams(7.0);
        response.setDetectedFoods(List.of(
                "Grilled Chicken / Tofu portion (~150g)",
                "Brown Basmati Rice / Quinoa (~120g)",
                "Steamed Broccoli and Carrots (~100g)",
                "Olive oil dressing (~10ml)"
        ));
        response.setConfidenceScore(0.94);
        response.setHealthInsight("Excellent protein-to-carb balance with high micronutrient and fiber density.");
        return response;
    }
}
