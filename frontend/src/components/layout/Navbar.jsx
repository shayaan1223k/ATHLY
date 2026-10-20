import React from 'react';
import { useAthly } from '../../context/AthlyContext';
import { useAuth } from '../../context/AuthContext';
import { Flame, Trophy, Sparkles, BookOpen, LogIn, LogOut } from 'lucide-react';

/**
 * Navbar
 * Authenticated application header redesigned for the luxury wellness editorial aesthetic.
 * Connects seamlessly with the landing page design language and provides member auth controls.
 */
export const Navbar = () => {
  const { profile, rewards, toastMessage, setActiveTab } = useAthly();
  const { currentUser, logout, openAuthModal } = useAuth();

  const displayName = currentUser?.displayName || profile?.name || (currentUser?.email ? currentUser.email.split('@')[0] : 'Alex Hunter');
  const initial = displayName ? displayName.charAt(0).toUpperCase() : 'A';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#D9D5CB] bg-[#F4F1E9]/95 backdrop-blur-md">
      {/* Dynamic Notification Toast */}
      {toastMessage && (
        <div className="bg-[#FAF8F3] border-b border-[#C5D99A] px-6 py-2.5 text-center text-xs font-sans text-[#171916] flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#171916]" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-18 flex items-center justify-between">
        {/* Brand Wordmark & Protocol Badge */}
        <div 
          className="flex items-baseline gap-3 cursor-pointer group" 
          onClick={() => setActiveTab('progress')}
          title="Return to Daily Overview"
        >
          <span className="font-serif text-2xl tracking-[0.12em] font-medium text-[#171916] group-hover:opacity-80 transition-opacity">
            ATHLY
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[#4B4F48] font-sans border-l border-[#D9D5CB] pl-3 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5D99A]" />
            <span>Active Protocol</span>
          </span>
        </div>

        {/* Live Metrics & Profile Controls */}
        <div className="flex items-center gap-3">
          {/* Editorial Landing Page Toggle */}
          <button 
            type="button"
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F3] border border-[#D9D5CB] text-[#171916] text-xs font-medium hover:border-[#171916] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#171916]"
            title="View Public Editorial Landing Page"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#4B4F48]" />
            <span className="hidden md:inline">Public Landing</span>
          </button>

          {/* Active Streak Capsule */}
          <button 
            type="button"
            onClick={() => setActiveTab('rewards')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F3] border border-[#D9D5CB] text-[#171916] text-xs font-mono font-medium hover:border-[#171916] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#171916]"
            title="Discipline Streak Counter"
          >
            <Flame className="w-3.5 h-3.5 fill-[#C88E32] text-[#C88E32]" />
            <span>{rewards?.currentStreakDays || 5}d Streak</span>
          </button>

          {/* Points & Level Capsule */}
          <button 
            type="button"
            onClick={() => setActiveTab('rewards')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F3] border border-[#D9D5CB] text-[#171916] text-xs font-mono font-medium hover:border-[#171916] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#171916]"
            title="Earned Athletic Tier XP"
          >
            <Trophy className="w-3.5 h-3.5 text-[#4B4F48]" />
            <span>{rewards?.totalPoints || 680} XP</span>
            <span className="text-[10px] text-[#4B4F48]">Lv.{rewards?.level || 2}</span>
          </button>

          {/* Auth State & User Profile Controls */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button 
                type="button"
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2 p-1 pl-2.5 rounded-full bg-[#FAF8F3] border border-[#D9D5CB] text-[#171916] hover:border-[#171916] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#171916]"
                title="View Member Dossier & Biometrics"
              >
                <span className="text-xs font-medium hidden md:inline">{displayName}</span>
                <div className="w-7 h-7 rounded-full bg-[#171916] flex items-center justify-center text-xs font-mono font-medium text-[#F4F1E9]">
                  {initial}
                </div>
              </button>
              <button
                type="button"
                onClick={logout}
                title="Sign Out of Protocol"
                className="p-2 rounded-full bg-[#FAF8F3] border border-[#D9D5CB] text-[#4B4F48] hover:text-[#171916] hover:border-[#171916] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#171916]"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                type="button"
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2 p-1 pl-2.5 rounded-full bg-[#FAF8F3] border border-[#D9D5CB] text-[#171916] hover:border-[#171916] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#171916]"
                title="View Demo Dossier & Biometrics"
              >
                <span className="text-xs font-medium hidden md:inline">{displayName} (Demo)</span>
                <div className="w-7 h-7 rounded-full bg-[#171916] flex items-center justify-center text-xs font-mono font-medium text-[#F4F1E9]">
                  {initial}
                </div>
              </button>
              <button
                type="button"
                onClick={() => openAuthModal('signin')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#171916] text-[#F4F1E9] hover:bg-[#282B26] text-xs font-medium uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5D99A]"
              >
                <LogIn className="w-3.5 h-3.5 text-[#C5D99A]" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
