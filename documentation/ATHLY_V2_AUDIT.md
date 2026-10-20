# ATHLY V2 — Repository Audit & Technical Baseline Assessment

**Document Version:** 1.0.0  
**Audit Date:** October 2026  
**Auditor:** Antigravity Autonomous Pair Programmer  
**Repository:** `https://github.com/shayaan1223k/ATHLY`  
**Current Branch:** `rebuild/athly-v2`  
**Production Reference:** `main` (`https://athly-gold.vercel.app`)  

---

## 1. Executive Summary

This document presents a comprehensive, evidence-based technical audit of the **ATHLY** fitness platform repository. ATHLY is envisioned as an AI-powered personal health and fitness platform with the product vision: *"Your Goal. Our Plan. Your Progress. Your Reward."*

### Key Audit Findings

1. **Working Tree & Source Control State:**  
   The audit was performed on branch `rebuild/athly-v2`. The working tree is clean. The commit history reveals a single initial commit (`322097c Initial ATHLY project`), which is currently identical to `main`. No branch diverge has occurred yet.

2. **The "Working Deployment" Illusion:**  
   The frontend is currently deployed on Vercel at `https://athly-gold.vercel.app`. While this interface renders smoothly, interacts with user inputs, and displays complex data, **it is entirely decoupled from any backend**. The frontend API client (`frontend/src/api/apiClient.js`) wraps 100% of its network requests in `try...catch` blocks that silently intercept every HTTP failure and return hardcoded mock payloads.

3. **Total Frontend-to-Backend Endpoint Disconnect:**  
   **Zero frontend API calls match backend endpoints.** The frontend calls relative paths like `/api/profile`, `/api/planner`, `/api/meals/today`, `/api/activity/today`, `/api/progress/daily`, and `/api/rewards/summary`. The Java Spring Boot controllers require completely different route structures (e.g., `/api/fitness-plan/{userId}`, `/api/meals/daily/{userId}`, `/api/analytics/weekly/{userId}`, `/api/rewards/{userId}`). Furthermore, the backend strictly validates `@NotBlank String userId`, which the frontend never provides.

4. **Missing Authentication Layer:**  
   While project specifications (`ATHLY_PROJECT_SPEC.md` and `CLAUDE.md`) describe Firebase Authentication and JWT token verification, **neither the frontend nor the backend implements authentication**. The frontend lacks the Firebase SDK, login/register views, and token storage. The backend lacks Spring Security, Firebase Admin SDK, and JWT filter dependencies.

5. **AI Microservice Is Completely Unimplemented:**  
   The `ai-service/` directory contains only a single `.gitkeep` file. No Python runtime code, FastAPI routes, Gemini SDK integration, or prompt templates exist. The Java backend contains fallback code that invokes simulated responses when calls to `http://localhost:8000` fail.

6. **Missing Local & Cloud Deployment Tooling:**  
   The backend lacks the Maven wrapper (`mvnw` / `mvnw.cmd`) and Dockerfiles. Local system inspection revealed Node.js 24.19.0 and Python 3.12.10 installed, but no Java/JDK or Maven in the system PATH. The frontend lacks a `vercel.json` routing configuration.

---

## 2. Repository & Source Control Verification

### 2.1 Git Status & Branch Tracking
- **Active Branch:** `rebuild/athly-v2` (verified via `git status`)
- **Working Tree State:** Clean, 0 uncommitted changes, 0 untracked files
- **Commit Baseline:** `322097c9ba67e400b54b08c52625d64024089e25` (`Initial ATHLY project`)
- **Upstream Tracking:** `origin/main` tracks commit `322097c`. Branch `rebuild/athly-v2` is in lockstep with `main`.
- **Diff against `main`:** Exactly 0 lines changed, ensuring safe rollback capability.

