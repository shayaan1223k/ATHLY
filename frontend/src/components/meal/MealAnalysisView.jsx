import React, { useState } from 'react';
import { useAthly } from '../../context/AthlyContext';
import { PageHeader } from '../common/PageHeader';
import { DemoBadge } from '../common/DemoBadge';
import { 
  Camera, 
  UploadCloud, 
  Sparkles, 
  Clock,
  CheckCircle2,
  Image as ImageIcon,
  AlertCircle,
  X,
  RotateCcw
} from 'lucide-react';

/**
 * MealAnalysisView
 * AI Computer Vision macro analyzer & chronological meal ledger redesigned
 * with luxury wellness editorial aesthetic: culinary photography, Warm Ivory surfaces,
 * hairline Stone dividers, and JetBrains Mono nutritional metrics.
 */
export const MealAnalysisView = () => {
  const { addMealAnalysis, todayMeals, plan } = useAthly();
  const [mealType, setMealType] = useState('LUNCH');
  const [mealHint, setMealHint] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [latestAnalysis, setLatestAnalysis] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const samplePresets = [
    {
      label: "Salmon Quinoa Bowl",
      hint: "pan seared atlantic salmon quinoa asparagus",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
    },
    {
      label: "Chicken Rice & Greens",
      hint: "grilled chicken breast brown rice broccoli",
      image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80"
    },
    {
      label: "Avocado Chickpea Salad",
      hint: "mediterranean vegan salad avocado chickpeas",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
    },
    {
      label: "Eggs & Sourdough Toast",
      hint: "poached eggs sourdough bread avocado",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80"
    },
    {
      label: "Whey Protein Berry Bowl",
      hint: "whey isolate berry smoothie almond butter",
      image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setErrorMessage('');
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result);
      };
      reader.readAsDataURL(file);
      if (!mealHint.trim()) {
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        setMealHint(cleanName);
      }
    }
    // Clear value so selecting same file triggers onChange
    e.target.value = '';
  };

  const handleClearImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setPreviewImage(null);
  };

  const handleAnalyze = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    const hasHint = Boolean(mealHint.trim());
    const hasImage = Boolean(previewImage);

    // Empty-input validation: clear readable feedback instead of dead click
    if (!hasHint && !hasImage) {
      setErrorMessage('Please select a plate photograph, choose a culinary preset, or enter ingredients to analyze.');
      return;
    }

    setAnalyzing(true);
    try {
      const activeDescription = mealHint.trim() || (hasImage ? "Photographed Plate" : "Balanced Athletic Plate");
      const res = await addMealAnalysis({
        mealType,
        hintOrDescription: activeDescription,
        imageUrl: previewImage || null
      });
      if (res) {
        setLatestAnalysis(res);
      }
    } catch (err) {
      console.error('Failed to analyze meal:', err);
      setErrorMessage(err.message || 'Analysis could not be completed. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSelectPreset = (preset) => {
    setErrorMessage('');
    setMealHint(preset.hint);
    if (preset.image) {
      setPreviewImage(preset.image);
    }
  };

  const handleResetForm = () => {
    setMealHint('');
    setPreviewImage(null);
    setErrorMessage('');
  };

  return (
    <div className="space-y-8">
      {/* Editorial Page Header with Culinary Banner */}
      <PageHeader
        category="NUTRITION &bull; COMPUTER VISION"
        title="AI Meal Vision & Nutrition Analysis"
        subtitle="Capture or describe your plate. Athly AI identifies whole ingredients, estimates macronutrient distribution, and validates against your daily metabolic budget."
        badge={<DemoBadge text="Curated Vision AI Model" />}
        actions={
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#FAF8F3] border border-[#D9D5CB] text-[10px] font-mono uppercase tracking-[0.14em] text-[#171916]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5D99A]" />
            <span>Vision Subsystem Active</span>
          </div>
        }
        imageSrc="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Fresh culinary ingredients and wholesome nutritious plate"
        imageAspectRatio="aspect-[24/7]"
      />

      {/* Main 2-Column Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Logging & Vision Input */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-7 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9D5CB]">
              <div className="flex items-center gap-2.5">
                <UploadCloud className="w-4 h-4 text-[#171916] stroke-[1.75]" />
                <h2 className="font-serif text-lg font-medium text-[#171916]">
                  Log & Analyze Meal
                </h2>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#4B4F48]">
                Step 01 of 02
              </span>
            </div>

            {/* Meal Category Pills */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48] mb-2.5">
                Meal Category
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'].map((type) => {
                  const isActive = mealType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setMealType(type)}
                      className={`py-2 rounded text-xs font-mono uppercase tracking-wider transition-colors border ${
                        isActive
                          ? 'bg-[#171916] text-[#F4F1E9] border-[#171916] font-medium'
                          : 'bg-[#F4F1E9] text-[#4B4F48] border-[#D9D5CB] hover:border-[#171916]'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Photo Dropzone & Upload */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48]">
                  Plate Image Capture
                </label>
                {previewImage && (
                  <button
                    type="button"
                    onClick={handleClearImage}
                    className="text-[10px] font-mono text-[#4B4F48] hover:text-[#171916] flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                    <span>Clear Image</span>
                  </button>
                )}
              </div>
              <label className="border border-dashed border-[#D9D5CB] hover:border-[#171916] rounded-lg p-5 text-center bg-[#F4F1E9] cursor-pointer block transition-colors group relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {previewImage ? (
                  <div className="space-y-2">
                    <img
                      src={previewImage}
                      alt="Uploaded preview"
                      className="max-h-40 mx-auto rounded object-cover border border-[#D9D5CB] shadow-sm"
                    />
                    <p className="text-[11px] font-mono text-[#171916]">
                      Photo loaded &bull; Click to change
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#EBE7DC] group-hover:bg-[#171916] group-hover:text-[#F4F1E9] flex items-center justify-center mx-auto mb-2 text-[#4B4F48] transition-colors">
                      <Camera className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <p className="text-xs font-medium text-[#171916] font-sans">
                      Select plate photograph or drop file
                    </p>
                    <p className="text-[10px] text-[#4B4F48] font-mono mt-1">
                      Supports JPG, PNG, HEIC (Max 15MB)
                    </p>
                  </div>
                )}
              </label>
            </div>

            {/* Meal Description / Hint Input */}
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.16em] font-mono text-[#4B4F48] mb-1.5">
                  Meal Composition & Ingredients
                </label>
                <input
                  type="text"
                  value={mealHint}
                  onChange={(e) => {
                    setMealHint(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="e.g. 200g wild caught salmon, steamed broccolini, wild rice"
                  className="w-full px-4 py-2.5 rounded bg-[#F4F1E9] border border-[#D9D5CB] text-[#171916] text-xs placeholder:text-[#9B8F7D] focus:outline-none focus:border-[#171916]"
                />
              </div>

              {/* Sample Presets */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.14em] font-mono text-[#4B4F48] block mb-2">
                  Sample Culinary Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {samplePresets.map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelectPreset(p)}
                      className="px-2.5 py-1 rounded bg-[#F4F1E9] hover:bg-[#EBE7DC] text-[11px] text-[#4B4F48] hover:text-[#171916] border border-[#D9D5CB] transition-colors font-sans"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inline readable validation / error notice */}
              {errorMessage && (
                <div className="p-3 rounded bg-[#FAF8F3] border border-[#C5D99A] text-xs font-sans flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#171916] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#171916] block">Input Notice</span>
                    <span className="text-[#4B4F48]">{errorMessage}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={analyzing}
                  className="flex-1 py-3 rounded bg-[#171916] hover:bg-[#282B26] text-[#F4F1E9] text-xs font-medium tracking-wide transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {analyzing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-[#F4F1E9] border-t-transparent rounded-full animate-spin" />
                      <span>Analyzing Plate & Estimating Macros...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-[#C5D99A] stroke-[1.75]" />
                      <span>Run AI Nutrition Analysis (+35 XP)</span>
                    </>
                  )}
                </button>
                {(mealHint || previewImage) && (
                  <button
                    type="button"
                    onClick={handleResetForm}
                    disabled={analyzing}
                    className="px-3 py-3 rounded bg-[#F4F1E9] hover:bg-[#EBE7DC] text-[#4B4F48] hover:text-[#171916] border border-[#D9D5CB] text-xs font-mono transition-colors flex items-center gap-1.5"
                    title="Reset inputs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: AI Analysis Results Card */}
        <div className="lg:col-span-6 space-y-6">
          {latestAnalysis ? (
            <div className="p-6 sm:p-7 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-5">
              {/* Photo Display when available */}
              {latestAnalysis.imageUrl && (
                <div className="relative rounded overflow-hidden border border-[#D9D5CB] h-52">
                  <img
                    src={latestAnalysis.imageUrl}
                    alt={latestAnalysis.identifiedFood}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#171916]/80 text-[#F4F1E9] text-[9px] font-mono uppercase tracking-wider backdrop-blur-sm">
                    Analyzed Plate Photograph
                  </div>
                </div>
              )}

              <div className="flex items-start justify-between pb-4 border-b border-[#D9D5CB]">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[9px] font-mono uppercase tracking-[0.16em] px-2 py-0.5 rounded bg-[#EBF2DC] text-[#282B26] border border-[#C5D99A]/80 font-medium">
                      {latestAnalysis.mealType} &bull; {(latestAnalysis.confidence * 100).toFixed(0)}% Confidence
                    </span>
                    {latestAnalysis.isDemo && (
                      <span className="text-[9px] font-mono uppercase tracking-[0.14em] px-2 py-0.5 rounded bg-[#EBE7DC] text-[#4B4F48] border border-[#D9D5CB]">
                        Demo Simulation
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#171916]">
                    {latestAnalysis.identifiedFood}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="font-mono text-3xl font-medium text-[#171916] tracking-tight">
                    {latestAnalysis.totalCalories}
                  </div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#4B4F48]">
                    Kilocalories
                  </div>
                </div>
              </div>

              {/* 4 Macro Pills */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-3 rounded bg-[#F4F1E9] border border-[#D9D5CB]">
                  <span className="text-[9px] uppercase tracking-[0.14em] font-mono text-[#4B4F48] block">
                    Protein
                  </span>
                  <span className="font-mono text-sm font-medium text-[#171916]">
                    {latestAnalysis.totalProtein}g
                  </span>
                </div>
                <div className="p-3 rounded bg-[#F4F1E9] border border-[#D9D5CB]">
                  <span className="text-[9px] uppercase tracking-[0.14em] font-mono text-[#4B4F48] block">
                    Carbs
                  </span>
                  <span className="font-mono text-sm font-medium text-[#171916]">
                    {latestAnalysis.totalCarbs}g
                  </span>
                </div>
                <div className="p-3 rounded bg-[#F4F1E9] border border-[#D9D5CB]">
                  <span className="text-[9px] uppercase tracking-[0.14em] font-mono text-[#4B4F48] block">
                    Fats
                  </span>
                  <span className="font-mono text-sm font-medium text-[#171916]">
                    {latestAnalysis.totalFats}g
                  </span>
                </div>
                <div className="p-3 rounded bg-[#F4F1E9] border border-[#D9D5CB]">
                  <span className="text-[9px] uppercase tracking-[0.14em] font-mono text-[#4B4F48] block">
                    Fiber
                  </span>
                  <span className="font-mono text-sm font-medium text-[#171916]">
                    {latestAnalysis.totalFiber || 5}g
                  </span>
                </div>
              </div>

              {/* Daily Target Progress Impact */}
              <div className="p-4 rounded bg-[#F4F1E9] border border-[#D9D5CB] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] uppercase tracking-[0.14em] font-mono text-[#4B4F48]">
                    Daily Calorie Target Impact
                  </span>
                  <span className="font-mono font-medium text-[#171916]">
                    {latestAnalysis.consumedCaloriesToday} / {latestAnalysis.dailyCalorieTarget} kcal
                  </span>
                </div>
                <div className="w-full bg-[#EBE7DC] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#171916] h-full rounded-full"
                    style={{
                      width: `${Math.min(100, (latestAnalysis.consumedCaloriesToday / latestAnalysis.dailyCalorieTarget) * 100)}%`
                    }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-[#4B4F48] pt-1">
                  <span>Remaining: {latestAnalysis.remainingCaloriesToday} kcal</span>
                  <span>{latestAnalysis.remainingProteinToday}g protein budget</span>
                </div>
              </div>

              {/* AI Dietary Insight Callout */}
              <div className="p-4 rounded bg-[#171916] text-[#F4F1E9] space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] font-mono text-[#C5D99A]">
                    <Sparkles className="w-3.5 h-3.5 stroke-[1.75]" />
                    <span>{latestAnalysis.isDemo ? 'Nutritional Feedback (Demo Mode)' : 'AI Nutritional Feedback'}</span>
                  </div>
                  {latestAnalysis.isDemo && (
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#9B8F7D]">
                      Local Estimate
                    </span>
                  )}
                </div>
                <p className="text-[#D9D5CB] leading-relaxed font-sans">
                  {latestAnalysis.aiDietaryInsight}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[360px] flex flex-col items-center justify-center p-8 rounded-lg bg-[#FAF8F3] border border-dashed border-[#D9D5CB] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#EBE7DC] flex items-center justify-center text-[#4B4F48]">
                <Camera className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#171916]">
                Awaiting Plate Diagnostic
              </h3>
              <p className="text-xs text-[#4B4F48] max-w-sm font-sans leading-relaxed">
                Choose a sample preset, select a plate photograph, or describe ingredients to trigger computer vision macronutrient breakdown and metabolic calibration.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Today's Logged Meals Ledger */}
      <div className="p-6 sm:p-7 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB] space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#D9D5CB]">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#171916] stroke-[1.75]" />
            <h2 className="font-serif text-lg font-medium text-[#171916]">
              Today's Chronological Meals Ledger
            </h2>
          </div>
          <span className="text-xs font-mono text-[#4B4F48]">
            {todayMeals.length} Recorded Entries
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {todayMeals.map((meal, idx) => (
            <div
              key={meal.id || idx}
              className="p-4 rounded bg-[#F4F1E9] border border-[#D9D5CB] space-y-3 overflow-hidden flex flex-col justify-between"
            >
              {meal.imageUrl && (
                <div className="h-28 -mx-4 -mt-4 mb-1 overflow-hidden border-b border-[#D9D5CB]">
                  <img src={meal.imageUrl} alt={meal.foodName} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono uppercase tracking-[0.14em] px-2 py-0.5 rounded bg-[#FAF8F3] border border-[#D9D5CB] text-[#171916] font-medium">
                    {meal.mealType}
                  </span>
                  <span className="font-mono text-xs font-medium text-[#171916]">
                    {meal.calories} kcal
                  </span>
                </div>
                <h4 className="text-xs font-medium text-[#171916] line-clamp-1 font-serif">
                  {meal.foodName}
                </h4>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#4B4F48] pt-2 border-t border-[#D9D5CB]">
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
