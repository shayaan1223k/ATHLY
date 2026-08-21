package com.athly.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * MongoDB Document representing a user's customized Fitness and Nutrition Plan.
 * Stored in the 'fitness_plans' collection.
 */
@Document(collection = "fitness_plans")
public class FitnessPlan {

    @Id
    private String id;

    @Indexed(unique = true)
    private String userId;

    private Integer bmr;                 // Basal Metabolic Rate (kcal)
    private Integer tdee;                // Total Daily Energy Expenditure (kcal)
    private Integer targetCalories;      // Daily Target Calorie Intake (kcal)
    private Integer targetProteinGrams;  // Daily Target Protein (g)
    private Integer targetCarbsGrams;    // Daily Target Carbohydrates (g)
    private Integer targetFatGrams;      // Daily Target Dietary Fat (g)
    private Integer targetSteps;         // Daily Step Goal (e.g. 10000)
    private Integer targetWaterMl;       // Daily Hydration Goal (ml)

    private String workoutSplitName;     // e.g. "Push / Pull / Legs (PPL)"
    private List<WorkoutDay> weeklyWorkoutSchedule = new ArrayList<>();
    private List<String> dietaryRecommendations = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public FitnessPlan() {
    }

    // Nested Class for Daily Workout Schedule
    public static class WorkoutDay {
        private String dayOfWeek;       // e.g. "Monday"
        private String focus;           // e.g. "Push (Chest, Shoulders & Triceps)"
        private List<Exercise> exercises = new ArrayList<>();

        public WorkoutDay() {
        }

        public WorkoutDay(String dayOfWeek, String focus, List<Exercise> exercises) {
            this.dayOfWeek = dayOfWeek;
            this.focus = focus;
            this.exercises = exercises;
        }

        public String getDayOfWeek() {
            return dayOfWeek;
        }

        public void setDayOfWeek(String dayOfWeek) {
            this.dayOfWeek = dayOfWeek;
        }

        public String getFocus() {
            return focus;
        }

        public void setFocus(String focus) {
            this.focus = focus;
        }

        public List<Exercise> getExercises() {
            return exercises;
        }

        public void setExercises(List<Exercise> exercises) {
            this.exercises = exercises;
        }
    }

    // Nested Class for Individual Exercise Items
    public static class Exercise {
        private String name;
        private Integer sets;
        private String reps;
        private Integer restSeconds;

        public Exercise() {
        }

        public Exercise(String name, Integer sets, String reps, Integer restSeconds) {
            this.name = name;
            this.sets = sets;
            this.reps = reps;
            this.restSeconds = restSeconds;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Integer getSets() {
            return sets;
        }

        public void setSets(Integer sets) {
            this.sets = sets;
        }

        public String getReps() {
            return reps;
        }

        public void setReps(String reps) {
            this.reps = reps;
        }

        public Integer getRestSeconds() {
            return restSeconds;
        }

        public void setRestSeconds(Integer restSeconds) {
            this.restSeconds = restSeconds;
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

    public Integer getBmr() {
        return bmr;
    }

    public void setBmr(Integer bmr) {
        this.bmr = bmr;
    }

    public Integer getTdee() {
        return tdee;
    }

    public void setTdee(Integer tdee) {
        this.tdee = tdee;
    }

    public Integer getTargetCalories() {
        return targetCalories;
    }

    public void setTargetCalories(Integer targetCalories) {
        this.targetCalories = targetCalories;
    }

    public Integer getTargetProteinGrams() {
        return targetProteinGrams;
    }

    public void setTargetProteinGrams(Integer targetProteinGrams) {
        this.targetProteinGrams = targetProteinGrams;
    }

    public Integer getTargetCarbsGrams() {
        return targetCarbsGrams;
    }

    public void setTargetCarbsGrams(Integer targetCarbsGrams) {
        this.targetCarbsGrams = targetCarbsGrams;
    }

    public Integer getTargetFatGrams() {
        return targetFatGrams;
    }

    public void setTargetFatGrams(Integer targetFatGrams) {
        this.targetFatGrams = targetFatGrams;
    }

    public Integer getTargetSteps() {
        return targetSteps;
    }

    public void setTargetSteps(Integer targetSteps) {
        this.targetSteps = targetSteps;
    }

    public Integer getTargetWaterMl() {
        return targetWaterMl;
    }

    public void setTargetWaterMl(Integer targetWaterMl) {
        this.targetWaterMl = targetWaterMl;
    }

    public String getWorkoutSplitName() {
        return workoutSplitName;
    }

    public void setWorkoutSplitName(String workoutSplitName) {
        this.workoutSplitName = workoutSplitName;
    }

    public List<WorkoutDay> getWeeklyWorkoutSchedule() {
        return weeklyWorkoutSchedule;
    }

    public void setWeeklyWorkoutSchedule(List<WorkoutDay> weeklyWorkoutSchedule) {
        this.weeklyWorkoutSchedule = weeklyWorkoutSchedule;
    }

    public List<String> getDietaryRecommendations() {
        return dietaryRecommendations;
    }

    public void setDietaryRecommendations(List<String> dietaryRecommendations) {
        this.dietaryRecommendations = dietaryRecommendations;
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
