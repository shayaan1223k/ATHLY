# ATHLY V2 — Rebuild Architecture & Phased Implementation Roadmap

**Document Version:** 1.0.0  
**Status:** Planning & Architectural Blueprint  
**Target Branch:** `rebuild/athly-v2`  
**Production Rollback Baseline:** `main` (`https://athly-gold.vercel.app`)  

---

## 1. Executive Vision & Core Principles

ATHLY V2 transforms the platform from a simulated client-side prototype into an end-to-end, fully integrated AI health and fitness ecosystem.

### Guiding Principles

1. **Aesthetic Excellence (Dark Graphite & Electric Lime):**  
   Replace the generic dark slate/emerald design with an aggressive, ultra-clean aesthetic featuring deep dark graphite surfaces (`#0B0D0F`, `#12151A`, `#1A1F26`) accentuated by electric lime highlights (`#D4FF00`, `#CCFF00`, `#B6E600`), high-contrast typography, and refined data visualization.

2. **Zero Fake Functionality:**  
   Eliminate all silent mock fallbacks in the frontend API client. Every user interaction must interact with real, validated backend endpoints, and any failure must present clear, contextual error and retry states.

3. **Decoupled Three-Tier Architecture:**  
   Cleanly separate concerns across:
   - **Client:** React 18 single-page application with responsive layouts, real photo capture/upload, and deep linking.
   - **Primary Backend Orchestrator:** Java 21 / Spring Boot 3 REST API handling business logic, user biometrics, workout generation, validation, gamification state machines, and MongoDB persistence.
   - **Dedicated AI Engine:** Isolated Python FastAPI microservice integrating Google Gemini Vision (for meal identification and nutritional estimation) and Gemini Pro / Flash (for dynamic coaching feedback).

4. **Production Rollback Integrity:**  
   All changes remain strictly isolated within the `rebuild/athly-v2` branch until end-to-end verification is complete. The existing production deployment at `https://athly-gold.vercel.app` (branch `main`) remains untouched and fully available as a fallback.

---

## 2. Proposed Product Architecture

### 2.1 High-Level System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ATHLY V2 Frontend Layer                         │
│   React 18 + Vite + Tailwind CSS (Dark Graphite & Electric Lime)      │
│   Client-side routing (React Router) + Firebase Client Auth           │
└───────────────────▲────────────────────────────────┬───────────────────┘
                    │                                │
                    │ HTTPS / JSON                   │ Firebase Token
                    │ (Bearer Token)                 │
┌───────────────────┴────────────────────────────────▼───────────────────┐
│                    Java Spring Boot 3.3.4 Backend                      │
│                    (Primary Application Engine)                        │
│                                                                        │
│  ┌────────────────────────┐  ┌──────────────────────────────────────┐  │
│  │ Security Filter Chain  │  │ REST Controllers                     │  │
│  │ (Firebase Token Verify)│  │ /profile, /fitness-plan, /meals,     │  │
│  └───────────┬────────────┘  │ /activity, /analytics, /rewards      │  │
│              │               └──────────────────┬───────────────────┘  │
│              ▼                                  ▼                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Service & Algorithm Layer                                        │  │
│  │ Mifflin-St Jeor BMR, TDEE, XP & Streak Engine, Milestone Badges  │  │
│  └───────────┬──────────────────────────────────┬───────────────────┘  │
└──────────────┼──────────────────────────────────┼──────────────────────┘
               │                                  │
       Spring Data Mongo                  HTTP / JSON (Internal)
               │                                  │
┌──────────────▼────────────┐        ┌────────────▼──────────────────────┐
│       MongoDB Atlas       │        │   Python FastAPI AI Microservice  │
│                           │        │   (Port 8000 / AI Subsystem)      │
│  - user_profiles          │        │                                   │
│  - fitness_plans          │        │  ┌─────────────────────────────┐  │
│  - meal_logs              │        │  │ Gemini Vision Prompt Handler│  │
│  - activity_logs          │        │  └──────────────┬──────────────┘  │
│  - progress_records       │        │  ┌──────────────▼──────────────┐  │
│  - user_rewards           │        │  │ Gemini Coaching Generator   │  │
└───────────────────────────┘        │  └──────────────┬──────────────┘  │
                                     └─────────────────┼─────────────────┘
                                                       │
                                              Google AI SDK / HTTPS
                                                       │
                                     ┌─────────────────▼─────────────────┐
                                     │         Google Gemini API         │
                                     │  Gemini 1.5 Flash / Gemini 2.0   │
                                     └───────────────────────────────────┘
