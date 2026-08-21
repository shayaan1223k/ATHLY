import React, { useState, useEffect } from 'react';
import { useAthly } from '../../context/AthlyContext';
import { User, Activity, Target, Utensils, Award, Save, RefreshCw, CheckCircle2 } from 'lucide-react';

export const UserProfileView = () => {
  const { profile, updateProfile } = useAthly();
  const [formData, setFormData] = useState({
    id: 1,
    name: '',
    age: 25,
    height: 175,
    weight: 75,
    fitnessLevel: 'Intermediate',
    fitnessGoal: 'Muscle Gain',
    foodPreference: 'Non-Vegetarian',
    gender: 'Male'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        id: profile.id || 1,
        name: profile.name || 'Alex Hunter',
        age: profile.age || 27,
        height: profile.height || 178,
        weight: profile.weight || 75.5,
        fitnessLevel: profile.fitnessLevel || 'Intermediate',
        fitnessGoal: profile.fitnessGoal || 'Muscle Gain',
        foodPreference: profile.foodPreference || 'Non-Vegetarian',
        gender: profile.gender || 'Male'
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' || name === 'height' || name === 'weight' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await updateProfile(formData);
    setIsSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Real-time Estimated BMI & BMR calculations
  const heightMeters = (formData.height || 175) / 100;
  const bmi = (formData.weight / (heightMeters * heightMeters)).toFixed(1);
  const bmr = Math.round(10 * formData.weight + 6.25 * formData.height - 5 * formData.age + 5);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-400" />
              <h1 className="text-xl font-bold text-white">User Profile & Biometrics</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Configure your biological metrics, current experience level, training target, and dietary profile.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider">BMI Index</span>
              <span className="text-sm font-bold text-emerald-400">{bmi}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Basal BMR</span>
              <span className="text-sm font-bold text-teal-400">{bmr} kcal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              placeholder="e.g. Alex Hunter"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Age (Years)
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="12"
              max="100"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              min="80"
              max="250"
              step="0.5"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              min="30"
              max="250"
              step="0.1"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Fitness Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              Fitness Level
            </label>
            <select
              name="fitnessLevel"
              value={formData.fitnessLevel}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="Beginner">Beginner (0-6 months training)</option>
              <option value="Intermediate">Intermediate (6-24 months training)</option>
              <option value="Advanced">Advanced (2-5 years consistent training)</option>
              <option value="Elite">Elite / Competitive Athlete</option>
            </select>
          </div>

          {/* Fitness Goal */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-teal-400" />
              Fitness Goal
            </label>
            <select
              name="fitnessGoal"
              value={formData.fitnessGoal}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="Fat Loss">Fat Loss & Leanness</option>
              <option value="Muscle Gain">Muscle Gain & Hypertrophy</option>
              <option value="Endurance">Endurance & Cardiovascular Capacity</option>
              <option value="Maintenance">Maintenance & Overall Longevity</option>
            </select>
          </div>

          {/* Food Preference */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-amber-400" />
              Food Preference
            </label>
            <select
              name="foodPreference"
              value={formData.foodPreference}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="Non-Vegetarian">Non-Vegetarian (Omnivore)</option>
              <option value="Vegetarian">Vegetarian (Lacto-Ovo)</option>
              <option value="Vegan">Vegan (100% Plant-Based)</option>
              <option value="Keto">Ketogenic (High Fat / Low Carb)</option>
              <option value="Pescatarian">Pescatarian (Fish & Plants)</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            Updating biometrics triggers automatic recalculation of your daily calorie, step, and protein plans.
          </p>
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-glow-green transition disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Recalculating Plan...</span>
              </>
            ) : savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Saved & Synchronized</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile & Update Plan</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
