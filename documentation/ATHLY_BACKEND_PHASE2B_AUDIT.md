# ATHLY V2 — Phase 2B Security Verification Audit

**Audit Date:** 2026-10-21  
**Working Branch:** `rebuild/athly-v2`  
**Scope:** Firebase Authentication Architecture, Servlet Filter, Controller Endpoints, and Frontend State Management  
**Audit Type:** Read-Only Static Code Analysis & Threat Modeling

---

## Executive Summary

Phase 2B successfully introduced the foundational components for Firebase Authentication:
1. **Frontend**: Firebase JS SDK integration, reactive token extraction via `AuthContext`, automatic `Authorization: Bearer <ID_TOKEN>` header injection in `apiClient.js`, and an editorial authentication modal.
2. **Backend**: Firebase Admin SDK integration in `FirebaseConfig.java`, cryptographic token verification and `Principal` population in `FirebaseAuthFilter.java`, and strict server-side principal resolution on `GET /api/profile/me` and `PUT /api/profile/me`.

However, a comprehensive security analysis of all backend controllers reveals that **the backend contains critical legacy endpoints that predate Phase 2A/2B and remain completely unauthenticated, susceptible to Insecure Direct Object References (IDOR), and prone to Broken Object Level Authorization (BOLA).**

Furthermore, `FirebaseAuthFilter` currently acts as a *token decoder* rather than an *authorization barrier*: it allows unauthenticated requests (requests lacking an `Authorization` header) to pass through to downstream handlers. While `/api/profile/me` checks `resolveCurrentUserId(request)` and fails closed, **no other controller performs this check**, leaving the majority of member routes open to unauthenticated access and data tampering.

---

## 1. Route Security Matrix

The following table catalogs every controller, route, intended access level, current authentication enforcement, and vulnerability status.