```

---

## 3. UI/UX Design System: Dark Graphite & Electric Lime

To replace the existing generic navy/emerald theme with the envisioned athletic aesthetic, ATHLY V2 establishes the following design specifications:

### 3.1 Color Palette

| Token Name | Hex Code | Usage |
|---|---|---|
| `graphite-950` | `#080A0C` | Deep background, viewport baseline |
| `graphite-900` | `#0E1115` | Secondary background, sidebars, headers |
| `graphite-850` | `#14181F` | Elevated cards, modal dialogs, glass panels |
| `graphite-800` | `#1B212B` | Interactive card surfaces, form inputs |
| `graphite-700` | `#2A3342` | Primary borders, subtle dividers, inactive states |
| `graphite-600` | `#3D495C` | Tertiary borders, muted iconography |
| **`lime-500`** | **`#CCFF00`** | **Primary Electric Lime brand accent, primary CTA buttons** |
| `lime-400` | `#D8FF33` | Electric Lime hover state, active tab highlights |
| `lime-600` | `#A6D200` | Pressed button state, active borders |
| `lime-glow` | `rgba(204, 255, 0, 0.25)` | Box-shadow glow for buttons, badges, and progress meters |
| `cyber-cyan` | `#00E5FF` | Metric secondary accent (distance, step trends) |
| `crimson-burn`| `#FF3366` | Calories burned, high heart rate, protein alerts |
| `amber-warn` | `#FFB800` | Streaks, warning notices, recovery reminders |
| `text-primary`| `#F3F6F9` | Headings, active values, high-contrast labels |
| `text-muted` | `#7D8B9B` | Descriptions, timestamps, secondary labels |

### 3.2 Typography & Iconography
- **Font Stack:** Plus Jakarta Sans for UI elements and navigation; JetBrains Mono for numerical KPIs, calories, weights, and timers.
- **Iconography:** Lucide React with standard 1.75px stroke width.
- **Micro-Interactions:** Eliminate the universal transition rule `* { transition: ... }`. Replace with utility classes applied only to interactive elements (`.btn`, `.nav-pill`, `.card-interactive`).

### 3.3 Component State Standards
- **Loading:** Shimmering skeleton placeholders in graphite tones with faint lime glow lines.
- **Empty:** High-contrast illustration or icon with clear call-to-action button (e.g., *"No meals logged yet today — Scan with AI Vision"*).
- **Error:** Distinct graphite card with crimson border, error description, and a 1-click retry button.
- **Success:** Dynamic toast with electric lime checkmark and sound/vibration feedback simulation.

---

## 4. Phased Rebuild Implementation Plan

The rebuild is structured into 7 sequential phases. Each phase establishes working, verified capabilities before subsequent layers are integrated.

