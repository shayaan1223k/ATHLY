package com.athly.backend.service;

import com.athly.backend.dto.*;
import com.athly.backend.model.ActivityLog;
import com.athly.backend.model.FitnessPlan;
import com.athly.backend.repository.ActivityLogRepository;
import com.athly.backend.repository.FitnessPlanRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Service for tracking daily activities: step counts, hydration intake, workout sessions,
 * and computing real-time daily progress adherence summaries.
 */
@Service
public class ActivityTrackingService {

    private final ActivityLogRepository activityLogRepository;
    private final FitnessPlanRepository fitnessPlanRepository;
    private final RewardService rewardService;

    public ActivityTrackingService(ActivityLogRepository activityLogRepository,
                                   FitnessPlanRepository fitnessPlanRepository,
                                   RewardService rewardService) {
        this.activityLogRepository = activityLogRepository;
        this.fitnessPlanRepository = fitnessPlanRepository;
        this.rewardService = rewardService;
    }

    /**
     * Log / increment daily step count. Awards +25 XP and evaluates milestone badges.
     */
    public ActivityLogDto logSteps(StepLogRequest request) {
        String logDate = resolveDate(request.getDate());
        ActivityLog log = getOrCreateDailyLog(request.getUserId(), logDate);

        int updatedSteps = log.getSteps() + request.getSteps();
        log.setSteps(updatedSteps);

        // Approximate distance: ~0.762 meters per step -> 0.000762 km per step
        double distanceKm = BigDecimal.valueOf(updatedSteps * 0.000762)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
        log.setDistanceKm(distanceKm);

        log.setUpdatedAt(LocalDateTime.now());
        ActivityLog saved = activityLogRepository.save(log);

        // Award XP and evaluate milestone badges
        rewardService.awardXp(new AddXpRequest(request.getUserId(), 25, "STEPS_LOGGED", "Logged daily step count"));
        rewardService.evaluateActivityMilestones(request.getUserId(), saved);

        return ActivityLogDto.fromEntity(saved);
    }

    /**
     * Log / increment daily water intake (ml). Awards +10 XP and evaluates hydration badges.
     */
    public ActivityLogDto logWater(WaterLogRequest request) {
        String logDate = resolveDate(request.getDate());
        ActivityLog log = getOrCreateDailyLog(request.getUserId(), logDate);

        log.setWaterIntakeMl(log.getWaterIntakeMl() + request.getAmountMl());
        log.setUpdatedAt(LocalDateTime.now());

        ActivityLog saved = activityLogRepository.save(log);

        // Award XP and evaluate hydration badges
        rewardService.awardXp(new AddXpRequest(request.getUserId(), 10, "WATER_LOGGED", "Logged hydration intake"));
        rewardService.evaluateActivityMilestones(request.getUserId(), saved);

        return ActivityLogDto.fromEntity(saved);
    }

    /**
     * Log a workout session. Awards +50 XP and evaluates workout badges.
     */
    public ActivityLogDto logWorkout(WorkoutLogRequest request) {
        String logDate = resolveDate(request.getDate());
        ActivityLog log = getOrCreateDailyLog(request.getUserId(), logDate);

        int caloriesBurned = request.getCaloriesBurned() != null ?
                request.getCaloriesBurned() :
                estimateCaloriesBurned(request.getActivityType(), request.getDurationMinutes(), request.getIntensity());

        ActivityLog.WorkoutEntry entry = new ActivityLog.WorkoutEntry(
                UUID.randomUUID().toString(),
                request.getActivityType().toUpperCase(),
                request.getDurationMinutes(),
                caloriesBurned,
                request.getIntensity() != null ? request.getIntensity().toUpperCase() : "MODERATE",
                request.getNotes()
        );

        log.getWorkouts().add(entry);
        log.setCaloriesBurned(log.getCaloriesBurned() + caloriesBurned);
        log.setUpdatedAt(LocalDateTime.now());

        ActivityLog saved = activityLogRepository.save(log);

        // Award XP and evaluate workout badges
        rewardService.awardXp(new AddXpRequest(request.getUserId(), 50, "WORKOUT_LOGGED", "Completed workout session"));
        rewardService.evaluateActivityMilestones(request.getUserId(), saved);

        return ActivityLogDto.fromEntity(saved);
    }

