import React, { useState } from 'react';
import { useAthly } from '../../context/AthlyContext';
import { PageHeader } from '../common/PageHeader';
import { DemoBadge } from '../common/DemoBadge';
import { 
  Footprints, 
  Flame, 
  Droplet, 
  Dumbbell, 
  Plus, 
  MapPin, 
  Heart, 
  CheckCircle2
} from 'lucide-react';

/**
 * ActivityTrackingView
 * Real-time biometric movement, hydration telemetry, and workout logger redesigned
 * with luxury wellness editorial aesthetic: Warm Ivory surfaces, hairline Stone borders,
 * JetBrains Mono metrics, and authentic athletic photography.
 */
export const ActivityTrackingView = () => {
  const { activity, plan, addWater, addSteps, logWorkoutSession } = useAthly();
  const [workoutType, setWorkoutType] = useState('Strength Training');
  const [duration, setDuration] = useState(45);
  const [calories, setCalories] = useState(360);
  const [loggedSuccess, setLoggedSuccess] = useState(false);

  const handleWorkoutSubmit = async (e) => {
    e.preventDefault();
    await logWorkoutSession({
      workoutType,
      workoutDurationMinutes: Number(duration),
      workoutCalories: Number(calories)
    });
    setLoggedSuccess(true);
    setTimeout(() => setLoggedSuccess(false), 3000);
  };

  const steps = activity?.steps || 7420;
  const targetSteps = plan?.dailyStepTarget || 10000;
  const stepPercent = Math.min(100, Math.round((steps / targetSteps) * 100));

  const water = activity?.waterIntakeMl || 2250;
  const targetWater = plan?.dailyWaterTargetMl || 3200;
  const waterPercent = Math.min(100, Math.round((water / targetWater) * 100));

  return (
    <div className="space-y-8">
      {/* Editorial Page Header with Movement Photography Banner */}
      <PageHeader
        category="BIOMETRICS &bull; REAL-TIME TELEMETRY"
        title="Daily Activity & Biometric Tracking"
        subtitle="Continuous step volume, distance, active caloric expenditure, and measured hydration telemetry."
        badge={<DemoBadge text="Curated Telemetry Stream" />}
        actions={
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#FAF8F3] border border-[#D9D5CB] text-[10px] font-mono uppercase tracking-[0.14em] text-[#171916]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5D99A] animate-pulse" />
            <span>Telemetry Synchronized</span>
          </div>
        }
        imageSrc="https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Outdoor athletic conditioning and endurance movement"
        imageAspectRatio="aspect-[24/7]"
      />

      {/* 4 Primary Biometric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Steps Card */}
        <div className="p-5 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48]">
              Step Counter
            </span>
            <Footprints className="w-4 h-4 text-[#4B4F48] stroke-[1.75]" />
          </div>
          <div>
            <div className="font-mono text-3xl font-medium text-[#171916] tracking-tight">
              {steps.toLocaleString()}
            </div>
            <p className="text-[11px] text-[#4B4F48] mt-1 font-sans">
              Goal: {targetSteps.toLocaleString()} steps ({stepPercent}%)
            </p>
          </div>
          <div className="w-full bg-[#EBE7DC] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#C5D99A] h-full rounded-full"
              style={{ width: `${stepPercent}%` }}
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => addSteps(500)}
              className="flex-1 py-1.5 rounded bg-[#F4F1E9] hover:bg-[#EBE7DC] text-[10px] font-mono text-[#171916] border border-[#D9D5CB] transition-colors"
            >
              +500 Steps
            </button>
            <button
              type="button"
              onClick={() => addSteps(2000)}
              className="flex-1 py-1.5 rounded bg-[#171916] hover:bg-[#282B26] text-[10px] font-mono text-[#F4F1E9] transition-colors"
            >
              +2,000 Steps
            </button>
          </div>
        </div>

        {/* Distance Card */}
        <div className="p-5 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48]">
              Distance Traveled
            </span>
            <MapPin className="w-4 h-4 text-[#4B4F48] stroke-[1.75]" />
          </div>
          <div>
            <div className="font-mono text-3xl font-medium text-[#171916] tracking-tight">
              {activity?.distanceKm || 5.78}{' '}
              <span className="text-xs font-normal text-[#4B4F48]">km</span>
            </div>
            <p className="text-[11px] text-[#4B4F48] mt-1 font-sans">
              ~{((activity?.distanceKm || 5.78) * 0.621371).toFixed(2)} linear miles
            </p>
          </div>
          <div className="w-full bg-[#EBE7DC] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#171916] h-full rounded-full" style={{ width: '58%' }} />
          </div>
          <div className="p-2 rounded bg-[#F4F1E9] border border-[#D9D5CB] text-[11px] text-[#4B4F48] flex items-center justify-between font-mono">
            <span>Average Pace:</span>
            <span className="text-[#171916] font-medium">9:12 / km</span>
          </div>
        </div>

        {/* Active Energy Expended */}
        <div className="p-5 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48]">
              Active Caloric Output
            </span>
            <Flame className="w-4 h-4 text-[#4B4F48] stroke-[1.75]" />
          </div>
          <div>
            <div className="font-mono text-3xl font-medium text-[#171916] tracking-tight">
              {activity?.caloriesBurned || 540}{' '}
              <span className="text-xs font-normal text-[#4B4F48]">kcal</span>
            </div>
            <p className="text-[11px] text-[#4B4F48] mt-1 font-sans">
              Active exertion: {activity?.activeMinutes || 52} minutes
            </p>
          </div>
          <div className="w-full bg-[#EBE7DC] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#171916] h-full rounded-full" style={{ width: '68%' }} />
          </div>
          <div className="p-2 rounded bg-[#F4F1E9] border border-[#D9D5CB] text-[11px] text-[#4B4F48] flex items-center justify-between font-mono">
            <span>Mean Heart Rate:</span>
            <span className="text-[#171916] font-medium flex items-center gap-1">
              <Heart className="w-3 h-3 fill-[#171916] text-[#171916]" /> 138 bpm
            </span>
          </div>
        </div>

        {/* Water Intake Tracker */}
        <div className="p-5 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48]">
              Hydration Volume
            </span>
            <Droplet className="w-4 h-4 text-[#4B4F48] stroke-[1.75]" />
          </div>
          <div>
            <div className="font-mono text-3xl font-medium text-[#171916] tracking-tight">
              {water}{' '}
              <span className="text-xs font-normal text-[#4B4F48]">/ {targetWater} ml</span>
            </div>
            <p className="text-[11px] text-[#4B4F48] mt-1 font-sans">
              {waterPercent}% of target volume
            </p>
          </div>
          <div className="w-full bg-[#EBE7DC] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#C5D99A] h-full rounded-full"
              style={{ width: `${waterPercent}%` }}
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => addWater(250)}
              className="flex-1 py-1.5 rounded bg-[#F4F1E9] hover:bg-[#EBE7DC] text-[10px] font-mono text-[#171916] border border-[#D9D5CB] transition-colors"
            >
              +250ml Carafe
            </button>
            <button
              type="button"
              onClick={() => addWater(500)}
              className="flex-1 py-1.5 rounded bg-[#171916] hover:bg-[#282B26] text-[10px] font-mono text-[#F4F1E9] transition-colors"
            >
              +500ml Flask
            </button>
          </div>
        </div>
      </div>

      {/* Workout Session Logger */}
      <div className="p-6 sm:p-7 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#D9D5CB]">
          <div className="flex items-center gap-2.5">
            <Dumbbell className="w-4 h-4 text-[#171916] stroke-[1.75]" />
            <h2 className="font-serif text-lg font-medium text-[#171916]">
              Record Completed Session (+50 XP)
            </h2>
          </div>
          <span className="text-xs font-mono text-[#4B4F48]">
            Current Session: {activity?.workoutType || 'Strength Training'}
          </span>
        </div>

        <form onSubmit={handleWorkoutSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48] mb-1.5">
              Discipline
            </label>
            <select
              value={workoutType}
              onChange={(e) => setWorkoutType(e.target.value)}
              className="w-full px-3 py-2.5 rounded bg-[#F4F1E9] border border-[#D9D5CB] text-[#171916] text-xs font-sans focus:outline-none focus:border-[#171916]"
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
            <label className="block text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48] mb-1.5">
              Duration (Minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="5"
              max="240"
              className="w-full px-3 py-2.5 rounded bg-[#F4F1E9] border border-[#D9D5CB] text-[#171916] text-xs font-mono focus:outline-none focus:border-[#171916]"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48] mb-1.5">
              Estimated Burn (kcal)
            </label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              min="50"
              max="2000"
              className="w-full px-3 py-2.5 rounded bg-[#F4F1E9] border border-[#D9D5CB] text-[#171916] text-xs font-mono focus:outline-none focus:border-[#171916]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded bg-[#171916] hover:bg-[#282B26] text-[#F4F1E9] text-xs font-medium tracking-wide transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            {loggedSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5D99A] stroke-[2]" />
                <span>Session Recorded</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[2]" />
                <span>Log Session & Sync</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
