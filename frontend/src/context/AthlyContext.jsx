import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../api/apiClient';
import { useAuth } from './AuthContext';

const AthlyContext = createContext(null);
const DEMO_STORAGE_KEY = 'athly_demo_state_v2';

const getInitialDemoState = () => ({
  profile: {
    id: 'demo-baseline',
    name: 'Alex Hunter',
    email: 'alex.hunter@athly.luxury',
    age: 27,
    height: 178,
    weight: 75.5,
    targetWeight: 78.0,
    fitnessLevel: 'Intermediate',
    fitnessGoal: 'Muscle Gain',
    foodPreference: 'Non-Vegetarian',
    gender: 'Male',
    bmi: '23.8',
    _isFallback: true,
    _isDemo: true
  },
  activity: {
    id: 1,
    steps: 7420,
    distanceKm: 5.78,
    activeMinutes: 52,
    caloriesBurned: 540,
    waterIntakeMl: 2250,
    workoutType: "Chest & Triceps Hypertrophy",
    workoutDurationMinutes: 50,
    workoutCalories: 380
  },
  todayMeals: [
    {
      id: 101,
      mealType: "BREAKFAST",
      foodName: "Poached Eggs on Sourdough Toast & Avocado",
      calories: 420,
      protein: 22,
      carbs: 32,
      fats: 21,
      timeAgo: "3 hours ago"
    },
    {
      id: 102,
      mealType: "LUNCH",
      foodName: "Grilled Atlantic Salmon, Quinoa & Asparagus",
      calories: 580,
      protein: 42,
      carbs: 38,
      fats: 24,
      timeAgo: "1 hour ago"
    },
    {
      id: 103,
      mealType: "SNACK",
      foodName: "Greek Yogurt with Berries & Raw Honey",
      calories: 220,
      protein: 18,
      carbs: 24,
      fats: 4,
      timeAgo: "25 mins ago"
    }
  ],
  dailyProgress: {
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
  },
  rewards: {
    totalPoints: 680,
    level: 2,
    pointsToNextLevel: 320,
    currentStreakDays: 5,
    bestStreakDays: 12,
    dailyGoals: [
      { id: "dg-1", title: "Hit 10,000 Steps Target", targetText: "7,420 / 10,000 steps", points: 40, completed: false, claimed: false, progressPercent: 74.2 },
      { id: "dg-2", title: "Drink 3200ml Water", targetText: "2,250 / 3,200 ml", points: 25, completed: false, claimed: false, progressPercent: 70.3 },
      { id: "dg-3", title: "Log 3 Balanced Meals", targetText: "3 / 3 meals logged", points: 35, completed: true, claimed: false, progressPercent: 100.0 },
      { id: "dg-4", title: "Complete Daily Workout", targetText: "Chest & Triceps Hypertrophy", points: 50, completed: true, claimed: false, progressPercent: 100.0 }
    ],
    weeklyGoals: [
      { id: "wg-1", title: "Complete 5 Strength Workouts", targetText: "4 / 5 completed", points: 150, completed: false, claimed: false, progressPercent: 80.0 },
      { id: "wg-2", title: "Surpass 70,000 Weekly Steps", targetText: "59,390 / 70,000 steps", points: 200, completed: false, claimed: false, progressPercent: 84.8 },
      { id: "wg-3", title: "Hit Protein Target 6/7 Days", targetText: "5 / 6 days on target", points: 180, completed: false, claimed: false, progressPercent: 83.3 }
    ],
    badges: [
      { code: "STREAK_7_DAYS", title: "5-Day Streak", description: "Maintained active workouts & macro tracking for 5 consecutive days", category: "STREAK", iconName: "flame", pointsReward: 150, unlocked: true, unlockedAt: "Unlocked today" },
      { code: "HYDRATION_HERO", title: "Hydration Hero", description: "Hit your daily water target 5 days in a row", category: "HYDRATION", iconName: "droplet", pointsReward: 100, unlocked: true, unlockedAt: "Unlocked yesterday" },
      { code: "MACRO_MASTER", title: "Macro Master", description: "Matched daily protein and calorie targets within 5%", category: "NUTRITION", iconName: "pie-chart", pointsReward: 120, unlocked: true, unlockedAt: "Unlocked 3 days ago" },
      { code: "AI_VISIONARY", title: "AI Visionary", description: "Analyzed 10 meals with Athly AI Vision camera", category: "NUTRITION", iconName: "camera", pointsReward: 100, unlocked: true, unlockedAt: "Unlocked today" },
      { code: "CENTURY_CRUSHER", title: "10k Step Crusher", description: "Surpassed 10,000 daily steps 10 times", category: "WORKOUT", iconName: "footprints", pointsReward: 200, unlocked: false, unlockedAt: null },
      { code: "IRON_WILL", title: "Iron Will", description: "Logged 20 intensive strength sessions", category: "WORKOUT", iconName: "dumbbell", pointsReward: 250, unlocked: false, unlockedAt: null }
    ]
  },
  completedExercises: {}
});