    /**
     * Retrieve the daily activity log for a specific user and date.
     */
    public ActivityLogDto getDailyActivity(String userId, String date) {
        String logDate = resolveDate(date);
        ActivityLog log = getOrCreateDailyLog(userId, logDate);
        return ActivityLogDto.fromEntity(log);
    }

    /**
     * Retrieve aggregated daily progress metrics comparing actuals vs plan goals.
     */
    public DailyProgressSummaryDto getDailyProgressSummary(String userId, String date) {
        String logDate = resolveDate(date);
        ActivityLog log = getOrCreateDailyLog(userId, logDate);

        // Fetch user plan for target benchmarks (or sensible defaults if no plan generated yet)
        FitnessPlan plan = fitnessPlanRepository.findByUserId(userId).orElse(null);
        int targetSteps = plan != null && plan.getTargetSteps() != null ? plan.getTargetSteps() : 10000;
        int targetWaterMl = plan != null && plan.getTargetWaterMl() != null ? plan.getTargetWaterMl() : 2500;

        int actualSteps = log.getSteps() != null ? log.getSteps() : 0;
        int actualWater = log.getWaterIntakeMl() != null ? log.getWaterIntakeMl() : 0;
        int workoutsCount = log.getWorkouts() != null ? log.getWorkouts().size() : 0;
        int totalActiveMins = log.getWorkouts() != null ?
                log.getWorkouts().stream().mapToInt(ActivityLog.WorkoutEntry::getDurationMinutes).sum() : 0;
        int totalCaloriesBurned = log.getCaloriesBurned() != null ? log.getCaloriesBurned() : 0;

        double stepPercent = calculatePercentage(actualSteps, targetSteps);
        double waterPercent = calculatePercentage(actualWater, targetWaterMl);
        double workoutScore = workoutsCount > 0 ? 100.0 : 0.0;

        double overallPercent = BigDecimal.valueOf((stepPercent + waterPercent + workoutScore) / 3.0)
                .setScale(1, RoundingMode.HALF_UP)
                .doubleValue();

        DailyProgressSummaryDto summary = new DailyProgressSummaryDto();
        summary.setUserId(userId);
        summary.setLogDate(logDate);
        summary.setActualSteps(actualSteps);
        summary.setTargetSteps(targetSteps);
        summary.setStepProgressPercent(stepPercent);
        summary.setActualWaterMl(actualWater);
        summary.setTargetWaterMl(targetWaterMl);
        summary.setWaterProgressPercent(waterPercent);
        summary.setWorkoutsCompleted(workoutsCount);
        summary.setTotalActiveMinutes(totalActiveMins);
        summary.setCaloriesBurned(totalCaloriesBurned);
        summary.setOverallProgressPercent(overallPercent);

        return summary;
    }

    /**
     * Retrieve recent activity history (e.g. past 7 days).
     */
    public List<ActivityLogDto> getActivityHistory(String userId) {
        return activityLogRepository.findByUserIdOrderByLogDateDesc(userId)
                .stream()
                .limit(7)
                .map(ActivityLogDto::fromEntity)
                .collect(Collectors.toList());
    }

    // --- Internal Helpers ---

    private ActivityLog getOrCreateDailyLog(String userId, String logDate) {
        return activityLogRepository.findByUserIdAndLogDate(userId, logDate)
                .orElseGet(() -> {
                    ActivityLog newLog = new ActivityLog(userId, logDate);
                    return activityLogRepository.save(newLog);
                });
    }

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

    private int estimateCaloriesBurned(String activityType, int durationMinutes, String intensity) {
        double ratePerMinute = switch (activityType != null ? activityType.toUpperCase() : "GENERAL") {
            case "RUNNING" -> 11.5;
            case "CYCLING" -> 8.5;
            case "WEIGHT_TRAINING", "BODYBUILDING" -> 6.0;
            case "HIIT", "CROSSFIT" -> 12.0;
            case "SWIMMING" -> 9.0;
            case "YOGA", "PILATES" -> 4.0;
            case "WALKING" -> 4.5;
            default -> 6.5;
        };

        double intensityMultiplier = switch (intensity != null ? intensity.toUpperCase() : "MODERATE") {
            case "LOW" -> 0.8;
            case "HIGH" -> 1.25;
            default -> 1.0;
        };

        return (int) Math.round(durationMinutes * ratePerMinute * intensityMultiplier);
    }
}
