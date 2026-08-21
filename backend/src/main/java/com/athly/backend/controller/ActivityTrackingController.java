package com.athly.backend.controller;

import com.athly.backend.dto.*;
import com.athly.backend.service.ActivityTrackingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Activity & Biometrics Tracking endpoints.
 * Base path: /api/activity
 */
@RestController
@RequestMapping("/api/activity")
public class ActivityTrackingController {

    private final ActivityTrackingService activityTrackingService;

    public ActivityTrackingController(ActivityTrackingService activityTrackingService) {
        this.activityTrackingService = activityTrackingService;
    }

    /**
     * Log / add steps for a user.
     * POST /api/activity/steps
     */
    @PostMapping("/steps")
    public ResponseEntity<ActivityLogDto> logSteps(@Valid @RequestBody StepLogRequest request) {
        ActivityLogDto updated = activityTrackingService.logSteps(request);
        return ResponseEntity.ok(updated);
    }

    /**
     * Log / add hydration intake in ml (e.g. +250ml, +500ml).
     * POST /api/activity/water
     */
    @PostMapping("/water")
    public ResponseEntity<ActivityLogDto> logWater(@Valid @RequestBody WaterLogRequest request) {
        ActivityLogDto updated = activityTrackingService.logWater(request);
        return ResponseEntity.ok(updated);
    }

    /**
     * Log a completed workout session.
     * POST /api/activity/workout
     */
    @PostMapping("/workout")
    public ResponseEntity<ActivityLogDto> logWorkout(@Valid @RequestBody WorkoutLogRequest request) {
        ActivityLogDto updated = activityTrackingService.logWorkout(request);
        return ResponseEntity.ok(updated);
    }

    /**
     * Retrieve the daily activity details for a specific date (defaults to today).
     * GET /api/activity/daily/{userId}?date=YYYY-MM-DD
     */
    @GetMapping("/daily/{userId}")
    public ResponseEntity<ActivityLogDto> getDailyActivity(
            @PathVariable String userId,
            @RequestParam(required = false) String date) {
        ActivityLogDto dailyLog = activityTrackingService.getDailyActivity(userId, date);
        return ResponseEntity.ok(dailyLog);
    }

    /**
     * Retrieve daily progress summary metrics comparing actual logs against plan targets.
     * GET /api/activity/summary/{userId}?date=YYYY-MM-DD
     */
    @GetMapping("/summary/{userId}")
    public ResponseEntity<DailyProgressSummaryDto> getDailySummary(
            @PathVariable String userId,
            @RequestParam(required = false) String date) {
        DailyProgressSummaryDto summary = activityTrackingService.getDailyProgressSummary(userId, date);
        return ResponseEntity.ok(summary);
    }

    /**
     * Retrieve the user's recent activity history (last 7 days).
     * GET /api/activity/history/{userId}
     */
    @GetMapping("/history/{userId}")
    public ResponseEntity<List<ActivityLogDto>> getActivityHistory(@PathVariable String userId) {
        List<ActivityLogDto> history = activityTrackingService.getActivityHistory(userId);
        return ResponseEntity.ok(history);
    }
}