### 2.2 Directory Layout
```
ATHLY/
├── .gitignore                      # Git ignore rules for node, build targets, env files
├── CLAUDE.md                       # Project rules, architecture rules, and development guidelines
├── README.md                       # High-level product overview and architecture flow
├── ai-service/                     # Python AI microservice directory (EMPTY: contains only .gitkeep)
│   └── .gitkeep
├── backend/                        # Java Spring Boot REST API
│   ├── pom.xml                     # Maven build descriptor (Spring Boot 3.3.4, Java 21)
│   └── src/
│       ├── main/
│       │   ├── java/com/athly/backend/
│       │   │   ├── AthlyApplication.java
│       │   │   ├── config/CorsConfig.java
│       │   │   ├── controller/      # 7 REST Controllers
│       │   │   ├── dto/             # 16 Data Transfer Objects
│       │   │   ├── exception/       # GlobalExceptionHandler, ResourceNotFoundException
│       │   │   ├── model/           # 6 MongoDB Document entities
│       │   │   ├── repository/      # 6 Spring Data Mongo Repositories
│       │   │   └── service/         # 7 Business service implementations
│       │   └── resources/
│       │       └── application.properties
│       └── test/
│           └── java/com/athly/backend/AthlyApplicationTests.java
├── documentation/
│   └── ATHLY_PROJECT_SPEC.md       # Original college project technical specification
└── frontend/                       # React client application
    ├── index.html                  # HTML entry point (Plus Jakarta Sans font linked)
    ├── package.json                # React 18, Vite 5, Tailwind CSS 3
    ├── package-lock.json
    ├── postcss.config.js
    ├── tailwind.config.js          # Custom theme tokens (athly color palette)
    ├── vite.config.js              # Dev proxy to http://localhost:8080
    └── src/
        ├── App.jsx                 # Single-page shell with tab switcher
        ├── index.css               # Global styles, scrollbars, glassmorphism utilities
        ├── main.jsx                # React root bootstrap
        ├── api/
        │   └── apiClient.js        # API service layer with transparent mock fallbacks
        ├── context/
        │   └── AthlyContext.jsx    # Monolithic React Context state store
        └── components/
            ├── activity/ActivityTrackingView.jsx
            ├── layout/Navbar.jsx
            ├── layout/Sidebar.jsx
            ├── meal/MealAnalysisView.jsx
            ├── planner/FitnessPlannerView.jsx
            ├── profile/UserProfileView.jsx
            ├── progress/AiFeedbackCard.jsx
            ├── progress/ProgressAnalyticsView.jsx
            └── rewards/RewardsView.jsx
```

### 2.3 Environment & Secrets Verification
- `.gitignore` correctly ignores `.env`, `.env.local`, `.env.*.local`, `node_modules/`, `target/`, `*.jar`, and `*.war`.
- **Zero environment files exist** in the repository (no `.env`, `.env.example`, or `.env.production`).
- `backend/src/main/resources/application.properties` contains only standard local connection strings (`mongodb://localhost:27017/athly_db` and `http://localhost:8000`).
- No secrets, private API keys, or database credentials were found in the codebase.

---

## 3. Technology Stack & Environment Audit

| Component | Verified Technology | Configured Version | System Host Availability | Build Command | Run Command |
|---|---|---|---|---|---|
| **Frontend** | React, Vite, Tailwind CSS | React 18.2.0, Vite 5.1.6, Tailwind 3.4.1 | Node 24.19.0, npm 11.17.0 | `npm run build` | `npm run dev` |
| **Backend** | Java, Spring Boot, Maven | Java 21 (`pom.xml`), Spring Boot 3.3.4 | ⚠️ Java & Maven NOT in host PATH | `mvn clean package` | `mvn spring-boot:run` |
| **Database** | MongoDB (Spring Data) | Spring Data MongoDB 3.3.4 | ⚠️ Local MongoDB not detected | N/A | Local daemon / MongoDB Atlas |
| **AI Service** | Python, FastAPI (Intended) | Python 3.12.10 available | Python 3.12.10 installed | ⚠️ No requirements.txt | `uvicorn main:app --reload` |

> [!WARNING]
> **Java Version Inconsistency:** `CLAUDE.md` and `ATHLY_PROJECT_SPEC.md` state Java 17, but `backend/pom.xml` explicitly defines `<java.version>21</java.version>`. Spring Boot 3.3.x supports both 17 and 21, but the build environment must provide JDK 21 to satisfy `pom.xml`.

---

## 4. Frontend Application Audit

### 4.1 Architecture & State Management
- **Routing:** There is **no router library** installed (no `react-router-dom`). Page navigation is managed entirely by React state (`activeTab`) inside `AthlyContext.jsx`.
  - Consequence: Users cannot refresh on a specific view, share direct links to tabs, or use browser Back/Forward navigation buttons.
