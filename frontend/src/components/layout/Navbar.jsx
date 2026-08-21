import React from 'react';
import { useAthly } from '../../context/AthlyContext';
import { Flame, Trophy, Sparkles, User, Bell, Activity } from 'lucide-react';

export const Navbar = () => {
  const { profile, rewards, toastMessage, setActiveTab } = useAthly();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      {/* Dynamic Notification Toast */}
      {toastMessage && (
        <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-4 py-2 text-center text-xs font-medium text-emerald-300 flex items-center justify-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('progress')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-[2px] shadow-glow-green">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                ATHLY
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                AI ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight hidden sm:block">
              Your Goal. Our Plan. Your Progress. Your Reward.
            </p>
          </div>
        </div>

        {/* Live Metrics Pills */}
        <div className="flex items-center gap-3">
          {/* Streaks Pill */}
          <button 
            onClick={() => setActiveTab('rewards')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold hover:bg-amber-500/15 transition"
          >
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
            <span>{rewards?.currentStreakDays || 5} Day Streak</span>
          </button>

          {/* Points & Level Pill */}
          <button 
            onClick={() => setActiveTab('rewards')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/15 transition"
          >
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span>{rewards?.totalPoints || 680} XP</span>
            <span className="text-[10px] text-slate-400 font-normal">| Lv.{rewards?.level || 2}</span>
          </button>

          {/* User Profile avatar */}
          <button 
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2 p-1.5 pl-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:border-slate-700 transition"
          >
            <span className="text-xs font-semibold hidden md:inline">{profile?.name || 'Alex Hunter'}</span>
            <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              {profile?.name ? profile.name.charAt(0) : 'A'}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