| Controller | HTTP Method & Route | Intended Access | Auth Filter Enforced? | Handler Verifies Principal? | Trusts Client Identity? | Security Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **HealthController** | `GET /api/health` | Public | Bypassed (By design) | N/A | No | **SECURE (PUBLIC)** |
| **UserProfileController** | `GET /api/profile/me` | Member | Yes | Yes (`getUserPrincipal()`) | No | **SECURE** |
| **UserProfileController** | `PUT /api/profile/me` | Member | Yes | Yes (`getUserPrincipal()`) | No | **SECURE** |
| **UserProfileController** | `POST /api/profile` | Legacy / Admin | No (Passes through) | No | **Yes (`body.userId`)** | **VULNERABLE (CRITICAL)** |
| **UserProfileController** | `GET /api/profile/{userId}` | Member / Admin | No (Passes through) | No | **Yes (`path.userId`)** | **VULNERABLE (CRITICAL)** |
| **UserProfileController** | `PUT /api/profile/{userId}` | Member / Admin | No (Passes through) | No | **Yes (`path.userId`)** | **VULNERABLE (CRITICAL)** |
| **UserProfileController** | `DELETE /api/profile/{userId}` | Member / Admin | No (Passes through) | No | **Yes (`path.userId`)** | **VULNERABLE (CRITICAL)** |
| **ActivityTrackingController** | `POST /api/activity/steps` | Member | No (Passes through) | No | **Yes (`body.userId`)** | **VULNERABLE (HIGH)** |
| **ActivityTrackingController** | `POST /api/activity/water` | Member | No (Passes through) | No | **Yes (`body.userId`)** | **VULNERABLE (HIGH)** |
| **ActivityTrackingController** | `POST /api/activity/workout` | Member | No (Passes through) | No | **Yes (`body.userId`)** | **VULNERABLE (HIGH)** |
| **ActivityTrackingController** | `GET /api/activity/daily/{userId}` | Member | No (Passes through) | No | **Yes (`path.userId`)** | **VULNERABLE (HIGH)** |
| **ActivityTrackingController** | `GET /api/activity/summary/{userId}` | Member | No (Passes through) | No | **Yes (`path.userId`)** | **VULNERABLE (HIGH)** |
| **ActivityTrackingController** | `GET /api/activity/history/{userId}` | Member | No (Passes through) | No | **Yes (`path.userId`)** | **VULNERABLE (HIGH)** |
| **FitnessPlannerController** | `POST /api/fitness-plan/generate/{userId}` | Member | No (Passes through) | No | **Yes (`path.userId`)** | **VULNERABLE (HIGH)** |
| **FitnessPlannerController** | `GET /api/fitness-plan/{userId}` | Member | No (Passes through) | No | **Yes (`path.userId`)** | **VULNERABLE (HIGH)** |
| **MealAnalysisController** | `POST /api/meals/log` | Member | No (Passes through) | No | **Yes (`body.userId`)** | **VULNERABLE (HIGH)** |
| **MealAnalysisController** | `POST /api/meals/analyze` | Member | No (Passes through) | No | **Yes (`body.userId`)** | **VULNERABLE (HIGH)** |
| **MealAnalysisController** | `GET /api/meals/daily/{userId}` | Member | No (Passes through) | No | **Yes (`path.userId`)** | **VULNERABLE (HIGH)** |
| **MealAnalysisController** | `GET /api/meals/summary/{userId}` | Member | No (Passes through) | No | **Yes (`path.userId`)** | **VULNERABLE (HIGH)** |
| **MealAnalysisController** | `DELETE /api/meals/{mealId}?userId=...` | Member | No (Passes through) | No | **Yes (`query.userId`)** | **VULNERABLE (HIGH)** |
| **ProgressAnalyticsController** | `POST /api/analytics/weight` | Member | No (Passes through) | No | **Yes (`body.userId`)** | **VULNERABLE (HIGH)** |
| **ProgressAnalyticsController** | `GET /api/analytics/weight/{userId}` | Member | No (Passes through) | No | **Yes (`path.userId`)** | **VULNERABLE (HIGH)** |
| **ProgressAnalyticsController** | `GET /api/analytics/weekly/{userId}` | Member | No (Passes through) | No | **Yes (`path.userId`)** | **VULNERABLE (HIGH)** |
| **ProgressAnalyticsController** | `GET /api/analytics/ai-feedback/{userId}` | Member | No (Passes through) | No | **Yes (`path.userId`)** | **VULNERABLE (HIGH)** |
| **RewardController** | `GET /api/rewards/{userId}` | Member | No (Passes through) | No | **Yes (`path.userId`)** | **VULNERABLE (HIGH)** |
| **RewardController** | `POST /api/rewards/xp` | Admin / Internal | No (Passes through) | No | **Yes (`body.userId`)** | **VULNERABLE (CRITICAL)** |
| **RewardController** | `POST /api/rewards/check-in/{userId}` | Member | No (Passes through) | No | **Yes (`path.userId`)** | **VULNERABLE (HIGH)** |

---

## 2. Detailed Security Findings

### Critical Findings

#### [CRIT-01] Unauthenticated IDOR on Legacy User Profile Endpoints
- **File:** `backend/src/main/java/com/athly/backend/controller/UserProfileController.java`
- **Methods:**
  - `getProfile(@PathVariable String userId)` (Lines 124–128)
  - `updateProfile(@PathVariable String userId, @Valid @RequestBody UserProfileDto profileDto)` (Lines 134–140)
  - `deleteProfile(@PathVariable String userId)` (Lines 146–153)
  - `createProfile(@Valid @RequestBody UserProfileDto profileDto)` (Lines 111–118)
- **Vulnerability Description:**  
  While `GET /api/profile/me` and `PUT /api/profile/me` enforce server-side principal verification, the legacy parameterized endpoints remain active and unprotected. An attacker who sends an HTTP request **without** an `Authorization` header will bypass `FirebaseAuthFilter`'s bearer check and hit these methods directly. 
- **Exploitation Impact:**  
  Any external actor can read any athlete's biometrics, overwrite their profile, or delete their member account simply by enumerating or supplying their `userId`.