- **State Store:** `AthlyContext.jsx` acts as a monolithic store managing profile, fitness plan, activity, todayMeals, dailyProgress, weeklyProgress, aiFeedback, rewards, and toast notifications.
  - On mount (`useEffect`), it calls `refreshAllData()`, firing 8 concurrent requests via `Promise.all`.
  - Because `apiClient.js` returns mock data for all 8 requests, the initial dashboard appears fully populated immediately.

### 4.2 Screen & Feature Audit

#### 1. Layout & Navigation (`Navbar.jsx`, `Sidebar.jsx`)
- **Status:** Functional UI; purely client-side state.
- **Navbar:** Displays dynamic notification toast, ATHLY brand logo with animated pulse tag, current streak count, user XP/level pill, and avatar initial.
- **Sidebar:** Desktop sidebar with 6 navigation pills and an "AI Coach" marketing card. Collapses to a horizontally scrollable bar on mobile viewports (`overflow-x-auto lg:overflow-x-visible`).
- **Gaps:** Clicking user avatar switches tab to `profile`, but there is no dropdown menu for user settings, account switching, or logout.

#### 2. User Profile & Biometrics (`UserProfileView.jsx`)
- **Status:** Functional UI; mock persistence.
- **Form Fields:** Full Name, Age, Height (cm), Weight (kg), Fitness Level (Beginner to Elite), Fitness Goal (Fat Loss, Muscle Gain, Endurance, Maintenance), Dietary Preference (Non-Veg, Veg, Vegan, Keto, Pescatarian), Gender.
- **Computed Metrics:** Real-time BMI and Basal BMR are computed client-side using JavaScript formula:  
  `BMR = 10 * weight + 6.25 * height - 5 * age + 5`.
- **Gaps:** The submit button triggers `updateProfile()`, which updates local React state and simulates plan recalculation, but fails silently against the backend API.

#### 3. Personalized Fitness Planner (`FitnessPlannerView.jsx`)
- **Status:** Functional presentation UI; static mock data.
- **Features:** 4 target metric cards (Calories, Protein, Steps, Hydration), 7-day interactive day selector pill bar, detailed daily workout routine table (Exercises, Sets, Reps, Rest time, Coaching Tips), and AI nutrition protocol bullet cards.
- **Gaps:** Workouts cannot be marked as complete from this view. Changing the profile does not dynamically run a recalculation algorithm unless the hardcoded mock plan in `apiClient.js` is replaced.

#### 4. AI Meal Vision & Nutrition Analysis (`MealAnalysisView.jsx`)
- **Status:** Incomplete placeholder; simulation only.
- **Features:** Meal type selector pills (Breakfast, Lunch, Dinner, Snack), quick sample preset buttons (Salmon, Chicken, Salad, Eggs, Smoothie), text input for meal description, macro breakdown result card (Calories, Protein, Carbs, Fats, Fiber, target comparisons), and today's meal history list.
- **Critical Gaps:**
  - The "Photo Dropzone" (`lines 108–119`) is a static styled `<div>`. There is **no `<input type="file">`** element and no camera capture mechanism.
  - The submit handler calls `addMealAnalysis({ mealType, hintOrDescription: mealHint, imageUrl: null })`. It never generates or transmits an image file or base64 payload.
  - Client-side macro numbers are generated via simple keyword matching against the hint string (e.g., `hint.includes('salmon') ? 580 kcal : 520 kcal`).

#### 5. Daily Activity & Biometric Tracking (`ActivityTrackingView.jsx`)
- **Status:** Partial interactive UI; mock state incrementing.
- **Features:** Step counter card with quick-add buttons (`+500`, `+2000`), Distance Traveled card (derived from step count), Active Energy Burned card (with static 138 bpm heart rate display), Hydration tracker with quick-add buttons (`+250ml`, `+500ml`), and Workout Session logger form.
- **Gaps:** The step counter and water buttons simply increment local state numbers. The distance calculation uses static pace estimates. Heart rate is hardcoded text.

#### 6. Progress & Performance Analytics (`ProgressAnalyticsView.jsx`, `AiFeedbackCard.jsx`)
- **Status:** Purely visual presentation of hardcoded arrays.
- **Features:** 4 daily KPI cards (Health Score, Daily Steps, Net Calories, Protein Adherence), 7-day Step Volume vertical bar chart, Weight & Composition Trend list, and an AI Coaching Feedback card with consistency score, pillar analysis, and 24-hour actionable items.
- **Critical Gaps:**
  - The 7-day step chart is rendered using custom HTML `<div>` columns with percentage heights. No responsive charting library (e.g., Recharts) is used.
  - All weekly trend data points are hardcoded in the component default state.
  - AI coaching feedback text is completely static.

