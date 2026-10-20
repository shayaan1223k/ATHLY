import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { AthlyProvider, useAthly } from './context/AthlyContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingView } from './components/landing/LandingView';
import { ProgressAnalyticsView } from './components/progress/ProgressAnalyticsView';
import { FitnessPlannerView } from './components/planner/FitnessPlannerView';
import { MealAnalysisView } from './components/meal/MealAnalysisView';
import { ActivityTrackingView } from './components/activity/ActivityTrackingView';
import { RewardsView } from './components/rewards/RewardsView';
import { UserProfileView } from './components/profile/UserProfileView';
import { AuthModal } from './components/auth/AuthModal';

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

const AppContent = () => {
  const { activeTab, setActiveTab } = useAthly();

  if (activeTab === 'landing') {
    return (
      <>
        <LandingView onEnterPlatform={() => setActiveTab('progress')} />
        <AuthModal />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F1E9] text-[#171916] flex flex-col selection:bg-[#C5D99A] selection:text-[#171916] font-sans antialiased">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8 w-full flex-1 flex flex-col lg:flex-row gap-8">
        <Sidebar />
        <MainContent />
      </div>
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AthlyProvider>
        <AppContent />
      </AthlyProvider>
    </AuthProvider>
  );
}