#### [CRIT-02] Unauthenticated Administrative Endpoint for XP Injection
- **File:** `backend/src/main/java/com/athly/backend/controller/RewardController.java`
- **Method:** `awardXp(@Valid @RequestBody AddXpRequest request)` (Lines 38–42)
- **Vulnerability Description:**  
  `POST /api/rewards/xp` accepts an `AddXpRequest` payload containing `userId`, `points`, `source`, and `description`. It performs zero authentication, zero role-based authorization, and zero token checks.
- **Exploitation Impact:**  
  Any unauthenticated client can mint arbitrary XP points and artificially elevate any user's level.

#### [CRIT-03] FirebaseAuthFilter Allows Unauthenticated Requests to Reach Controllers
- **File:** `backend/src/main/java/com/athly/backend/security/FirebaseAuthFilter.java`
- **Method:** `doFilterInternal` (Lines 117–123)
- **Vulnerability Description:**  
  Lines 117–123 state:
  ```java
  // 2. No Bearer token provided: allow down chain
  // Protected endpoints check request.getUserPrincipal() and fail closed if unauthenticated
  filterChain.doFilter(request, response);
  ```
  `FirebaseAuthFilter` assumes that all protected endpoints downstream will inspect `request.getUserPrincipal()` and fail closed. However, only `UserProfileController.me` implements this check. Every other controller accepts requests without checking `request.getUserPrincipal()`.
- **Exploitation Impact:**  
  Any request without an `Authorization` header completely circumvents authentication across 24 out of 27 backend routes.

---

### High Findings

#### [HIGH-01] Broken Object Level Authorization (BOLA) Across All Feature Controllers
- **Files:**
  - `backend/src/main/java/com/athly/backend/controller/ActivityTrackingController.java`
  - `backend/src/main/java/com/athly/backend/controller/FitnessPlannerController.java`
  - `backend/src/main/java/com/athly/backend/controller/MealAnalysisController.java`
  - `backend/src/main/java/com/athly/backend/controller/ProgressAnalyticsController.java`
  - `backend/src/main/java/com/athly/backend/controller/RewardController.java`
- **Vulnerability Description:**  
  Even when an authenticated user sends a valid Firebase ID token (e.g., User A), none of these controllers compare `request.getUserPrincipal().getName()` against the `{userId}` specified in the URL or the `userId` in the request body.
- **Exploitation Impact:**  
  A legitimate user logged into the application can access and alter the workouts, meals, nutrition summaries, and weight records of any other user (User B) by altering the parameter in the HTTP request.

#### [HIGH-02] Frontend / Backend Route Divergence Masked by Client-Side Fallback
- **Files:** `frontend/src/api/apiClient.js` vs. Backend Controllers
- **Issue Description:**  
  The frontend was redesigned to call clean, current-member `/me`-style routes, while the backend controllers were never updated from the legacy parameterized routes:
  - Frontend calls `GET /api/planner` $\rightarrow$ Backend only listens on `GET /api/fitness-plan/{userId}` (404 Not Found)
  - Frontend calls `GET /api/meals/today` $\rightarrow$ Backend only listens on `GET /api/meals/daily/{userId}` (404 Not Found)
  - Frontend calls `GET /api/progress/daily` $\rightarrow$ Backend only listens on `GET /api/activity/summary/{userId}` (404 Not Found)
  - Frontend calls `GET /api/progress/weekly` $\rightarrow$ Backend only listens on `GET /api/analytics/weekly/{userId}` (404 Not Found)
  - Frontend calls `GET /api/progress/ai-feedback` $\rightarrow$ Backend only listens on `GET /api/analytics/ai-feedback/{userId}` (404 Not Found)
  - Frontend calls `GET /api/rewards/summary` $\rightarrow$ Backend only listens on `GET /api/rewards/{userId}` (404 Not Found)
