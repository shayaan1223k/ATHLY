# ATHLY — AI-Powered Personal Health & Fitness Platform
## Project Specification Document

---

## 1. Project Overview
**ATHLY** is an AI-powered personal health and fitness platform engineered to empower users to set fitness goals, receive intelligent workout and dietary recommendations, analyze their meals using AI vision, track physical activity, and earn gamified rewards for sustained consistency.

> **Core Philosophy:**  
> *"Your Goal. Our Plan. Your Progress. Your Reward."*

---

## 2. Core Features

### 1. User Profile & Biometrics
- **Personal Details:** Name, Age, Gender
- **Body Metrics:** Height (cm), Weight (kg), BMI calculations
- **Fitness Attributes:** Experience Level (Beginner, Intermediate, Advanced, Elite)
- **Primary Goal:** Fat Loss, Muscle Gain, Endurance, Maintenance
- **Dietary Preference:** Non-Vegetarian, Vegetarian, Vegan, Keto, Pescatarian

### 2. Personalized Fitness Planner
- **Customized Workout Plans:** Structured split routines with exercises, sets, reps, and rest periods.
- **Caloric Targets:** Calculated using Mifflin-St Jeor BMR formula and TDEE activity multipliers.
- **Macronutrient Targets:** Daily protein, carbohydrates, and fat distributions.
- **Daily Step Target:** NEAT baseline target based on goal (e.g. 10,000 steps).
- **Diet Recommendations:** Food choices aligned with preferences and macro targets.

### 3. AI Meal Analysis
- **Photo Ingestion:** User captures/uploads a photo of their meal.
- **AI Food Identification:** Computer vision identification of food items and portion estimates.
- **Nutrient Calculation:** Estimated calories, protein, carbs, fats, and fiber.
- **Target Comparison:** Real-time comparison with the user's daily nutritional budget (remaining kcal & macros).

### 4. Activity & Biometrics Tracking
- **Step Tracking:** Daily step count and calculated distance (km/miles).
- **Workout Logging:** Activity type, duration, and estimated calories burned.
- **Hydration Logging:** Real-time water intake tracking (ml).
- **Daily Progress Computation:** Real-time summary of daily goals.

### 5. Progress Analytics & AI Feedback
- **Daily & Weekly Progress:** Aggregated metrics and adherence trends.
- **Weight History:** Body composition changes and trend projections.
- **Goal Completion:** Milestone tracking and percentage completions.
- **AI-Generated Progress Feedback:** Dynamic coach feedback evaluating training consistency, macro compliance, recovery state, and 24-hour action items.

### 6. Gamification & Rewards
- **Points & XP:** Earned for logging workouts, meals, hydration, and steps.
- **Tier Levels:** Progression based on accumulated points.
- **Streaks Tracker:** Consecutive active days counter.
- **Daily & Weekly Quests:** Engaging fitness challenges.
- **Achievement Badges:** Unlockable trophies (e.g., *7-Day Titan*, *Hydration Hero*, *Macro Master*).

---

## 3. Technology Stack

| Layer | Technology | Role |
|---|---|---|
| **Frontend** | React.js, Vite, Tailwind CSS | Modern, responsive, interactive single-page application UI |
| **Authentication** | Firebase Authentication | Secure user identity management and JWT token verification |
| **Main Backend** | Java, Spring Boot 3, Maven | Core business logic, REST APIs, user management, and data aggregation |
| **Database** | MongoDB | Flexible document database for user profiles, meal logs, fitness plans, and activity history |
| **AI Microservice** | Python, FastAPI, Gemini API | Dedicated AI engine for meal image analysis and progress feedback generation |
| **Deployment (Target)** | Vercel (Frontend), Render (Backend & AI Service) | Cloud hosting and continuous delivery |

---

## 4. System Architecture & Data Flow

### Standard Application Request Flow
```
[React Frontend]
       │ (HTTP / JSON / Firebase JWT)
       ▼
[Java Spring Boot REST API]
       │ (Spring Data MongoDB)
       ▼
  [(MongoDB)]
```

### AI-Powered Feature Flow (Meal Vision & AI Feedback)
```
[React Frontend]
       │ 1. Submits meal image / user progress context
       ▼
[Java Spring Boot Backend]
       │ 2. Validates auth & forwards request to AI microservice
       ▼
[Python FastAPI AI Service]
       │ 3. Invokes Gemini Vision / LLM API with structured prompts
       ▼
[Google Gemini API]
       │ 4. Returns structured JSON analysis
       ▼
[Python FastAPI AI Service]
       │ 5. Returns parsed data to Java Backend
       ▼
[Java Spring Boot Backend]
       │ 6. Persists meal/feedback to MongoDB
       ▼
  [(MongoDB)]
       │ 7. Returns updated status and gamification XP
       ▼
[React Frontend]
```

---

## 5. Development Phases

### Phase 1: Project Foundation & Environment Setup
- Initialize Git repository and project directory structure.
- Define architecture, coding standards, and project specification documentation.
- Establish baseline configuration files for frontend, backend, and AI service.

### Phase 2: Authentication & User Profile Module
- Integrate Firebase Authentication in React frontend.
- Implement Firebase token validation filter in Java Spring Boot.
- Create MongoDB `UserProfile` schema and REST endpoints (`GET /api/profile`, `PUT /api/profile`).

### Phase 3: Personalized Fitness Planner
- Implement algorithm in Spring Boot to compute BMR, TDEE, macro split, and workout schedules.
- Create MongoDB `FitnessPlan` model and endpoints.
- Build interactive planner and workout split UI in React.

### Phase 4: Python FastAPI AI Service & Meal Analysis
- Build isolated FastAPI microservice integrating Google Gemini API.
- Implement image analysis endpoint for food identification and macro breakdown.
- Connect Java Spring Boot backend to FastAPI AI service.
- Build meal photo upload and real-time macro comparison UI in React.

### Phase 5: Activity Tracking & Hydration
- Create MongoDB `ActivityLog` schema.
- Implement step, workout, and water logging REST endpoints.
- Build live activity tracking widgets and quick-action loggers in React.

### Phase 6: Progress Analytics & AI Feedback Engine
- Implement daily/weekly progress aggregation in Java backend.
- Connect AI service to generate personalized coaching feedback based on recent history.
- Build analytics charts and AI feedback cards in React.

### Phase 7: Gamification & Rewards Engine
- Implement XP calculation, streak tracker, and badge unlock system in Java backend.
- Build rewards center, badge showcase, and quest tracker in React.

### Phase 8: Integration, Testing & Deployment
- End-to-end testing across all services.
- Configure environment variables and production profiles.
- Deploy frontend to Vercel and backend/AI service to Render.
