# ATHLY V2 — Design Specification: Luxury Wellness Editorial

**Document Version:** 1.0.0  
**Status:** Approved Visual Specification  
**Branch:** `rebuild/athly-v2`  
**Target:** Frontend Redesign & Experience Architecture  

---

## 1. Visual Direction & Design Philosophy

ATHLY V2 moves deliberately away from the crowded, high-contrast neon aesthetic common to generic fitness apps, crypto dashboards, and AI SaaS boilerplates. It re-envisions the platform as a **luxury wellness publication and disciplined athletic instrument**.

### Reference Analysis & Accessibility Notes
- **Primary Reference (`https://www.aesop.com`):**  
  *Access Note:* Direct automated HTTP scraping was blocked (HTTP 403 bot mitigation). The design specification draws upon established Aesop design patterns: generous ivory/alabaster breathing room, intellectual editorial serif headlines, hairlines over heavy drop-shadows, dignified natural lighting, still-life photography with physical presence, and calm, unhurried typography.
- **Secondary Reference (`https://www.whoop.com`):**  
  *Access Note:* Direct automated HTTP scraping was blocked (HTTP 403 bot mitigation). The specification incorporates Whoop’s core strength: unapologetic data precision, tabular metrics, authentic athletic exertion, quiet strain/recovery indicators, and zero decorative graph gimmicks.

### Core Aesthetic Principles
1. **Spacious & Editorial:** Whitespace is not empty space—it is breathing room that signals focus, luxury, and clarity.
2. **Organic Warmth Meets Athletic Rigor:** The foundational palette pairs Warm Ivory (`#F4F1E9`) and deep Graphite (`#171916`) with accents of Muted Sage (`#C5D99A`) and architectural Stone (`#D9D5CB`).
3. **Cinematic, Authentic Imagery:** Photography features real athletes in natural light, real food prepared with care, and textural details (chalk, sweat, linen, water droplets) rather than generic studio stock.
4. **Restraint Over Decoration:** No heavy glowing cards, no gratuitous gradient borders, no bouncy cartoon micro-animations. Transitions are swift, linear, and silent (120–150ms).

---

## 2. Design Tokens & Foundations

### 2.1 Color Palette

```
┌────────────────────────────────────────────────────────────────────────┐
│  Graphite (#171916)          Warm Ivory (#F4F1E9)       Stone (#D9D5CB)│
│  Primary Typography & Base   Primary Canvas & Cards     Borders & Rules│
│                                                                        │
│  Muted Sage (#C5D99A)        Sage Deep (#9EB86C)        Ivory Soft     │
│  Active CTAs & Accent Hits   Hover & Interactive States Surfaces       │
└────────────────────────────────────────────────────────────────────────┘
```

| Token Name | Hex Code | Purpose & Application |
|---|---|---|
| `canvas-ivory` | `#F4F1E9` | Primary page background, public landing canvas, light-mode dashboard |
| `surface-ivory-light` | `#FAF8F3` | Elevated cards, dropdowns, modal panels |
| `surface-ivory-muted` | `#EBE7DC` | Input field backgrounds, secondary card containers |
| `graphite-base` | `#171916` | Primary headlines, heavy body text, buttons in high contrast, hero panels |
| `graphite-card` | `#20231F` | Dark mode / inverted focus surface, evening workout mode |
| `graphite-muted` | `#4B4F48` | Secondary body text, timestamps, captions, axis labels |
| `stone-border` | `#D9D5CB` | 1px hairline card borders, section separators, table dividers |
| `stone-light` | `#E8E4DA` | Subtle inner borders, inactive step meters |
| `sage-accent` | `#C5D99A` | Primary active accent, checkmarks, progress bars, key CTA buttons |
| `sage-hover` | `#B4CB85` | Hover state for sage buttons and active pills |
| `sage-soft` | `rgba(197, 217, 154, 0.22)` | Subtle badge background, selected row tint |
| `crimson-subtle` | `#BD4545` | High heart-rate warnings, calorie deficit alerts, delete actions |
| `amber-subtle` | `#C88E32` | Hydration reminder badge, streak indicator icon |

---

### 2.2 Typography System

The typography pairs an **editorial serif** for headlines with a **crisp geometric sans-serif** for interface controls, and **monospace tabular figures** for metrics.