- **Impact:**  
  In the browser, these 404 errors are intercepted by `apiClient.js` catch-blocks and populated with local simulation/demo objects. This gives the false impression of a working system while masking the reality that the backend routes are disconnected and vulnerable.

#### [HIGH-03] Validation Failure on Step and Water Logging
- **Files:** `backend/src/main/java/com/athly/backend/dto/StepLogRequest.java`, `WaterLogRequest.java` vs. `frontend/src/api/apiClient.js`
- **Issue Description:**  
  `StepLogRequest` and `WaterLogRequest` define:
  ```java
  @NotBlank(message = "User ID is required")
  private String userId;
  ```
  However, `frontend/src/api/apiClient.js` sends `{ steps }` and `{ amountMl }` without a `userId` property. If live requests reach the backend, they fail validation with HTTP 400 Bad Request.

---

### Medium Findings

#### [MED-01] Potential Error Detail Leakage in 401 Responses
- **File:** `backend/src/main/java/com/athly/backend/security/FirebaseAuthFilter.java` (Lines 95, 99)
- **Issue Description:**  
  `sendUnauthorizedResponse(response, "Invalid or expired Firebase ID token: " + ex.getMessage());`
  `ex.getMessage()` may reflect internal Google API exceptions, clock skew diagnostics, or network timeout stack details.
- **Remediation:**  
  Standardize the client-facing error message to a generic string (e.g., `"Invalid or expired authentication token"`) and log `ex.getMessage()` strictly to server logs.

#### [MED-02] Absence of Spring Security Starter & Filter Precedence
- **File:** `backend/pom.xml`, `backend/src/main/java/com/athly/backend/security/FirebaseAuthFilter.java`
- **Issue Description:**  
  The project uses Spring Boot Starter Web without `spring-boot-starter-security`. Consequently, `FirebaseAuthFilter` runs as a basic servlet filter with default `LOWEST_PRECEDENCE`. It lacks declarative URL security matching and standard HTTP 403 Forbidden handling.
- **Remediation:**  
  Annotate `FirebaseAuthFilter` with `@Order(Ordered.HIGHEST_PRECEDENCE + 10)` or configure a custom security barrier.

#### [MED-03] Safeguard for `athly.dev.auth-mock-enabled`
- **File:** `backend/src/main/resources/application.properties`
- **Issue Description:**  
  `athly.dev.auth-mock-enabled=${DEV_AUTH_MOCK_ENABLED:false}` defaults safely to `false`. However, there is no code-level assertion preventing an operator from accidentally deploying with `DEV_AUTH_MOCK_ENABLED=true` in a production environment.
- **Remediation:**  
  Add an `@PostConstruct` check in `AthlyApplication.java` that logs a high-severity alert or refuses to boot if `DEV_AUTH_MOCK_ENABLED=true` while `spring.profiles.active=prod` or `RENDER=true`.

---

### Low Findings

#### [LOW-01] Local Environment Toolchain Limitation
- **Location:** Host Windows environment
- **Issue Description:**  
  Apache Maven (`mvn`) and Java 21 are not installed in the system `PATH` on this Windows machine. While backend source code conforms strictly to Spring Boot 3 standards, automated test execution cannot be verified locally without CI.

---

## 3. Review of Review Points

### A. Review of `FirebaseAuthFilter`
- **Bypass Routes:** `/api/health` and `OPTIONS` preflights are the only routes explicitly bypassed in `shouldNotFilter`.
- **Missing Token Behavior:** Fails to block unauthenticated requests; passes them down chain to controllers where legacy routes execute without checking credentials.
- **Malformed / Forged / Expired Tokens:** Handled correctly; returns HTTP 401 Unauthorized via `FirebaseAuth.verifyIdToken(token)`.
- **Wrong Project Tokens:** `FirebaseAuth.verifyIdToken` cryptographically validates that the issuer (`iss`) and audience (`aud`) match the Firebase Project ID.
- **Initialization Failure:** If a Bearer token is provided when Firebase is uninitialized, the filter fails closed with HTTP 401. However, if no token is provided, it passes through down chain.
- **Verified UID Source:** When authenticated, `AuthenticatedUserRequestWrapper` correctly wraps `Principal` with `decodedToken.getUid()`.

