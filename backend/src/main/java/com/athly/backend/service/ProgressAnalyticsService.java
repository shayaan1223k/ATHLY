package com.athly.backend.service;

import com.athly.backend.dto.AddXpRequest;
import com.athly.backend.dto.WeightLogRequest;
import com.athly.backend.dto.WeeklyAnalyticsDto;
import com.athly.backend.exception.ResourceNotFoundException;
import com.athly.backend.model.ActivityLog;
import com.athly.backend.model.ProgressRecord;
import com.athly.backend.model.UserProfile;
import com.athly.backend.repository.ActivityLogRepository;
import com.athly.backend.repository.ProgressRecordRepository;
import com.athly.backend.repository.UserProfileRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * Service for weight tracking, body composition trends, and aggregated weekly analytics.
 */
@Service
public class ProgressAnalyticsService {

    private final ProgressRecordRepository progressRecordRepository;
    private final UserProfileRepository userProfileRepository;
    private final ActivityLogRepository activityLogRepository;
    private final UserProfileService userProfileService;
    private final RewardService rewardService;

    public ProgressAnalyticsService(ProgressRecordRepository progressRecordRepository,
                                    UserProfileRepository userProfileRepository,
                                    ActivityLogRepository activityLogRepository,
                                    UserProfileService userProfileService,
                                    RewardService rewardService) {
        this.progressRecordRepository = progressRecordRepository;
        this.userProfileRepository = userProfileRepository;
        this.activityLogRepository = activityLogRepository;
        this.userProfileService = userProfileService;
        this.rewardService = rewardService;
    }

    /**
     * Log a new weight entry, calculate new BMI, and update UserProfile current weight.
     */
    public ProgressRecord logWeight(WeightLogRequest request) {
        UserProfile user = userProfileRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found for ID: " + request.getUserId()));

        String recordDate = request.getRecordDate() != null && !request.getRecordDate().trim().isEmpty() ?
                request.getRecordDate().trim() :
                LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);

        Double newBmi = userProfileService.calculateBmi(request.getWeightKg(), user.getHeight());

        // Save progress milestone
        ProgressRecord record = new ProgressRecord(
                request.getUserId(),
                recordDate,
                request.getWeightKg(),
                newBmi,
                request.getNotes()
        );
        ProgressRecord saved = progressRecordRepository.save(record);

        // Update profile latest weight & BMI
        user.setWeight(request.getWeightKg());
        user.setBmi(newBmi);
        userProfileRepository.save(user);

        // Award +15 XP for recording weight progress
        rewardService.awardXp(new AddXpRequest(request.getUserId(), 15, "WEIGHT_LOGGED", "Recorded bodyweight milestone"));

        return saved;
    }

    /**
     * Retrieve all historical weight entries for chart plotting.
     */
    public List<ProgressRecord> getWeightHistory(String userId) {
        return progressRecordRepository.findByUserIdOrderByRecordDateAsc(userId);
    }

    /**
     * Aggregate progress over the past 7 days.
     */
    public WeeklyAnalyticsDto getWeeklyAnalytics(String userId) {
        LocalDate today = LocalDate.now();
        LocalDate startLocalDate = today.minusDays(6);

        String startDate = startLocalDate.format(DateTimeFormatter.ISO_LOCAL_DATE);
        String endDate = today.format(DateTimeFormatter.ISO_LOCAL_DATE);

        List<ActivityLog> logs = activityLogRepository.findByUserIdAndLogDateBetweenOrderByLogDateAsc(userId, startDate, endDate);

        int totalSteps = 0;
        int totalWater = 0;
        int totalWorkouts = 0;
        int totalActiveMins = 0;
        int totalCaloriesBurned = 0;

        List<WeeklyAnalyticsDto.DailyTrendPoint> trendPoints = new ArrayList<>();

        for (int i = 0; i < 7; i++) {
            LocalDate date = startLocalDate.plusDays(i);
            String dateStr = date.format(DateTimeFormatter.ISO_LOCAL_DATE);

            ActivityLog dayLog = logs.stream()
                    .filter(l -> dateStr.equals(l.getLogDate()))
                    .findFirst()
                    .orElse(null);

            int steps = dayLog != null && dayLog.getSteps() != null ? dayLog.getSteps() : 0;
            int water = dayLog != null && dayLog.getWaterIntakeMl() != null ? dayLog.getWaterIntakeMl() : 0;
            int cals = dayLog != null && dayLog.getCaloriesBurned() != null ? dayLog.getCaloriesBurned() : 0;
            int activeMins = dayLog != null && dayLog.getWorkouts() != null ?
                    dayLog.getWorkouts().stream().mapToInt(ActivityLog.WorkoutEntry::getDurationMinutes).sum() : 0;
            int workouts = dayLog != null && dayLog.getWorkouts() != null ? dayLog.getWorkouts().size() : 0;

            double score = Math.min(100.0, ((steps / 10000.0 * 50.0) + (water / 2500.0 * 30.0) + (workouts > 0 ? 20.0 : 0.0)));

            totalSteps += steps;
            totalWater += water;
            totalWorkouts += workouts;
            totalActiveMins += activeMins;
            totalCaloriesBurned += cals;

            trendPoints.add(new WeeklyAnalyticsDto.DailyTrendPoint(
                    dateStr, steps, water, cals, activeMins,
                    BigDecimal.valueOf(score).setScale(1, RoundingMode.HALF_UP).doubleValue()
            ));
        }

        WeeklyAnalyticsDto analytics = new WeeklyAnalyticsDto();
        analytics.setUserId(userId);
        analytics.setStartDate(startDate);
        analytics.setEndDate(endDate);
        analytics.setAverageDailySteps(totalSteps / 7);
        analytics.setTotalWorkoutsCompleted(totalWorkouts);
        analytics.setTotalActiveMinutes(totalActiveMins);
        analytics.setTotalCaloriesBurned(totalCaloriesBurned);
        analytics.setAverageDailyWaterMl(totalWater / 7);

        double avgConsistency = trendPoints.stream()
                .mapToDouble(WeeklyAnalyticsDto.DailyTrendPoint::getAdherenceScore)
                .average()
                .orElse(0.0);
        analytics.setOverallConsistencyPercent(BigDecimal.valueOf(avgConsistency).setScale(1, RoundingMode.HALF_UP).doubleValue());
        analytics.setDailyTrends(trendPoints);

        return analytics;
    }
}
