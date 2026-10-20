import React, { useState, useEffect } from 'react';
import { useAthly } from '../../context/AthlyContext';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../common/PageHeader';
import { DemoBadge } from '../common/DemoBadge';
import { 
  User, 
  Activity, 
  Target, 
  Utensils, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  Database,
  Mail,
  ShieldCheck,
  Key,
  LogIn,
  LogOut
} from 'lucide-react';

/**
 * UserProfileView
 * Member biological metrics, goals, and nutrition profile redesigned with
 * luxury wellness editorial aesthetic: Warm Ivory surfaces, hairline Stone borders,
 * JetBrains Mono metrics, and live Mifflin-St Jeor BMR calculations.
 * Integrates directly with /api/profile/me and Firebase Auth.
 */
export const UserProfileView = () => {
  const { profile, updateProfile, resetDemoData } = useAthly();
  const { currentUser, logout, openAuthModal, isFirebaseConfigured } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: 'alex.hunter@example.com',
    age: 25,
    height: 175,
    weight: 75,
    fitnessLevel: 'Intermediate',
    fitnessGoal: 'Muscle Gain',
    foodPreference: 'Non-Vegetarian',
    gender: 'Male'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: currentUser?.displayName || profile.name || '',
        email: currentUser?.email || profile.email || 'alex.hunter@example.com',
        age: profile.age || 27,
        height: profile.height || 178,
        weight: profile.weight || 75.5,
        fitnessLevel: profile.fitnessLevel || 'Intermediate',
        fitnessGoal: profile.fitnessGoal || 'Muscle Gain',
        foodPreference: profile.foodPreference || 'Non-Vegetarian',
        gender: profile.gender || 'Male'
      });
    }
  }, [profile, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' || name === 'height' || name === 'weight' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);
    const result = await updateProfile(formData);
    setIsSaving(false);
    if (result?.success) {
      setSavedSuccess(true);
      setSaveError(null);
      setTimeout(() => setSavedSuccess(false), 3000);
    } else {
      setSavedSuccess(false);
      setSaveError(result?.error || 'Failed to persist to database');
    }
  };

  // Real-time Estimated BMI & BMR calculations
  const heightMeters = (formData.height || 175) / 100;
  const bmi = (formData.weight / (heightMeters * heightMeters)).toFixed(1);
  const bmr = Math.round(10 * formData.weight + 6.25 * formData.height - 5 * formData.age + 5);

  const isLiveRecord = profile?._isLive && !profile?._isFallback;
  const isFallbackRecord = profile?._isFallback;

  return (
    <div className="space-y-8">
      {/* Editorial Page Header with Live Biometric Readouts */}
      <PageHeader
        category="MEMBER DOSSIER &bull; BIOMETRICS"
        title="Member Profile & Biometrics"
        subtitle="Biological metrics, training capacity, targeted phase, and nutritional constraints. Adjustments automatically recalculate your metabolic budget and split."
        badge={
          isLiveRecord ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EBF2DC] border border-[#C5D99A] text-[#171916] text-[10px] font-mono uppercase tracking-wider font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#171916] animate-pulse" />
              <span>Live MongoDB Record</span>
            </span>
          ) : (
            <DemoBadge text="Curated Member Baseline" />
          )
        }
        actions={
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded bg-[#FAF8F3] border border-[#D9D5CB] text-right font-mono">
              <span className="text-[9px] uppercase tracking-[0.16em] text-[#4B4F48] block">
                BMI Index
              </span>
              <span className="text-xs font-medium text-[#171916]">
                {bmi} kg/m²
              </span>
            </div>
            <div className="px-3 py-1.5 rounded bg-[#FAF8F3] border border-[#D9D5CB] text-right font-mono">
              <span className="text-[9px] uppercase tracking-[0.16em] text-[#4B4F48] block">
                Basal BMR
              </span>
              <span className="text-xs font-medium text-[#171916]">
                {bmr} kcal/d
              </span>
            </div>
          </div>
        }
      />

      {/* Persistence State Banner */}
      {isFallbackRecord && (
        <div className="p-4 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] flex items-start gap-3 text-xs text-[#4B4F48]">
          <Database className="w-4 h-4 text-[#9B8F7D] shrink-0 mt-0.5 stroke-[1.75]" />
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#171916] font-medium block">
              Local Demo Session &bull; Browser Persisted
            </span>
            <p className="mt-0.5 leading-relaxed font-sans">
              Running in local presentation mode. Biometric adjustments, calculated Mifflin-St Jeor BMR, and nutritional targets persist across browser refreshes.
            </p>
          </div>
        </div>
      )}

      {isLiveRecord && (
        <div className="p-4 rounded-lg bg-[#EBF2DC]/70 border border-[#C5D99A] flex items-start gap-3 text-xs text-[#282B26]">
          <CheckCircle2 className="w-4 h-4 text-[#171916] shrink-0 mt-0.5 stroke-[1.75]" />
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#171916] font-medium block">
              MongoDB Atlas &bull; Synchronized
            </span>
            <p className="mt-0.5 leading-relaxed font-sans">
              Your member record is bound to your verified current member session in the database.
            </p>
          </div>
        </div>
      )}

      {saveError && (
        <div className="p-4 rounded-lg bg-[#FAF8F3] border border-red-300 flex items-start gap-3 text-xs text-red-900">
          <AlertCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5 stroke-[1.75]" />
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] font-medium block text-red-800">
              Database Sync Failed
            </span>
            <p className="mt-0.5 leading-relaxed font-sans text-red-700">
              {saveError}
            </p>
          </div>
        </div>
      )}

      {/* Member Authentication & Security Dossier */}
      <div className="p-6 sm:p-8 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9D5CB]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#171916] stroke-[1.75]" />
            <div>
              <h2 className="font-serif text-lg font-medium text-[#171916]">
                Member Authentication & Security
              </h2>
              <p className="text-xs text-[#4B4F48] font-sans">
                Cryptographic session state and server-side verified principal
              </p>
            </div>
          </div>
          <div>
            {currentUser ? (
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EBE7DC] hover:bg-[#D9D5CB] border border-[#D9D5CB] text-xs font-mono uppercase tracking-wider text-[#171916] transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('signin')}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#171916] text-[#F4F1E9] hover:bg-[#282B26] text-xs font-mono uppercase tracking-wider transition-colors"
              >
                <LogIn className="w-3.5 h-3.5 text-[#C5D99A]" />
                <span>Authenticate Session</span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-3 rounded bg-white/70 border border-[#D9D5CB]">
            <span className="text-[9px] uppercase tracking-[0.16em] text-[#4B4F48] block mb-1">
              Verified Member UID
            </span>
            <span className="font-medium text-[#171916] truncate block" title={currentUser?.uid || 'dev-local-user'}>
              {currentUser?.uid || (profile?._isLive ? 'dev-local-user' : 'unauthenticated-guest')}
            </span>
          </div>

          <div className="p-3 rounded bg-white/70 border border-[#D9D5CB]">
            <span className="text-[9px] uppercase tracking-[0.16em] text-[#4B4F48] block mb-1">
              Session Identity
            </span>
            <span className="font-medium text-[#171916] truncate block" title={currentUser?.email || 'alex.hunter@example.com'}>
              {currentUser?.email || (currentUser ? 'Anonymous User' : 'Local Preview Baseline')}
            </span>
          </div>

          <div className="p-3 rounded bg-white/70 border border-[#D9D5CB]">
            <span className="text-[9px] uppercase tracking-[0.16em] text-[#4B4F48] block mb-1">
              Token Status
            </span>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${currentUser ? 'bg-[#171916]' : 'bg-[#9B8F7D]'}`} />
              <span className="font-medium text-[#171916]">
                {currentUser ? (isFirebaseConfigured ? 'Firebase ID Token Active' : 'Dev Mock Token Active') : 'No Token (Fail-Closed)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#D9D5CB]">
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-[#171916] stroke-[1.75]" />
            <h2 className="font-serif text-lg font-medium text-[#171916]">
              Personalized Biometric Dossier
            </h2>
          </div>
          <span className="text-xs font-mono text-[#4B4F48]">
            Endpoint: /api/profile/me
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48] mb-1.5">
              Full Member Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded bg-[#F4F1E9] border border-[#D9D5CB] text-[#171916] text-xs font-sans focus:outline-none focus:border-[#171916]"
              placeholder="e.g. Alex Hunter"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48] mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#171916] stroke-[1.75]" />
              Member Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded bg-[#F4F1E9] border border-[#D9D5CB] text-[#171916] text-xs font-sans focus:outline-none focus:border-[#171916]"
              placeholder="e.g. alex.hunter@example.com"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48] mb-1.5">
              Chronological Age (Years)
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="12"
              max="100"
              required
              className="w-full px-4 py-2.5 rounded bg-[#F4F1E9] border border-[#D9D5CB] text-[#171916] text-xs font-mono focus:outline-none focus:border-[#171916]"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48] mb-1.5">
              Height (Centimeters)
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              min="80"
              max="250"
              step="0.5"
              required
              className="w-full px-4 py-2.5 rounded bg-[#F4F1E9] border border-[#D9D5CB] text-[#171916] text-xs font-mono focus:outline-none focus:border-[#171916]"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48] mb-1.5">
              Current Weight (Kilograms)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              min="30"
              max="250"
              step="0.1"
              required
              className="w-full px-4 py-2.5 rounded bg-[#F4F1E9] border border-[#D9D5CB] text-[#171916] text-xs font-mono focus:outline-none focus:border-[#171916]"
            />
          </div>

          {/* Fitness Level */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48] mb-1.5 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#171916] stroke-[1.75]" />
              Fitness Experience Level
            </label>
            <select
              name="fitnessLevel"
              value={formData.fitnessLevel}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded bg-[#F4F1E9] border border-[#D9D5CB] text-[#171916] text-xs font-sans focus:outline-none focus:border-[#171916]"
            >
              <option value="Beginner">Beginner (0-6 months consistent protocol)</option>
              <option value="Intermediate">Intermediate (6-24 months consistent protocol)</option>
              <option value="Advanced">Advanced (2-5 years progressive training)</option>
              <option value="Elite">Elite / Competitive Athletic Capacity</option>
            </select>
          </div>

          {/* Fitness Goal */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48] mb-1.5 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#171916] stroke-[1.75]" />
              Primary Protocol Objective
            </label>
            <select
              name="fitnessGoal"
              value={formData.fitnessGoal}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded bg-[#F4F1E9] border border-[#D9D5CB] text-[#171916] text-xs font-sans focus:outline-none focus:border-[#171916]"
            >
              <option value="Fat Loss">Fat Loss & Leanness</option>
              <option value="Muscle Gain">Muscle Gain & Hypertrophy</option>
              <option value="Endurance">Endurance & Cardiovascular Capacity</option>
              <option value="Maintenance">Maintenance & Longevity Protocol</option>
            </select>
          </div>

          {/* Food Preference */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48] mb-1.5 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-[#171916] stroke-[1.75]" />
              Dietary Philosophy & Constraints
            </label>
            <select
              name="foodPreference"
              value={formData.foodPreference}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded bg-[#F4F1E9] border border-[#D9D5CB] text-[#171916] text-xs font-sans focus:outline-none focus:border-[#171916]"
            >
              <option value="Non-Vegetarian">Non-Vegetarian (Omnivorous Whole Foods)</option>
              <option value="Vegetarian">Vegetarian (Lacto-Ovo)</option>
              <option value="Vegan">Vegan (100% Plant-Derived Nutrition)</option>
              <option value="Keto">Ketogenic (High Fat / Low Carb)</option>
              <option value="Pescatarian">Pescatarian (Marine & Plant Nutrition)</option>
            </select>
          </div>

          {/* Biological Sex */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48] mb-1.5">
              Biological Sex
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded bg-[#F4F1E9] border border-[#D9D5CB] text-[#171916] text-xs font-sans focus:outline-none focus:border-[#171916]"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#D9D5CB]">
          <p className="text-xs text-[#4B4F48] font-sans">
            Updating biometrics recalculates your daily calorie, step, and protein budgets instantly.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={resetDemoData}
              className="px-4 py-2.5 rounded bg-[#FAF8F3] hover:bg-[#EBE7DC] border border-[#D9D5CB] text-[#4B4F48] hover:text-[#171916] text-xs font-mono transition-colors shrink-0"
              title="Reset all local demo changes to the clean initial baseline"
            >
              Reset Baseline
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded bg-[#171916] hover:bg-[#282B26] text-[#F4F1E9] text-xs font-medium tracking-wide transition-colors disabled:opacity-40 shadow-sm shrink-0"
            >
              {isSaving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#F4F1E9] border-t-transparent rounded-full animate-spin" />
                  <span>Saving Profile...</span>
                </>
              ) : savedSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5D99A] stroke-[2]" />
                  <span>Saved & Recalculated</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 stroke-[2]" />
                  <span>Save Biometrics & Recalculate</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