#### 7. Gamification & Rewards Center (`RewardsView.jsx`)
- **Status:** Interactive UI with client-side state.
- **Features:** Streak tracker badge, Tier/Level XP progress bar, Daily Quests list with checkmark icons, Weekly Milestones progress bars, and an Achievement Badge grid (6 badges: Streak, Hydration, Macro, AI Visionary, 10k Steps, Iron Will).
- **Gaps:** Clicking "Claim XP" displays a local toast notification, but does not persist XP or unlock server-side badge rules.

### 4.3 Styling, Theme & CSS Performance
- **Color Scheme Discrepancy:** The current implementation uses Tailwind slate/navy tones (`#090d16`, `#0f172a`, `#1e293b`) with standard emerald/green accents (`#22c55e`, `#10b981`). This does **not** match the requested **dark graphite and electric lime** design vision.
- **Performance Issue in `index.css`:**
  ```css
  /* Smooth transitions */
  * {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  ```
  Applying transitions to the universal selector `*` forces browser recalculation on every DOM element during layout shifts, scrolling, and tab switching. This must be refactored to targeted classes.

---

## 5. Backend & Data Layer Audit

### 5.1 Architecture & Code Structure
The Java backend (`backend/src/main/java/com/athly/backend`) follows a conventional Spring Boot 3 multi-layered structure:
- **`config/`**: Contains `CorsConfig.java`.
- **`controller/`**: 7 REST controllers exposing 17 HTTP endpoints.
- **`service/`**: 7 business service classes containing calculation logic and repository calls.
- **`repository/`**: 6 Spring Data MongoDB interfaces extending `MongoRepository`.
- **`model/`**: 6 MongoDB `@Document` classes.
- **`dto/`**: 16 request/response DTOs equipped with Jakarta Validation annotations.
- **`exception/`**: `GlobalExceptionHandler.java` handling 404, 400 (`MethodArgumentNotValidException`), and 500 errors.

### 5.2 Endpoint & Implementation Inventory

| Controller | HTTP Method & Path | Purpose | Backend Implementation State | Validation & Requirements |
|---|---|---|---|---|
| `HealthController` | `GET /api/health` | Health check | Implemented (returns UP) | Public, no params |
| `UserProfileController` | `POST /api/profile` | Create profile | Implemented via Mongo | `@Valid UserProfileDto` |
| `UserProfileController` | `GET /api/profile/{userId}` | Read profile | Implemented via Mongo | Requires `{userId}` |
| `UserProfileController` | `PUT /api/profile/{userId}` | Update profile | Implemented via Mongo | Requires `{userId}`, `@Valid UserProfileDto` |
| `UserProfileController` | `DELETE /api/profile/{userId}`| Delete profile | Implemented via Mongo | Requires `{userId}` |
| `FitnessPlannerController`| `POST /api/fitness-plan/generate/{userId}` | Generate plan | Implemented via algorithm | Requires `{userId}` |
| `FitnessPlannerController`| `GET /api/fitness-plan/{userId}` | Read active plan | Implemented via Mongo | Requires `{userId}` |
| `MealAnalysisController` | `POST /api/meals/log` | Manual meal log | Implemented via Mongo | `@Valid MealLogRequest` |
| `MealAnalysisController` | `POST /api/meals/analyze` | AI image analysis | Calls AI service / fallback | `@Valid MealAnalysisRequest` (userId, imageBase64) |
| `MealAnalysisController` | `GET /api/meals/daily/{userId}` | Daily meals | Implemented via Mongo | Requires `{userId}`, optional `date` |
| `MealAnalysisController` | `GET /api/meals/summary/{userId}` | Macro balance | Implemented via Mongo | Requires `{userId}`, optional `date` |
| `MealAnalysisController` | `DELETE /api/meals/{mealId}` | Delete meal | Implemented via Mongo | Requires `{mealId}`, param `userId` |
| `ActivityTrackingController`| `POST /api/activity/steps` | Log steps | Implemented via Mongo | `@Valid StepLogRequest` (userId, steps) |
| `ActivityTrackingController`| `POST /api/activity/water` | Log water | Implemented via Mongo | `@Valid WaterLogRequest` (userId, amountMl) |
| `ActivityTrackingController`| `POST /api/activity/workout` | Log workout | Implemented via Mongo | `@Valid WorkoutLogRequest` (userId, activityType, duration) |
| `ActivityTrackingController`| `GET /api/activity/daily/{userId}` | Daily activity | Implemented via Mongo | Requires `{userId}`, optional `date` |
| `ActivityTrackingController`| `GET /api/activity/summary/{userId}` | Daily summary | Implemented via Mongo | Requires `{userId}`, optional `date` |
| `ActivityTrackingController`| `GET /api/activity/history/{userId}` | 7-day history | Implemented via Mongo | Requires `{userId}` |
| `ProgressAnalyticsController`| `POST /api/analytics/weight` | Log weight | Implemented via Mongo | `@Valid WeightLogRequest` (userId, weightKg) |
| `ProgressAnalyticsController`| `GET /api/analytics/weight/{userId}` | Weight history | Implemented via Mongo | Requires `{userId}` |
| `ProgressAnalyticsController`| `GET /api/analytics/weekly/{userId}` | 7-day analytics | Implemented via Mongo | Requires `{userId}` |
| `ProgressAnalyticsController`| `GET /api/analytics/ai-feedback/{userId}` | AI coaching | Calls AI service / fallback | Requires `{userId}` |
| `RewardController` | `GET /api/rewards/{userId}` | Reward summary | Implemented via Mongo | Requires `{userId}` |
| `RewardController` | `POST /api/rewards/xp` | Award XP | Implemented via Mongo | `@Valid AddXpRequest` (userId, xpAmount) |
| `RewardController` | `POST /api/rewards/check-in/{userId}` | Daily check-in | Implemented via Mongo | Requires `{userId}` |