| Style Role | Font Family | Weight | Size (Desktop / Mobile) | Line Height | Tracking |
|---|---|---|---|---|---|
| **Display Hero** | Serif (*Playfair / Fraunces*) | Medium (500) | `56px` / `38px` | 1.1 | `-0.02em` |
| **Headline 1** | Serif (*Playfair / Fraunces*) | Medium (500) | `40px` / `28px` | 1.15 | `-0.015em` |
| **Headline 2** | Serif (*Playfair / Fraunces*) | Regular (400) | `28px` / `22px` | 1.25 | `-0.01em` |
| **Section Label**| Sans (*Plus Jakarta Sans / Inter*) | SemiBold (600)| `11px` / `10px` | 1.4 | `+0.08em` (UPPERCASE) |
| **Body Large** | Sans (*Plus Jakarta Sans / Inter*) | Regular (400) | `16px` / `15px` | 1.6 | `normal` |
| **Body Default**| Sans (*Plus Jakarta Sans / Inter*) | Regular (400) | `14px` / `13px` | 1.55 | `normal` |
| **Body Small** | Sans (*Plus Jakarta Sans / Inter*) | Regular (400) | `12px` / `11px` | 1.5 | `normal` |
| **Metric KPI** | Monospace (*JetBrains / DM Mono*) | Medium (500) | `32px` / `26px` | 1.0 | `-0.03em` |
| **Metric Small**| Monospace (*JetBrains / DM Mono*) | Regular (400) | `16px` / `14px` | 1.2 | `-0.01em` |

---

### 2.3 Spatial System & Hairline Dividers

- **Base Unit:** 8px grid (4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px, 128px).
- **Page Container:** `max-w-7xl` (1280px) with fluid gutter: `px-6 sm:px-10 lg:px-16`.
- **Card Radius:** Restrained `rounded-lg` (6px) or `rounded-none` for editorial panels. Pill buttons use `rounded-full`.
- **Borders:** Crisp, 1px solid hairline borders:
  - Light canvas: `border border-[#D9D5CB]`
  - Inverted / dark panels: `border border-[#2D312C]`
- **Shadows:** No glowing box shadows. At most, a soft tactile ambient shadow on floating modals: `shadow-[0_8px_30px_rgb(0,0,0,0.06)]`.

---

### 2.4 Photography Art Direction & Aspect Ratios

Photography is a first-class structural element. It establishes mood, texture, and authenticity.

```
┌─────────────────────────────────┐   ┌─────────────────┐   ┌───────────────┐
│                                 │   │                 │   │               │
│         Cinematic Hero          │   │  Portrait Story │   │  Still-life   │
│         21:9 or 16:9            │   │      4:5        │   │    1:1 / 4:3  │
│                                 │   │                 │   │               │
└─────────────────────────────────┘   └─────────────────┘   └───────────────┘
```

1. **Fitness & Movement Photography:**
   - Real athletes focusing, recovering, or in disciplined motion (outdoor track, quiet barbell room, coastal run, mobility on linen mat).
   - Natural sunlight, chiaroscuro contrast, neutral grading. No artificial saturated neon lighting.
2. **Food & Culinary Nutrition Photography:**
   - High-angle or 45-degree macro still life: grilled wild salmon, seasonal bowls, crisp greens, sourdough slices, fresh herbs.
   - Clean ceramic, matte stone plates, natural linen surfaces.
3. **Aspect Ratios Standard:**
   - **Hero Full-Bleed / Wide:** `21:9` or `16:9`
   - **Editorial Feature Stories:** `4:5` portrait or `3:2` landscape
   - **Meal & Food Cards:** `1:1` square or `4:3` horizontal
   - **Exercise Demonstration Cards:** `16:9` or `4:3`

---

## 3. Global Navigation & App Shell

### 3.1 Public Navigation Shell (Landing & Auth)
- **Top Bar:** Fixed `h-20`, Warm Ivory background (`#F4F1E9`) with a 1px Stone bottom rule (`#D9D5CB`).
- **Brand Identity:** Left-aligned wordmark **`ATHLY`** in uppercase serif (*Fraunces / Playfair*), tracking `+0.12em`. Subtitle: *"The Discipline of Wellness"*.
- **Navigation Links:** Center or right-aligned subtle text links: *Philosophy*, *The Method*, *Nutrition & AI*, *Rituals*.
- **Call-to-Action:** Right-aligned paired buttons:
  - Text button: *"Sign In"* (Graphite text, hover underline)
  - Pill button: *"Begin Membership"* (Graphite `#171916` background, Warm Ivory `#F4F1E9` text, `px-6 py-2.5 rounded-full`)