```
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 1: Environment Setup & API Contract Alignment                    │
│ - Maven wrapper setup, JDK 21 alignment, unified OpenAPI specs         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 2: Authentication & Security Foundation                          │
│ - Firebase Auth (React) + Spring Security Token Verification Filter   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 3: AI Microservice Implementation                                │
│ - Python FastAPI app, Gemini Vision & Pro prompts, image pipeline      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 4: Backend Service & Data Layer Hardening                        │
│ - Connect AI service, fix endpoint routes, MongoDB Atlas config        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 5: Frontend Redesign & Real API Client Wiring                    │
│ - Dark Graphite/Electric Lime theme, remove mocks, wire real API       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 6: Core Feature Completion & Real Vision Ingestion               │
│ - Camera/file upload, interactive split editor, XP streak engine       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 7: Deployment, End-to-End Verification & Staging Release         │
│ - Vercel rewrites, Render cloud hosting, production smoke tests        │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Phase 1: Environment Setup & API Contract Alignment

#### Objective
Establish local build tools, align JDK requirements, configure the Maven wrapper, and freeze the unified REST API contract between frontend and backend.

#### Key Tasks
1. **Maven Wrapper Provisioning:** Add `mvnw` and `mvnw.cmd` (Maven 3.9+) to `backend/` to ensure deterministic builds on any host machine and CI runner.
2. **Java Version Realignment:** Resolve the JDK 17 vs JDK 21 contradiction. Standardize on Java 21 to match Spring Boot 3.3.4 parent POM.
3. **API Contract Definition:** Resolve the 13 route discrepancies identified in the audit. Align frontend and backend route signatures:
   - Introduce authenticated `/api/profile/me`, `/api/fitness-plan/me`, `/api/meals/today`, `/api/activity/today`, `/api/analytics/weekly`, and `/api/rewards/me` routes that automatically derive `userId` from the authenticated security context rather than requiring manual path variables.
4. **Environment Profiles:** Create clean `.env.example` templates for both frontend and backend.

---

### Phase 2: Authentication & Security Foundation

#### Objective
Implement an end-to-end authentication layer securing all user endpoints and ensuring multi-tenant data isolation.

#### Architecture
```
[React Client] ────(Login / Register via Firebase)────► [Firebase Auth Service]
      │                                                        │
      │ Receive Firebase ID Token (JWT)                        │
      ▼                                                        │
[HTTP Request to Spring Boot with Bearer Token]               │
      │                                                        │
      ▼                                                        │
[Spring Security OncePerRequestFilter]                         │
      │                                                        │
      ├────(Verify Token with Firebase Admin SDK)──────────────┘
      ▼
[Populate SecurityContext with Authenticated User UID]
      ▼
