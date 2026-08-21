package com.athly.backend.service;

import com.athly.backend.dto.AiFeedbackResponse;
import com.athly.backend.dto.WeeklyAnalyticsDto;
import com.athly.backend.model.FitnessPlan;
import com.athly.backend.model.UserProfile;
import com.athly.backend.repository.FitnessPlanRepository;
import com.athly.backend.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Service orchestrating AI-Powered dynamic coaching feedback.
 * Synthesizes recent 7-day adherence, goals, and training data, querying the
 * Python FastAPI microservice (or smart contextual AI heuristics engine).
 */
@Service
public class AiFeedbackService {

    private final UserProfileRepository userProfileRepository;
    private final FitnessPlanRepository fitnessPlanRepository;
    private final ProgressAnalyticsService progressAnalyticsService;
    private final RestClient restClient;

    @Value("${athly.ai-service.url:http://localhost:8000}")
    private String aiServiceUrl;

    public AiFeedbackService(UserProfileRepository userProfileRepository,
                             FitnessPlanRepository fitnessPlanRepository,
                             ProgressAnalyticsService progressAnalyticsService) {
        this.userProfileRepository = userProfileRepository;
        this.fitnessPlanRepository = fitnessPlanRepository;
        this.progressAnalyticsService = progressAnalyticsService;
        this.restClient = RestClient.create();
    }

    /**
     * Generate dynamic AI coaching feedback based on recent performance.
     */
    public AiFeedbackResponse generateCoachingFeedback(String userId) {
        UserProfile profile = userProfileRepository.findByUserId(userId).orElse(null);
        FitnessPlan plan = fitnessPlanRepository.findByUserId(userId).orElse(null);
        WeeklyAnalyticsDto analytics = progressAnalyticsService.getWeeklyAnalytics(userId);

        Map<String, Object> contextPayload = new HashMap<>();
        contextPayload.put("userId", userId);
        contextPayload.put("userName", profile != null ? profile.getName() : "Athlete");
        contextPayload.put("goal", profile != null ? profile.getFitnessGoal() : "GENERAL_FITNESS");
        contextPayload.put("currentWeight", profile != null ? profile.getWeight() : 70.0);
        contextPayload.put("targetWeight", profile != null ? profile.getTargetWeight() : 65.0);
        contextPayload.put("weeklyAnalytics", analytics);
        contextPayload.put("targetPlan", plan);

        try {
            ResponseEntity<AiFeedbackResponse> response = restClient.post()
                    .uri(aiServiceUrl + "/api/ai/progress-feedback")
                    .body(contextPayload)
                    .retrieve()
                    .toEntity(AiFeedbackResponse.class);

            if (response.getBody() != null) {
                return response.getBody();
            }
        } catch (Exception ex) {
            // Fall back gracefully to contextual AI engine if Python microservice is offline
        }

        return generateContextualFeedback(profile, plan, analytics);
    }

    private AiFeedbackResponse generateContextualFeedback(UserProfile profile, FitnessPlan plan, WeeklyAnalyticsDto analytics) {
        String name = profile != null ? profile.getName() : "Athlete";
        String goal = profile != null && profile.getFitnessGoal() != null ? profile.getFitnessGoal() : "FITNESS";
        int avgSteps = analytics.getAverageDailySteps() != null ? analytics.getAverageDailySteps() : 0;
        int workouts = analytics.getTotalWorkoutsCompleted() != null ? analytics.getTotalWorkoutsCompleted() : 0;
        int avgWater = analytics.getAverageDailyWaterMl() != null ? analytics.getAverageDailyWaterMl() : 0;

        int score = (int) Math.round(analytics.getOverallConsistencyPercent() != null ? analytics.getOverallConsistencyPercent() : 75.0);

        AiFeedbackResponse response = new AiFeedbackResponse();
        response.setUserId(analytics.getUserId());
        response.setCoachTitle("ATHLY AI Performance Coach");
        response.setConsistencyScore(score);
        response.setGeneratedAt(LocalDateTime.now());

        if (score >= 80) {
            response.setOverallEvaluation("Outstanding Week! You are crushing your " + goal.toLowerCase().replace("_", " ") + " targets, " + name + ".");
            response.setTrainingFeedback("You logged " + workouts + " workout sessions this week with an average of " + avgSteps + " daily steps. Outstanding mechanical load!");
            response.setNutritionFeedback("Your nutritional adherence is supporting optimal muscle recovery and cellular hydration.");
            response.setRecoveryFeedback("Keep prioritizing 7-8 hours of sleep to match your high training volume.");
            response.setActionItems(List.of(
                    "Maintain your " + avgSteps + " step pace into the upcoming week.",
                    "Slightly increase progressive overload on compound lifts by 2-5%.",
                    "Keep hydration steady at " + (avgWater > 0 ? avgWater : 2500) + "ml daily."
            ));
            response.setMotivationalQuote("Consistency is what transforms average into excellence.");
        } else if (score >= 50) {
            response.setOverallEvaluation("Solid Progress with Great Momentum, " + name + ". A few key adjustments will unlock your next level.");
            response.setTrainingFeedback("You completed " + workouts + " workouts. Increasing your daily movement toward 10,000 steps will amplify your metabolic rate.");
            response.setNutritionFeedback("Focus on hitting your daily protein target consistently across all meals.");
            response.setRecoveryFeedback("Ensure you are drinking at least 2500ml of water to prevent mid-afternoon energy slumps.");
            response.setActionItems(List.of(
                    "Aim for at least 3 structured workout sessions this week.",
                    "Add a 15-minute post-meal walk to boost your daily step count.",
                    "Prep your protein sources in advance for easier meal tracking."
            ));
            response.setMotivationalQuote("Small daily improvements over time lead to stunning results.");
        } else {
            response.setOverallEvaluation("Time to Reset and Refocus, " + name + ". Every day is a fresh opportunity to build momentum.");
            response.setTrainingFeedback("Training frequency was lower this week. Start with 2 short 20-minute sessions to build consistency back up.");
            response.setNutritionFeedback("Focus on single-ingredient whole foods and log your meals right after eating.");
            response.setRecoveryFeedback("Start your morning with 500ml of water before coffee or breakfast.");
            response.setActionItems(List.of(
                    "Log today's water intake (+500ml) right now.",
                    "Complete a simple 20-minute bodyweight routine or brisk walk today.",
                    "Set a reminder to log your meals."
            ));
            response.setMotivationalQuote("You don't have to be extreme, just consistent.");
        }

        return response;
    }
}
