package com.athly.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * MongoDB Document representing a user's daily activity, hydration, and workout logs.
 * Stored in the 'activity_logs' collection.
 */
@Document(collection = "activity_logs")
@CompoundIndex(name = "user_date_idx", def = "{'userId': 1, 'logDate': 1}", unique = true)
public class ActivityLog {

    @Id
    private String id;

    @Indexed
    private String userId;

    @Indexed
    private String logDate; // Format: "YYYY-MM-DD"

    private Integer steps = 0;
    private Double distanceKm = 0.0;
    private Integer caloriesBurned = 0;
    private Integer waterIntakeMl = 0;

    private List<WorkoutEntry> workouts = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ActivityLog() {
    }

    public ActivityLog(String userId, String logDate) {
        this.userId = userId;
        this.logDate = logDate;
        this.steps = 0;
        this.distanceKm = 0.0;
        this.caloriesBurned = 0;
        this.waterIntakeMl = 0;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Nested Class for Individual Workout Sessions logged during the day
    public static class WorkoutEntry {
        private String id;
        private String activityType;    // e.g. "RUNNING", "WEIGHT_TRAINING", "CYCLING", "HIIT", "YOGA"
        private Integer durationMinutes;
        private Integer caloriesBurned;
        private String intensity;       // "LOW", "MODERATE", "HIGH"
        private String notes;
        private LocalDateTime loggedAt;

        public WorkoutEntry() {
            this.loggedAt = LocalDateTime.now();
        }

        public WorkoutEntry(String id, String activityType, Integer durationMinutes,
                            Integer caloriesBurned, String intensity, String notes) {
            this.id = id;
            this.activityType = activityType;
            this.durationMinutes = durationMinutes;
            this.caloriesBurned = caloriesBurned;
            this.intensity = intensity;
            this.notes = notes;
            this.loggedAt = LocalDateTime.now();
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getActivityType() {
            return activityType;
        }

        public void setActivityType(String activityType) {
            this.activityType = activityType;
        }

        public Integer getDurationMinutes() {
            return durationMinutes;
        }

        public void setDurationMinutes(Integer durationMinutes) {
            this.durationMinutes = durationMinutes;
        }

        public Integer getCaloriesBurned() {
            return caloriesBurned;
        }

        public void setCaloriesBurned(Integer caloriesBurned) {
            this.caloriesBurned = caloriesBurned;
        }

        public String getIntensity() {
            return intensity;
        }

        public void setIntensity(String intensity) {
            this.intensity = intensity;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }

        public LocalDateTime getLoggedAt() {
            return loggedAt;
        }

        public void setLoggedAt(LocalDateTime loggedAt) {
            this.loggedAt = loggedAt;
        }
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

    public List<WorkoutEntry> getWorkouts() {
        return workouts;
    }

    public void setWorkouts(List<WorkoutEntry> workouts) {
        this.workouts = workouts;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
