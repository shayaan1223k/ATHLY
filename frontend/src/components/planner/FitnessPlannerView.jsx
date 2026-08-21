import React, { useState } from 'react';
import { useAthly } from '../../context/AthlyContext';
import { 
  Dumbbell, 
  Flame, 
  Footprints, 
  Beef, 
  Droplet, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Zap,
  Info,
  Calendar
} from 'lucide-react';

export const FitnessPlannerView = () => {
  const { plan, profile } = useAthly();
  const [selectedDay, setSelectedDay] = useState(0);

  if (!plan) {
    return (
      <div className="p-8 text-center text-slate-400">
        <Sparkles className="w-8 h-8 mx-auto text-emerald-400 animate-spin mb-2" />
        Generating personalized fitness planner...
      </div>
    );
  }

  const workouts = plan.weeklyWorkouts || [];
  const currentWorkout = workouts[selectedDay] || workouts[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-emerald-400" />
              <h1 className="text-xl font-bold text-white">Personalized Fitness Planner</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Custom-tailored for <span className="text-emerald-400 font-semibold">{profile?.name || 'Athlete'}</span> ({profile?.fitnessGoal || 'Muscle Gain'} &bull; {profile?.fitnessLevel || 'Intermediate'})
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-4 h-4" />
            <span>AI Periodized Split</span>
          </div>
        </div>
      </div>

      {/* Target Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Daily Calorie Target */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Calorie Target</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">{plan.dailyCalorieTarget || 2450} <span className="text-xs font-normal text-slate-400">kcal/day</span></div>
          <div className="text-[11px] text-emerald-400 mt-1">Calculated via BMR + TDEE</div>
        </div>

        {/* Daily Protein Target */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Protein Target</span>
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <Beef className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">{plan.dailyProteinTarget || 165} <span className="text-xs font-normal text-slate-400">g/day</span></div>
          <div className="text-[11px] text-slate-400 mt-1">2.2g per kg bodyweight</div>
        </div>

        {/* Daily Step Target */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Step Target</span>
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Footprints className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">{(plan.dailyStepTarget || 10000).toLocaleString()} <span className="text-xs font-normal text-slate-400">steps</span></div>
          <div className="text-[11px] text-slate-400 mt-1">Baseline daily NEAT</div>
        </div>

        {/* Daily Water Target */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Hydration Target</span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Droplet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">{plan.dailyWaterTargetMl || 3200} <span className="text-xs font-normal text-slate-400">ml/day</span></div>
          <div className="text-[11px] text-slate-400 mt-1">~6-8 full glasses</div>
        </div>
      </div>

      {/* Weekly Workout Split Navigation */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">7-Day Workout Schedule</h2>
          </div>
          <span className="text-xs text-slate-400">{plan.workoutPlanSummary}</span>
        </div>

        {/* Days selector pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {workouts.map((w, idx) => {
            const isSel = selectedDay === idx;
            return (
              <button
                key={w.dayName || idx}
                onClick={() => setSelectedDay(idx)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isSel
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-glow-green'
                    : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="text-[11px] uppercase tracking-wider opacity-80">{w.dayName}</div>
                <div className="text-xs font-semibold truncate mt-1">{w.focusArea}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Workout Detail Card */}
        {currentWorkout && (
          <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  {currentWorkout.dayName} Focus
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">{currentWorkout.focusArea}</h3>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {currentWorkout.estimatedMinutes} Mins
                </span>
                <span className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  ~{currentWorkout.estimatedCalories} kcal
                </span>
              </div>
            </div>

            {/* Exercises Table */}
            <div className="space-y-2">
              <div className="hidden sm:grid sm:grid-cols-12 text-[11px] font-semibold text-slate-400 px-3 py-1">
                <span className="col-span-5">Exercise</span>
                <span className="col-span-2 text-center">Sets</span>
                <span className="col-span-2 text-center">Reps</span>
                <span className="col-span-3 text-right">Rest / Coaching Cue</span>
              </div>

              {currentWorkout.exercises?.map((ex, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-2 text-xs"
                >
                  <div className="sm:col-span-5 font-semibold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    <span>{ex.name}</span>
                  </div>
                  <div className="sm:col-span-2 text-slate-300 text-center">
                    <span className="sm:hidden text-slate-500 text-[10px] mr-1">Sets: </span>
                    <span className="font-mono">{ex.sets}</span>
                  </div>
                  <div className="sm:col-span-2 text-slate-300 text-center">
                    <span className="sm:hidden text-slate-500 text-[10px] mr-1">Reps: </span>
                    <span className="font-mono">{ex.reps}</span>
                  </div>
                  <div className="sm:col-span-3 text-slate-400 sm:text-right text-[11px]">
                    <span className="inline-block px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 mr-1.5 font-mono">
                      {ex.restSeconds}
                    </span>
                    <span className="italic">{ex.tips}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Diet & Macro Recommendations */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Beef className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">AI Diet & Nutrition Protocol</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2.5">
            {plan.dietRecommendations?.map((rec, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 block mb-2">Target Macronutrient Distribution</span>
              <div className="flex h-4 rounded-full overflow-hidden mb-3">
                <div style={{ width: '30%' }} className="bg-rose-500" title="Protein 30%" />
                <div style={{ width: '45%' }} className="bg-amber-500" title="Carbohydrates 45%" />
                <div style={{ width: '25%' }} className="bg-teal-500" title="Fats 25%" />
              </div>
              <div className="flex justify-between text-xs font-medium">
                <span className="flex items-center gap-1 text-rose-400"><span className="w-2 h-2 rounded-full bg-rose-500"/> Protein (30%)</span>
                <span className="flex items-center gap-1 text-amber-400"><span className="w-2 h-2 rounded-full bg-amber-500"/> Carbs (45%)</span>
                <span className="flex items-center gap-1 text-teal-400"><span className="w-2 h-2 rounded-full bg-teal-500"/> Fats (25%)</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              Dietary recommendations are adjusted based on your selected food preference ({profile?.foodPreference || 'Omnivore'}).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
