const API_BASE = '/api';

/**
 * ATHLY API Client with transparent local fallback
 * Allows complete standalone frontend previewing and real-time backend communication.
 */
export const apiClient = {
  // Profile
  async getProfile() {
    try {
      const res = await fetch(`${API_BASE}/profile`);
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (e) {
      console.info('[ATHLY API] Using default/cached profile data');
      return {
        id: 1,
        name: "Alex Hunter",
        age: 27,
        height: 178,
        weight: 75.5,
        fitnessLevel: "Intermediate",
        fitnessGoal: "Muscle Gain",
        foodPreference: "Non-Vegetarian",
        gender: "Male"
      };
    }
  },

  async updateProfile(profileData) {
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (e) {
      console.info('[ATHLY API] Local update for profile data');
      return { ...profileData, id: 1 };
    }
  },

  // Fitness Planner
  async getFitnessPlan() {
    try {
      const res = await fetch(`${API_BASE}/planner`);
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (e) {
      console.info('[ATHLY API] Using calculated fallback fitness plan');
      return {
        id: 1,
        userId: 1,
        dailyStepTarget: 10000,
        dailyCalorieTarget: 2450,
        dailyProteinTarget: 165,
        dailyCarbTarget: 260,
        dailyFatTarget: 65,
        dailyWaterTargetMl: 3200,
        workoutPlanSummary: "AI Customized Hypertrophy & Performance Split (Intermediate)",
        macroRatio: { proteinPercent: 27, carbsPercent: 43, fatsPercent: 30 },
        dietRecommendations: [
          "Target 165g of daily protein distributed across 4 balanced meals (~41g per meal).",
          "Prioritize complex carbohydrates (quinoa, sweet potatoes, oats) 90 mins before training.",
          "Maintain consistent hydration: drink at least 600ml water upon waking and 1L during workouts.",
          "Incorporate lean protein sources: grilled salmon, chicken breast, egg whites, and Greek yogurt."
        ],
        weeklyWorkouts: [
          {
            dayName: "Monday",
            focusArea: "Chest & Triceps Hypertrophy",
            estimatedMinutes: 55,
            estimatedCalories: 420,
            exercises: [
              { name: "Incline Dumbbell Press", sets: "4", reps: "8-12", restSeconds: "90s", tips: "Squeeze upper chest at top" },
              { name: "Flat Barbell Bench Press", sets: "4", reps: "6-8", restSeconds: "120s", tips: "Retract scapulae and arch slightly" },
              { name: "Cable Chest Flyes", sets: "3", reps: "12-15", restSeconds: "60s", tips: "1 sec pause at peak contraction" },
              { name: "Tricep Overhead Rope Extension", sets: "4", reps: "12-15", restSeconds: "60s", tips: "Full tricep stretch" }
            ]
          },
          {
            dayName: "Tuesday",
            focusArea: "Back & Biceps Power",
            estimatedMinutes: 50,
            estimatedCalories: 390,
            exercises: [
              { name: "Barbell Deadlifts", sets: "4", reps: "5", restSeconds: "150s", tips: "Maintain neutral spine" },
              { name: "Wide-Grip Lat Pulldowns", sets: "4", reps: "10-12", restSeconds: "90s", tips: "Pull through elbows" },
              { name: "Chest-Supported Dumbbell Rows", sets: "3", reps: "12", restSeconds: "75s", tips: "Squeeze mid-back" },
              { name: "Incline Dumbbell Bicep Curls", sets: "3", reps: "12", restSeconds: "60s", tips: "Slow 3s eccentric phase" }
            ]
          },
          {
            dayName: "Wednesday",
            focusArea: "Active Recovery & Core",
            estimatedMinutes: 35,
            estimatedCalories: 220,
            exercises: [
              { name: "Hanging Leg Raises", sets: "4", reps: "15", restSeconds: "60s", tips: "Prevent swinging" },
              { name: "Side Plank Hold", sets: "3", reps: "45s each", restSeconds: "45s", tips: "Engage obliques" },
              { name: "Incline Zone-2 Treadmill Walk", sets: "1", reps: "25 min", restSeconds: "0s", tips: "Keep HR between 120-135 bpm" }
            ]
          },
          {
            dayName: "Thursday",
            focusArea: "Legs & Posterior Chain",
            estimatedMinutes: 60,
            estimatedCalories: 480,
            exercises: [
              { name: "Barbell Back Squats", sets: "4", reps: "8", restSeconds: "120s", tips: "Control the descent" },
              { name: "Romanian Deadlifts", sets: "4", reps: "10", restSeconds: "90s", tips: "Feel hamstring tension" },
              { name: "Bulgarian Split Squats", sets: "3", reps: "10/leg", restSeconds: "75s", tips: "Front foot firmly planted" },
              { name: "Standing Calf Raises", sets: "4", reps: "15-20", restSeconds: "45s", tips: "Full plantar flexion" }
            ]
          },
          {
            dayName: "Friday",
            focusArea: "Shoulders & Arms Sculpt",
            estimatedMinutes: 50,
            estimatedCalories: 380,
            exercises: [
              { name: "Seated Dumbbell Shoulder Press", sets: "4", reps: "8-10", restSeconds: "90s", tips: "Full overhead extension" },
              { name: "Leaning Cable Lateral Raises", sets: "4", reps: "15", restSeconds: "45s", tips: "Isolate side delt" },
              { name: "Face Pulls with External Rotation", sets: "3", reps: "15-20", restSeconds: "60s", tips: "Rear delt and rotator cuff focus" },
              { name: "Hammer Curls & Skullcrushers Superset", sets: "3", reps: "12", restSeconds: "75s", tips: "Continuous metabolic pump" }
            ]
          },
          {
            dayName: "Saturday",
            focusArea: "HIIT & Conditioning",
            estimatedMinutes: 40,
            estimatedCalories: 410,
            exercises: [
              { name: "Kettlebell Swings", sets: "4", reps: "20", restSeconds: "60s", tips: "Explosive hip hinge" },
              { name: "Concept2 Rower Sprints", sets: "5", reps: "500m", restSeconds: "90s", tips: "High stroke power" },
              { name: "Plyo Box Step-Ups", sets: "3", reps: "12/leg", restSeconds: "60s", tips: "Explosive drive" }
            ]
          },
          {
            dayName: "Sunday",
            focusArea: "Rest, Mobility & Soft Tissue",
            estimatedMinutes: 25,
            estimatedCalories: 100,
            exercises: [
              { name: "Targeted Foam Rolling", sets: "1", reps: "15 min", restSeconds: "0s", tips: "Quads, thoracic spine, glutes" },
              { name: "Deep Yoga & Hip Mobility", sets: "1", reps: "15 min", restSeconds: "0s", tips: "Focus on nasal diaphragmatic breaths" }
            ]
          }
        ]
      };
    }
  },

  // Meal Analysis
  async analyzeMeal(mealData) {
    try {
      const res = await fetch(`${API_BASE}/meals/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mealData)
      });
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (e) {
      console.info('[ATHLY API] Simulation response for Meal Analysis');
      const hint = (mealData.hintOrDescription || '').toLowerCase();
      let foodName = "Grilled Herb Chicken Breast with Brown Rice & Broccoli";
      let cal = 520, p = 48, c = 45, f = 12, fiber = 7;
      let insight = "Golden standard athletic meal. Clean lean protein and slow-digesting complex carbs support lean mass gains.";

      if (hint.includes('salmon') || hint.includes('fish')) {
        foodName = "Pan-Seared Atlantic Salmon with Steamed Asparagus & Quinoa";
        cal = 580; p = 42; c = 38; f = 24; fiber = 6;
        insight = "Outstanding high-protein meal rich in Omega-3 fatty acids! Perfect for recovery and joint health.";
      } else if (hint.includes('salad') || hint.includes('avocado') || hint.includes('vegan')) {
        foodName = "Mediterranean Quinoa Avocado Bowl with Chickpeas";
        cal = 460; p = 18; c = 54; f = 20; fiber = 12;
        insight = "Dense in fiber and monounsaturated healthy fats. Consider adding plant protein to optimize synthesis.";
      } else if (hint.includes('egg') || hint.includes('toast')) {
        foodName = "Poached Eggs on Sourdough with Sliced Avocado";
        cal = 420; p = 22; c = 32; f = 21; fiber = 5;
        insight = "Excellent morning fuel offering choline and sustained complex energy for peak performance.";
      } else if (hint.includes('shake') || hint.includes('protein') || hint.includes('smoothie')) {
        foodName = "Whey Protein Berry Smoothie Bowl with Almond Butter";
        cal = 380; p = 36; c = 34; f = 9; fiber = 7;
        insight = "Rapid absorbing amino acids with powerful antioxidant support. Ideal post-workout.";
      }

      return {
        logId: Date.now(),
        identifiedFood: foodName,
        confidence: 0.96,
        mealType: mealData.mealType || 'LUNCH',
        totalCalories: cal,
        totalProtein: p,
        totalCarbs: c,
        totalFats: f,
        totalFiber: fiber,
        dailyCalorieTarget: 2450,
        consumedCaloriesToday: 1840,
        remainingCaloriesToday: 610,
        proteinTargetGrams: 165,
        consumedProteinToday: 132,
        remainingProteinToday: 33,
        aiDietaryInsight: insight,
        detectedItems: [
          { name: "Primary Protein Portion", estimatedPortion: "180g", calories: cal * 0.55, protein: p * 0.85, carbs: 0, fats: f * 0.4 },
          { name: "Complex Carb Base", estimatedPortion: "140g", calories: cal * 0.35, protein: p * 0.10, carbs: c * 0.85, fats: f * 0.2 },
          { name: "Fresh Greens & Veggies", estimatedPortion: "100g", calories: cal * 0.10, protein: p * 0.05, carbs: c * 0.15, fats: f * 0.4 }
        ]
      };
    }
  },

  async getTodayMeals() {
    try {
      const res = await fetch(`${API_BASE}/meals/today`);
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (e) {
      return [
        {
          id: 101,
          mealType: "BREAKFAST",
          foodName: "Poached Eggs on Sourdough Toast & Avocado",
          calories: 420,
          protein: 22,
          carbs: 32,
          fats: 21,
          fiber: 5,
          loggedAt: "08:15 AM"
        },
        {
          id: 102,
          mealType: "LUNCH",
          foodName: "Grilled Herb Chicken Breast & Brown Rice Bowl",
          calories: 520,
          protein: 48,
          carbs: 45,
          fats: 12,
          fiber: 7,
          loggedAt: "01:30 PM"
        },
        {
          id: 103,
          mealType: "SNACK",
          foodName: "Whey Isolate Protein Shake + Blueberries",
          calories: 260,
          protein: 32,
          carbs: 18,
          fats: 4,
          fiber: 4,
          loggedAt: "04:45 PM"
        }
      ];
    }
  },

  // Activity Tracking
  async getTodayActivity() {
    try {
      const res = await fetch(`${API_BASE}/activity/today`);
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (e) {
      return {
        id: 1,
        steps: 7420,
        distanceKm: 5.78,
        activeMinutes: 52,
        caloriesBurned: 540,
        waterIntakeMl: 2250,
        workoutType: "Chest & Triceps Hypertrophy",
        workoutDurationMinutes: 50,
        workoutCalories: 380
      };
    }
  },

  async logActivity(data) {
    try {
      const res = await fetch(`${API_BASE}/activity/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (e) {
      return { ...data, id: 1 };
    }
  },

  async addWater(amountMl = 250) {
    try {
      const res = await fetch(`${API_BASE}/activity/water`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountMl })
      });
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (e) {
      return { waterIntakeMl: 2500 };
    }
  },

  async addSteps(steps = 500) {
    try {
      const res = await fetch(`${API_BASE}/activity/steps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ steps })
      });
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (e) {
      return { steps: 7920 };
    }
  },

  // Progress & Analytics & AI Feedback
  async getDailyProgress() {
    try {
      const res = await fetch(`${API_BASE}/progress/daily`);
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (e) {
      return {
        currentSteps: 7420,
        targetSteps: 10000,
        stepsPercentage: 74.2,
        consumedCalories: 1840,
        targetCalories: 2450,
        caloriesBurned: 540,
        netCalories: 1300,
        consumedProtein: 132,
        targetProtein: 165,
        consumedCarbs: 185,
        targetCarbs: 260,
        consumedFats: 56,
        targetFats: 65,
        waterIntakeMl: 2250,
        targetWaterMl: 3200,
        workoutCompleted: true,
        workoutSummary: "Chest & Triceps Hypertrophy",
        overallProgressScore: 82.5
      };
    }
  },

  async getWeeklyProgress() {
    try {
      const res = await fetch(`${API_BASE}/progress/weekly`);
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (e) {
      return {
        weeklyTrend: [
          { day: "Mon", steps: 8900, caloriesBurned: 480, weight: 76.4, completionRate: 89 },
          { day: "Tue", steps: 10450, caloriesBurned: 620, weight: 76.2, completionRate: 100 },
          { day: "Wed", steps: 9200, caloriesBurned: 510, weight: 76.0, completionRate: 92 },
          { day: "Thu", steps: 11200, caloriesBurned: 680, weight: 75.8, completionRate: 100 },
          { day: "Fri", steps: 9800, caloriesBurned: 540, weight: 75.7, completionRate: 98 },
          { day: "Sat", steps: 12400, caloriesBurned: 720, weight: 75.6, completionRate: 100 },
          { day: "Sun", steps: 7420, caloriesBurned: 540, weight: 75.5, completionRate: 74 }
        ],
        averageSteps: 9910,
        totalCaloriesBurned: 4090,
        weeklyGoalCompletionPercent: 91.2,
        weightChangeKg: -0.9
      };
    }
  },

  async getAiFeedback() {
    try {
      const res = await fetch(`${API_BASE}/progress/ai-feedback`);
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (e) {
      return {
        headline: "Peak Hypertrophy Cadence: You're on Track for 0.4kg Lean Muscle Gain",
        detailedAnalysis: "Your 7-day consistency index is at 88/100. Protein synthesis pacing is optimal with 132g logged today against your 165g target. Your progressive overload volume on Monday's chest session shows solid neuromuscular output.",
        workoutEvaluation: "Step volume (7,420 / 10,000) and workout load are on target. An additional 15-minute evening walk will round off the daily cardiovascular baseline.",
        nutritionEvaluation: "Macronutrient split is at 27% Protein, 48% Carbs, and 25% Healthy Fats. Great micronutrient density detected in your lunch greens.",
        recoveryEvaluation: "Hydration is at 2,250ml (70% of goal). Sip 500ml of water before bed to support overnight myofibrillar repair.",
        consistencyScore: 88,
        actionableRecommendations: [
          "Consume 33g more protein (e.g. casein shake or Greek yogurt) before sleeping to reach your daily 165g target.",
          "Hit your remaining 2,580 steps with a relaxing post-dinner recovery walk.",
          "Prepare your gym kit for tomorrow's Back & Biceps power session."
        ],
        motivationQuote: "\"We are what we repeatedly do. Excellence, then, is not an act, but a habit.\" — Will Durant"
      };
    }
  },

  // Rewards
  async getRewardSummary() {
    try {
      const res = await fetch(`${API_BASE}/rewards/summary`);
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (e) {
      return {
        totalPoints: 680,
        level: 2,
        pointsToNextLevel: 320,
        currentStreakDays: 5,
        bestStreakDays: 12,
        dailyGoals: [
          { id: "dg-1", title: "Hit 10,000 Steps Target", targetText: "7,420 / 10,000 steps", points: 40, completed: false, progressPercent: 74.2 },
          { id: "dg-2", title: "Drink 3200ml Water", targetText: "2,250 / 3,200 ml", points: 25, completed: false, progressPercent: 70.3 },
          { id: "dg-3", title: "Log 3 Balanced Meals", targetText: "3 / 3 meals logged", points: 35, completed: true, progressPercent: 100.0 },
          { id: "dg-4", title: "Complete Daily Workout", targetText: "Chest & Triceps Hypertrophy", points: 50, completed: true, progressPercent: 100.0 }
        ],
        weeklyGoals: [
          { id: "wg-1", title: "Complete 5 Strength Workouts", targetText: "4 / 5 completed", points: 150, completed: false, progressPercent: 80.0 },
          { id: "wg-2", title: "Surpass 70,000 Weekly Steps", targetText: "59,390 / 70,000 steps", points: 200, completed: false, progressPercent: 84.8 },
          { id: "wg-3", title: "Hit Protein Target 6/7 Days", targetText: "5 / 6 days on target", points: 180, completed: false, progressPercent: 83.3 }
        ],
        badges: [
          { code: "STREAK_7_DAYS", title: "5-Day Streak", description: "Maintained active workouts & macro tracking for 5 consecutive days", category: "STREAK", iconName: "flame", pointsReward: 150, unlocked: true, unlockedAt: "Unlocked today" },
          { code: "HYDRATION_HERO", title: "Hydration Hero", description: "Hit your daily water target 5 days in a row", category: "HYDRATION", iconName: "droplet", pointsReward: 100, unlocked: true, unlockedAt: "Unlocked yesterday" },
          { code: "MACRO_MASTER", title: "Macro Master", description: "Matched daily protein and calorie targets within 5%", category: "NUTRITION", iconName: "pie-chart", pointsReward: 120, unlocked: true, unlockedAt: "Unlocked 3 days ago" },
          { code: "AI_VISIONARY", title: "AI Visionary", description: "Analyzed 10 meals with Athly AI Vision camera", category: "NUTRITION", iconName: "camera", pointsReward: 100, unlocked: true, unlockedAt: "Unlocked today" },
          { code: "CENTURY_CRUSHER", title: "10k Step Crusher", description: "Surpassed 10,000 daily steps 10 times", category: "WORKOUT", iconName: "footprints", pointsReward: 200, unlocked: false, unlockedAt: null },
          { code: "IRON_WILL", title: "Iron Will", description: "Logged 20 intensive strength sessions", category: "WORKOUT", iconName: "dumbbell", pointsReward: 250, unlocked: false, unlockedAt: null }
        ]
      };
    }
  }
};