### 3.2 Authenticated Application Shell (Signed-in Platform)
- **Header:** Sticky `h-16` border-b border-stone-300 bg-[#F4F1E9]/95 backdrop-blur-sm.
  - Left: Minimal ATHLY monogram + active route name (e.g. *Journal & Dashboard*).
  - Center: Understated date capsule: *"Wednesday, 21 October — Day 5 of Hypertrophy Split"*.
  - Right: Quick streak counter (*"5-Day Streak"* with discreet amber dot), XP level badge, user avatar initial pill.
- **Navigation Sub-Bar / Tab Rail:**
  - Clean horizontal navigation bar with hairline dividers:
    1. **Overview** (`/dashboard`)
    2. **Training** (`/workouts`)
    3. **Nutrition** (`/nutrition`)
    4. **AI Scanner** (`/scanner`)
    5. **Activity** (`/activity`)
    6. **Analytics** (`/analytics`)
    7. **Sanctuary & Profile** (`/profile`)
  - Active indicator: A 2px Muted Sage underline (`#C5D99A`) and bold graphite text. Inactive tabs are muted graphite (`#4B4F48`).
- **Mobile Responsive Drawer:**
  - On mobile (<768px), navigation collapses to a bottom tab bar with 5 primary icons + labels, with high contrast and 48px touch targets.

---

## 4. Screen-by-Screen Specifications

### Screen 1: Public Landing Page

```
┌────────────────────────────────────────────────────────────────────────┐
│ [ATHLY]                   Philosophy   Method   AI Vision     [Join]  │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   CINEMATIC HERO (Aspect 16:9 / 21:9)                                  │
│   "The quiet pursuit of physical mastery."                             │
│   [ Begin Your Plan — 14-Day Protocol ]                                │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│  THE THREE PILLARS (3-Column Editorial Grid)                           │
│  [ Photo: Movement ]     [ Photo: Nutrition ]    [ Photo: Recovery ]   │
│  Intelligent Splits       Computer Vision         Biometric Balance    │
├────────────────────────────────────────────────────────────────────────┤
│  AI NUTRITION FEATURE (Editorial Split 50/50)                          │
│  Text: "Nutritional honesty without the tedium."                       │
│  Image: Crisp artisanal plate with discrete macro metadata overlay     │
├────────────────────────────────────────────────────────────────────────┤
│  MEMBER JOURNAL QUOTE                                                  │
│  "Simplicity is the ultimate sophistication in physical training."     │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Hero Section:**
   - **Visual:** Full-width cinematic image of a runner at sunrise or a quiet minimalist strength studio (Aspect: `21:9` desktop, `16:9` mobile).
   - **Headline:** Serif 56px: *"The quiet pursuit of physical mastery."*
   - **Subhead:** Sans 16px: *"Intelligent training periodization, computer-vision meal diagnostics, and biometric telemetry. Understated. Precise. Personal."*
   - **CTA Button:** Primary pill button in Graphite `#171916` with text *"Begin Your Protocol"* + secondary ghost button *"Explore the Method"*.
2. **The Philosophy Section:**
   - Generous 120px vertical padding.
   - 3-column editorial grid with 4:5 portrait photographs:
     - Column 1: **Movement** — Periodized progressive overload routines.
     - Column 2: **Nourishment** — Vision-based macronutrient diagnostics.
     - Column 3: **Restoration** — Heart-rate, sleep, and hydration synergy.
3. **The Vision AI Showcase:**
   - Asymmetric 2-column layout:
     - Left (45%): Large high-resolution plate photography (e.g., sliced avocado, poached eggs, herbs on ceramic).
     - Right (55%): Minimalist callout cards detailing:
       - Instant culinary recognition (96%+ confidence).
       - Micronutrient & fiber estimation.
       - Real-time comparison with daily metabolic budget.
4. **Editorial Footer:**
   - Monochromatic Warm Ivory and Stone footer with newsletter input, ethical AI commitment, and minimalist directory links.

---

### Screen 2: Sign-in, Registration & Onboarding

```
┌───────────────────────────────────┬────────────────────────────────────┐
│                                   │                                    │
│   EDITORIAL PHOTOGRAPHY PANEL     │      AUTHENTICATION FORM           │
│   (50% Width Desktop)             │      (50% Width Desktop)           │
│   Aspect: Full Height             │                                    │
│   Atmospheric athlete portrait    │      "Enter Your Sanctuary"        │
│   Natural light, dark graphite    │      [ Continue with Google ]      │
│   tones, warm ivory vignette.     │      ────── or with email ──────   │
│                                   │      [ Email Address         ]     │
│                                   │      [ Password              ]     │
│                                   │      [ Enter ATHLY Protocol  ]     │
│                                   │                                    │
└───────────────────────────────────┴────────────────────────────────────┘
```

1. **Layout:** Split-screen layout (50/50 on desktop, full-width form with header photo on mobile).
2. **Left Panel:** Full-height atmospheric portrait of an athlete in quiet contemplation before training. Subtle caption in bottom-left: *"Dedication requires neither noise nor spectacle."*
3. **Right Panel (Form Surface):**
   - Background: Warm Ivory (`#F4F1E9`).
   - Title: Serif 32px: *"Welcome to ATHLY"*.
   - Subtitle: Sans 14px: *"Sign in to synchronize your training splits, nutrition logs, and daily progress."*
   - Form Inputs: Clean, flat inputs with Warm Ivory Soft background (`#FAF8F3`), 1px Stone border (`#D9D5CB`), zero rounded clutter (subtle 4px radius), 14px sans-serif text.
   - Primary Action: Full-width button in Graphite (`#171916`) with ivory text: *"Access Profile"*.
4. **3-Step Onboarding Flow (New Members):**
   - **Step 1: Physical Metrics:** Age, biological gender, height (cm), weight (kg). Real-time estimated BMI counter updates smoothly.
   - **Step 2: The Discipline (Goal & Experience):** 4 clean radio cards (Fat Loss, Hypertrophy, Endurance, Longevity).
   - **Step 3: Dietary Architecture:** Preferences (Omnivore, Vegetarian, Vegan, Ketogenic, Pescatarian) and daily hydration commitment.

---

### Screen 3: Main Dashboard (Daily Overview)

```
┌────────────────────────────────────────────────────────────────────────┐
│  FEATURED DAILY HERO PANEL                                             │
│  Photo: Morning Athlete Stretch / Kitchen Preparation (Aspect 16:7)   │
│  Overlay text: "Wednesday Morning — Chest & Triceps Hypertrophy"       │
│  Quote: "Excellence is an art won by training and habituation."        │
├────────────────────────────────────────────────────────────────────────┤
│  DAILY ESSENTIAL METRICS (4 Clean Columns with Hairline Dividers)      │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐         │
│  │ CALORIC NET  │ PROTEIN GOAL │ STEP VOLUME  │ HYDRATION    │         │
│  │ 1,840 / 2,450│ 132g / 165g  │ 7,420 steps  │ 2,250 ml     │         │
│  │ 75% consumed │ 80% pace     │ 74% baseline │ 70% target   │         │
│  └──────────────┴──────────────┴──────────────┴──────────────┘         │
├────────────────────────────────────────────────────────────────────────┤
│  TODAY'S RITUALS (2-Column Asymmetric Grid)                            │
│  Left: Scheduled Workout Preview          Right: AI Daily Coaching     │
│  - 4 sets Incline Dumbbell Press          - "Optimal protein synthesis │
│  - 4 sets Barbell Bench Press               pacing. 33g remaining      │
│  - Estimated 55 mins / 420 kcal             before sleep."             │
│  [ Begin Workout Session ]                [ Review AI Breakdown ]      │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Daily Featured Image Banner:**
   - Prominent landscape image (Aspect `16:7` desktop, `16:9` mobile) representing the day's discipline.
   - Subtle dark graphite gradient vignette from bottom (`rgba(23, 25, 22, 0.7)` to `transparent`).
   - Serif headline: *"Wednesday Morning — Day 3 of Hypertrophy Protocol"*.
2. **Metric Strip (Tabular Precision):**
   - 4 equal-width cells separated by 1px Stone vertical dividers.
   - Each cell contains:
     - Muted uppercase label (`10px`, tracking `+0.08em`).
     - Large Monospace KPI (`28px`, JetBrains Mono).
     - Micro progress track: 2px height, Stone background, Muted Sage fill bar (`#C5D99A`).
3. **Daily Action Grid:**
   - Left (60%): Today’s Scheduled Session card with exercise count, duration, estimated burn, and a clean *"Begin Workout"* button.
   - Right (40%): The **AI Coach Note** — an understated warm card with a subtle sage left-border (3px), presenting immediate actionable coaching advice for the current 24-hour cycle.

---

### Screen 4: Workout Plans & Workout Details

```
┌────────────────────────────────────────────────────────────────────────┐
│  WEEKLY PERIODIZATION SPLIT                                            │
│  Split Title: "Push / Pull / Legs Hypertrophy Split — 5 Days Active"   │
│  7-Day Horizontal Day Selector (Mon - Sun Pills)                       │
├────────────────────────────────────────────────────────────────────────┤
│  SELECTED DAY HEADER                                                   │
│  Monday: Chest & Triceps Hypertrophy &bull; 55 Mins &bull; ~420 kcal   │
│  Thumbnail: Monochrome athlete executing incline bench (Aspect 16:9)   │
├────────────────────────────────────────────────────────────────────────┤
│  EXERCISE ROSTER TABLE (Clean Editorial Layout)                        │
│  #  EXERCISE NAME              SETS   REPS      REST     FORM CUE      │
│  01 Incline Dumbbell Press      4     8-12      90s      Slow eccentric│
│  02 Flat Barbell Bench Press    4     6-8       120s     Arch & drive  │
│  03 Cable Chest Flyes           3     12-15     60s      Peak squeeze  │
│  04 Overhead Tricep Rope        4     12-15     60s      Full stretch  │
├────────────────────────────────────────────────────────────────────────┤
│  [ + Log Completed Workout (+50 XP) ]                                  │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Periodized Split Navigator:**
   - 7 horizontal cards representing Monday through Sunday.
   - Active day is highlighted with a Muted Sage border and subtle Ivory Soft fill; rest days are marked with quiet Stone typography.
2. **Selected Workout Overview:**
   - High-contrast photographic thumbnail (Aspect `16:9`) showcasing the target muscle group or primary movement.
   - Time estimate and energetic expenditure displayed in clean monospace numerals.
3. **Exercise Roster Table:**
   - Replaces generic SaaS cards with a clean editorial table featuring 1px Stone border dividers.
   - Numbered index in subtle monospace (`01`, `02`, `03`).
   - Columns: Exercise Name, Sets, Reps, Rest Interval, and Coaching Technique Cue.
   - Interactive Checkmark / Set Completion counter for in-gym tracking.

---

### Screen 5: Nutrition & Meal Tracking

```
┌────────────────────────────────────────────────────────────────────────┐
│  NUTRITIONAL BUDGET (Stacked Macro Architecture)                       │
│  Calories: 1,840 / 2,450 kcal consumed  (610 kcal remaining)           │
│  Macro Ratio: [=== Protein 27% ===][==== Carbs 43% ====][== Fats 30% ==]│
├────────────────────────────────────────────────────────────────────────┤
│  TODAY'S CHRONOLOGICAL LOG                                             │
│                                                                        │
│  08:15 AM — BREAKFAST                                                  │
│  [ Photo: Eggs & Sourdough (1:1) ]  Poached Eggs & Avocado on Sourdough│
│                                     420 kcal &bull; P: 22g &bull; C: 32g│
│                                                                        │
│  01:30 PM — LUNCH                                                      │
│  [ Photo: Salmon Quinoa (1:1) ]     Atlantic Salmon & Quinoa Asparagus │
│                                     580 kcal &bull; P: 42g &bull; C: 38g│
│                                                                        │
│  04:45 PM — RECOVERY SNACK                                             │
│  [ Photo: Berry Bowl (1:1) ]        Whey Isolate & Blueberry Bowl      │
│                                     260 kcal &bull; P: 32g &bull; C: 18g│
└────────────────────────────────────────────────────────────────────────┘
```

1. **Macro Distribution Architecture:**
   - Tri-color segmented bar:
     - Protein: Muted Sage (`#C5D99A`)
     - Carbohydrates: Warm Sand / Stone (`#D9D5CB`)
     - Fats: Soft Umber (`#9B8F7D`)
   - Exact remaining grams displayed in tabular monospace to avoid guesswork.
2. **Chronological Meal Cards:**
   - Each entry features a square `1:1` culinary photograph on the left.
   - Right: Meal title in regular serif, timestamp in monospace, nutrient breakdown chips, and dietary health notes.
   - Quick action to edit or delete logged entries with clean trash/edit icons.

---

### Screen 6: AI Meal Scanner & Analysis Results

```
┌───────────────────────────────────┬────────────────────────────────────┐
│                                   │                                    │
│   INGESTION & CAMERA VIEWFINDER   │    AI NUTRITIONAL DECOMPOSITION    │
│   Aspect: 4:3 Viewfinder Box      │                                    │
│   [ Drag & Drop Meal Photo ]      │    CONFIDENCE: 96% &bull; HIGH     │
│   [ Open Device Camera     ]      │    Identified: Grilled Herb Salmon │
│                                   │    Total: 580 kcal                 │
│   Quick Test Presets:             │    P: 42g  C: 38g  F: 24g  Fib: 6g │
│   [Salmon] [Chicken] [Salad]      │                                    │
│   [Eggs]   [Protein Smoothie]     │    AI DIETARY FEEDBACK:            │
│                                   │    "Rich in Omega-3 fatty acids.   │
│   [ Execute AI Analysis ]         │    Optimal post-workout dinner."   │
│                                   │    [ Save to Daily Journal ]       │
└───────────────────────────────────┴────────────────────────────────────┘
```

1. **Ingestion Interface:**
   - Real, functional `<input type="file" accept="image/*" capture="environment">` interface.
   - Hairline Stone dashed border with subtle Sage hover tint.
   - Drag-and-drop zone with instant local image preview thumbnail.
   - 5 quick-test sample buttons for immediate demonstration.
2. **Analysis Result Presentation:**
   - Large image display of the captured dish.
   - **Confidence Pill:** Monospace pill in Muted Sage: `CONFIDENCE: 96%`.
   - **Ingredient Itemization:** Itemized breakdown table showing detected foods and portion estimates (e.g. *Atlantic Salmon portion ~180g*, *Quinoa base ~140g*, *Steamed Asparagus ~100g*).
   - **Target Impact Comparison:** Direct visualization of how this meal impacts remaining daily calorie and protein targets.
   - Action: Primary Graphite button: *"Confirm & Save to Nutrition Journal (+35 XP)"*.

---

### Screen 7: Activity & Hydration

```
┌────────────────────────────────────────────────────────────────────────┐
│  BIOMETRIC ACTIVITY & HYDRATION TELEMETRY                              │
├────────────────────────────────────────────────────────────────────────┤
│  STEP VOLUME CARD                       HYDRATION CARAFE CARD          │
│  7,420 / 10,000 steps                   2,250 / 3,200 ml               │
│  Distance: 5.78 km &bull; Pace: 9:12/km Hydration Score: 70% Optimal   │
│  [ +500 Steps ]  [ +2,000 Steps ]       [ +250 ml ]  [ +500 ml ]       │
├────────────────────────────────────────────────────────────────────────┤
│  LOG COMPLETED WORKOUT SESSION                                         │
│  Discipline: [ Chest & Triceps Hypertrophy ▾ ]                         │
│  Duration:   [ 50 mins ]        Energy Burned: [ 380 kcal ]            │
│  [ Record Session & Claim 50 XP ]                                      │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Step Volume Card:**
   - Displays step count in 32px JetBrains Mono.
   - Distance in kilometers and miles computed dynamically.
   - Discreet quick-add buttons styled with Stone borders.
2. **Hydration Carafe Card:**
   - Visual fluid meter in Muted Sage.
   - Quick logging increments (`+250ml`, `+500ml`).
3. **Workout Session Logger:**
   - Form fields with clean drop-down selectors for discipline (Strength, Conditioning, Zone-2 Cardio, Yoga/Mobility).
   - Duration and calorie inputs with automatic energetic expenditure estimates.

---

### Screen 8: Progress & Analytics

```
┌────────────────────────────────────────────────────────────────────────┐
│  AI COACHING COMPREHENSIVE DISPATCH                                    │
│  Headline: "Peak Hypertrophy Cadence: On Track for 0.4kg Lean Gain"    │
│  Serif prose analyzing 7-day consistency index (88/100).               │
│  Key Focus: "Slightly increase progressive overload on compound lifts."│
├────────────────────────────────────────────────────────────────────────┤
│  7-DAY STEP & VOLUME SPECTRUM (Minimalist Column Chart)                │
│  Mon    Tue    Wed    Thu    Fri    Sat    Sun                         │
│  8.9k  10.5k   9.2k  11.2k   9.8k  12.4k   7.4k                        │
│  [===]  [===]  [===]  [===]  [===]  [===]  [===]                       │
├────────────────────────────────────────────────────────────────────────┤
│  BODY COMPOSITION PROGRESSION                                          │
│  Starting: 76.4 kg &bull; Current: 75.5 kg (-0.9 kg) &bull; Goal: 78.0 kg│
└────────────────────────────────────────────────────────────────────────┘
```

1. **AI Coaching Dispatch:**
   - Styled as an **editorial letter from the coach** rather than a generic notification card.
   - Elegant serif headline paired with thoughtful analysis across three pillars:
     - *Training Volume:* Load evaluation and mechanical tension review.
     - *Macro Synthesis:* Protein timing and micronutrient density.
     - *Recovery & Readiness:* Hydration pacing and sleep recommendations.
   - Bulleted 24-hour actionable directives with clean checkmark icons.
2. **Minimalist Step & Volume Chart:**
   - High-contrast, clean vertical bars using Muted Sage (`#C5D99A`) with Stone background tracks.
   - Zero gratuitous grid lines or glossy 3D bars; exact step values displayed in monospace.
3. **Bodyweight Milestone Ledger:**
   - Tabular progression tracking weigh-ins, date timestamps, and BMI trajectory.

---

### Screen 9: Rewards, Profile & Settings

```
┌───────────────────────────────────┬────────────────────────────────────┐
│  SANCTUARY PROFILE & BIOMETRICS   │  DISCIPLINE REWARDS & MILESTONES   │
│  Full Name: Alex Hunter           │  Current Tier: Level 2 Performer   │
│  Age: 27  Height: 178cm  Weight:75│  680 XP Total &bull; 320 XP to Lv.3│
│  Goal: Muscle Gain & Hypertrophy  │  Active Streak: 5 Days (Flame)     │
│  Dietary: Non-Vegetarian          │                                    │
│  BMI: 23.8 &bull; BMR: 1,745 kcal │  ACHIEVEMENT INTAGLIO EMBLEMS:     │
│                                   │  [●] 5-Day Consistency Titan      │
│  [ Save Biometrics & Sync Plan ]  │  [●] Hydration Hero (2500ml)       │
│                                   │  [●] Macro Master (within 5%)      │
│                                   │  [○] 10k Step Centurion (Locked)   │
└───────────────────────────────────┴────────────────────────────────────┘
```

1. **Biometric Settings:**
   - Full control panel to update height, weight, activity level, and dietary preferences.
   - Automatic live calculation of Mifflin-St Jeor BMR and target TDEE calories.
2. **Rewards & Milestones Reinterpretation:**
   - Re-imagines "gamification" into an athletic discipline ledger.
   - **Achievement Badges:** Monochromatic intaglio-style emblems with Stone borders and Sage accents when unlocked.
   - Streak counter tracked with a dignified amber icon.

---

## 5. Component States & Interaction Specifications

### 5.1 Interactive Controls

```
Button State Matrix:
┌─────────────────┬──────────────────────┬───────────────────────────────┐
│ State           │ Primary Button       │ Secondary / Ghost Button      │
├─────────────────┼──────────────────────┼───────────────────────────────┤
│ Default         │ Bg: #171916, Text: #F│ Bg: Transparent, Border: Stone│
│ Hover           │ Bg: #2A2E28, Lift 1px│ Bg: #EBE7DC, Text: #171916    │
│ Active / Click  │ Scale: 0.98, Instant │ Bg: #DFDBD0                   │
│ Disabled        │ Opacity: 0.45        │ Opacity: 0.40                 │
│ Loading         │ Spinner in Muted Sage│ Text fades to 50%             │
└─────────────────┴──────────────────────┴───────────────────────────────┘
```

### 5.2 Loading, Empty, Error, and Success States

1. **Loading State (Skeleton):**
   - High-precision geometric skeletons using Warm Ivory Muted (`#EBE7DC`) with a subtle 1.5s linear pulse.
   - Content outlines retain exact aspect ratios (e.g. `16:9` workout box, `1:1` meal photo box) to eliminate cumulative layout shift (CLS).
2. **Empty State:**
   - Generously spaced container (min-height `280px`).
   - A single dignified line illustration or camera/plate icon in muted Stone.
   - Short editorial prompt: *"No meals logged for today. Capture a photograph or select a preset to analyze your nutritional balance."*
   - Clear action button in Graphite.
3. **Error State:**
   - 1px hairline border in subtle crimson (`#BD4545`).
   - Friendly, precise message: *"Unable to reach the AI vision service. Please verify your connection and retry."*
   - High-contrast *"Retry Action"* button.
4. **Success Feedback:**
   - Discreet toast notification sliding down from header (`h-10`, bg `#FAF8F3`, border `#C5D99A`).
   - Muted Sage checkmark icon with text: *"Meal successfully analyzed and logged. +35 XP awarded."*
   - Auto-dismisses in 3.5 seconds.

---

## 6. Accessibility Requirements (WCAG 2.1 AA)

1. **Color Contrast:**
   - Graphite `#171916` text on Warm Ivory `#F4F1E9` background provides a contrast ratio of **14.8:1** (exceeds AAA requirement of 7:1).
   - Muted Graphite `#4B4F48` on Warm Ivory provides **6.2:1** (exceeds AA requirement of 4.5:1).
   - Muted Sage `#C5D99A` is used as an accent fill paired with Graphite `#171916` text, delivering an **8.9:1** contrast ratio.
2. **Focus Visibility:**
   - All interactive elements possess explicit `focus-visible:ring-1 focus-visible:ring-[#171916] focus-visible:outline-none` rings.
3. **Screen Reader Compatibility:**
   - Every photograph contains descriptive `alt` tags (e.g. `alt="Freshly plated grilled salmon with asparagus and quinoa bowl"`).
   - Custom metric cards provide `aria-label` attributes with exact units.
4. **Motion Restraint:**
   - Respect `prefers-reduced-motion: reduce` by disabling transitions and slide-in animations.

---

## 7. Recommended Implementation Order

To execute this design direction safely and systematically within `rebuild/athly-v2`, the recommended sequence is:

1. **Step 1: Design Tokens & Typography Setup**
   - Import Google Fonts (*Fraunces* or *Playfair Display* for serif, *Plus Jakarta Sans* for sans, *JetBrains Mono* for tabular metrics) into `frontend/index.html`.
   - Update `frontend/tailwind.config.js` with the luxury wellness color palette (`#171916`, `#F4F1E9`, `#C5D99A`, `#D9D5CB`).
   - Refactor `frontend/src/index.css`: purge the universal `* { transition: ... }` rule and define the warm ivory canvas.
2. **Step 2: App Shell & Navigation Overhaul**
   - Rebuild `Navbar.jsx` and `Sidebar.jsx` with editorial typography, hairline Stone dividers, and understated status capsules.
3. **Step 3: Public Landing Page Implementation**
   - Create the cinematic public landing page (`LandingView.jsx`) with full-bleed hero, 3-pillar photographic grid, and vision AI showcase.
4. **Step 4: Authenticated Dashboard Redesign**
   - Rebuild `ProgressAnalyticsView.jsx` and `AiFeedbackCard.jsx` into the Daily Featured Hero and editorial AI Coaching Dispatch.
5. **Step 5: Nutrition & Meal Scanner Modernization**
   - Refactor `MealAnalysisView.jsx` to feature the real file/camera upload interface, 1:1 culinary photos, and itemized ingredient breakdowns.
6. **Step 6: Training & Activity Precision Styling**
   - Style `FitnessPlannerView.jsx` and `ActivityTrackingView.jsx` with tabular monospace metrics and clean exercise tables.
7. **Step 7: Profile & Discipline Milestones**
   - Refresh `UserProfileView.jsx` and `RewardsView.jsx` with the intaglio milestone emblems and refined biometric calculator.

---

## 8. Verification & Review

This specification serves as the design blueprint for ATHLY V2. No code modifications have been made during this planning phase. Implementation will begin only upon explicit user confirmation.
