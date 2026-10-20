import React, { useState } from 'react';
import { useAthly } from '../../context/AthlyContext';
import { PageHeader } from '../common/PageHeader';
import { DemoBadge } from '../common/DemoBadge';
import { 
  Dumbbell, 
  Flame, 
  Footprints, 
  Beef, 
  Droplet, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Calendar,
  Check
} from 'lucide-react';

/**
 * FitnessPlannerView
 * Personalized workout split and nutrition protocol redesigned with luxury wellness
 * editorial aesthetic: Warm Ivory surfaces, hairline Stone borders, JetBrains Mono
 * tabular metrics, and editorial typography.
 */
export const FitnessPlannerView = () => {
  const { plan, profile, completedExercises: globalExercises, toggleExercise: globalToggleExercise } = useAthly();
  const [selectedDay, setSelectedDay] = useState(0);
  const [localExercises, setLocalExercises] = useState({});

  if (!plan) {
    return (
      <div className="p-16 text-center text-[#4B4F48] bg-[#FAF8F3] border border-[#D9D5CB] rounded-lg">
        <div className="w-8 h-8 mx-auto border-2 border-[#171916] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-serif text-lg text-[#171916]">Generating personalized fitness planner...</p>
        <p className="text-xs text-[#4B4F48] mt-1 font-sans">Calibrating biometrics and training splits</p>
      </div>
    );
  }

  const workouts = plan.weeklyWorkouts || [];
  const currentWorkout = workouts[selectedDay] || workouts[0];
  const completedExercises = globalExercises || localExercises;

  const toggleExercise = (exerciseIndex) => {
    if (globalToggleExercise) {
      globalToggleExercise(selectedDay, exerciseIndex);
    } else {
      const key = `${selectedDay}-${exerciseIndex}`;
      setLocalExercises((prev) => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  return (
    <div className="space-y-8">
      {/* Editorial Page Header with Athletic Photography Banner */}
      <PageHeader
        category="TRAINING SPLIT &bull; PERIODIZATION"
        title="Personalized Fitness Planner"
        subtitle={`Custom-tailored for ${profile?.name || 'Alex Hunter'} (${profile?.fitnessGoal || 'Muscle Gain'} &bull; ${profile?.fitnessLevel || 'Intermediate'})`}
        badge={<DemoBadge text="Curated Protocol Split" />}
        actions={
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#FAF8F3] border border-[#D9D5CB] text-[10px] font-mono uppercase tracking-[0.14em] text-[#171916]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5D99A]" />
            <span>AI Periodized Split</span>
          </div>
        }
        imageSrc="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Athletic strength conditioning and barbell training"
        imageAspectRatio="aspect-[24/7]"
      />

      {/* Target Metric Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Daily Calorie Target */}
        <div className="p-5 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48]">
              Calorie Target
            </span>
            <Flame className="w-4 h-4 text-[#4B4F48] stroke-[1.75]" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-medium text-[#171916] tracking-tight">
            {plan.dailyCalorieTarget || 2450}{' '}
            <span className="text-xs font-normal text-[#4B4F48]">kcal/d</span>
          </div>
          <p className="text-[11px] text-[#4B4F48] font-sans">Calculated via BMR + TDEE</p>
        </div>

        {/* Daily Protein Target */}
        <div className="p-5 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48]">
              Protein Budget
            </span>
            <Beef className="w-4 h-4 text-[#4B4F48] stroke-[1.75]" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-medium text-[#171916] tracking-tight">
            {plan.dailyProteinTarget || 165}{' '}
            <span className="text-xs font-normal text-[#4B4F48]">g/d</span>
          </div>
          <p className="text-[11px] text-[#4B4F48] font-sans">2.2g per kg bodyweight</p>
        </div>

        {/* Daily Step Target */}
        <div className="p-5 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48]">
              Step Benchmark
            </span>
            <Footprints className="w-4 h-4 text-[#4B4F48] stroke-[1.75]" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-medium text-[#171916] tracking-tight">
            {(plan.dailyStepTarget || 10000).toLocaleString()}{' '}
            <span className="text-xs font-normal text-[#4B4F48]">steps</span>
          </div>
          <p className="text-[11px] text-[#4B4F48] font-sans">Baseline daily NEAT</p>
        </div>

        {/* Daily Water Target */}
        <div className="p-5 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48]">
              Hydration Volume
            </span>
            <Droplet className="w-4 h-4 text-[#4B4F48] stroke-[1.75]" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-medium text-[#171916] tracking-tight">
            {plan.dailyWaterTargetMl || 3200}{' '}
            <span className="text-xs font-normal text-[#4B4F48]">ml/d</span>
          </div>
          <p className="text-[11px] text-[#4B4F48] font-sans">~6-8 measured carafes</p>
        </div>
      </div>

      {/* 7-Day Workout Schedule Split */}
      <div className="p-6 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#D9D5CB]">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-[#171916] stroke-[1.75]" />
            <h2 className="font-serif text-lg font-medium text-[#171916]">
              7-Day Training Schedule
            </h2>
          </div>
          <span className="text-xs text-[#4B4F48] font-sans max-w-md text-right">
            {plan.workoutPlanSummary}
          </span>
        </div>

        {/* Day Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {workouts.map((w, idx) => {
            const isSel = selectedDay === idx;
            return (
              <button
                key={w.dayName || idx}
                type="button"
                onClick={() => setSelectedDay(idx)}
                className={`p-3 rounded text-left transition-colors border ${
                  isSel
                    ? 'bg-[#171916] text-[#F4F1E9] border-[#171916]'
                    : 'bg-[#FAF8F3] text-[#4B4F48] border-[#D9D5CB] hover:border-[#171916] hover:text-[#171916]'
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-[0.14em] opacity-80">
                  {w.dayName}
                </div>
                <div className="text-xs font-medium truncate mt-1">
                  {w.focusArea}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Workout Detail Card */}
        {currentWorkout && (
          <div className="p-6 rounded bg-[#F4F1E9] border border-[#D9D5CB] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#D9D5CB]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48]">
                  {currentWorkout.dayName} Protocol
                </span>
                <h3 className="font-serif text-xl font-medium text-[#171916] mt-0.5">
                  {currentWorkout.focusArea}
                </h3>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="flex items-center gap-1.5 bg-[#FAF8F3] border border-[#D9D5CB] px-3 py-1 rounded text-[#171916]">
                  <Clock className="w-3.5 h-3.5 text-[#4B4F48] stroke-[1.75]" />
                  {currentWorkout.estimatedMinutes} Mins
                </span>
                <span className="flex items-center gap-1.5 bg-[#FAF8F3] border border-[#D9D5CB] px-3 py-1 rounded text-[#171916]">
                  <Flame className="w-3.5 h-3.5 text-[#4B4F48] stroke-[1.75]" />
                  ~{currentWorkout.estimatedCalories} kcal
                </span>
              </div>
            </div>

            {/* Exercises Table */}
            <div className="space-y-2">
              <div className="hidden sm:grid sm:grid-cols-12 text-[10px] uppercase tracking-[0.14em] font-mono text-[#4B4F48] px-3 py-1.5">
                <span className="col-span-5">Movement / Exercise</span>
                <span className="col-span-2 text-center">Volume Sets</span>
                <span className="col-span-2 text-center">Reps</span>
                <span className="col-span-3 text-right">Rest & Technique Cue</span>
              </div>

              {currentWorkout.exercises?.map((ex, i) => {
                const isCompleted = !!completedExercises[`${selectedDay}-${i}`];
                return (
                  <div
                    key={i}
                    onClick={() => toggleExercise(i)}
                    className={`p-3.5 rounded border transition-all cursor-pointer flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-2 text-xs ${
                      isCompleted
                        ? 'bg-[#EBF2DC] border-[#C5D99A]/80 text-[#282B26]'
                        : 'bg-[#FAF8F3] border-[#D9D5CB] text-[#171916] hover:border-[#171916]/40'
                    }`}
                  >
                    <div className="sm:col-span-5 font-medium flex items-center gap-2.5">
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono shrink-0 transition-colors ${
                          isCompleted
                            ? 'bg-[#171916] text-[#F4F1E9]'
                            : 'bg-[#EBE7DC] text-[#4B4F48]'
                        }`}
                      >
                        {isCompleted ? <Check className="w-3 h-3 stroke-[2.5]" /> : i + 1}
                      </div>
                      <span className={isCompleted ? 'line-through opacity-70' : ''}>
                        {ex.name}
                      </span>
                    </div>

                    <div className="sm:col-span-2 text-center font-mono">
                      <span className="sm:hidden text-[10px] text-[#4B4F48] mr-1">Sets: </span>
                      <span>{ex.sets}</span>
                    </div>

                    <div className="sm:col-span-2 text-center font-mono">
                      <span className="sm:hidden text-[10px] text-[#4B4F48] mr-1">Reps: </span>
                      <span>{ex.reps}</span>
                    </div>

                    <div className="sm:col-span-3 sm:text-right text-[11px] text-[#4B4F48]">
                      <span className="inline-block px-1.5 py-0.5 rounded bg-[#EBE7DC] text-[#171916] font-mono text-[10px] mr-2">
                        {ex.restSeconds}
                      </span>
                      <span className="italic font-sans">{ex.tips}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-[10px] font-mono text-[#4B4F48] pt-1">
              Click any exercise row to mark sets complete during your session.
            </div>
          </div>
        )}
      </div>

      {/* AI Diet & Macronutrient Protocol */}
      <div className="p-6 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-6">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#D9D5CB]">
          <Beef className="w-4 h-4 text-[#171916] stroke-[1.75]" />
          <h2 className="font-serif text-lg font-medium text-[#171916]">
            Nutritional Protocol & Macronutrient Balance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Protocol Recommendations */}
          <div className="space-y-2.5">
            {plan.dietRecommendations?.map((rec, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3.5 rounded bg-[#F4F1E9] border border-[#D9D5CB] text-xs text-[#171916]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#4B4F48] shrink-0 mt-0.5 stroke-[1.75]" />
                <span className="leading-relaxed font-sans">{rec}</span>
              </div>
            ))}
          </div>

          {/* Macronutrient Distribution Chart */}
          <div className="p-5 rounded bg-[#F4F1E9] border border-[#D9D5CB] flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48] block mb-3">
                Target Macronutrient Distribution
              </span>
              <div className="flex h-3 rounded-full overflow-hidden mb-4">
                <div style={{ width: '30%' }} className="bg-[#171916]" title="Protein 30%" />
                <div style={{ width: '45%' }} className="bg-[#9B8F7D]" title="Carbohydrates 45%" />
                <div style={{ width: '25%' }} className="bg-[#C5D99A]" title="Healthy Fats 25%" />
              </div>
              <div className="flex flex-wrap justify-between gap-2 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-[#171916]">
                  <span className="w-2 h-2 rounded-full bg-[#171916]" /> Protein 30%
                </span>
                <span className="flex items-center gap-1.5 text-[#4B4F48]">
                  <span className="w-2 h-2 rounded-full bg-[#9B8F7D]" /> Carbohydrates 45%
                </span>
                <span className="flex items-center gap-1.5 text-[#282B26]">
                  <span className="w-2 h-2 rounded-full bg-[#C5D99A]" /> Healthy Fats 25%
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#4B4F48] leading-relaxed p-3 rounded bg-[#FAF8F3] border border-[#D9D5CB] font-sans">
              Calibrated strictly for your selected food preference: <strong className="text-[#171916]">{profile?.foodPreference || 'Non-Vegetarian'}</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
