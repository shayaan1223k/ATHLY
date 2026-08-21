package com.athly.backend.controller;

import com.athly.backend.dto.DailyNutritionSummaryDto;
import com.athly.backend.dto.MealAnalysisRequest;
import com.athly.backend.dto.MealAnalysisResponse;
import com.athly.backend.dto.MealLogRequest;
import com.athly.backend.model.MealLog;
import com.athly.backend.service.MealAnalysisService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST Controller for Meal Vision & Nutrition Tracking endpoints.
 * Base path: /api/meals
 */
@RestController
@RequestMapping("/api/meals")
public class MealAnalysisController {

    private final MealAnalysisService mealAnalysisService;

    public MealAnalysisController(MealAnalysisService mealAnalysisService) {
        this.mealAnalysisService = mealAnalysisService;
    }

    /**
     * Log a meal manually with macronutrients.
     * POST /api/meals/log
     */
    @PostMapping("/log")
    public ResponseEntity<MealLog> logMeal(@Valid @RequestBody MealLogRequest request) {
        MealLog saved = mealAnalysisService.logMeal(request);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    /**
     * Analyze a meal image using the AI Vision service and save to MongoDB.
     * POST /api/meals/analyze
     */
    @PostMapping("/analyze")
    public ResponseEntity<MealAnalysisResponse> analyzeMeal(@Valid @RequestBody MealAnalysisRequest request) {
        MealAnalysisResponse response = mealAnalysisService.analyzeMealImage(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Retrieve all meals logged for a user on a specific date (defaults to today).
     * GET /api/meals/daily/{userId}?date=YYYY-MM-DD
     */
    @GetMapping("/daily/{userId}")
    public ResponseEntity<List<MealLog>> getDailyMeals(
            @PathVariable String userId,
            @RequestParam(required = false) String date) {
        List<MealLog> meals = mealAnalysisService.getDailyMeals(userId, date);
        return ResponseEntity.ok(meals);
    }

    /**
     * Retrieve daily nutrition summary comparing consumed macros vs target plan budget.
     * GET /api/meals/summary/{userId}?date=YYYY-MM-DD
     */
    @GetMapping("/summary/{userId}")
    public ResponseEntity<DailyNutritionSummaryDto> getDailyNutritionSummary(
            @PathVariable String userId,
            @RequestParam(required = false) String date) {
        DailyNutritionSummaryDto summary = mealAnalysisService.getDailyNutritionSummary(userId, date);
        return ResponseEntity.ok(summary);
    }

    /**
     * Delete a logged meal.
     * DELETE /api/meals/{mealId}?userId=user_101
     */
    @DeleteMapping("/{mealId}")
    public ResponseEntity<Map<String, String>> deleteMeal(
            @PathVariable String mealId,
            @RequestParam String userId) {
        mealAnalysisService.deleteMeal(mealId, userId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Meal log deleted successfully");
        response.put("mealId", mealId);
        return ResponseEntity.ok(response);
    }
}
