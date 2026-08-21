import React, { useState } from 'react';
import { useAthly } from '../../context/AthlyContext';
import { 
  Camera, 
  UploadCloud, 
  Sparkles, 
  Flame, 
  Beef, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  Clock,
  PieChart,
  Plus
} from 'lucide-react';

export const MealAnalysisView = () => {
  const { addMealAnalysis, todayMeals, plan } = useAthly();
  const [mealType, setMealType] = useState('LUNCH');
  const [mealHint, setMealHint] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [latestAnalysis, setLatestAnalysis] = useState(null);

  const samplePresets = [
    { label: "Salmon Quinoa Bowl", hint: "pan seared atlantic salmon quinoa asparagus" },
    { label: "Chicken Rice & Greens", hint: "grilled chicken breast brown rice broccoli" },
    { label: "Avocado Chickpea Salad", hint: "mediterranean vegan salad avocado chickpeas" },
    { label: "Eggs & Sourdough Toast", hint: "poached eggs sourdough bread avocado" },
    { label: "Whey Protein Berry Bowl", hint: "whey isolate berry smoothie almond butter" }
  ];

  const handleAnalyze = async (e) => {
    if (e) e.preventDefault();
    if (!mealHint.trim()) return;

    setAnalyzing(true);
    try {
      const res = await addMealAnalysis({
        mealType,
        hintOrDescription: mealHint,
        imageUrl: null
      });
      setLatestAnalysis(res);
      setMealHint('');
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSelectPreset = (preset) => {
    setMealHint(preset.hint);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-400" />
              <h1 className="text-xl font-bold text-white">AI Meal Vision & Nutrition Analysis</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Upload a meal photo or type a meal description. Athly AI detects ingredients, computes macros, and validates against your target.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-4 h-4" />
            <span>AI Computer Vision Model Active</span>
          </div>
        </div>
      </div>

      {/* Upload & Analysis Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upload / Input */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-5">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-emerald-400" />
              Log & Analyze Meal
            </h2>

            {/* Meal Type Pills */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Select Meal Category</label>
              <div className="grid grid-cols-4 gap-2">
                {['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setMealType(type)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      mealType === type
                        ? 'bg-emerald-500 text-slate-950 shadow-glow-green'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Dropzone Simulation */}
            <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-2xl p-6 text-center bg-slate-950/40 cursor-pointer transition group">
              <div className="w-12 h-12 rounded-full bg-slate-800 group-hover:bg-emerald-500/10 flex items-center justify-center mx-auto mb-3 text-slate-400 group-hover:text-emerald-400 transition">
                <Camera className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold text-slate-200">
                Drag & drop meal photo, or click to browse
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Supports JPG, PNG, HEIC (Max 15MB)
              </p>
            </div>

            {/* Meal Description / Hint Input */}
            <form onSubmit={handleAnalyze} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Meal Name or Ingredients
                </label>
                <input
                  type="text"
                  value={mealHint}
                  onChange={(e) => setMealHint(e.target.value)}
                  placeholder="e.g. 200g grilled salmon with quinoa and steamed greens"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Sample Presets */}
              <div>
                <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">Quick Sample Presets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {samplePresets.map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelectPreset(p)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700/60"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={analyzing || !mealHint.trim()}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-glow-green transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {analyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Photo & Estimating Macros...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run AI Nutrition Analysis (+35 XP)</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: AI Analysis Results Card */}
        <div className="lg:col-span-6 space-y-6">
          {latestAnalysis ? (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 border border-emerald-500/30 space-y-5 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase">
                    {latestAnalysis.mealType} &bull; Conf: {(latestAnalysis.confidence * 100).toFixed(0)}%
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">{latestAnalysis.identifiedFood}</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-emerald-400">{latestAnalysis.totalCalories}</div>
                  <div className="text-[10px] text-slate-400 uppercase">Calories</div>
                </div>
              </div>

              {/* Macro breakdown pills */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Protein</span>
                  <span className="text-sm font-bold text-rose-400">{latestAnalysis.totalProtein}g</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Carbs</span>
                  <span className="text-sm font-bold text-amber-400">{latestAnalysis.totalCarbs}g</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Fats</span>
                  <span className="text-sm font-bold text-teal-400">{latestAnalysis.totalFats}g</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Fiber</span>
                  <span className="text-sm font-bold text-emerald-400">{latestAnalysis.totalFiber}g</span>
                </div>
              </div>

              {/* Comparison with User's Daily Targets */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-300">Daily Calorie Target Impact</span>
                  <span className="text-emerald-400 font-mono">
                    {latestAnalysis.consumedCaloriesToday} / {latestAnalysis.dailyCalorieTarget} kcal
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{
                      width: `${Math.min(100, (latestAnalysis.consumedCaloriesToday / latestAnalysis.dailyCalorieTarget) * 100)}%`
                    }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Remaining today: {latestAnalysis.remainingCaloriesToday} kcal</span>
                  <span>{latestAnalysis.remainingProteinToday}g protein remaining</span>
                </div>
              </div>

              {/* AI Dietary Insight */}
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-300 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-300 block mb-0.5">AI Nutritional Feedback:</span>
                  <p className="leading-relaxed">{latestAnalysis.aiDietaryInsight}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-center">
              <Camera className="w-12 h-12 text-slate-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-300">Ready to Analyze</h3>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Select a quick sample preset or type your meal to receive instant AI macronutrient breakdowns and target validation.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Today's Logged Meals */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Today's Logged Meals</h2>
          </div>
          <span className="text-xs text-slate-400 font-semibold">{todayMeals.length} Meals Logged</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {todayMeals.map((meal) => (
            <div key={meal.id || meal.foodName} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                  {meal.mealType}
                </span>
                <span className="text-xs font-bold text-white font-mono">{meal.calories} kcal</span>
              </div>
              <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">{meal.foodName}</h4>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-900">
                <span>P: {meal.protein}g</span>
                <span>C: {meal.carbs}g</span>
                <span>F: {meal.fats}g</span>
                <span>Fib: {meal.fiber || 5}g</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
