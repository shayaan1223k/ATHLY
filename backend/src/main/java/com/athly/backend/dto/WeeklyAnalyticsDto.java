package com.athly.backend.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * DTO representing aggregated 7-day progress analytics and trend lines.
 */
public class WeeklyAnalyticsDto {

    private String userId;
    private String startDate;
    private String endDate;

    private Integer averageDailySteps;
    private Integer totalWorkoutsCompleted;
    private Integer totalActiveMinutes;
    private Integer totalCaloriesBurned;
    private Integer averageDailyWaterMl;
    private Double overallConsistencyPercent;

    private List<DailyTrendPoint> dailyTrends = new ArrayList<>();

    public WeeklyAnalyticsDto() {
    }

    public static class DailyTrendPoint {
        private String date;
        private Integer steps;
        private Integer waterMl;
        private Integer caloriesBurned;
        private Integer activeMinutes;
        private Double adherenceScore;

        public DailyTrendPoint() {
        }

        public DailyTrendPoint(String date, Integer steps, Integer waterMl,
                               Integer caloriesBurned, Integer activeMinutes, Double adherenceScore) {
            this.date = date;
            this.steps = steps;
            this.waterMl = waterMl;
            this.caloriesBurned = caloriesBurned;
            this.activeMinutes = activeMinutes;
            this.adherenceScore = adherenceScore;
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public Integer getSteps() {
            return steps;
        }

        public void setSteps(Integer steps) {
            this.steps = steps;
        }

        public Integer getWaterMl() {
            return waterMl;
        }

        public void setWaterMl(Integer waterMl) {
            this.waterMl = waterMl;
        }

        public Integer getCaloriesBurned() {
            return caloriesBurned;
        }

        public void setCaloriesBurned(Integer caloriesBurned) {
            this.caloriesBurned = caloriesBurned;
        }

        public Integer getActiveMinutes() {
            return activeMinutes;
        }

        public void setActiveMinutes(Integer activeMinutes) {
            this.activeMinutes = activeMinutes;
        }

        public Double getAdherenceScore() {
            return adherenceScore;
        }

        public void setAdherenceScore(Double adherenceScore) {
            this.adherenceScore = adherenceScore;
        }
    }

    // Getters and Setters

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public Integer getAverageDailySteps() {
        return averageDailySteps;
    }

    public void setAverageDailySteps(Integer averageDailySteps) {
        this.averageDailySteps = averageDailySteps;
    }

    public Integer getTotalWorkoutsCompleted() {
        return totalWorkoutsCompleted;
    }

    public void setTotalWorkoutsCompleted(Integer totalWorkoutsCompleted) {
        this.totalWorkoutsCompleted = totalWorkoutsCompleted;
    }

    public Integer getTotalActiveMinutes() {
        return totalActiveMinutes;
    }

    public void setTotalActiveMinutes(Integer totalActiveMinutes) {
        this.totalActiveMinutes = totalActiveMinutes;
    }

    public Integer getTotalCaloriesBurned() {
        return totalCaloriesBurned;
    }

    public void setTotalCaloriesBurned(Integer totalCaloriesBurned) {
        this.totalCaloriesBurned = totalCaloriesBurned;
    }

    public Integer getAverageDailyWaterMl() {
        return averageDailyWaterMl;
    }

    public void setAverageDailyWaterMl(Integer averageDailyWaterMl) {
        this.averageDailyWaterMl = averageDailyWaterMl;
    }

    public Double getOverallConsistencyPercent() {
        return overallConsistencyPercent;
    }

    public void setOverallConsistencyPercent(Double overallConsistencyPercent) {
        this.overallConsistencyPercent = overallConsistencyPercent;
    }

    public List<DailyTrendPoint> getDailyTrends() {
        return dailyTrends;
    }

    public void setDailyTrends(List<DailyTrendPoint> dailyTrends) {
        this.dailyTrends = dailyTrends;
    }
}
