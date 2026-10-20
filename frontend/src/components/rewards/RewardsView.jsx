import React from 'react';
import { useAthly } from '../../context/AthlyContext';
import { PageHeader } from '../common/PageHeader';
import { DemoBadge } from '../common/DemoBadge';
import { 
  Award, 
  Flame, 
  Trophy, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Droplet, 
  Camera, 
  Footprints, 
  Dumbbell, 
  PieChart 
} from 'lucide-react';

/**
 * RewardsView
 * Athletic discipline journal, streaks, and milestone badges redesigned with
 * luxury wellness editorial aesthetic: Warm Ivory surfaces, hairline Stone borders,
 * JetBrains Mono metrics, and intaglio-style badge emblems.
 */
export const RewardsView = () => {
  const { rewards, showToast, claimRewardGoal, dailyCheckIn } = useAthly();

  const getBadgeIcon = (iconName) => {
    switch (iconName) {
      case 'flame': return Flame;
      case 'droplet': return Droplet;
      case 'camera': return Camera;
      case 'footprints': return Footprints;
      case 'dumbbell': return Dumbbell;
      case 'pie-chart': return PieChart;
      default: return Award;
    }
  };

  const handleClaim = (goalId, goalTitle, points) => {
    if (claimRewardGoal) {
      claimRewardGoal(goalId, points);
    } else {
      showToast(`Claimed ${points} XP for ${goalTitle}!`);
    }
  };

  const currentPoints = rewards?.totalPoints || 680;
  const level = rewards?.level || 2;
  const currentStreak = rewards?.currentStreakDays || 5;
  const bestStreak = rewards?.bestStreakDays || 12;

  const currentLevelBase = (level - 1) * 500;
  const nextLevelTarget = level * 500;
  const levelProgress = Math.min(100, Math.round(((currentPoints - currentLevelBase) / 500) * 100));

  return (
    <div className="space-y-8">
      {/* Editorial Page Header */}
      <PageHeader
        category="DISCIPLINE &bull; REWARDS JOURNAL"
        title="Discipline, Streaks & Milestones"
        subtitle="Tracking consistency as athletic virtue. Every recorded protocol session, plate analysis, and hydration target accrues toward your tier progression."
        badge={<DemoBadge text="Curated Rewards Ledger" />}
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={dailyCheckIn}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#171916] text-[#F4F1E9] hover:bg-[#282B26] text-xs font-mono transition-colors shadow-sm active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5D99A]" />
              <span>Daily Check-In (+15 XP)</span>
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#FAF8F3] border border-[#D9D5CB] text-xs font-mono text-[#171916]">
              <Flame className="w-3.5 h-3.5 fill-[#C88E32] text-[#C88E32]" />
              <span>{currentStreak}d Streak</span>
            </div>
          </div>
        }
      />

      {/* Tier & XP Progression Card */}
      <div className="p-6 sm:p-7 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9D5CB]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-[#171916] text-[#F4F1E9] flex items-center justify-center font-serif text-xl font-medium shrink-0">
              {level}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-medium text-[#171916]">
                  Tier {level}: Active Performer
                </h3>
                <span className="text-[9px] font-mono uppercase tracking-[0.16em] px-2 py-0.5 rounded bg-[#EBF2DC] text-[#282B26] border border-[#C5D99A]/80 font-medium">
                  Tier {level}
                </span>
              </div>
              <p className="text-xs text-[#4B4F48] font-mono mt-0.5">
                {currentPoints} Total Protocol XP &bull; {nextLevelTarget - currentPoints} XP to Tier {level + 1}
              </p>
            </div>
          </div>

          <div className="text-right font-mono">
            <div className="text-sm font-medium text-[#171916]">
              {levelProgress}% Completed
            </div>
            <span className="text-[10px] text-[#4B4F48] uppercase tracking-wider">
              Toward Tier {level + 1}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#EBE7DC] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#171916] h-full rounded-full transition-all duration-500"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
      </div>

      {/* Quests & Milestones Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Quests */}
        <div className="p-6 sm:p-7 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9D5CB]">
            <div className="flex items-center gap-2.5">
              <Trophy className="w-4 h-4 text-[#171916] stroke-[1.75]" />
              <h3 className="font-serif text-lg font-medium text-[#171916]">
                Today's Protocol Quests
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#4B4F48]">
              Resets at midnight
            </span>
          </div>

          <div className="space-y-2.5">
            {rewards?.dailyGoals?.map((g) => (
              <div
                key={g.id}
                className="p-3.5 rounded bg-[#F4F1E9] border border-[#D9D5CB] flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                      g.completed
                        ? 'bg-[#171916] text-[#F4F1E9]'
                        : 'bg-[#EBE7DC] text-[#4B4F48]'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#171916] font-sans">{g.title}</h4>
                    <p className="text-[11px] text-[#4B4F48]">{g.targetText}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-mono text-xs font-medium text-[#171916] shrink-0">
                    +{g.points} XP
                  </div>
                  {g.claimed ? (
                    <span className="text-[10px] font-mono text-[#4B4F48] px-2 py-0.5 rounded bg-[#FAF8F3] border border-[#D9D5CB]">
                      Claimed
                    </span>
                  ) : g.completed ? (
                    <button
                      type="button"
                      onClick={() => handleClaim(g.id, g.title, g.points)}
                      className="px-2.5 py-1 rounded bg-[#171916] hover:bg-[#282B26] text-[#F4F1E9] text-[10px] font-mono uppercase tracking-wider transition-all shadow-sm active:scale-95"
                    >
                      Claim
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Milestones */}
        <div className="p-6 sm:p-7 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9D5CB]">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#171916] stroke-[1.75]" />
              <h3 className="font-serif text-lg font-medium text-[#171916]">
                Weekly Milestone Challenges
              </h3>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#4B4F48]">
              Extended Pool
            </span>
          </div>

          <div className="space-y-3">
            {rewards?.weeklyGoals?.map((g) => (
              <div
                key={g.id}
                className="p-3.5 rounded bg-[#F4F1E9] border border-[#D9D5CB] space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#171916] font-sans">{g.title}</span>
                  <span className="font-mono text-xs font-medium text-[#171916]">
                    +{g.points} XP
                  </span>
                </div>
                <div className="w-full bg-[#EBE7DC] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C5D99A] h-full rounded-full"
                    style={{ width: `${g.progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#4B4F48]">
                  <span>{g.targetText}</span>
                  <span>{g.progressPercent}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intaglio Achievement Badges Collection */}
      <div className="p-6 sm:p-7 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#D9D5CB]">
          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-[#171916] stroke-[1.75]" />
            <h3 className="font-serif text-lg font-medium text-[#171916]">
              Achievement Badges & Trophies
            </h3>
          </div>
          <span className="text-xs font-mono text-[#4B4F48]">
            {rewards?.badges?.filter((b) => b.unlocked).length} of {rewards?.badges?.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {rewards?.badges?.map((badge) => {
            const Icon = getBadgeIcon(badge.iconName);
            return (
              <div
                key={badge.code}
                className={`p-4 rounded border transition-colors ${
                  badge.unlocked
                    ? 'bg-[#FAF8F3] border-[#D9D5CB]'
                    : 'bg-[#F4F1E9] border-[#D9D5CB]/60 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-9 h-9 rounded flex items-center justify-center shrink-0 ${
                      badge.unlocked
                        ? 'bg-[#171916] text-[#F4F1E9]'
                        : 'bg-[#EBE7DC] text-[#4B4F48]'
                    }`}
                  >
                    {badge.unlocked ? (
                      <Icon className="w-4 h-4 stroke-[1.75]" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 stroke-[1.75]" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-serif font-medium text-[#171916]">
                        {badge.title}
                      </h4>
                      <span className="text-[10px] font-mono text-[#4B4F48]">
                        +{badge.pointsReward} XP
                      </span>
                    </div>
                    <p className="text-[11px] text-[#4B4F48] leading-relaxed font-sans">
                      {badge.description}
                    </p>
                    {badge.unlocked && (
                      <span className="text-[9px] font-mono text-[#4B4F48] block pt-1">
                        Unlocked &bull; {badge.unlockedAt}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
