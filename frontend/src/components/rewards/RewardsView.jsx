import React from 'react';
import { useAthly } from '../../context/AthlyContext';
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

export const RewardsView = () => {
  const { rewards, showToast } = useAthly();

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

  const handleClaim = (goalTitle, points) => {
    showToast(`Claimed ${points} XP for ${goalTitle}!`);
  };

  const currentPoints = rewards?.totalPoints || 680;
  const level = rewards?.level || 2;
  const currentStreak = rewards?.currentStreakDays || 5;
  const bestStreak = rewards?.bestStreakDays || 12;

  // Level math (e.g. Level 2 is 500-1000 XP)
  const currentLevelBase = (level - 1) * 500;
  const nextLevelTarget = level * 500;
  const levelProgress = Math.min(100, Math.round(((currentPoints - currentLevelBase) / 500) * 100));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <h1 className="text-xl font-bold text-white">Athly Gamification & Rewards Center</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              "Your Goal. Our Plan. Your Progress. <span className="text-emerald-400 font-semibold">Your Reward.</span>"
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-sm">
              <Flame className="w-4 h-4 fill-amber-400 animate-pulse" />
              <span>{currentStreak} Days Streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gamification Level & XP Progress Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-lg shadow-glow-green">
              {level}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">Tier {level}: Active Performer</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                  LEVEL {level}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {currentPoints} XP Total &bull; Next tier in {nextLevelTarget - currentPoints} XP
              </p>
            </div>
          </div>

          <div className="text-sm font-bold text-emerald-400 font-mono text-right">
            {levelProgress}% to Level {level + 1}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
      </div>

      {/* Daily & Weekly Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Goals */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4 text-emerald-400" />
              Today's Quests & Goals
            </h3>
            <span className="text-xs text-slate-400">Resets in 6h 18m</span>
          </div>

          <div className="space-y-2.5">
            {rewards?.dailyGoals?.map((g) => (
              <div
                key={g.id}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      g.completed ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{g.title}</h4>
                    <p className="text-[11px] text-slate-400">{g.targetText}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-emerald-400">+{g.points} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Milestones */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              Weekly Milestones & Challenges
            </h3>
            <span className="text-xs text-teal-400 font-mono">High XP Pool</span>
          </div>

          <div className="space-y-2.5">
            {rewards?.weeklyGoals?.map((g) => (
              <div
                key={g.id}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{g.title}</span>
                  <span className="font-mono font-bold text-teal-400">+{g.points} XP</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full" style={{ width: `${g.progressPercent}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>{g.targetText}</span>
                  <span>{g.progressPercent}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Badges Collection */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            Achievement Badges & Trophies
          </h3>
          <span className="text-xs text-slate-400">
            {rewards?.badges?.filter((b) => b.unlocked).length} of {rewards?.badges?.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {rewards?.badges?.map((badge) => {
            const Icon = getBadgeIcon(badge.iconName);
            return (
              <div
                key={badge.code}
                className={`p-4 rounded-xl border transition-all ${
                  badge.unlocked
                    ? 'bg-slate-950/70 border-emerald-500/30'
                    : 'bg-slate-950/30 border-slate-800/60 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      badge.unlocked
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-glow-green'
                        : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}
                  >
                    {badge.unlocked ? <Icon className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{badge.title}</h4>
                      <span className="text-[10px] font-mono text-emerald-400">+{badge.pointsReward} XP</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{badge.description}</p>
                    {badge.unlocked && (
                      <span className="text-[10px] text-emerald-400 font-semibold block pt-1">
                        &bull; {badge.unlockedAt}
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