[Authorize Controller Request]
```

#### Key Tasks
1. **Frontend Authentication:**
   - Install `firebase` client SDK in `frontend/`.
   - Implement `AuthContext.jsx` with Google Sign-in and Email/Password support.
   - Build Dark Graphite authentication modal / login view (`SignInView.jsx`, `SignUpView.jsx`).
   - Automatically attach `Authorization: Bearer <token>` to all outgoing `apiClient` requests via an HTTP interceptor.
2. **Backend Security Layer:**
   - Add `spring-boot-starter-security` and `firebase-admin` dependencies to `backend/pom.xml`.
   - Implement `FirebaseAuthenticationFilter` extending `OncePerRequestFilter`.
   - Configure `SecurityFilterChain`:
     - Public: `GET /api/health`, swagger/openapi docs.
     - Protected: All `/api/**` business routes.
   - Extract authenticated user ID via `@AuthenticationPrincipal` or `SecurityContextHolder`.

---

### Phase 3: Python FastAPI AI Microservice Implementation

#### Objective
Build the dedicated AI microservice inside `ai-service/` to execute Gemini Vision meal analysis and dynamic coaching generation.

#### Technical Blueprint
- **Framework:** Python 3.12, FastAPI, Uvicorn, Pydantic v2.
- **SDK:** `google-generativeai` (Gemini 1.5 Flash / Gemini 2.0 Flash).
- **Directory Structure:**
  ```
  ai-service/
  ├── main.py                    # FastAPI entrypoint, CORS, exception handlers
  ├── config.py                  # Pydantic settings loading GEMINI_API_KEY
  ├── requirements.txt           # fastapi, uvicorn, google-generativeai, pillow, pydantic
  ├── Dockerfile                 # Container deployment descriptor
  ├── routes/
  │   ├── health.py              # GET /api/ai/health
  │   ├── meal_vision.py         # POST /api/ai/analyze-meal
  │   └── progress_feedback.py   # POST /api/ai/progress-feedback
  ├── services/
  │   ├── gemini_vision.py       # Prompt engineering, image decoding, structured output parsing
  │   └── gemini_coach.py        # 7-day adherence prompt synthesis
  └── tests/
      └── test_ai_service.py     # Endpoint unit tests
  ```

#### Endpoints & Contract
1. `POST /api/ai/analyze-meal`:
   - Accepts base64-encoded image string or raw image bytes, meal category, and user hint.
   - Prompts Gemini Vision to return structured JSON:
     - Identified dish name.
     - Detected ingredients and estimated portions (grams).
     - Calories, protein (g), carbohydrates (g), fat (g), fiber (g).
     - Confidence score (0.0 to 1.0).
     - Dietary assessment and nutritional insight.
2. `POST /api/ai/progress-feedback`:
   - Accepts weekly user metrics (weight progression, workouts completed, daily step averages, hydration compliance).
   - Generates coach commentary, consistency score (0-100), pillar diagnostics (Training, Nutrition, Recovery), and 3 actionable tasks for the next 24 hours.

---

### Phase 4: Backend Service & Data Layer Hardening

#### Objective
Eliminate fallback mocks in the Java backend, connect to the FastAPI microservice, configure cloud MongoDB persistence, and provide verified REST endpoints.

#### Key Tasks
1. **Endpoint Refactoring:**
   - Update controllers to support `/me` endpoints extracting user identity from Firebase claims:
     - `GET /api/profile/me` and `PUT /api/profile/me`.
     - `GET /api/fitness-plan/me` and `POST /api/fitness-plan/recalculate`.
     - `GET /api/meals/today` and `POST /api/meals/analyze`.
     - `GET /api/activity/today`, `POST /api/activity/steps`, `POST /api/activity/water`.
     - `GET /api/analytics/weekly` and `GET /api/analytics/ai-feedback`.
     - `GET /api/rewards/me` and `POST /api/rewards/check-in`.
2. **AI Service Client Hardening:**
   - Configure `RestClient` with configurable timeouts and structured error handling.
   - If the AI microservice returns a non-200 code, throw a structured exception (`AiServiceUnavailableException`) that returns a clean 503 response to the frontend with an actionable message, rather than silently substituting fake data.
3. **Database Configuration:**
   - Update `application.properties` to support environment variable injection:
     ```properties
     spring.data.mongodb.uri=${MONGODB_URI:mongodb://localhost:27017/athly_db}
     athly.ai-service.url=${AI_SERVICE_URL:http://localhost:8000}
     ```
4. **CORS Alignment:**
   - Allow dynamic allowed origins via `${CORS_ALLOWED_ORIGINS:http://localhost:3000,http://localhost:5173,https://athly-gold.vercel.app}`.

---

### Phase 5: Frontend Redesign & Real API Client Wiring

#### Objective
Implement the Dark Graphite and Electric Lime UI design system, install client routing, eliminate mock fallbacks from `apiClient.js`, and provide comprehensive UX states.

#### Key Tasks
1. **Design Tokens & Theme:**
   - Update `tailwind.config.js` with `graphite` and `lime` palettes, glow shadows, and monospace font extensions.
   - Refactor `index.css`: Remove the universal wildcard transition `* { transition: ... }`. Add focused interactive transition styles.
2. **Routing Integration:**
   - Install `react-router-dom`.
   - Implement deep-linkable URL routes:
     - `/` (Redirect to `/progress` or Landing)
     - `/progress` (Progress & Performance Analytics)
     - `/planner` (Fitness & Workout Split Planner)
     - `/meals` (AI Meal Vision & Nutrition Log)
     - `/activity` (Steps, Water & Workout Tracking)
     - `/rewards` (XP Quests, Streaks & Badges)
     - `/profile` (User Metrics & Biometric Goals)
3. **API Client Rewiring (`frontend/src/api/apiClient.js`):**
   - Configure `const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'`.
   - **Remove all fallback mock returns in `catch` blocks.**
   - Throw real errors so components can display retry buttons, banner notices, and fallback UI.
4. **Component State Polish:**
   - Add loading skeleton components for cards, charts, and tables.
   - Add empty states for new user accounts (0 meals, 0 workouts logged).

---

### Phase 6: Core Feature Completion & Real Vision Ingestion

#### Objective
Replace placeholder inputs with fully functional frontend features, including real photo ingestion and interactive workout tracking.

#### Key Tasks
1. **Real Meal Photo Capture & Upload:**
   - Implement real file picker (`<input type="file" accept="image/*" capture="environment">`) in `MealAnalysisView.jsx`.
   - Support both drag-and-drop desktop uploads and mobile camera capture.
   - Client-side image compression and preview before upload.
   - Transmit base64 or multipart form data to `/api/meals/analyze`.
2. **Interactive Fitness Planner:**
   - Allow users to mark individual daily workouts or exercises as completed.
   - Completing a scheduled workout automatically triggers workout activity logging, awards XP, and updates streak status.
3. **Real-time Charting:**
   - Integrate lightweight, performant SVG charting (e.g., Recharts) for the 7-day step volume, calorie balance, and bodyweight progression charts.
4. **XP & Badge Notification Engine:**
   - When the backend response contains new unlocked badges or level-up events, display an animated celebratory modal styled with electric lime particles and sound effects.

---

### Phase 7: Deployment, Verification & Rollback Strategy

#### Objective
Deploy the complete V2 stack to cloud environments, execute end-to-end smoke tests, and ensure rollback readiness.

#### Deployment Architecture

| Service | Hosting Platform | Runtime / Container | Environment Variables Required |
|---|---|---|---|
| **Frontend** | Vercel | Node.js / Vite Static SPA | `VITE_API_BASE_URL`, `VITE_FIREBASE_CONFIG` |
| **Backend** | Render / Railway | Docker (Java 21 OpenJDK) | `PORT`, `MONGODB_URI`, `AI_SERVICE_URL`, `FIREBASE_CREDENTIALS`, `CORS_ALLOWED_ORIGINS` |
| **AI Service**| Render / Railway | Docker (Python 3.12) | `PORT`, `GEMINI_API_KEY`, `ALLOWED_ORIGINS` |
| **Database** | MongoDB Atlas | Managed MongoDB M0/M10 | Standard connection string |

#### Vercel Configuration (`frontend/vercel.json`)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### Verification & Rollback Strategy
- **Isolation:** Staging deployment of V2 will be pointed to a staging preview domain (e.g. `athly-v2-preview.vercel.app`).
- **Production Guard:** `https://athly-gold.vercel.app` remains bound to branch `main`. No PR will be merged to `main` until V2 passes full automated test suites and manual validation.
- **Rollback Procedure:** If any critical production issue is discovered after eventual V2 rollout, re-deploying the `main` branch tag in Vercel restores the original version within 60 seconds.

---

## 5. Feature & API Implementation Matrix

The target API contract resolves all audit mismatches and establishes clean endpoints:

| Feature Area | Frontend Component | Target API Endpoint | HTTP Method | Auth Required | Request Payload | Response Schema |
|---|---|---|---|---|---|---|
| **User Profile** | `UserProfileView` | `/api/profile/me` | `GET` | Yes (Bearer) | None | `UserProfileDto` |
| **User Profile** | `UserProfileView` | `/api/profile/me` | `PUT` | Yes (Bearer) | `UserProfileDto` | `UserProfileDto` |
| **Fitness Plan** | `FitnessPlannerView` | `/api/fitness-plan/me` | `GET` | Yes (Bearer) | None | `FitnessPlanDto` |
| **Fitness Plan** | `FitnessPlannerView` | `/api/fitness-plan/recalculate` | `POST` | Yes (Bearer) | None | `FitnessPlanDto` |
| **Meal Analysis**| `MealAnalysisView` | `/api/meals/analyze` | `POST` | Yes (Bearer) | `MealAnalysisRequest` (base64 image, hint, type) | `MealAnalysisResponse` |
| **Meal History** | `MealAnalysisView` | `/api/meals/today` | `GET` | Yes (Bearer) | Optional `?date=YYYY-MM-DD` | `List<MealLog>` |
| **Activity Log** | `ActivityTrackingView` | `/api/activity/today` | `GET` | Yes (Bearer) | Optional `?date=YYYY-MM-DD` | `ActivityLogDto` |
| **Step Logging** | `ActivityTrackingView` | `/api/activity/steps` | `POST` | Yes (Bearer) | `{ "steps": 1000 }` | `ActivityLogDto` |
| **Water Logging**| `ActivityTrackingView` | `/api/activity/water` | `POST` | Yes (Bearer) | `{ "amountMl": 250 }` | `ActivityLogDto` |
| **Workout Log** | `ActivityTrackingView` | `/api/activity/workout` | `POST` | Yes (Bearer) | `WorkoutLogRequest` | `ActivityLogDto` |
| **Weekly Stats** | `ProgressAnalyticsView`| `/api/analytics/weekly` | `GET` | Yes (Bearer) | None | `WeeklyAnalyticsDto` |
| **AI Coaching** | `AiFeedbackCard` | `/api/analytics/ai-feedback`| `GET` | Yes (Bearer) | None | `AiFeedbackResponse` |
| **Rewards & XP** | `RewardsView` | `/api/rewards/me` | `GET` | Yes (Bearer) | None | `RewardSummaryDto` |
| **Daily Check-in**| `Navbar` / `RewardsView`| `/api/rewards/check-in` | `POST` | Yes (Bearer) | None | `RewardSummaryDto` |

---

## 6. Testing Strategy

### 6.1 Backend Testing
- **Unit Testing:** Unit test calculation algorithms in `FitnessPlannerServiceTest.java` (Mifflin-St Jeor formulas, macro split percentages, calorie boundaries).
- **Service Integration Tests:** Test XP calculation and streak transitions in `RewardServiceTest.java`.
- **Controller Slice Tests:** Use `@WebMvcTest` with mocked service layers to verify validation error handling (400) and authenticated user extraction.
- **Embedded Database Tests:** Use Testcontainers or embedded in-memory MongoDB for repository query tests (`MealLogRepositoryTest.java`).

### 6.2 AI Microservice Testing
- **FastAPI TestClient:** Test Pydantic schema validation for malformed image payloads.
- **Gemini Mock Tests:** Mock Google Gemini API responses to verify robust JSON extraction even when LLM output contains extraneous markdown backticks or commentary.

### 6.3 Frontend Testing
- **Component Tests:** Test profile form calculations and metric cards using React Testing Library.
- **API Client Tests:** Test token attachment, 401 handling, and network error handling using Mock Service Worker (MSW).

### 6.4 End-to-End Verification Checklist
- [ ] User can register a new account and immediately receive an initial fitness plan.
- [ ] User can capture or upload a meal image and view parsed macros and confidence score.
- [ ] User can log water and steps; XP points and streak counters increment accurately.
- [ ] Updating height or weight recalculates BMI and triggers an updated calorie target.
- [ ] Aggregated 7-day progress charts display actual persisted activity from MongoDB.
- [ ] All pages render seamlessly on mobile viewports (375px) and desktop screens (1440px).

---

## 7. Strategic Decisions Requiring Clarification

Before beginning implementation, the following decisions require user input:

1. **Authentication Mode Preference:**
   - *Option A (Recommended):* Implement Firebase Authentication (Email/Password & Google Sign-in) with Firebase Admin SDK token verification in Spring Boot.
   - *Option B:* Implement a lightweight JWT-based authentication system managed directly within Spring Boot and MongoDB, bypassing external Firebase dependencies.
2. **AI Service API Key & Quotas:**
   - Will a Google Gemini API Key (`GEMINI_API_KEY`) be provided for local testing and cloud deployment, or should development use a high-fidelity local vision mock until keys are supplied?
3. **Target Hosting Infrastructure:**
   - Confirm preferred deployment targets (e.g., Frontend on Vercel, Backend & AI Service on Render or Railway, Database on MongoDB Atlas).

---

## 8. Summary of Rebuild Deliverables

| Rebuild Phase | Core Deliverable | Success Criteria |
|---|---|---|
| **Phase 1** | Maven wrapper & API contract alignment | `backend/mvnw clean compile` succeeds; API spec finalized |
| **Phase 2** | Authentication system | Secured endpoints; user identity derived from JWT |
| **Phase 3** | Python FastAPI AI service | Working Gemini Vision meal identification endpoint |
| **Phase 4** | Backend & MongoDB integration | Spring Boot orchestrates AI calls and persists to Atlas |
| **Phase 5** | Dark Graphite & Electric Lime redesign | Premium UI; zero mock fallbacks in API client |
| **Phase 6** | Real image upload & dynamic features | Real camera capture; interactive split & reward engine |
| **Phase 7** | Staging deployment & verification | Live multi-service staging deployment verified end-to-end |
