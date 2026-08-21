import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../api/apiClient';

const AthlyContext = createContext(null);

export const AthlyProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('progress'); // 'profile', 'planner', 'meals', 'activity', 'progress', 'rewards'
  const [profile, setProfile] = useState(null);
  const [plan, setPlan] = useState(null);
  const [activity, setActivity] = useState(null);
  const [todayMeals, setTodayMeals] = useState([]);
  const [dailyProgress, setDailyProgress] = useState(null);
  const [weeklyProgress, setWeeklyProgress] = useState(null);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [rewards, setRewards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const refreshAllData = async () => {
    try {
      setLoading(true);
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

      setProfile(profileData);
      setPlan(planData);
      setActivity(activityData);
      setTodayMeals(mealsData);
      setDailyProgress(progressData);
      setWeeklyProgress(weeklyData);
      setAiFeedback(aiData);
      setRewards(rewardData);
    } catch (err) {
      console.error('Error fetching Athly data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  const updateProfile = async (updatedProfile) => {
    try {
      const res = await apiClient.updateProfile(updatedProfile);
      setProfile(res);
      // Refresh plan automatically as it adapts to updated user profile
      const newPlan = await apiClient.getFitnessPlan();
      setPlan(newPlan);
      showToast("Profile & Personalized Plan successfully updated!");
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  const addMealAnalysis = async (mealData) => {
    try {
      const result = await apiClient.analyzeMeal(mealData);
      const newMeals = await apiClient.getTodayMeals();
      setTodayMeals(newMeals);
      
      // Update daily progress & rewards
      const progress = await apiClient.getDailyProgress();
      setDailyProgress(progress);
      const updatedRewards = await apiClient.getRewardSummary();
      setRewards(updatedRewards);
      const updatedFeedback = await apiClient.getAiFeedback();
      setAiFeedback(updatedFeedback);

      showToast(`Analyzed ${result.identifiedFood}! +35 XP earned.`);
      return result;
    } catch (err) {
      console.error("Error analyzing meal", err);
    }
  };

  const addWater = async (amount = 250) => {
    try {
      await apiClient.addWater(amount);
      const updatedAct = await apiClient.getTodayActivity();
      setActivity(updatedAct);
      const updatedProg = await apiClient.getDailyProgress();
      setDailyProgress(updatedProg);
      const updatedRewards = await apiClient.getRewardSummary();
      setRewards(updatedRewards);
      showToast(`Logged +${amount}ml water! +10 XP earned.`);
    } catch (err) {
      console.error("Error adding water", err);
    }
  };

  const addSteps = async (steps = 1000) => {
    try {
      await apiClient.addSteps(steps);
      const updatedAct = await apiClient.getTodayActivity();
      setActivity(updatedAct);
      const updatedProg = await apiClient.getDailyProgress();
      setDailyProgress(updatedProg);
      showToast(`Added +${steps} steps to today's log!`);
    } catch (err) {
      console.error("Error adding steps", err);
    }
  };

  const logWorkoutSession = async (workoutData) => {
    try {
      await apiClient.logActivity(workoutData);
      const updatedAct = await apiClient.getTodayActivity();
      setActivity(updatedAct);
      const updatedProg = await apiClient.getDailyProgress();
      setDailyProgress(updatedProg);
      const updatedRewards = await apiClient.getRewardSummary();
      setRewards(updatedRewards);
      showToast(`Workout logged! +50 XP earned.`);
    } catch (err) {
      console.error("Error logging workout", err);
    }
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
        loading,
        toastMessage,
        showToast,
        updateProfile,
        addMealAnalysis,
        addWater,
        addSteps,
        logWorkoutSession,
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
