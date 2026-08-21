package com.athly.backend.controller;

import com.athly.backend.dto.AiFeedbackResponse;
import com.athly.backend.dto.WeightLogRequest;
import com.athly.backend.dto.WeeklyAnalyticsDto;
import com.athly.backend.model.ProgressRecord;
import com.athly.backend.service.AiFeedbackService;
import com.athly.backend.service.ProgressAnalyticsService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Progress Analytics, Bodyweight Tracking, and AI Coaching Feedback.
 * Base path: /api/analytics
 */
@RestController
@RequestMapping("/api/analytics")
public class ProgressAnalyticsController {

    private final ProgressAnalyticsService progressAnalyticsService;
    private final AiFeedbackService aiFeedbackService;

    public ProgressAnalyticsController(ProgressAnalyticsService progressAnalyticsService,
                                       AiFeedbackService aiFeedbackService) {
        this.progressAnalyticsService = progressAnalyticsService;
        this.aiFeedbackService = aiFeedbackService;
    }

    /**
     * Log a new bodyweight entry.
     * POST /api/analytics/weight
     */
    @PostMapping("/weight")
    public ResponseEntity<ProgressRecord> logWeight(@Valid @RequestBody WeightLogRequest request) {
        ProgressRecord record = progressAnalyticsService.logWeight(request);
        return new ResponseEntity<>(record, HttpStatus.CREATED);
    }

    /**
     * Retrieve chronological weight milestone history for chart visualization.
     * GET /api/analytics/weight/{userId}
     */
    @GetMapping("/weight/{userId}")
    public ResponseEntity<List<ProgressRecord>> getWeightHistory(@PathVariable String userId) {
        List<ProgressRecord> history = progressAnalyticsService.getWeightHistory(userId);
        return ResponseEntity.ok(history);
    }

    /**
     * Retrieve 7-day progress analytics and daily trend breakdown.
     * GET /api/analytics/weekly/{userId}
     */
    @GetMapping("/weekly/{userId}")
    public ResponseEntity<WeeklyAnalyticsDto> getWeeklyAnalytics(@PathVariable String userId) {
        WeeklyAnalyticsDto analytics = progressAnalyticsService.getWeeklyAnalytics(userId);
        return ResponseEntity.ok(analytics);
    }

    /**
     * Generate dynamic AI coaching feedback based on recent performance.
     * GET /api/analytics/ai-feedback/{userId}
     */
    @GetMapping("/ai-feedback/{userId}")
    public ResponseEntity<AiFeedbackResponse> getAiCoachingFeedback(@PathVariable String userId) {
        AiFeedbackResponse feedback = aiFeedbackService.generateCoachingFeedback(userId);
        return ResponseEntity.ok(feedback);
    }
}
