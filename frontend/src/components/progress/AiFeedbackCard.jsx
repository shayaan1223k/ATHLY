import React from 'react';
import { Brain, CheckCircle2, Quote, Target, Flame, Activity } from 'lucide-react';

/**
 * AiFeedbackCard
 * Redesigned as an editorial coach dispatch letter in deep Graphite (#171916)
 * with Warm Ivory (#F4F1E9) and Muted Sage (#C5D99A) accents.
 */
export const AiFeedbackCard = ({ feedback }) => {
  if (!feedback) return null;

  return (
    <div className="rounded-lg bg-[#171916] border border-[#282B26] p-6 sm:p-8 text-[#F4F1E9] shadow-sm space-y-6">
      {/* Dispatch Metadata Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#282B26]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#282B26] flex items-center justify-center text-[#C5D99A]">
            <Brain className="w-4 h-4 stroke-[1.75]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.16em] font-mono text-[#C5D99A] font-medium">
                AI Synthesis &bull; Coach Dispatch
              </span>
            </div>
            <p className="text-xs text-[#D9D5CB] mt-0.5 font-sans">
              Continuous biometric & nutritional diagnostic synthesis
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded bg-[#1F221E] border border-[#282B26] text-right">
            <span className="text-[9px] uppercase tracking-[0.16em] text-[#9B8F7D] font-mono block">
              Consistency Index
            </span>
            <span className="text-sm font-mono font-medium text-[#C5D99A]">
              {feedback.consistencyScore || 88} / 100
            </span>
          </div>
        </div>
      </div>

      {/* Main Headline & Editorial Narrative */}
      <div className="space-y-3">
        <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#F4F1E9] leading-snug">
          {feedback.headline}
        </h3>
        <p className="text-xs sm:text-sm text-[#D9D5CB] leading-relaxed max-w-4xl font-sans">
          {feedback.detailedAnalysis}
        </p>
      </div>

      {/* 3 Core Protocol Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        <div className="p-4 rounded bg-[#1F221E] border border-[#282B26] space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.14em] text-[#C5D99A]">
            <Target className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Training Volume</span>
          </div>
          <p className="text-xs text-[#D9D5CB] leading-relaxed font-sans">
            {feedback.workoutEvaluation}
          </p>
        </div>

        <div className="p-4 rounded bg-[#1F221E] border border-[#282B26] space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.14em] text-[#C5D99A]">
            <Flame className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Macro Synthesis</span>
          </div>
          <p className="text-xs text-[#D9D5CB] leading-relaxed font-sans">
            {feedback.nutritionEvaluation}
          </p>
        </div>

        <div className="p-4 rounded bg-[#1F221E] border border-[#282B26] space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.14em] text-[#C5D99A]">
            <Activity className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Recovery & Readiness</span>
          </div>
          <p className="text-xs text-[#D9D5CB] leading-relaxed font-sans">
            {feedback.recoveryEvaluation}
          </p>
        </div>
      </div>

      {/* Actionable Recommendations */}
      {feedback.actionableRecommendations?.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-[#282B26]">
          <span className="text-[10px] uppercase tracking-[0.16em] font-mono text-[#9B8F7D] block">
            Action Items &bull; Next 24-Hour Protocol
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {feedback.actionableRecommendations.map((rec, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-3 rounded bg-[#1F221E] border border-[#282B26] text-xs text-[#F4F1E9]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#C5D99A] shrink-0 mt-0.5 stroke-[1.75]" />
                <span className="leading-relaxed font-sans">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Closing Quote */}
      {feedback.motivationQuote && (
        <div className="pt-2 flex items-center gap-2.5 text-xs text-[#D9D5CB] font-serif italic border-t border-[#282B26]/60">
          <Quote className="w-3.5 h-3.5 text-[#C5D99A] shrink-0" />
          <span>&ldquo;{feedback.motivationQuote}&rdquo;</span>
        </div>
      )}
    </div>
  );
};
