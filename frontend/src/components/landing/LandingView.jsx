import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Check, 
  Dumbbell, 
  Utensils, 
  Droplet, 
  Target, 
  ShieldCheck, 
  Flame, 
  Award,
  ChevronRight
} from 'lucide-react';
import { EditorialImage } from './EditorialImage';
import { LandingNavbar } from './LandingNavbar';

/**
 * LandingView
 * Public landing page embodying the "Luxury Wellness Editorial" design system.
 * Inspired by the spacious restraint of Aesop and the athletic telemetry of Whoop.
 * Built with:
 * - Graphite: #171916
 * - Warm Ivory: #F4F1E9
 * - Muted Sage: #C5D99A
 * - Stone: #D9D5CB
 */
export const LandingView = ({ onEnterPlatform }) => {
  return (
    <div className="min-h-screen bg-[#F4F1E9] text-[#171916] font-sans selection:bg-[#C5D99A] selection:text-[#171916]">
      {/* Public Editorial Header */}
      <LandingNavbar onEnterPlatform={onEnterPlatform} />

      {/* Main Editorial Content */}
      <main id="hero">
        {/* ===================================================================
            SECTION 1: CINEMATIC HERO
        =================================================================== */}
        <section className="relative px-6 sm:px-10 lg:px-16 pt-8 pb-20 max-w-7xl mx-auto">
          {/* Top Category Badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#171916]" />
            <span className="text-[11px] uppercase tracking-[0.16em] font-medium text-[#4B4F48]">
              Personal Health & Performance Architecture
            </span>
          </div>

          {/* Hero Headline & Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12">
            <div className="lg:col-span-8">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.1] font-normal text-[#171916]">
                The quiet pursuit of physical mastery.
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm sm:text-base text-[#4B4F48] leading-relaxed font-normal">
                Intelligent training periodization, computer-vision meal diagnostics, and biometric telemetry. Understated. Precise. Personal.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onEnterPlatform}
                  className="px-7 py-3.5 rounded-full bg-[#171916] text-[#F4F1E9] hover:bg-[#282B26] text-xs uppercase tracking-[0.14em] font-medium transition-all shadow-sm flex items-center gap-2 group active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5D99A]"
                >
                  <span>Explore Demo</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5D99A] group-hover:translate-x-0.5 transition-transform" />
                </button>
                <a
                  href="#pillars"
                  className="text-xs uppercase tracking-[0.12em] font-medium text-[#4B4F48] hover:text-[#171916] py-3 transition-colors"
                >
                  Explore the Method
                </a>
              </div>
            </div>
          </div>

          {/* Cinematic Wide Image */}
          <div className="relative rounded-lg overflow-hidden border border-[#D9D5CB]">
            <EditorialImage
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2200&auto=format&fit=crop"
              alt="Athlete engaged in focused morning physical preparation in diffused natural sunlight"
              aspectRatio="aspect-[16/9] lg:aspect-[21/9]"
              priority={true}
              imageClassName="filter grayscale-[15%] contrast-[105%]"
              overlay={
                <div className="absolute inset-0 bg-gradient-to-t from-[#171916]/80 via-transparent to-transparent flex items-end p-6 sm:p-10">
                  <div className="max-w-xl text-[#F4F1E9]">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F3]/15 backdrop-blur-md border border-[#F4F1E9]/20 text-[10px] uppercase tracking-[0.14em] text-[#EBE7DC] mb-3">
                      <Sparkles className="w-3 h-3 text-[#C5D99A]" />
                      <span>Periodized Protocol 01</span>
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl font-normal leading-tight">
                      "Excellence is an art won by training and habituation."
                    </h2>
                    <p className="text-xs text-[#EBE7DC]/80 mt-1 font-mono">
                      Aristotle &bull; Athletic Foundation Benchmark
                    </p>
                  </div>
                </div>
              }
            />
          </div>

          {/* Verified Telemetry Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-6 border-t border-[#D9D5CB]">
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#C5D99A] mt-1.5 shrink-0" />
              <div>
                <h3 className="text-xs uppercase tracking-[0.1em] font-semibold text-[#171916]">
                  Biometric Metabolism Engine
                </h3>
                <p className="text-xs text-[#4B4F48] mt-0.5">
                  Basal metabolic rate (BMR) and TDEE computed via Mifflin-St Jeor formula.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#C5D99A] mt-1.5 shrink-0" />
              <div>
                <h3 className="text-xs uppercase tracking-[0.1em] font-semibold text-[#171916]">
                  Computer Vision Analysis
                </h3>
                <p className="text-xs text-[#4B4F48] mt-0.5">
                  Instant visual food identification and automated macronutrient estimation.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#C5D99A] mt-1.5 shrink-0" />
              <div>
                <h3 className="text-xs uppercase tracking-[0.1em] font-semibold text-[#171916]">
                  7-Day Periodized Splits
                </h3>
                <p className="text-xs text-[#4B4F48] mt-0.5">
                  Structured splits covering hypertrophy, power, recovery, and conditioning.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ===================================================================
            SECTION 2: THE THREE PILLARS (MOVEMENT, NOURISHMENT, RESTORATION)
        =================================================================== */}
        <section id="pillars" className="border-t border-[#D9D5CB] bg-[#FAF8F3] py-20 px-6 sm:px-10 lg:px-16">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#4B4F48] block mb-2">
                  01 / The Architecture of Performance
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#171916] font-normal leading-tight max-w-xl">
                  Three interconnected disciplines. One coherent protocol.
                </h2>
              </div>
              <p className="text-sm text-[#4B4F48] max-w-sm leading-relaxed">
                Physical achievement requires deliberate synchronization between mechanical tension, metabolic fuel, and restorative recovery.
              </p>
            </div>

            {/* 3 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1: Movement */}
              <div className="flex flex-col bg-[#F4F1E9] border border-[#D9D5CB] rounded-lg overflow-hidden group">
                <EditorialImage
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
                  alt="Athlete focused on progressive strength training with barbells in natural studio lighting"
                  aspectRatio="aspect-[4/5]"
                  imageClassName="group-hover:scale-[1.02] transition-transform duration-700 filter grayscale-[10%]"
                />
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#4B4F48] uppercase tracking-[0.12em] font-medium mb-2">
                      <span>Pillar I</span>
                      <span>Discipline</span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#171916] font-normal mb-3">
                      Movement
                    </h3>
                    <p className="text-xs text-[#4B4F48] leading-relaxed mb-4">
                      Periodized 7-day splits with curated exercises, prescribed set-and-rep cadences, and scientifically determined rest intervals.
                    </p>
                  </div>
                  <ul className="text-xs text-[#171916] space-y-2 pt-4 border-t border-[#D9D5CB]/80">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#171916]" />
                      <span>Push, Pull, Legs & Conditioning Splits</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#171916]" />
                      <span>Form cues & mechanical tips per lift</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#171916]" />
                      <span>Active energy expenditure estimation</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Pillar 2: Nourishment */}
              <div className="flex flex-col bg-[#F4F1E9] border border-[#D9D5CB] rounded-lg overflow-hidden group">
                <EditorialImage
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop"
                  alt="Fresh culinary salad with avocado, grilled protein, and herbs on artisanal tableware"
                  aspectRatio="aspect-[4/5]"
                  imageClassName="group-hover:scale-[1.02] transition-transform duration-700 filter grayscale-[10%]"
                />
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#4B4F48] uppercase tracking-[0.12em] font-medium mb-2">
                      <span>Pillar II</span>
                      <span>Nourishment</span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#171916] font-normal mb-3">
                      Nourishment
                    </h3>
                    <p className="text-xs text-[#4B4F48] leading-relaxed mb-4">
                      Computer vision food identification that calculates protein pacing, carbohydrate load, and healthy fats from photographic inputs.
                    </p>
                  </div>
                  <ul className="text-xs text-[#171916] space-y-2 pt-4 border-t border-[#D9D5CB]/80">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#171916]" />
                      <span>Instant ingredient & portion parsing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#171916]" />
                      <span>Mifflin-St Jeor daily caloric budget sync</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#171916]" />
                      <span>Dietary protocols for Omnivore, Vegan, Keto</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Pillar 3: Restoration */}
              <div className="flex flex-col bg-[#F4F1E9] border border-[#D9D5CB] rounded-lg overflow-hidden group">
                <EditorialImage
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop"
                  alt="Serene morning meditation and mobility stretching on linen mat in soft atmospheric light"
                  aspectRatio="aspect-[4/5]"
                  imageClassName="group-hover:scale-[1.02] transition-transform duration-700 filter grayscale-[10%]"
                />
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#4B4F48] uppercase tracking-[0.12em] font-medium mb-2">
                      <span>Pillar III</span>
                      <span>Restoration</span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#171916] font-normal mb-3">
                      Restoration
                    </h3>
                    <p className="text-xs text-[#4B4F48] leading-relaxed mb-4">
                      Hydration tracking, NEAT baseline step volume, and recovery feedback that prevent overtraining and optimize muscle repair.
                    </p>
                  </div>
                  <ul className="text-xs text-[#171916] space-y-2 pt-4 border-t border-[#D9D5CB]/80">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#171916]" />
                      <span>Calculated hydration targets (~35ml/kg)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#171916]" />
                      <span>Daily step target telemetry (8k - 12k NEAT)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#171916]" />
                      <span>AI coaching feedback every 24 hours</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ===================================================================
            SECTION 3: AI MEAL ANALYSIS SHOWCASE
        =================================================================== */}
        <section id="ai-nutrition" className="py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-[#D9D5CB]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Visual Showcase */}
            <div className="lg:col-span-6">
              <div className="relative rounded-lg overflow-hidden border border-[#D9D5CB] bg-[#FAF8F3] shadow-soft-elevation">
                <EditorialImage
                  src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200&auto=format&fit=crop"
                  alt="High-angle culinary plate of pan-seared wild salmon, quinoa, and steamed asparagus on ceramic plate"
                  aspectRatio="aspect-[4/3]"
                  imageClassName="filter contrast-[102%]"
                />
                {/* Floating Analysis Card */}
                <div className="p-6 bg-[#FAF8F3] border-t border-[#D9D5CB] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.12em] px-2 py-0.5 rounded bg-[#EBF2DC] text-[#282B26] border border-[#C5D99A] font-semibold">
                        Vision Identified &bull; 96% Confidence
                      </span>
                      <h4 className="font-serif text-lg text-[#171916] mt-1">
                        Pan-Seared Atlantic Salmon with Quinoa & Asparagus
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-2xl font-medium text-[#171916]">580</span>
                      <span className="text-[10px] text-[#4B4F48] block uppercase">Kilocalories</span>
                    </div>
                  </div>

                  {/* Macro breakdown pills */}
                  <div className="grid grid-cols-4 gap-2 text-center pt-2 border-t border-[#D9D5CB]/60">
                    <div className="p-2 bg-[#F4F1E9] border border-[#D9D5CB] rounded">
                      <span className="text-[9px] uppercase tracking-wider text-[#4B4F48] block">Protein</span>
                      <span className="text-xs font-mono font-bold text-[#171916]">42g</span>
                    </div>
                    <div className="p-2 bg-[#F4F1E9] border border-[#D9D5CB] rounded">
                      <span className="text-[9px] uppercase tracking-wider text-[#4B4F48] block">Carbs</span>
                      <span className="text-xs font-mono font-bold text-[#171916]">38g</span>
                    </div>
                    <div className="p-2 bg-[#F4F1E9] border border-[#D9D5CB] rounded">
                      <span className="text-[9px] uppercase tracking-wider text-[#4B4F48] block">Fats</span>
                      <span className="text-xs font-mono font-bold text-[#171916]">24g</span>
                    </div>
                    <div className="p-2 bg-[#F4F1E9] border border-[#D9D5CB] rounded">
                      <span className="text-[9px] uppercase tracking-wider text-[#4B4F48] block">Fiber</span>
                      <span className="text-xs font-mono font-bold text-[#171916]">6g</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#4B4F48] italic border-l-2 border-[#C5D99A] pl-3 py-0.5">
                    "High in Omega-3 fatty acids and complete essential amino acids. Meets 25% of daily protein target."
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Narrative */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#4B4F48] block mb-2">
                  02 / Computer Vision Nutrition
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#171916] font-normal leading-tight">
                  Nutritional honesty without the tedium of manual logging.
                </h2>
                <p className="text-sm text-[#4B4F48] leading-relaxed mt-4">
                  Traditional calorie tracking forces members to search vast, inaccurate databases and manually estimate grams. ATHLY uses computer vision to inspect your plate, decompose its contents, and calculate precise macronutrients.
                </p>
              </div>

              {/* 3 Step Decomposition Flow */}
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB]">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#171916] text-[#F4F1E9] text-xs font-mono flex items-center justify-center font-medium">
                      1
                    </span>
                    <h3 className="text-sm font-semibold text-[#171916]">
                      Optical Ingestion
                    </h3>
                  </div>
                  <p className="text-xs text-[#4B4F48] mt-1.5 pl-9">
                    Capture or upload a photo of your meal. The vision model analyzes textures, volumes, and preparation methods.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB]">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#171916] text-[#F4F1E9] text-xs font-mono flex items-center justify-center font-medium">
                      2
                    </span>
                    <h3 className="text-sm font-semibold text-[#171916]">
                      Macronutrient Decomposition
                    </h3>
                  </div>
                  <p className="text-xs text-[#4B4F48] mt-1.5 pl-9">
                    Estimates caloric density, protein grams, complex carbohydrates, healthy fats, and dietary fiber with high confidence.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#FAF8F3] border border-[#D9D5CB]">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#171916] text-[#F4F1E9] text-xs font-mono flex items-center justify-center font-medium">
                      3
                    </span>
                    <h3 className="text-sm font-semibold text-[#171916]">
                      Metabolic Target Synchronization
                    </h3>
                  </div>
                  <p className="text-xs text-[#4B4F48] mt-1.5 pl-9">
                    Automatically subtracts consumed calories and macros from your daily budget, updating your remaining allowances in real time.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  type="button"
                  onClick={onEnterPlatform}
                  className="px-6 py-3 rounded-full bg-[#171916] text-[#F4F1E9] hover:bg-[#282B26] text-xs uppercase tracking-[0.14em] font-medium transition-all shadow-sm flex items-center gap-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5D99A]"
                >
                  <span>Experience Vision Analysis in Platform</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5D99A]" />
                </button>
              </div>
            </div>
          </div>
        </section>


        {/* ===================================================================
            SECTION 4: THE ATHLY METHOD (STEP-BY-STEP PROTOCOL)
        =================================================================== */}
        <section id="protocol" className="py-24 border-t border-[#D9D5CB] bg-[#FAF8F3] px-6 sm:px-10 lg:px-16">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#4B4F48] block mb-2">
                03 / The ATHLY Method
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#171916] font-normal leading-tight">
                "Your Goal. Our Plan. Your Progress. Your Reward."
              </h2>
              <p className="text-xs sm:text-sm text-[#4B4F48] mt-3">
                A closed-loop system designed to remove guesswork from daily wellness and build sustained physical momentum.
              </p>
            </div>

            {/* 4 Steps Horizontal Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="p-6 bg-[#F4F1E9] border border-[#D9D5CB] rounded-lg flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-[#4B4F48] block mb-4">PHASE 01</span>
                  <h3 className="font-serif text-xl text-[#171916] font-normal mb-2">
                    Biometric Calibration
                  </h3>
                  <p className="text-xs text-[#4B4F48] leading-relaxed">
                    Input your height, weight, age, and activity level. ATHLY computes your exact basal BMR and total daily energy expenditure (TDEE).
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#D9D5CB] text-[11px] font-mono text-[#171916]">
                  Mifflin-St Jeor Formula
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-6 bg-[#F4F1E9] border border-[#D9D5CB] rounded-lg flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-[#4B4F48] block mb-4">PHASE 02</span>
                  <h3 className="font-serif text-xl text-[#171916] font-normal mb-2">
                    Periodized Split
                  </h3>
                  <p className="text-xs text-[#4B4F48] leading-relaxed">
                    Receive a tailored 7-day workout routine with exact exercises, sets, reps, and rest intervals customized to your goal.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#D9D5CB] text-[11px] font-mono text-[#171916]">
                  7-Day Hypertrophy & Cardio
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 bg-[#F4F1E9] border border-[#D9D5CB] rounded-lg flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-[#4B4F48] block mb-4">PHASE 03</span>
                  <h3 className="font-serif text-xl text-[#171916] font-normal mb-2">
                    Daily Telemetry
                  </h3>
                  <p className="text-xs text-[#4B4F48] leading-relaxed">
                    Log workouts, analyze meals via computer vision, track steps, and record hydration with one-touch increments.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#D9D5CB] text-[11px] font-mono text-[#171916]">
                  Real-time Metabolic Sync
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-6 bg-[#F4F1E9] border border-[#D9D5CB] rounded-lg flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-[#4B4F48] block mb-4">PHASE 04</span>
                  <h3 className="font-serif text-xl text-[#171916] font-normal mb-2">
                    Consistency Rewards
                  </h3>
                  <p className="text-xs text-[#4B4F48] leading-relaxed">
                    Earn athletic tier XP, build unbroken active day streaks, and unlock achievement milestone emblems.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#D9D5CB] text-[11px] font-mono text-[#171916]">
                  Tier & Streak Ledger
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ===================================================================
            SECTION 5: EDITORIAL PHILOSOPHY & INVITATION PANEL
        =================================================================== */}
        <section id="philosophy" className="py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-[#D9D5CB]">
          <div className="rounded-2xl bg-[#171916] text-[#F4F1E9] p-8 sm:p-14 lg:p-20 relative overflow-hidden">
            {/* Subtle architectural grid pattern */}
            <div className="max-w-3xl space-y-6 relative z-10">
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#C5D99A] block">
                04 / Core Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15]">
                "Dedication requires neither noise nor spectacle. Only consistency."
              </h2>
              <p className="text-sm sm:text-base text-[#D9D5CB] leading-relaxed font-normal pt-2">
                ATHLY was conceived for those who treat physical training as a quiet, lifelong craft. By replacing decorative clutter with verified physiological principles and optical intelligence, we return focus to where it belongs: the work itself.
              </p>
              <div className="pt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onEnterPlatform}
                  className="px-8 py-4 rounded-full bg-[#C5D99A] text-[#171916] hover:bg-[#B4CB85] text-xs uppercase tracking-[0.14em] font-semibold transition-all shadow-sm flex items-center gap-2 group active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F1E9]"
                >
                  <span>Explore Demo Platform</span>
                  <ArrowRight className="w-4 h-4 text-[#171916] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===================================================================
          PUBLIC FOOTER
      =================================================================== */}
      <footer className="border-t border-[#D9D5CB] bg-[#FAF8F3] py-14 px-6 sm:px-10 lg:px-16 text-xs text-[#4B4F48]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-baseline justify-between gap-8">
          <div>
            <span className="font-serif text-xl tracking-[0.12em] font-medium text-[#171916] block">
              ATHLY
            </span>
            <p className="text-[11px] text-[#4B4F48] mt-1 max-w-xs">
              AI-Powered Personal Health and Fitness Architecture. Built with editorial precision.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-xs font-medium text-[#171916]">
            <a href="#hero" className="hover:opacity-70 transition-opacity">Return to Top</a>
            <a href="#pillars" className="hover:opacity-70 transition-opacity">The Architecture</a>
            <a href="#ai-nutrition" className="hover:opacity-70 transition-opacity">Vision AI</a>
            <a href="#protocol" className="hover:opacity-70 transition-opacity">The Protocol</a>
            <button
              type="button"
              onClick={onEnterPlatform}
              className="text-[#171916] hover:underline uppercase tracking-wider text-[11px] font-semibold"
            >
              Enter Member Dashboard &rarr;
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#D9D5CB]/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#4B4F48]">
          <span>&copy; {new Date().getFullYear()} ATHLY. All rights reserved.</span>
          <span className="mt-2 sm:mt-0 font-mono">
            Luxury Wellness Editorial &bull; Version 2.0
          </span>
        </div>
      </footer>
    </div>
  );
};
