import React from 'react';
import { AthlyProvider, useAthly } from './context/AthlyContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { ProgressAnalyticsView } from './components/progress/ProgressAnalyticsView';
import { FitnessPlannerView } from './components/planner/FitnessPlannerView';
import { MealAnalysisView } from './components/meal/MealAnalysisView';
import { ActivityTrackingView } from './components/activity/ActivityTrackingView';
import { RewardsView } from './components/rewards/RewardsView';
import { UserProfileView } from './components/profile/UserProfileView';

const MainContent = () => {
  const { activeTab } = useAthly();

  return (
    <main className="flex-1 min-w-0">
      {activeTab === 'progress' && <ProgressAnalyticsView />}
      {activeTab === 'planner' && <FitnessPlannerView />}
      {activeTab === 'meals' && <MealAnalysisView />}
      {activeTab === 'activity' && <ActivityTrackingView />}
      {activeTab === 'rewards' && <RewardsView />}
      {activeTab === 'profile' && <UserProfileView />}
    </main>
  );
};

export default function App() {
  return (
    <AthlyProvider>
      <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col lg:flex-row gap-6">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </AthlyProvider>
  );
}
