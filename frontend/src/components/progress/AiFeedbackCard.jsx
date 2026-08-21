import React from 'react';
import { Sparkles, Brain, CheckCircle, ArrowRight, Quote, Flame, Target } from 'lucide-react';

export const AiFeedbackCard = ({ feedback }) => {
  if (!feedback) return null;

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 relative overflow-hidden shadow-lg space-y-5">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header with AI badge & score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px]">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Brain className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Progress Feedback & Coach</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                REAL-TIME INSIGHT
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Continuous biometric & nutritional diagnostic synthesis</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Consistency Index</span>
            <span className="text-base font-extrabold text-emerald-400 font-mono">
              {feedback.consistencyScore || 88} / 100
            </span>
          </div>
        </div>
      </div>

      {/* Main Headline */}
      <div className="space-y-2">
        <h4 className="text-base font-bold text-slate-100 flex items-start gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <span>{feedback.headline}</span>
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed pl-7">
          {feedback.detailedAnalysis}
        </p>
      </div>

      {/* Pillars Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
            <Target className="w-3 h-3" /> Training Volume
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">{feedback.workoutEvaluation}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
            <Flame className="w-3 h-3" /> Macro Synthesis
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">{feedback.nutritionEvaluation}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Recovery & Readiness
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">{feedback.recoveryEvaluation}</p>
        </div>
      </div>

      {/* Actionable Recommendations */}
      {feedback.actionableRecommendations?.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
            Recommended Actions For Next 24 Hours:
          </span>
          <div className="space-y-1.5">
            {feedback.actionableRecommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quote */}
      {feedback.motivationQuote && (
        <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400 italic">
          <Quote className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{feedback.motivationQuote}</span>
        </div>
      )}
    </div>
  );
};