### 5.3 Authentication & Authorization Audit
- **Security Dependency:** Neither `spring-boot-starter-security` nor Firebase Admin SDK is present in `pom.xml`.
- **Security Configuration:** No `SecurityFilterChain`, no authentication filters, and no interceptors exist.
- **Authorization:** There is no concept of a logged-in user or session. Any client can access or mutate any record by simply guessing or supplying a `userId` string.

### 5.4 Database Configuration & Persistence
- Spring Data MongoDB is configured in `application.properties`:
  ```properties
  spring.data.mongodb.uri=mongodb://localhost:27017/athly_db
  ```
- **Collections Defined:**
  1. `user_profiles` (`UserProfile.java`, `@Indexed(unique = true) userId`)
  2. `fitness_plans` (`FitnessPlan.java`, `@Indexed(unique = true) userId`)
  3. `meal_logs` (`MealLog.java`, compound index on `userId` and `mealDate`)
  4. `activity_logs` (`ActivityLog.java`, compound index on `userId` and `logDate`)
  5. `progress_records` (`ProgressRecord.java`, index on `userId`)
  6. `user_rewards` (`UserReward.java`, `@Indexed(unique = true) userId`)
- **Persistence Validity:** The Java service implementations correctly instantiate and save documents to these repositories. However, because local MongoDB is not running and the backend is not deployed to a cloud database (such as MongoDB Atlas), persistence has never been executed against live data.

### 5.5 AI Microservice Integration & Heuristic Fallbacks
The backend uses Spring Boot 3's `RestClient` to interact with the Python AI microservice at `http://localhost:8000`:
- `MealAnalysisService.java` calls `POST http://localhost:8000/api/ai/analyze-meal`.
- `AiFeedbackService.java` calls `POST http://localhost:8000/api/ai/progress-feedback`.
- Because the AI microservice does not exist, both calls inevitably throw connection exceptions. Both services catch all exceptions and execute internal fallbacks:
  - `MealAnalysisService` returns a static simulated meal: *"Healthy Balanced Plate (Simulated AI)"* with 580 kcal.
  - `AiFeedbackService` executes an internal rules engine (`generateContextualFeedback`) that calculates a consistency score based on recent workout adherence and water intake, returning rule-based action items and quotes.

