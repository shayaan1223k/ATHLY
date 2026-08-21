package com.athly.backend.controller;

import com.athly.backend.dto.FitnessPlanDto;
import com.athly.backend.service.FitnessPlannerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for Personalized Fitness and Nutrition Planner endpoints.
 * Base path: /api/fitness-plan
 */
@RestController
@RequestMapping("/api/fitness-plan")
public class FitnessPlannerController {

    private final FitnessPlannerService fitnessPlannerService;

    public FitnessPlannerController(FitnessPlannerService fitnessPlannerService) {
        this.fitnessPlannerService = fitnessPlannerService;
    }

    /**
     * Generate or recalculate a customized fitness plan for a user based on their biometric profile.
     * POST /api/fitness-plan/generate/{userId}
     */
    @PostMapping("/generate/{userId}")
    public ResponseEntity<FitnessPlanDto> generatePlan(@PathVariable String userId) {
        FitnessPlanDto plan = fitnessPlannerService.generatePlanForUser(userId);
        return new ResponseEntity<>(plan, HttpStatus.CREATED);
    }

    /**
     * Retrieve the active fitness plan for a user.
     * GET /api/fitness-plan/{userId}
     */
    @GetMapping("/{userId}")
    public ResponseEntity<FitnessPlanDto> getPlan(@PathVariable String userId) {
        FitnessPlanDto plan = fitnessPlannerService.getPlanByUserId(userId);
        return ResponseEntity.ok(plan);
    }
}
