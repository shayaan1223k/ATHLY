import React, { useState } from 'react';
import { useAthly } from '../../context/AthlyContext';
import { 
  Footprints, 
  Flame, 
  Droplet, 
  Dumbbell, 
  Plus, 
  MapPin, 
  Clock, 
  Heart, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const ActivityTrackingView = () => {
  const { activity, plan, addWater, addSteps, logWorkoutSession } = useAthly();
  const [workoutType, setWorkoutType] = useState('Strength Training');
  const [duration, setDuration] = useState(45);
  const [calories, setCalories] = useState(360);

  const handleWorkoutSubmit = async (e) => {
    e.preventDefault();
    await logWorkoutSession({
      workoutType,
      workoutDurationMinutes: Number(duration),
      workoutCalories: Number(calories)
    });
  };

  const steps = activity?.steps || 7420;
  const targetSteps = plan?.dailyStepTarget || 10000;
  const stepPercent = Math.min(100, Math.round((steps / targetSteps) * 100));

  const water = activity?.waterIntakeMl || 2250;
  const targetWater = plan?.dailyWaterTargetMl || 3200;
  const waterPercent = Math.min(100, Math.round((water / targetWater) * 100));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Footprints className="w-5 h-5 text-emerald-400" />
              <h1 className="text-xl font-bold text-white">Daily Activity & Biometric Tracking</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Monitor real-time step counts, total distance covered, workout intensity, and hydration levels.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-4 h-4" />
            <span>Real-Time Sync</span>
          </div>
        </div>
      </div>

      {/* Main Trackers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Steps Card */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Step Counter</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Footprints className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-mono">
              {steps.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400">Goal: {targetSteps.toLocaleString()} steps ({stepPercent}%)</div>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${stepPercent}%` }} />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => addSteps(500)}
              className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-emerald-400 border border-slate-700/60"
            >
              +500 Steps
            </button>
            <button
              onClick={() => addSteps(2000)}
              className="flex-1 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-[11px] font-semibold text-emerald-300 border border-emerald-500/30"
            >
              +2,000 Steps
            </button>
          </div>
        </div>

        {/* Distance Card */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Distance Traveled</span>
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-mono">
              {activity?.distanceKm || 5.78} <span className="text-xs font-normal text-slate-400">km</span>
            </div>
            <div className="text-[11px] text-slate-400">~{((activity?.distanceKm || 5.78) * 0.621371).toFixed(2)} miles</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Pace:</span>
            <span className="text-white font-mono">9:12 / km</span>
          </div>
        </div>

        {/* Calories Burned Card */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Active Energy Burned</span>
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-mono">
              {activity?.caloriesBurned || 540} <span className="text-xs font-normal text-slate-400">kcal</span>
            </div>
            <div className="text-[11px] text-slate-400">Active: {activity?.activeMinutes || 52} minutes</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Avg Heart Rate:</span>
            <span className="text-rose-400 font-mono flex items-center gap-1">
              <Heart className="w-3 h-3 fill-rose-500" /> 138 bpm
            </span>
          </div>
        </div>

        {/* Water Intake Tracker */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Water Intake</span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Droplet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-mono">
              {water} <span className="text-xs font-normal text-slate-400">/ {targetWater} ml</span>
            </div>
            <div className="text-[11px] text-blue-400">{waterPercent}% completed</div>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${waterPercent}%` }} />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => addWater(250)}
              className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-blue-300 border border-slate-700/60"
            >
              +250ml
            </button>
            <button
              onClick={() => addWater(500)}
              className="flex-1 py-1.5 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 text-[11px] font-semibold text-blue-200 border border-blue-500/30"
            >
              +500ml
            </button>
          </div>
        </div>
      </div>

      {/* Workout Session Logger */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Log Workout Activity (+50 XP)</h2>
          </div>
          <span className="text-xs text-slate-400">Current Session: {activity?.workoutType || 'None logged'}</span>
        </div>

        <form onSubmit={handleWorkoutSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Workout Discipline</label>
            <select
              value={workoutType}
              onChange={(e) => setWorkoutType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="Chest & Triceps Hypertrophy">Chest & Triceps Hypertrophy</option>
              <option value="Back & Biceps Power">Back & Biceps Power</option>
              <option value="Legs & Posterior Chain">Legs & Posterior Chain</option>
              <option value="HIIT Conditioning">HIIT Conditioning</option>
              <option value="Zone-2 Cardio / Running">Zone-2 Cardio / Running</option>
              <option value="Yoga & Mobility">Yoga & Mobility</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Duration (Minutes)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="5"
              max="240"
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Estimated Burned (kcal)</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              min="50"
              max="2000"
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-glow-green transition flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Record Workout</span>
          </button>
        </form>
      </div>
    </div>
  );
};
