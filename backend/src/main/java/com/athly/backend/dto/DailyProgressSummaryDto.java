package com.athly.backend.dto;

/**
 * Summary DTO comparing daily activity logs against target fitness plan goals.
 * Used by the frontend dashboard to display progress rings and adherence metrics.
 */
public class DailyProgressSummaryDto {

    private String userId;
    private String logDate;

    // Steps
    private Integer actualSteps;
    private Integer targetSteps;
    private Double stepProgressPercent;

    // Hydration
    private Integer actualWaterMl;
    private Integer targetWaterMl;
    private Double waterProgressPercent;

    // Workouts
    private Integer workoutsCompleted;
    private Integer totalActiveMinutes;
    private Integer caloriesBurned;

    // Overall daily adherence score (0 - 100%)
    private Double overallProgressPercent;

    public DailyProgressSummaryDto() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getLogDate() {
        return logDate;
    }

    public void setLogDate(String logDate) {
        this.logDate = logDate;
    }

    public Integer getActualSteps() {
        return actualSteps;
    }

    public void setActualSteps(Integer actualSteps) {
        this.actualSteps = actualSteps;
    }

    public Integer getTargetSteps() {
        return targetSteps;
    }

    public void setTargetSteps(Integer targetSteps) {
        this.targetSteps = targetSteps;
    }

    public Double getStepProgressPercent() {
        return stepProgressPercent;
    }

    public void setStepProgressPercent(Double stepProgressPercent) {
        this.stepProgressPercent = stepProgressPercent;
    }

    public Integer getActualWaterMl() {
        return actualWaterMl;
    }

    public void setActualWaterMl(Integer actualWaterMl) {
        this.actualWaterMl = actualWaterMl;
    }

    public Integer getTargetWaterMl() {
        return targetWaterMl;
    }

    public void setTargetWaterMl(Integer targetWaterMl) {
        this.targetWaterMl = targetWaterMl;
    }

    public Double getWaterProgressPercent() {
        return waterProgressPercent;
    }

    public void setWaterProgressPercent(Double waterProgressPercent) {
        this.waterProgressPercent = waterProgressPercent;
    }

    public Integer getWorkoutsCompleted() {
        return workoutsCompleted;
    }

    public void setWorkoutsCompleted(Integer workoutsCompleted) {
        this.workoutsCompleted = workoutsCompleted;
    }

    public Integer getTotalActiveMinutes() {
        return totalActiveMinutes;
    }

    public void setTotalActiveMinutes(Integer totalActiveMinutes) {
        this.totalActiveMinutes = totalActiveMinutes;
    }

    public Integer getCaloriesBurned() {
        return caloriesBurned;
    }

    public void setCaloriesBurned(Integer caloriesBurned) {
        this.caloriesBurned = caloriesBurned;
    }

    public Double getOverallProgressPercent() {
        return overallProgressPercent;
    }

    public void setOverallProgressPercent(Double overallProgressPercent) {
        this.overallProgressPercent = overallProgressPercent;
    }
}