### B. Review of Development & Production Modes
- **Default Mode:** `athly.dev.auth-mock-enabled` defaults to `false`. Fail-closed behavior on `/api/profile/me` is operational.
- **Preview / Simulation Mode:** When frontend Firebase credentials are placeholders, `isFirebaseConfigured` is `false`. The frontend remains navigable in preview mode and falls back cleanly without exposing real member records.

### C. Review of Frontend Behavior
- **Token Lifecycle:** `setAuthTokenGetter` ensures `currentUser.getIdToken()` is evaluated prior to requests.
- **Logout Cleanliness:** Calling `logout()` signs out from Firebase, sets `currentUser = null`, and resets `authTokenGetter = null`. Subsequent requests cannot reuse tokens.
- **Error Presentation:** When `/api/profile/me` returns 401, `UserProfileView.jsx` displays the error banner. It does not falsely display "Saved to Database".
- **Credential Separation:** Frontend config only accesses public web client keys (`VITE_FIREBASE_API_KEY`, etc.); service account private keys are strictly absent from client code.

---

## 4. Required Fixes Prior to Public Deployment

Before deploying to production (e.g. Render + Vercel + MongoDB Atlas), the following remediation plan must be implemented:

1. **Delete or Secure Legacy User Profile Routes:**  
   Remove `POST /api/profile`, `GET /api/profile/{userId}`, `PUT /api/profile/{userId}`, and `DELETE /api/profile/{userId}` from `UserProfileController.java`. Keep only `/api/profile/me`.
2. **Convert Feature Controllers to Current-Member Endpoints (`/me` Pattern):**
   - Refactor `ActivityTrackingController` to use `/api/activity/me`, `/api/activity/steps`, `/api/activity/water`, `/api/activity/workout` extracting `userId` from `request.getUserPrincipal().getName()`.
   - Refactor `FitnessPlannerController` to map to `GET /api/planner` and `POST /api/planner/generate` bound to the verified principal.
   - Refactor `MealAnalysisController` to map to `GET /api/meals/today`, `POST /api/meals/analyze`, `POST /api/meals/log` bound to the verified principal.
   - Refactor `ProgressAnalyticsController` to map to `GET /api/progress/daily`, `GET /api/progress/weekly`, `GET /api/progress/ai-feedback` bound to the verified principal.
   - Refactor `RewardController` to map to `GET /api/rewards/summary` and `POST /api/rewards/check-in` bound to the verified principal. Remove public `POST /api/rewards/xp`.
3. **Hard-Close `FirebaseAuthFilter` for All Non-Public Routes:**  
   Update `FirebaseAuthFilter.java` so that any request to `/api/**` that is not `/api/health` and not `OPTIONS` **must** provide a valid `Authorization: Bearer <token>` (or match `devAuthMockEnabled`), returning immediate HTTP 401 otherwise.
4. **Align Frontend Payloads:**  
   Ensure frontend DTOs align with backend expectations (e.g. removing `userId` from client requests and relying on server-side token identity).

---

## 5. Verdict

### **BLOCKED FOR PUBLIC DEPLOYMENT**
The application **cannot be deployed to a public production environment** in its current state due to unauthenticated IDOR endpoints in `UserProfileController` (`/api/profile/{userId}`) and `RewardController` (`/api/rewards/xp`), as well as the filter's failure to block tokenless requests to legacy controllers.

### **SAFE TO PROCEED TO PHASE 3 (BACKEND CONTROLLER HARDENING & REFACTORING)**
The Phase 2B Firebase verification pipeline functions as intended for `/api/profile/me`. It is safe to proceed to the next implementation phase, provided the immediate goal is to refactor the remaining feature controllers to adopt the secure `/me` pattern established by Phase 2A/2B and configure `FirebaseAuthFilter` as a strict authorization barrier.
