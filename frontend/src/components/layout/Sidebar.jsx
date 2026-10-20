import React from 'react';
import { useAthly } from '../../context/AthlyContext';
import { 
  LineChart, 
  Dumbbell, 
  Camera, 
  Footprints, 
  Award, 
  UserCog, 
  ChevronRight,
  BookOpen
} from 'lucide-react';

/**
 * Sidebar
 * Primary navigation sidebar for the luxury wellness authenticated interface.
 * Implements:
 * - Warm Ivory background with hairline Stone borders
 * - Subtle Muted Sage active indicators
 * - Restrained typography and deliberate alignment
 */
export const Sidebar = () => {
  const { activeTab, setActiveTab } = useAthly();

  const navItems = [
    {
      id: 'landing',
      label: 'Editorial Landing',
      description: 'Luxury wellness public showcase',
      icon: BookOpen,
      badge: 'Public'
    },
    {
      id: 'progress',
      label: 'Daily Overview',
      description: 'Progress & AI coach dispatch',
      icon: LineChart,
      badge: 'Active'
    },
    {
      id: 'planner',
      label: 'Training Split',
      description: 'Periodized workouts & nutrition',
      icon: Dumbbell
    },
    {
      id: 'meals',
      label: 'Meal Vision & Logs',
      description: 'Computer vision macro analysis',
      icon: Camera,
      badge: 'Vision AI'
    },
    {
      id: 'activity',
      label: 'Activity & Hydration',
      description: 'Steps, workouts & water telemetry',
      icon: Footprints
    },
    {
      id: 'rewards',
      label: 'Discipline & Rewards',
      description: 'Tier XP, streaks & badges',
      icon: Award
    },
    {
      id: 'profile',
      label: 'Member Profile',
      description: 'Biometrics & protocol targets',
      icon: UserCog
    }
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <nav className="flex lg:flex-col gap-1.5 p-2 bg-[#FAF8F3] border border-[#D9D5CB] rounded-lg shadow-sm overflow-x-auto lg:overflow-x-visible">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-between w-full min-w-[200px] lg:min-w-0 p-3 rounded text-left transition-colors ${
                isActive
                  ? 'bg-[#F4F1E9] border border-[#D9D5CB] border-l-2 border-l-[#C5D99A] text-[#171916] font-medium'
                  : 'text-[#4B4F48] hover:text-[#171916] hover:bg-[#F4F1E9]/80 border border-transparent font-normal'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'bg-[#171916] text-[#F4F1E9]'
                      : 'bg-[#EBE7DC] text-[#4B4F48]'
                  }`}
                >
                  <Icon className="w-4 h-4 stroke-[1.75]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold tracking-tight">{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded font-mono uppercase tracking-wider bg-[#EBF2DC] text-[#282B26] border border-[#C5D99A]/80 font-medium">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[#4B4F48] line-clamp-1 mt-0.5">{item.description}</p>
                </div>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 transition-transform hidden lg:block ${
                  isActive ? 'text-[#171916] translate-x-0.5' : 'text-[#D9D5CB]'
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Editorial Assistant Callout Panel */}
      <div className="hidden lg:block mt-6 p-5 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB]">
        <div className="flex items-center gap-2 text-[#171916] text-xs font-semibold mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5D99A]" />
          <span className="font-serif text-sm">The Living Protocol</span>
        </div>
        <p className="text-[11px] text-[#4B4F48] leading-relaxed mb-3">
          Daily periodization and metabolic budgets calibrate dynamically as you log meals and biometrics.
        </p>
        <div className="text-[10px] text-[#4B4F48] font-mono border-t border-[#D9D5CB] pt-2">
          Architecture &bull; Gemini Vision Subsystem
        </div>
      </div>
    </aside>
  );
};
