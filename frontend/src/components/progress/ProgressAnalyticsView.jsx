import React from 'react';
import { useAthly } from '../../context/AthlyContext';
import { AiFeedbackCard } from './AiFeedbackCard';
import { PageHeader } from '../common/PageHeader';
import { DemoBadge } from '../common/DemoBadge';
import { 
  Target, 
  Flame, 
  Footprints, 
  Scale, 
  Calendar,
  Activity,
  ArrowUpRight
} from 'lucide-react';

/**
 * ProgressAnalyticsView
 * Daily overview & biometric progress analytics redesigned with luxury wellness
 * editorial aesthetic: Warm Ivory surfaces, hairline Stone dividers, JetBrains Mono
 * tabular metrics, and Aesop-style editorial dispatch.
 */
export const ProgressAnalyticsView = () => {
  const { dailyProgress, weeklyProgress, aiFeedback } = useAthly();

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
    <div className="space-y-8">
      {/* Editorial Page Header */}
      <PageHeader
        category="PROTOCOL OVERVIEW &bull; DAY 14"
        title="Daily Progress & Performance"
        subtitle="Holistic biometric telemetry, 7-day movement volume, body composition trend, and AI coach dispatch."
        badge={<DemoBadge text="Curated Protocol Telemetry" />}
        actions={
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded bg-[#FAF8F3] border border-[#D9D5CB] text-right">
              <span className="text-[9px] uppercase tracking-[0.16em] text-[#4B4F48] font-mono block">
                7-Day Delta
              </span>
              <span className="text-xs font-mono font-medium text-[#171916]">
                -0.9 kg
              </span>
            </div>
            <div className="px-3 py-1.5 rounded bg-[#FAF8F3] border border-[#D9D5CB] text-right">
              <span className="text-[9px] uppercase tracking-[0.16em] text-[#4B4F48] font-mono block">
                Adherence
              </span>
              <span className="text-xs font-mono font-medium text-[#171916]">
                91.2%
              </span>
            </div>
          </div>
        }
      />

      {/* AI Feedback Dispatch Banner */}
      <AiFeedbackCard feedback={aiFeedback} />

      {/* 4 Core Daily Biometric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Daily Health Score */}
        <div className="p-5 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48]">
              Daily Health Score
            </span>
            <Target className="w-4 h-4 text-[#4B4F48] stroke-[1.75]" />
          </div>
          <div>
            <div className="font-mono text-3xl font-medium text-[#171916] tracking-tight">
              {dailyProgress?.overallProgressScore || 82.5}%
            </div>
            <p className="text-[11px] text-[#4B4F48] mt-1 font-sans">
              Composite score &bull; steps, energy & macros
            </p>
          </div>
          <div className="w-full bg-[#EBE7DC] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#171916] h-full rounded-full"
              style={{ width: `${dailyProgress?.overallProgressScore || 82.5}%` }}
            />
          </div>
        </div>

        {/* Daily Steps */}
        <div className="p-5 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48]">
              Daily Movement
            </span>
            <Footprints className="w-4 h-4 text-[#4B4F48] stroke-[1.75]" />
          </div>
          <div>
            <div className="font-mono text-3xl font-medium text-[#171916] tracking-tight">
              {(dailyProgress?.currentSteps || 7420).toLocaleString()}
            </div>
            <p className="text-[11px] text-[#4B4F48] mt-1 font-sans">
              Goal: {(dailyProgress?.targetSteps || 10000).toLocaleString()} steps ({dailyProgress?.stepsPercentage || 74.2}%)
            </p>
          </div>
          <div className="w-full bg-[#EBE7DC] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#C5D99A] h-full rounded-full"
              style={{ width: `${Math.min(100, dailyProgress?.stepsPercentage || 74.2)}%` }}
            />
          </div>
        </div>

        {/* Net Calories */}
        <div className="p-5 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48]">
              Net Calorie Balance
            </span>
            <Flame className="w-4 h-4 text-[#4B4F48] stroke-[1.75]" />
          </div>
          <div>
            <div className="font-mono text-3xl font-medium text-[#171916] tracking-tight">
              {dailyProgress?.netCalories || 1300}{' '}
              <span className="text-xs font-normal text-[#4B4F48]">kcal</span>
            </div>
            <p className="text-[11px] text-[#4B4F48] mt-1 font-sans">
              Intake: {dailyProgress?.consumedCalories || 1840} | Active: {dailyProgress?.caloriesBurned || 540}
            </p>
          </div>
          <div className="w-full bg-[#EBE7DC] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#171916] h-full rounded-full"
              style={{ width: '65%' }}
            />
          </div>
        </div>

        {/* Protein Adherence */}
        <div className="p-5 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48]">
              Protein Synthesis
            </span>
            <Activity className="w-4 h-4 text-[#4B4F48] stroke-[1.75]" />
          </div>
          <div>
            <div className="font-mono text-3xl font-medium text-[#171916] tracking-tight">
              {dailyProgress?.consumedProtein || 132}{' '}
              <span className="text-xs font-normal text-[#4B4F48]">
                / {dailyProgress?.targetProtein || 165}g
              </span>
            </div>
            <p className="text-[11px] text-[#4B4F48] mt-1 font-sans">
              80% of daily muscle recovery budget
            </p>
          </div>
          <div className="w-full bg-[#EBE7DC] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#C5D99A] h-full rounded-full"
              style={{ width: '80%' }}
            />
          </div>
        </div>
      </div>

      {/* Weekly Visual Trends & Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 7-Day Step Volume Spectrum */}
        <div className="p-6 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9D5CB]">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#171916] stroke-[1.75]" />
              <h3 className="font-serif text-lg font-medium text-[#171916]">
                7-Day Step Volume
              </h3>
            </div>
            <span className="text-xs font-mono text-[#4B4F48]">
              Average: 9,910 / day
            </span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-[#D9D5CB]">
            {weeklyTrend.map((d, i) => {
              const heightPercent = Math.min(100, (d.steps / 13000) * 100);
              const isToday = i === 6;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] text-[#4B4F48] opacity-0 group-hover:opacity-100 font-mono transition-opacity">
                    {(d.steps / 1000).toFixed(1)}k
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t transition-all ${
                      isToday
                        ? 'bg-[#171916]'
                        : 'bg-[#D9D5CB] group-hover:bg-[#C5D99A]'
                    }`}
                  />
                  <span
                    className={`text-[11px] font-mono ${
                      isToday ? 'font-bold text-[#171916]' : 'text-[#4B4F48]'
                    }`}
                  >
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-[#4B4F48] font-sans">
            <span>Daily 10,000 Step Benchmark: Achieved on 4 of 7 days</span>
            <span className="font-mono text-[10px] text-[#171916]">NEAT Baseline Active</span>
          </div>
        </div>

        {/* Body Composition & Weight Milestone Ledger */}
        <div className="p-6 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9D5CB]">
            <div className="flex items-center gap-2.5">
              <Scale className="w-4 h-4 text-[#171916] stroke-[1.75]" />
              <h3 className="font-serif text-lg font-medium text-[#171916]">
                Weight & Composition Ledger
              </h3>
            </div>
            <span className="text-xs font-mono font-medium text-[#171916]">
              Current: 75.5 kg
            </span>
          </div>

          <div className="divide-y divide-[#D9D5CB] pt-1">
            <div className="py-3 flex items-center justify-between text-xs">
              <span className="text-[#4B4F48]">Starting Protocol Weight (Mon)</span>
              <span className="font-mono font-medium text-[#171916]">76.4 kg</span>
            </div>
            <div className="py-3 flex items-center justify-between text-xs">
              <span className="text-[#4B4F48]">Current Body Weight (Today)</span>
              <span className="font-mono font-medium text-[#171916]">
                75.5 kg <span className="text-[#4B4F48]">(-0.9 kg)</span>
              </span>
            </div>
            <div className="py-3 flex items-center justify-between text-xs">
              <span className="text-[#4B4F48]">Estimated Body Fat Composition</span>
              <span className="font-mono font-medium text-[#171916]">
                14.8% <span className="text-[#4B4F48]">(-0.3%)</span>
              </span>
            </div>
            <div className="py-3 flex items-center justify-between text-xs">
              <span className="text-[#4B4F48]">Target Phase Weight</span>
              <span className="font-mono font-medium text-[#171916]">
                78.0 kg (Lean Hypertrophy Target)
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded bg-[#F4F1E9] border border-[#D9D5CB] text-[11px] text-[#4B4F48] leading-relaxed">
            Calibrated against resting metabolic rate and current weekly training split.
          </div>
        </div>
      </div>
    </div>
  );
};
