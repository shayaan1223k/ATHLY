import React from 'react';
import { useAthly } from '../../context/AthlyContext';
import { AiFeedbackCard } from './AiFeedbackCard';
import { 
  LineChart, 
  TrendingUp, 
  Target, 
  Flame, 
  Footprints, 
  Scale, 
  Award,
  Calendar,
  CheckCircle2
} from 'lucide-react';

export const ProgressAnalyticsView = () => {
  const { dailyProgress, weeklyProgress, aiFeedback, profile } = useAthly();

  const weeklyTrend = weeklyProgress?.weeklyTrend || [
    { day: "Mon", steps: 8900, caloriesBurned: 480, weight: 76.4, completionRate: 89 },
    { day: "Tue", steps: 10450, caloriesBurned: 620, weight: 76.2, completionRate: 100 },
    { day: "Wed", steps: 9200, caloriesBurned: 510, weight: 76.0, completionRate: 92 },
    { day: "Thu", steps: 11200, caloriesBurned: 680, weight: 75.8, completionRate: 100 },
    { day: "Fri", steps: 9800, caloriesBurned: 540, weight: 75.7, completionRate: 98 },
    { day: "Sat", steps: 12400, caloriesBurned: 720, weight: 75.6, completionRate: 100 },
    { day: "Sun", steps: 7420, caloriesBurned: 540, weight: 75.5, completionRate: 74 }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <LineChart className="w-5 h-5 text-emerald-400" />
              <h1 className="text-xl font-bold text-white">Progress & Performance Analytics</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Holistic view of daily accomplishments, weekly body composition changes, and AI feedback.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">7-Day Weight Delta</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">-0.9 kg</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">Weekly Adherence</span>
              <span className="text-sm font-bold text-teal-400 font-mono">91.2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Feedback Banner */}
      <AiFeedbackCard feedback={aiFeedback} />

      {/* Daily Progress Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Score */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Daily Health Score</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">
            {dailyProgress?.overallProgressScore || 82.5}%
          </div>
          <div className="text-[11px] text-slate-400">Composite score based on steps, calories & macros</div>
        </div>

        {/* Steps Today */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Daily Steps</span>
            <Footprints className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {(dailyProgress?.currentSteps || 7420).toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">Goal: {(dailyProgress?.targetSteps || 10000).toLocaleString()} ({dailyProgress?.stepsPercentage || 74.2}%)</div>
        </div>

        {/* Net Calories */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Net Calories</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {dailyProgress?.netCalories || 1300} <span className="text-xs font-normal text-slate-400">kcal</span>
          </div>
          <div className="text-[11px] text-slate-400">In: {dailyProgress?.consumedCalories || 1840} | Burned: {dailyProgress?.caloriesBurned || 540}</div>
        </div>

        {/* Protein Target */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Protein Adherence</span>
            <TrendingUp className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {dailyProgress?.consumedProtein || 132} <span className="text-xs font-normal text-slate-400">/ {dailyProgress?.targetProtein || 165}g</span>
          </div>
          <div className="text-[11px] text-rose-400">80% of daily muscle target</div>
        </div>
      </div>

      {/* Weekly Visual Trends & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Steps & Activity Bar Chart */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">7-Day Step Volume</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Avg: 9,910 steps/day</span>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-800">
            {weeklyTrend.map((d, i) => {
              const heightPercent = Math.min(100, (d.steps / 13000) * 100);
              const isToday = i === 6;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 font-mono transition">
                    {(d.steps / 1000).toFixed(1)}k
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-lg transition-all ${
                      isToday
                        ? 'bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-glow-green'
                        : 'bg-slate-700 group-hover:bg-emerald-500/60'
                    }`}
                  />
                  <span className={`text-[11px] font-semibold ${isToday ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Daily 10,000 Step Benchmark: Achieved on 4 of 7 days</span>
          </div>
        </div>

        {/* Weight & Body Composition Progression */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Weight & Composition Trend</h3>
            </div>
            <span className="text-xs text-emerald-400 font-bold font-mono">Current: 75.5 kg</span>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Starting Weight (Mon):</span>
              <span className="text-slate-200 font-mono font-semibold">76.4 kg</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Current Weight (Today):</span>
              <span className="text-emerald-400 font-mono font-bold">75.5 kg (-0.9 kg)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Estimated Body Fat %:</span>
              <span className="text-teal-400 font-mono font-semibold">14.8% (-0.3%)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Goal Target Weight:</span>
              <span className="text-white font-mono font-semibold">78.0 kg (Lean Bulk Target)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
