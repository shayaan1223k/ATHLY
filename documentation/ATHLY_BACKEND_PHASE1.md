# ATHLY V2 — Backend & Database Phase 1: Verification, Security Audit & Integration Plan

## Executive Summary
This document provides the authoritative record of the Phase 1 backend, database, and API foundation audit and verification on branch `rebuild/athly-v2`. It reviews implemented changes, details host toolchain verification, evaluates security risks, documents environment configurations, and defines a safe, minimal profile integration plan.

---

## 1. Phase 1 Implementation Review & Code Inspection

### 1.1 `HealthController.java` & Database Status Communication
- **Current Behavior**:
  - `GET /api/health` issues a non-destructive MongoDB command: `mongoTemplate.executeCommand(new Document("ping", 1))`.
  - When MongoDB ping succeeds, the controller returns HTTP 200 with `status: "UP"`, `database: "CONNECTED"`, `application: "ATHLY"`, and an ISO-8601 timestamp.
  - When MongoDB is unreachable, the exception is caught, returning HTTP 200 with `status: "DEGRADED"`, `database: "DISCONNECTED"`, and `databaseError: "Database connection unavailable or uninitialized"`.
- **Evaluation & Recommendation**:
  - *Information Safety*: **Passed**. The catch block completely suppresses raw exception messages, hostnames, ports, credentials, and stack traces.
  - *HTTP Status Code Nuance*: Currently, returning HTTP 200 for a `DEGRADED` state ensures that container platforms (e.g., Render) do not prematurely terminate the web server during initial database startup. However, automated monitoring tools relying strictly on standard HTTP error status codes (e.g. `res.ok`) will evaluate the response as healthy unless parsing the JSON payload. In Phase 2, separate liveness (`GET /api/health/liveness` -> 200) and readiness (`GET /api/health/readiness` -> 503 when database is disconnected) endpoints should be introduced.

### 1.2 `application.properties` & Environment Resolution
- **Current Configuration**:
  ```properties
  server.port=${PORT:8080}
  spring.application.name=ATHLY
  spring.data.mongodb.uri=${MONGODB_URI:${SPRING_DATA_MONGODB_URI:mongodb://localhost:27017/athly_db}}
  spring.data.mongodb.auto-index-creation=true
  athly.cors.allowed-origins=${CORS_ALLOWED_ORIGINS:http://localhost:5173,http://localhost:3000}
  athly.ai-service.url=${AI_SERVICE_URL:http://localhost:8000}
  ```
- **Evaluation**:
  - *Credentials Safety*: **Passed**. No passwords, connection URIs, or tokens are committed to source control.
  - *Port Binding*: Support for `${PORT:8080}` ensures seamless compatibility with Render's dynamic container port injection.
  - *URI Fallback*: Cascades from `MONGODB_URI` (Render / Heroku Atlas convention) to `SPRING_DATA_MONGODB_URI` (Spring convention) and finally to local development `mongodb://localhost:27017/athly_db`.

### 1.3 `CorsConfig.java` & Preflight Handling
- **Current Configuration**:
  - Injects `athly.cors.allowed-origins`, splits comma-delimited origins, trims whitespace, and binds to `/api/**`.
  - Allows methods: `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`, `PATCH`.
  - Allows credentials: `allowCredentials(true)`.
- **Evaluation**:
  - *Security*: Avoids wildcards (`*`) with credentials, conforming to W3C CORS specifications.
  - *Route Coverage*: Applies to all Spring MVC controllers under `/api/**`.
  - *Preflight*: Explicitly includes `OPTIONS` for standard CORS preflight negotiation.

### 1.4 Frontend API Client & Base URL Resolution
- **Current Configuration in `frontend/src/api/apiClient.js`**:
  ```javascript
  const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';
  ```
- **Local Development**:
  - With `vite.config.js` proxying `/api` to `http://localhost:8080`, relative requests work out of the box without cross-origin configuration.