### 5.6 CORS Configuration Vulnerability
`CorsConfig.java` restricts cross-origin requests:
```java
registry.addMapping("/api/**")
        .allowedOrigins("http://localhost:5173", "http://localhost:3000")
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
        .allowedHeaders("*")
        .allowCredentials(true);
```
- The production frontend URL (`https://athly-gold.vercel.app`) is **not included**.
- Any direct browser request from the deployed Vercel application to a deployed backend would be blocked by CORS immediately.

---

## 6. Frontend-to-Backend Integration Trace

The following matrix contrasts every frontend API invocation in `apiClient.js` against the corresponding Spring Boot controller implementation:

| Frontend Feature | Frontend `apiClient.js` Call | Backend Controller Target | Endpoint Exists in Backend? | Request Signature Mismatch | Fallback Behavior in Production |
|---|---|---|---|---|---|
| **Get Profile** | `GET /api/profile` | `GET /api/profile/{userId}` | ❌ **No** | Backend requires `{userId}` in path; frontend sends none. | Catches error; returns mock Alex Hunter profile. |
| **Update Profile** | `PUT /api/profile` | `PUT /api/profile/{userId}` | ❌ **No** | Backend requires `{userId}` in path; frontend sends body only. | Catches error; returns input data merged with `id: 1`. |
| **Get Fitness Plan** | `GET /api/planner` | `GET /api/fitness-plan/{userId}` | ❌ **No** | Base route is `/fitness-plan`, not `/planner`. Requires `{userId}`. | Catches error; returns 7-day hypertrophy split mock plan. |
| **Analyze Meal Image**| `POST /api/meals/analyze` | `POST /api/meals/analyze` | ⚠️ **Path matches, payload fails** | Backend `@NotBlank` requires `userId` and `imageBase64`. Frontend sends `{ mealType, hintOrDescription, imageUrl: null }`. | Spring returns 400 Bad Request; client catches and uses keyword simulator. |
| **Get Today's Meals**| `GET /api/meals/today` | `GET /api/meals/daily/{userId}` | ❌ **No** | Backend path is `/daily/{userId}`, not `/today`. | Catches error; returns 3 hardcoded sample meals. |
| **Get Today's Activity**| `GET /api/activity/today` | `GET /api/activity/daily/{userId}` | ❌ **No** | Backend path is `/daily/{userId}`, not `/today`. | Catches error; returns 7,420 steps mock activity record. |
| **Log Activity / Workout**| `POST /api/activity/log` | `POST /api/activity/workout` | ❌ **No** | Backend route is `/workout`, not `/log`. Requires `userId`. | Catches error; echoes input payload with `id: 1`. |
| **Add Water Intake** | `POST /api/activity/water` | `POST /api/activity/water` | ⚠️ **Path matches, payload fails** | Backend `@NotBlank` requires `userId`. Frontend sends `{ amountMl }`. | Spring returns 400; frontend catches and returns static 2500ml. |
| **Add Step Count** | `POST /api/activity/steps` | `POST /api/activity/steps` | ⚠️ **Path matches, payload fails** | Backend `@NotBlank` requires `userId`. Frontend sends `{ steps }`. | Spring returns 400; frontend catches and returns static 7920 steps. |
| **Get Daily Progress**| `GET /api/progress/daily` | `GET /api/activity/summary/{userId}` | ❌ **No** | Backend path is `/api/activity/summary/{userId}`. | Catches error; returns 82.5% mock progress score. |
| **Get Weekly Progress**| `GET /api/progress/weekly` | `GET /api/analytics/weekly/{userId}` | ❌ **No** | Backend path is `/api/analytics/weekly/{userId}`. | Catches error; returns static 7-day trend array. |
| **Get AI Feedback** | `GET /api/progress/ai-feedback` | `GET /api/analytics/ai-feedback/{userId}` | ❌ **No** | Backend path is `/api/analytics/ai-feedback/{userId}`. | Catches error; returns static "Peak Hypertrophy Cadence" feedback. |
| **Get Reward Summary**| `GET /api/rewards/summary` | `GET /api/rewards/{userId}` | ❌ **No** | Backend path is `/api/rewards/{userId}`, not `/summary`. | Catches error; returns 680 XP, Tier 2, 6-badge mock catalog. |

### Summary of Integration Status
- Total Frontend API calls: **13**
- Calls that route to a matching backend endpoint: **3** (`/api/meals/analyze`, `/api/activity/water`, `/api/activity/steps`)
- Calls that fail validation or 404: **13 of 13 (100%)**
- Real backend data displayed on frontend: **0%**

