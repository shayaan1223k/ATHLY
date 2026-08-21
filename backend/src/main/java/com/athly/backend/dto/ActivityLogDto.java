package com.athly.backend.dto;

import com.athly.backend.model.ActivityLog;

import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO for full daily activity record response.
 */
public class ActivityLogDto {

    private String id;
    private String userId;
    private String logDate;
    private Integer steps;
    private Double distanceKm;
    private Integer caloriesBurned;
    private Integer waterIntakeMl;
    private List<ActivityLog.WorkoutEntry> workouts;
    private LocalDateTime updatedAt;

    public ActivityLogDto() {
    }

    public static ActivityLogDto fromEntity(ActivityLog log) {
        ActivityLogDto dto = new ActivityLogDto();
        dto.setId(log.getId());
        dto.setUserId(log.getUserId());
        dto.setLogDate(log.getLogDate());
        dto.setSteps(log.getSteps());
        dto.setDistanceKm(log.getDistanceKm());
        dto.setCaloriesBurned(log.getCaloriesBurned());
        dto.setWaterIntakeMl(log.getWaterIntakeMl());
        dto.setWorkouts(log.getWorkouts());
        dto.setUpdatedAt(log.getUpdatedAt());
        return dto;
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Integer getSteps() {
        return steps;
    }

    public void setSteps(Integer steps) {
        this.steps = steps;
    }

    public Double getDistanceKm() {
        return distanceKm;
    }

    public void setDistanceKm(Double distanceKm) {
        this.distanceKm = distanceKm;
    }

    public Integer getCaloriesBurned() {
        return caloriesBurned;
    }

    public void setCaloriesBurned(Integer caloriesBurned) {
        this.caloriesBurned = caloriesBurned;
    }

    public Integer getWaterIntakeMl() {
        return waterIntakeMl;
    }

    public void setWaterIntakeMl(Integer waterIntakeMl) {
        this.waterIntakeMl = waterIntakeMl;
    }

    public List<ActivityLog.WorkoutEntry> getWorkouts() {
        return workouts;
    }

    public void setWorkouts(List<ActivityLog.WorkoutEntry> workouts) {
        this.workouts = workouts;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