- **Production (Vercel)**:
  - Vercel hosts static frontend assets. If the frontend issues requests to `/api/*` without an absolute base URL, the requests will hit Vercel's edge network rather than the backend, returning 404.
  - **Required Action for Vercel**: Set `VITE_API_BASE_URL=https://<your-render-backend-url>/api` in the Vercel project dashboard, or configure a `vercel.json` rewrite rule:
    ```json
    {
      "rewrites": [
        { "source": "/api/:path*", "destination": "https://<your-render-backend-url>/api/:path*" }
      ]
    }
    ```

### 1.5 Fallback Identification & Error Visibility
- **Current State**:
  - `apiClient.checkHealth()` verifies backend reachability and updates `backendHealth` in `AthlyContext`.
  - `getProfile()` and `updateProfile()` log `console.warn` upon failure and return data annotated with `_isFallback: true` and `_error`.
  - *Remaining Gap*: Several read methods (`getFitnessPlan`, `getTodayMeals`, etc.) still fall back to mock data on network error. In the full integration phase, each method should uniformly flag `_isFallback: true` so the UI and `DemoBadge` can cleanly differentiate between:
    1. A live backend that returned empty data (e.g. 0 meals logged today).
    2. A network/server error where baseline demo data is being rendered.

---

## 2. Verification Results & Available Toolchain

### 2.1 Frontend Verification
- **Command Executed**: `cmd.exe /c "npm run build"` in `frontend/`
- **Exit Code**: `0` (Success)
- **Tool Versions**: Node.js `v24.19.0`, npm `11.17.0`, Vite `v5.4.21`
- **Output**:
  ```
  > athly-frontend@1.0.0 build
  > vite build

  vite v5.4.21 building for production...
  transforming...
  ✓ 1486 modules transformed.
  rendering chunks...
  computing gzip size...
  dist/index.html                   1.52 kB │ gzip:  0.85 kB
  dist/assets/index-Cj_ye_FW.css   29.76 kB │ gzip:  5.86 kB
  dist/assets/index-CVBl4Pgy.js   271.67 kB │ gzip: 72.76 kB
  ✓ built in 4.32s
  ```

### 2.2 Backend Toolchain Audit & Limitations
- **Commands Executed**:
  1. `cmd.exe /c "mvn -version"` -> `'mvn' is not recognized as an internal or external command` (Exit code: 1)
  2. `cmd.exe /c "mvnw.cmd -version"` -> `'mvnw.cmd' is not recognized as an internal or external command` (Exit code: 1)
  3. `cmd.exe /c "where java"` -> `Could not find files for the given pattern(s)` (Exit code: 1)
- **Status & Honest Limitation**:
  - Java 21 and Apache Maven are **not installed in the system PATH** on this local machine.
  - The repository does not include pre-committed Maven Wrapper scripts (`mvnw`, `mvnw.cmd`, `.mvn/`).
  - **Result**: The Java backend cannot be compiled or tested locally on this host without installing JDK 21 and Maven. We do not claim that the backend compiles or runs locally. When pushed to Render, Render's cloud build environment provides the required Java 21 runtime and Maven buildpacks.

---

## 3. Critical Security Risks & Ownership Model

### 3.1 Unauthenticated Endpoint Exposure
- Every existing backend controller blindly accepts `{userId}` as a public path parameter:
  - `GET /api/profile/{userId}`
  - `PUT /api/profile/{userId}`
  - `GET /api/meals/daily/{userId}`
  - `GET /api/activity/daily/{userId}`
  - `POST /api/activity/steps` (accepts unverified `userId` in JSON body)
- **Vulnerability**: Any client can access, modify, or delete another user's biometric, nutritional, and workout data simply by guessing or iterating a `userId`.
- **Constraint**: Because user authentication (JWT / OAuth / Spring Security) is not yet implemented, **public endpoints must not trust client-supplied user identifiers**.

---

## 4. Phase 2 Preparation: Proposed Profile Integration Plan

To connect the first real data flow safely without exposing insecure public endpoints, we propose the following minimal, compatible plan:

### 4.1 Data Model Alignment Matrix
The frontend and backend currently use conflicting property names, data types, and formatting:

| Field Meaning | Frontend Form (`UserProfileView`) | Backend DTO (`UserProfileDto`) | Required Normalization |
| :--- | :--- | :--- | :--- |
| **User Identifier** | `id: 1` (integer) | `userId: "..."` (`@NotBlank String`) | Map to string-based ID. |
| **Email Address** | *Missing entirely* | `email: "..."` (`@NotBlank @Email`) | Add optional email input to form or provide default during development. |
| **Physical Activity**| `fitnessLevel: "Intermediate"` | `activityLevel: "MODERATELY_ACTIVE"` | Provide explicit mapping between UI labels and backend tokens. |
| **Dietary Pattern** | `foodPreference: "Non-Vegetarian"` | `dietaryPreference: "NON_VEGETARIAN"` | Map UI option strings to backend uppercase tokens. |
| **Fitness Goal** | `fitnessGoal: "Muscle Gain"` | `fitnessGoal: "MUSCLE_GAIN"` | Map UI option strings to backend uppercase tokens. |
| **BMI Calculation** | Calculated in client | Calculated in service (`BigDecimal`) | Backend recalculates and validates authoritatively on save. |

### 4.2 Proposed Secure Route Strategy: Current User Endpoint (`/api/profile/me`)
Rather than calling `GET /api/profile/{userId}`:
1. **Endpoint**: Introduce `GET /api/profile/me` and `PUT /api/profile/me`.
2. **Development Isolation**:
   - During local development (prior to full authentication), `/api/profile/me` binds to an isolated, fixed local development user (`dev-local-user`) stored in a local MongoDB database (`athly_dev`).
   - The client never passes an arbitrary user ID in the path or body.
3. **Seamless Transition to Authentication (Phase 2)**:
   - When Spring Security and JWT/OAuth are introduced, `/api/profile/me` will resolve the user ID directly from `SecurityContextHolder.getContext().getAuthentication()`.
   - The frontend code will not need any URL changes when upgrading to authenticated sessions.

### 4.3 Database Safety
- Local development will strictly target `mongodb://localhost:27017/athly_dev`.
- No connections to production MongoDB Atlas clusters will be made during local testing.

---

## 5. Deployment Configuration Reference

The following environment variables govern deployment across local development, Vercel, and Render:

| Variable Name | Environment | Purpose | Example / Placeholder Format | Security Sensitivity |
| :--- | :--- | :--- | :--- | :--- |
| `MONGODB_URI` | Backend (Render / Local) | MongoDB connection string | `mongodb+srv://<db_user>:<db_pass>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority` | **CRITICAL SECRET**. Server-side only. Never commit or expose to client bundles. |
| `PORT` | Backend (Render) | Dynamic container port binding | `8080` (or injected by Render) | Public / Non-sensitive. |
| `CORS_ALLOWED_ORIGINS` | Backend (Render) | Permitted frontend origins | `https://athly-gold.vercel.app,http://localhost:3000` | Configuration only. Never set to `*` with credentials. |
| `VITE_API_BASE_URL` | Frontend (Vercel) | Base URL for API requests | `https://athly-backend.onrender.com/api` | **PUBLIC**. Embedded directly into client-side JS bundles. **Never place secrets here.** |

> [!WARNING]
> Any environment variable prefixed with `VITE_` is automatically compiled into the public client JavaScript bundle. It is visible to anyone inspecting the network tab or source code in a web browser. Never prefix database URIs, API secret keys, or service account credentials with `VITE_`.

---

## 6. Smallest Recommended Next Step
Do **not** perform broad endpoint rewrites. Before implementing changes, the recommended next action is:
1. Confirm approval for the `/api/profile/me` current-user design pattern.
2. In the next task, implement the field mapping between [UserProfileView.jsx](file:///C:/Users/niksa/OneDrive/Desktop/ATHLY/frontend/src/components/profile/UserProfileView.jsx) and [UserProfileDto.java](file:///C:/Users/niksa/OneDrive/Desktop/ATHLY/backend/src/main/java/com/athly/backend/dto/UserProfileDto.java) on the single `/api/profile/me` route for end-to-end data flow verification against a local development MongoDB instance.