---

## 7. Deployment Readiness Assessment

### 7.1 Frontend Deployment (`https://athly-gold.vercel.app`)
- **Hosting Platform:** Vercel.
- **Build Status:** Build succeeds because React, Vite, and Tailwind have no compile errors.
- **Configuration Gap:** There is no `vercel.json` file in the repository.
  - While single-tab view works, any future implementation of `react-router-dom` will encounter HTTP 404 on page refresh unless a rewrite rule (`"rewrites": [{"source": "/(.*)", "destination": "/index.html"}]`) is added.
- **API URL Binding:** The frontend hardcodes `const API_BASE = '/api'`. Vite proxy in `vite.config.js` only works during local development (`npm run dev`). On Vercel, requests to `/api/*` target `https://athly-gold.vercel.app/api/*`, which returns Vercel 404s. The frontend needs `import.meta.env.VITE_API_BASE_URL`.

### 7.2 Backend Deployment Requirements
- **Hosting Target:** Render / Railway / Fly.io.
- **Prerequisites Missing:**
  - **No Maven Wrapper:** Neither `mvnw` nor `mvnw.cmd` is present. Cloud build runners cannot build the application without pre-installed Maven.
  - **No Container Descriptor:** No `Dockerfile` is provided.
  - **Java Runtime:** Requires a cloud container configured with JDK 21.
  - **Environment Variables:** `application.properties` does not use dynamic placeholders like `${PORT:8080}` or `${SPRING_DATA_MONGODB_URI}`.

### 7.3 Database Hosting
- **Requirement:** MongoDB instance.
- **Current State:** Hardcoded to `mongodb://localhost:27017/athly_db`.
- **Target Solution:** MongoDB Atlas cloud cluster. Connection string must be injected via environment variable.

### 7.4 AI Service Hosting
- **Current State:** Completely absent.
- **Target Requirement:** Python 3.11/3.12 container running FastAPI/Uvicorn, requiring Google Gemini API key (`GEMINI_API_KEY`) and cloud hosting (e.g. Render Web Service).

---

## 8. Risk & Blocker Registry

| ID | Category | Severity | Description | Impact |
|---|---|---|---|---|
| **R-01** | **Integration** | **CRITICAL** | 100% of frontend API calls mismatch backend routes or DTO signatures. | The app cannot function with a real backend without rewriting the client API layer. |
| **R-02** | **Security** | **CRITICAL** | Complete absence of authentication (no Firebase SDK, no Spring Security, no JWT filter). | Any user can view or overwrite any other user's fitness and health records. |
| **R-03** | **Architecture**| **HIGH** | `ai-service/` is empty (`.gitkeep` only). Backend AI features rely on connection error catch blocks. | Meal vision and dynamic AI coaching cannot function until FastAPI service is built. |
| **R-04** | **Deployment** | **HIGH** | Backend has no Maven wrapper (`mvnw`), Dockerfile, or dynamic environment variable support. | Backend cannot be deployed to Render or containerized environments. |
| **R-05** | **Frontend** | **HIGH** | Meal analysis dropzone is an inert `<div>` with no file input or image ingestion code. | Users cannot upload or photograph meals. |
| **R-06** | **UI/UX** | **MEDIUM** | Theme uses generic dark slate/emerald instead of product vision (dark graphite & electric lime). | Visual design fails to convey the premium, athletic brand identity. |
| **R-07** | **Performance** | **MEDIUM** | Universal transition rule `* { transition: ... }` in `index.css`. | Induces browser reflow and frame-rate drops on page interaction. |
| **R-08** | **Environment** | **MEDIUM** | Java 21 specified in `pom.xml`, but Java and Maven are not in the local system PATH. | Local backend execution and testing require setting up the JDK environment or containerizing. |

---

## 9. Conclusion

The existing ATHLY repository provides a visually structured prototype interface and a cleanly written set of Java Spring Boot services and MongoDB entities. However, the system is fundamentally non-integrated: the frontend relies on silent mock data fallbacks, the backend endpoints require parameters that the frontend never sends, authentication is entirely missing, and the AI microservice does not exist.

The rebuild roadmap (`ATHLY_V2_ROADMAP.md`) provides the structured, phased execution plan to resolve these architectural gaps.