const saveDemoToStorage = (key, data) => {
  try {
    const existing = JSON.parse(localStorage.getItem(DEMO_STORAGE_KEY) || '{}');
    existing[key] = data;
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.warn('[ATHLY DEMO] Failed to write demo state to localStorage:', err);
  }
};

const getDemoFromStorage = (key) => {
  try {
    const existing = JSON.parse(localStorage.getItem(DEMO_STORAGE_KEY) || '{}');
    return existing[key];
  } catch (err) {
    return null;
  }
};

export const AthlyProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('landing'); // 'landing', 'progress', 'planner', 'meals', 'activity', 'rewards', 'profile'
  const [profile, setProfile] = useState(null);
  const [plan, setPlan] = useState(null);
  const [activity, setActivity] = useState(null);
  const [todayMeals, setTodayMeals] = useState([]);
  const [dailyProgress, setDailyProgress] = useState(null);
  const [weeklyProgress, setWeeklyProgress] = useState(null);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [rewards, setRewards] = useState(null);
  const [completedExercises, setCompletedExercises] = useState({});
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [backendHealth, setBackendHealth] = useState({ isOnline: false, status: 'CHECKING', database: 'UNKNOWN' });

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const refreshAllData = async () => {
    try {
      setLoading(true);
      // Verify live backend health first
      const health = await apiClient.checkHealth();
      setBackendHealth(health);

      const [
        profileData,
        planData,
        activityData,
        mealsData,
        progressData,
        weeklyData,
        aiData,
        rewardData
      ] = await Promise.all([
        apiClient.getProfile(),
        apiClient.getFitnessPlan(),
        apiClient.getTodayActivity(),
        apiClient.getTodayMeals(),
        apiClient.getDailyProgress(),
        apiClient.getWeeklyProgress(),
        apiClient.getAiFeedback(),
        apiClient.getRewardSummary()
      ]);

      const cachedProfile = getDemoFromStorage('profile');
      const cachedActivity = getDemoFromStorage('activity');
      const cachedMeals = getDemoFromStorage('todayMeals');
      const cachedProgress = getDemoFromStorage('dailyProgress');
      const cachedPlan = getDemoFromStorage('plan');
      const cachedRewards = getDemoFromStorage('rewards');
      const cachedExercises = getDemoFromStorage('completedExercises');

      setProfile(profileData._isLive ? profileData : (cachedProfile || profileData));
      setPlan(cachedPlan || planData);
      setActivity(activityData._isLive ? activityData : (cachedActivity || activityData));
      setTodayMeals(mealsData._isLive ? mealsData : (cachedMeals || mealsData));
      setDailyProgress(progressData._isLive ? progressData : (cachedProgress || progressData));
      setWeeklyProgress(weeklyData);
      setAiFeedback(aiData);
      setRewards(rewardData._isLive ? rewardData : (cachedRewards || rewardData));
      if (cachedExercises) setCompletedExercises(cachedExercises);
    } catch (err) {
      console.error('Error fetching Athly data:', err);
      // Fallback to default demo baseline
      const initial = getInitialDemoState();
      setProfile(initial.profile);
      setActivity(initial.activity);
      setTodayMeals(initial.todayMeals);
      setDailyProgress(initial.dailyProgress);
      setRewards(initial.rewards);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAllData();
  }, [currentUser]);

  // Profile update with both live sync and persistent local demo fallback
  const updateProfile = async (updatedProfile) => {
    try {
      const res = await apiClient.updateProfile(updatedProfile);
      if (!res._isFallback) {
        setProfile(res);
        const newPlan = await apiClient.getFitnessPlan();
        setPlan(newPlan);
        showToast("Profile synchronized & saved to database.");
        return { success: true, isFallback: false, isLive: true };
      }
    } catch (err) {
      console.info("[ATHLY DEMO] Backend offline, saving to local demo session:", err.message);
    }

    // Local Demo Mode Update & Recalculation
    const h = Number(updatedProfile.height) || 178;
    const w = Number(updatedProfile.weight) || 75.5;
    const a = Number(updatedProfile.age) || 27;
    const g = updatedProfile.gender || 'Male';
    const bmiVal = (w / ((h / 100) ** 2)).toFixed(1);
    const bmrVal = Math.round(10 * w + 6.25 * h - 5 * a + (g === 'Male' ? 5 : -161));

    let calBudget = Math.round(bmrVal * 1.55);
    if (updatedProfile.fitnessGoal === 'Muscle Gain') calBudget += 350;
    else if (updatedProfile.fitnessGoal === 'Fat Loss') calBudget -= 400;
    else if (updatedProfile.fitnessGoal === 'Endurance') calBudget += 200;

    const protBudget = Math.round(w * 2.2);

    const demoProfile = {
      ...updatedProfile,
      bmi: bmiVal,
      bmr: bmrVal,
      _isFallback: true,
      _isDemo: true
    };
    setProfile(demoProfile);
    saveDemoToStorage('profile', demoProfile);

    // Update correlated targets in plan and dailyProgress
    if (plan) {
      const updatedPlan = {
        ...plan,
        dailyCalorieTarget: calBudget,
        dailyProteinTarget: protBudget
      };
      setPlan(updatedPlan);
      saveDemoToStorage('plan', updatedPlan);
    }

    if (dailyProgress) {
      const updatedProgress = {
        ...dailyProgress,
        targetCalories: calBudget,
        targetProtein: protBudget
      };
      setDailyProgress(updatedProgress);
      saveDemoToStorage('dailyProgress', updatedProgress);
    }

    showToast("Profile updated in local demo session (targets recalculated).");
    return { success: true, isFallback: true, isDemo: true };
  };

  const addMealAnalysis = async (mealData) => {
    try {
      const result = await apiClient.analyzeMeal(mealData);
      if (!result) {
        throw new Error('Analysis returned no data');
      }

      const newMeal = {
        id: result.logId || Date.now(),
        mealType: mealData.mealType || result.mealType || 'LUNCH',
        foodName: result.identifiedFood,
        calories: result.totalCalories,
        protein: result.totalProtein,
        carbs: result.totalCarbs,
        fats: result.totalFats,
        fiber: result.totalFiber || 5,
        imageUrl: result.imageUrl || mealData.imageUrl || null,
        timeAgo: 'Just now'
      };
      const updatedMeals = [newMeal, ...(todayMeals || [])];
      setTodayMeals(updatedMeals);
      saveDemoToStorage('todayMeals', updatedMeals);

      const curCal = (dailyProgress?.consumedCalories || 1840) + result.totalCalories;
      const curProt = (dailyProgress?.consumedProtein || 132) + result.totalProtein;
      const curCarbs = (dailyProgress?.consumedCarbs || 185) + result.totalCarbs;
      const curFats = (dailyProgress?.consumedFats || 56) + result.totalFats;
      const updatedProgress = {
        ...(dailyProgress || {}),
        consumedCalories: curCal,
        consumedProtein: curProt,
        consumedCarbs: curCarbs,
        consumedFats: curFats
      };
      setDailyProgress(updatedProgress);
      saveDemoToStorage('dailyProgress', updatedProgress);

      const curPoints = (rewards?.totalPoints || 680) + 35;
      const curLevel = Math.floor(curPoints / 500) + 1;
      const updatedRewards = {
        ...(rewards || {}),
        totalPoints: curPoints,
        level: curLevel,
        pointsToNextLevel: curLevel * 500 - curPoints
      };
      setRewards(updatedRewards);
      saveDemoToStorage('rewards', updatedRewards);

      showToast(`Analyzed ${result.identifiedFood}! +35 XP earned.`);
      return result;
    } catch (err) {
      console.error('Error analyzing meal:', err);
      showToast('Could not complete meal analysis. Please try again.', 'error');
      throw err;
    }
  };

  const addWater = async (amount = 250) => {
    const curWater = (activity?.waterIntakeMl || 2250) + amount;
    const targetWater = plan?.dailyWaterTargetMl || 3200;
    const updatedActivity = {
      ...(activity || {}),
      waterIntakeMl: curWater
    };
    setActivity(updatedActivity);
    saveDemoToStorage('activity', updatedActivity);

    const updatedProgress = {
      ...(dailyProgress || {}),
      waterIntakeMl: curWater
    };
    setDailyProgress(updatedProgress);
    saveDemoToStorage('dailyProgress', updatedProgress);

    const updatedGoals = (rewards?.dailyGoals || []).map(g => {
      if (g.id === 'dg-2') {
        const pct = Math.min(100, Math.round((curWater / targetWater) * 100));
        return {
          ...g,
          targetText: `${curWater.toLocaleString()} / ${targetWater.toLocaleString()} ml`,
          progressPercent: pct,
          completed: curWater >= targetWater
        };
      }
      return g;
    });
    const curPoints = (rewards?.totalPoints || 680) + 10;
    const curLevel = Math.floor(curPoints / 500) + 1;
    const updatedRewards = {
      ...(rewards || {}),
      totalPoints: curPoints,
      level: curLevel,
      pointsToNextLevel: curLevel * 500 - curPoints,
      dailyGoals: updatedGoals
    };
    setRewards(updatedRewards);
    saveDemoToStorage('rewards', updatedRewards);

    showToast(`Logged +${amount}ml water! (${curWater.toLocaleString()}ml total) &bull; +10 XP earned.`);
    apiClient.addWater(amount).catch(() => {});
  };

  const addSteps = async (stepsToAdd = 1000) => {
    const curSteps = (activity?.steps || 7420) + stepsToAdd;
    const targetSteps = plan?.dailyStepTarget || 10000;
    const stepPct = Math.min(100, Math.round((curSteps / targetSteps) * 1000) / 10);
    const updatedActivity = {
      ...(activity || {}),
      steps: curSteps,
      distanceKm: Number(((activity?.distanceKm || 5.78) + (stepsToAdd * 0.00078)).toFixed(2)),
      caloriesBurned: (activity?.caloriesBurned || 540) + Math.round(stepsToAdd * 0.04)
    };
    setActivity(updatedActivity);
    saveDemoToStorage('activity', updatedActivity);

    const updatedProgress = {
      ...(dailyProgress || {}),
      currentSteps: curSteps,
      stepsPercentage: stepPct,
      caloriesBurned: updatedActivity.caloriesBurned
    };
    setDailyProgress(updatedProgress);
    saveDemoToStorage('dailyProgress', updatedProgress);

    const updatedGoals = (rewards?.dailyGoals || []).map(g => {
      if (g.id === 'dg-1') {
        return {
          ...g,
          targetText: `${curSteps.toLocaleString()} / ${targetSteps.toLocaleString()} steps`,
          progressPercent: stepPct,
          completed: curSteps >= targetSteps
        };
      }
      return g;
    });
    const curPoints = (rewards?.totalPoints || 680) + 15;
    const curLevel = Math.floor(curPoints / 500) + 1;
    const updatedRewards = {
      ...(rewards || {}),
      totalPoints: curPoints,
      level: curLevel,
      pointsToNextLevel: curLevel * 500 - curPoints,
      dailyGoals: updatedGoals
    };
    setRewards(updatedRewards);
    saveDemoToStorage('rewards', updatedRewards);

    showToast(`Added +${stepsToAdd.toLocaleString()} steps! (${curSteps.toLocaleString()} total) &bull; +15 XP earned.`);
    apiClient.addSteps(stepsToAdd).catch(() => {});
  };

  const logWorkoutSession = async (workoutData) => {
    const updatedActivity = {
      ...(activity || {}),
      workoutType: workoutData.workoutType,
      workoutDurationMinutes: (activity?.workoutDurationMinutes || 50) + workoutData.workoutDurationMinutes,
      workoutCalories: (activity?.workoutCalories || 380) + workoutData.workoutCalories,
      activeMinutes: (activity?.activeMinutes || 52) + workoutData.workoutDurationMinutes,
      caloriesBurned: (activity?.caloriesBurned || 540) + workoutData.workoutCalories
    };
    setActivity(updatedActivity);
    saveDemoToStorage('activity', updatedActivity);

    const updatedProgress = {
      ...(dailyProgress || {}),
      workoutCompleted: true,
      workoutSummary: workoutData.workoutType,
      caloriesBurned: updatedActivity.caloriesBurned
    };
    setDailyProgress(updatedProgress);
    saveDemoToStorage('dailyProgress', updatedProgress);

    const updatedGoals = (rewards?.dailyGoals || []).map(g => {
      if (g.id === 'dg-4') {
        return {
          ...g,
          targetText: workoutData.workoutType,
          progressPercent: 100,
          completed: true
        };
      }
      return g;
    });
    const curPoints = (rewards?.totalPoints || 680) + 50;
    const curLevel = Math.floor(curPoints / 500) + 1;
    const updatedRewards = {
      ...(rewards || {}),
      totalPoints: curPoints,
      level: curLevel,
      pointsToNextLevel: curLevel * 500 - curPoints,
      dailyGoals: updatedGoals
    };
    setRewards(updatedRewards);
    saveDemoToStorage('rewards', updatedRewards);

    showToast(`Logged ${workoutData.workoutType}! +50 XP earned.`);
    apiClient.logActivity(workoutData).catch(() => {});
  };

  const claimRewardGoal = (goalId, points) => {
    let goalTitle = 'Challenge';
    const updatedDaily = (rewards?.dailyGoals || []).map(g => {
      if (g.id === goalId) {
        goalTitle = g.title;
        return { ...g, claimed: true };
      }
      return g;
    });
    const updatedWeekly = (rewards?.weeklyGoals || []).map(g => {
      if (g.id === goalId) {
        goalTitle = g.title;
        return { ...g, claimed: true };
      }
      return g;
    });
    const curPoints = (rewards?.totalPoints || 680) + points;
    const curLevel = Math.floor(curPoints / 500) + 1;
    const updatedRewards = {
      ...(rewards || {}),
      totalPoints: curPoints,
      level: curLevel,
      pointsToNextLevel: curLevel * 500 - curPoints,
      dailyGoals: updatedDaily,
      weeklyGoals: updatedWeekly
    };
    setRewards(updatedRewards);
    saveDemoToStorage('rewards', updatedRewards);
    showToast(`Claimed +${points} XP for ${goalTitle}!`);
  };

  const dailyCheckIn = () => {
    const curPoints = (rewards?.totalPoints || 680) + 15;
    const curStreak = (rewards?.currentStreakDays || 5) + 1;
    const curLevel = Math.floor(curPoints / 500) + 1;
    const updatedRewards = {
      ...(rewards || {}),
      totalPoints: curPoints,
      level: curLevel,
      currentStreakDays: curStreak,
      pointsToNextLevel: curLevel * 500 - curPoints
    };
    setRewards(updatedRewards);
    saveDemoToStorage('rewards', updatedRewards);
    showToast(`Checked in! +15 XP earned & streak extended to ${curStreak} days.`);
  };

  const toggleExercise = (dayIndex, exerciseIndex) => {
    const key = `${dayIndex}-${exerciseIndex}`;
    const nextState = {
      ...completedExercises,
      [key]: !completedExercises[key]
    };
    setCompletedExercises(nextState);
    saveDemoToStorage('completedExercises', nextState);
  };

  const resetDemoData = () => {
    try {
      localStorage.removeItem(DEMO_STORAGE_KEY);
    } catch (e) {}
    refreshAllData();
    showToast("Demo state reset to initial baseline.");
  };

  return (
    <AthlyContext.Provider
      value={{
        activeTab,
        setActiveTab,
        profile,
        plan,
        activity,
        todayMeals,
        dailyProgress,
        weeklyProgress,
        aiFeedback,
        rewards,
        completedExercises,
        loading,
        toastMessage,
        showToast,
        backendHealth,
        updateProfile,
        addMealAnalysis,
        addWater,
        addSteps,
        logWorkoutSession,
        claimRewardGoal,
        dailyCheckIn,
        toggleExercise,
        resetDemoData,
        refreshAllData
      }}
    >
      {children}
    </AthlyContext.Provider>
  );
};

export const useAthly = () => {
  const context = useContext(AthlyContext);
  if (!context) {
    throw new Error('useAthly must be used within an AthlyProvider');
  }
  return context;
};
