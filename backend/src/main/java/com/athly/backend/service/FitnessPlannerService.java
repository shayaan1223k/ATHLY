package com.athly.backend.service;

import com.athly.backend.dto.FitnessPlanDto;
import com.athly.backend.exception.ResourceNotFoundException;
import com.athly.backend.model.FitnessPlan;
import com.athly.backend.model.UserProfile;
import com.athly.backend.repository.FitnessPlanRepository;
import com.athly.backend.repository.UserProfileRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Service responsible for calculating customized nutrition targets,
 * caloric budgets, macronutrient splits, and workout routines.
 */
@Service
public class FitnessPlannerService {

    private final FitnessPlanRepository fitnessPlanRepository;
    private final UserProfileRepository userProfileRepository;

    public FitnessPlannerService(FitnessPlanRepository fitnessPlanRepository,
                                 UserProfileRepository userProfileRepository) {
        this.fitnessPlanRepository = fitnessPlanRepository;
        this.userProfileRepository = userProfileRepository;
    }

    /**
     * Generate or recalculate a comprehensive fitness plan for a given user.
     */
    public FitnessPlanDto generatePlanForUser(String userId) {
        UserProfile profile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot generate plan: User profile not found for ID: " + userId));

        // 1. Calculate Basal Metabolic Rate (Mifflin-St Jeor)
        int bmr = calculateBmr(profile.getWeight(), profile.getHeight(), profile.getAge(), profile.getGender());

        // 2. Calculate Total Daily Energy Expenditure (TDEE)
        int tdee = calculateTdee(bmr, profile.getActivityLevel());

        // 3. Calculate Target Calories based on Goal
        int targetCalories = calculateTargetCalories(tdee, profile.getFitnessGoal());

        // 4. Calculate Macronutrient Targets
        int targetProteinGrams = calculateProteinGrams(profile.getWeight(), profile.getFitnessGoal());
        int targetFatGrams = calculateFatGrams(targetCalories);
        int targetCarbsGrams = calculateCarbsGrams(targetCalories, targetProteinGrams, targetFatGrams);

        // 5. Calculate Daily Steps & Hydration
        int targetSteps = calculateTargetSteps(profile.getFitnessGoal());
        int targetWaterMl = (int) Math.round(profile.getWeight() * 35); // ~35ml per kg bodyweight

        // 6. Generate Workout Schedule & Dietary Suggestions
        List<FitnessPlan.WorkoutDay> workoutSchedule = buildWorkoutSchedule(profile.getFitnessGoal());
        List<String> dietaryRecommendations = buildDietaryRecommendations(profile.getDietaryPreference(), profile.getFitnessGoal());

        // 7. Find existing or create new FitnessPlan document
        FitnessPlan plan = fitnessPlanRepository.findByUserId(userId)
                .orElse(new FitnessPlan());

        plan.setUserId(userId);
        plan.setBmr(bmr);
        plan.setTdee(tdee);
        plan.setTargetCalories(targetCalories);
        plan.setTargetProteinGrams(targetProteinGrams);
        plan.setTargetCarbsGrams(targetCarbsGrams);
        plan.setTargetFatGrams(targetFatGrams);
        plan.setTargetSteps(targetSteps);
        plan.setTargetWaterMl(targetWaterMl);
        plan.setWorkoutSplitName(getSplitNameForGoal(profile.getFitnessGoal()));
        plan.setWeeklyWorkoutSchedule(workoutSchedule);
        plan.setDietaryRecommendations(dietaryRecommendations);

        if (plan.getCreatedAt() == null) {
            plan.setCreatedAt(LocalDateTime.now());
        }
        plan.setUpdatedAt(LocalDateTime.now());

        FitnessPlan saved = fitnessPlanRepository.save(plan);
        return FitnessPlanDto.fromEntity(saved);
    }

