import React from 'react';
import { useAthly } from '../../context/AthlyContext';
import { 
  LineChart, 
  Dumbbell, 
  Camera, 
  Footprints, 
  Award, 
  UserCog, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab } = useAthly();

  const navItems = [
    {
      id: 'progress',
      label: 'Progress & Analytics',
      description: 'Daily/weekly trends & AI feedback',
      icon: LineChart,
      badge: 'AI Insights'
    },
    {
      id: 'planner',
      label: 'Fitness Planner',
      description: 'Personalized workouts & diet',
      icon: Dumbbell
    },
    {
      id: 'meals',
      label: 'Meal Analysis',
      description: 'AI vision & macro tracker',
      icon: Camera,
      badge: 'Vision AI'
    },
    {
      id: 'activity',
      label: 'Activity Tracking',
      description: 'Steps, workouts & hydration',
      icon: Footprints
    },
    {
      id: 'rewards',
      label: 'Rewards & Badges',
      description: 'Points, streaks & achievements',
      icon: Award
    },
    {
      id: 'profile',
      label: 'User Profile',
      description: 'Metrics, goals & preferences',
      icon: UserCog
    }
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <nav className="flex lg:flex-col gap-1.5 p-2 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-md overflow-x-auto lg:overflow-x-visible">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-between w-full min-w-[200px] lg:min-w-0 p-3 rounded-xl text-left transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600/20 to-teal-500/10 border border-emerald-500/30 text-emerald-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-glow-green'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold">{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 line-clamp-1">{item.description}</p>
                </div>
              </div>
              <ChevronRight
                className={`w-4 h-4 transition-transform hidden lg:block ${
                  isActive ? 'text-emerald-400 translate-x-0.5' : 'text-slate-600'
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* AI Assistant Quick Pill Card */}
      <div className="hidden lg:block mt-4 p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/20 shadow-lg relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
          <Sparkles className="w-4 h-4" />
          <span>ATHLY AI Coach</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
          Daily plan adapts dynamically whenever you update your target or log meals.
        </p>
        <div className="text-[10px] text-slate-500 font-mono">
          Engine: Gemini-Powered Fitness Core
        </div>
      </div>
    </aside>
  );
};