    /**
     * Retrieve the active fitness plan for a given user.
     */
    public FitnessPlanDto getPlanByUserId(String userId) {
        FitnessPlan plan = fitnessPlanRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("No fitness plan found for user ID: " + userId + ". Please generate one first."));
        return FitnessPlanDto.fromEntity(plan);
    }

    // --- Scientific Calculation Helpers ---

    /**
     * Mifflin-St Jeor Equation:
     * Men:   (10 * weight) + (6.25 * height) - (5 * age) + 5
     * Women: (10 * weight) + (6.25 * height) - (5 * age) - 161
     */
    private int calculateBmr(double weightKg, double heightCm, int age, String gender) {
        double baseBmr = (10.0 * weightKg) + (6.25 * heightCm) - (5.0 * age);
        if ("MALE".equalsIgnoreCase(gender)) {
            return (int) Math.round(baseBmr + 5);
        } else if ("FEMALE".equalsIgnoreCase(gender)) {
            return (int) Math.round(baseBmr - 161);
        } else {
            return (int) Math.round(baseBmr - 78); // Average midpoint
        }
    }

    /**
     * TDEE based on physical activity multipliers.
     */
    private int calculateTdee(int bmr, String activityLevel) {
        double multiplier;
        if (activityLevel == null) {
            multiplier = 1.375;
        } else {
            switch (activityLevel.toUpperCase()) {
                case "SEDENTARY" -> multiplier = 1.2;
                case "LIGHTLY_ACTIVE" -> multiplier = 1.375;
                case "MODERATELY_ACTIVE" -> multiplier = 1.55;
                case "VERY_ACTIVE" -> multiplier = 1.725;
                default -> multiplier = 1.375;
            }
        }
        return (int) Math.round(bmr * multiplier);
    }

    /**
     * Target Calorie calculation based on primary fitness goal.
     */
    private int calculateTargetCalories(int tdee, String fitnessGoal) {
        if (fitnessGoal == null) return tdee;

        return switch (fitnessGoal.toUpperCase()) {
            case "FAT_LOSS" -> Math.max(1200, tdee - 500); // 500 kcal deficit
            case "MUSCLE_GAIN" -> tdee + 350;              // 350 kcal surplus
            case "ENDURANCE" -> tdee + 200;                // Fuel for endurance
            default -> tdee;                              // Maintenance
        };
    }

    /**
     * Protein requirement: ~1.8g - 2.2g per kg bodyweight for active fitness goals.
     */
    private int calculateProteinGrams(double weightKg, String fitnessGoal) {
        double multiplier = ("FAT_LOSS".equalsIgnoreCase(fitnessGoal) || "MUSCLE_GAIN".equalsIgnoreCase(fitnessGoal)) ? 2.0 : 1.6;
        return (int) Math.round(weightKg * multiplier);
    }

    /**
     * Fat requirement: ~25% of target daily calories (9 kcal per gram of fat).
     */
    private int calculateFatGrams(int targetCalories) {
        double fatCalories = targetCalories * 0.25;
        return (int) Math.round(fatCalories / 9.0);
    }

    /**
     * Carbohydrates fill remaining calories (4 kcal per gram of carbohydrate).
     */
    private int calculateCarbsGrams(int targetCalories, int proteinGrams, int fatGrams) {
        int caloriesFromProtein = proteinGrams * 4;
        int caloriesFromFat = fatGrams * 9;
        int remainingCalories = targetCalories - (caloriesFromProtein + caloriesFromFat);
        return Math.max(50, (int) Math.round(remainingCalories / 4.0));
    }

    /**
     * Daily Step Targets based on Goal.
     */
    private int calculateTargetSteps(String fitnessGoal) {
        if ("FAT_LOSS".equalsIgnoreCase(fitnessGoal)) return 10000;
        if ("ENDURANCE".equalsIgnoreCase(fitnessGoal)) return 12000;
        return 8000;
    }

    private String getSplitNameForGoal(String fitnessGoal) {
        if ("ENDURANCE".equalsIgnoreCase(fitnessGoal)) {
            return "Conditioning & Stamina Split";
        }
        return "Push / Pull / Legs Hypertrophy Split";
    }

    // --- Schedule & Recommendation Builders ---

    private List<FitnessPlan.WorkoutDay> buildWorkoutSchedule(String fitnessGoal) {
        List<FitnessPlan.WorkoutDay> schedule = new ArrayList<>();

        // Day 1: Push
        schedule.add(new FitnessPlan.WorkoutDay("Monday", "Push (Chest, Shoulders, Triceps)", List.of(
                new FitnessPlan.Exercise("Barbell Bench Press", 4, "8-10", 90),
                new FitnessPlan.Exercise("Incline Dumbbell Press", 3, "10-12", 75),
                new FitnessPlan.Exercise("Overhead Shoulder Press", 3, "8-10", 90),
                new FitnessPlan.Exercise("Cable Lateral Raises", 4, "12-15", 60),
                new FitnessPlan.Exercise("Tricep Rope Pushdowns", 3, "12-15", 60)
        )));

        // Day 2: Pull
        schedule.add(new FitnessPlan.WorkoutDay("Tuesday", "Pull (Back & Biceps)", List.of(
                new FitnessPlan.Exercise("Lat Pulldowns", 4, "8-10", 90),
                new FitnessPlan.Exercise("Seated Cable Rows", 3, "10-12", 75),
                new FitnessPlan.Exercise("Face Pulls", 3, "15", 60),
                new FitnessPlan.Exercise("Dumbbell Bicep Curls", 3, "10-12", 60),
                new FitnessPlan.Exercise("Hammer Curls", 3, "12", 60)
        )));

        // Day 3: Active Rest / Cardio
        schedule.add(new FitnessPlan.WorkoutDay("Wednesday", "Active Recovery & Core", List.of(
                new FitnessPlan.Exercise("Incline Treadmill Walk", 1, "30 mins", 0),
                new FitnessPlan.Exercise("Hanging Leg Raises", 3, "12-15", 60),
                new FitnessPlan.Exercise("Plank Holds", 3, "60 secs", 60)
        )));

        // Day 4: Legs
        schedule.add(new FitnessPlan.WorkoutDay("Thursday", "Legs & Calves", List.of(
                new FitnessPlan.Exercise("Barbell Squats / Leg Press", 4, "8-10", 120),
                new FitnessPlan.Exercise("Romanian Deadlifts", 3, "10-12", 90),
                new FitnessPlan.Exercise("Walking Lunges", 3, "12 reps/leg", 60),
                new FitnessPlan.Exercise("Standing Calf Raises", 4, "15", 45)
        )));

        // Day 5: Upper Body Focus
        schedule.add(new FitnessPlan.WorkoutDay("Friday", "Upper Body Hypertrophy", List.of(
                new FitnessPlan.Exercise("Dumbbell Incline Bench", 3, "10-12", 75),
                new FitnessPlan.Exercise("Chest-Supported Row", 3, "10-12", 75),
                new FitnessPlan.Exercise("Dumbbell Lateral Raise", 3, "15", 45),
                new FitnessPlan.Exercise("Incline Curl & Overhead Extension Superset", 3, "12", 60)
        )));

        return schedule;
    }

    private List<String> buildDietaryRecommendations(String dietaryPreference, String fitnessGoal) {
        List<String> suggestions = new ArrayList<>();

        if ("VEGAN".equalsIgnoreCase(dietaryPreference)) {
            suggestions.add("Protein Sources: Tofu, Tempeh, Edamame, Seitan, Lentils, Pea Protein shakes.");
            suggestions.add("Complex Carbs: Quinoa, Brown Rice, Sweet Potatoes, Rolled Oats.");
            suggestions.add("Healthy Fats: Avocados, Chia Seeds, Flaxseeds, Almonds, Extra Virgin Olive Oil.");
        } else if ("VEGETARIAN".equalsIgnoreCase(dietaryPreference)) {
            suggestions.add("Protein Sources: Greek Yogurt, Paneer / Cottage Cheese, Whey Protein, Eggs (if ovo-lacto), Lentils.");
            suggestions.add("Complex Carbs: Oats, Brown Basmati Rice, Whole Wheat Roti, Sweet Potatoes.");
            suggestions.add("Healthy Fats: Walnuts, Almonds, Ghee (moderation), Chia Seeds, Avocados.");
        } else if ("KETO".equalsIgnoreCase(dietaryPreference)) {
            suggestions.add("High Fat & Protein: Whole Eggs, Salmon, Chicken Thighs, Grass-Fed Butter, Olive Oil, Avocado.");
            suggestions.add("Low Carb Veggies: Spinach, Broccoli, Asparagus, Zucchini, Cauliflower.");
            suggestions.add("Limit net carbs to under 30g daily to maintain ketosis.");
        } else {
            // Standard / Non-Vegetarian
            suggestions.add("Lean Proteins: Chicken Breast, Turkey, Salmon, Tuna, Egg Whites, Whey Isolate.");
            suggestions.add("Complex Carbs: Jasmine Rice, Sweet Potatoes, Rolled Oats, Whole Grain Pasta.");
            suggestions.add("Healthy Fats: Avocados, Extra Virgin Olive Oil, Almonds, Natural Peanut Butter.");
        }

        if ("FAT_LOSS".equalsIgnoreCase(fitnessGoal)) {
            suggestions.add("Hydration Tip: Drink 500ml of cold water 15 minutes before main meals to aid satiety.");
            suggestions.add("Satiety Tip: Focus on high-volume, fiber-rich vegetables with every main meal.");
        } else if ("MUSCLE_GAIN".equalsIgnoreCase(fitnessGoal)) {
            suggestions.add("Anabolic Timing: Consume 25-40g of protein every 3-4 hours across the day.");
            suggestions.add("Post-Workout: Consume fast-digesting carbs and protein within 60 minutes after training.");
        }

        return suggestions;
    }
}
