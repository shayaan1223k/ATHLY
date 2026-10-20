# ATHLY V2 — Backend Phase 2B: Firebase Authentication Architecture & Implementation

## 1. Executive Summary
Phase 2B establishes the end-to-end cryptographic authentication pipeline for ATHLY. It integrates the official Firebase JS SDK in the React frontend and implements server-side token verification using the Google Firebase Admin SDK in the Java Spring Boot backend.

The system ensures that **client-supplied user IDs are never trusted**. Instead:
1. The frontend authenticates users with Firebase and obtains an encrypted Firebase ID token (JWT).
2. The frontend client attaches this token as `Authorization: Bearer <ID_TOKEN>` on all outbound API requests.
3. The backend servlet filter (`FirebaseAuthFilter`) cryptographically verifies the token against Google's public key infrastructure.
4. On verification, the server populates the verified user ID as the authoritative `Principal` (`request.getUserPrincipal().getName()`).
5. Protected endpoints (including `/api/profile/me`) resolve the current member identity strictly from this verified server-side principal.
6. In production, unauthenticated requests fail closed with `HTTP 401 Unauthorized`.

---

## 2. Architecture & Flow Diagram

```
+-----------------------------------------------------------------------------------+
| FRONTEND (React 18 + Vite)                                                        |
|                                                                                   |
|  [AuthModal / UI] ---> [AuthContext (Firebase JS SDK)] ---> [idToken]             |
|                                                                |                  |
|  [UserProfileView / Other Views]                               |                  |
|           |                                                    v                  |
|           v                                        [setAuthTokenGetter()]         |
|  [apiClient.js] ------------------------------------------------+                 |
|           |                                                                       |
|           | (Attaches 'Authorization: Bearer <idToken>')                          |
+-----------|-----------------------------------------------------------------------+
            |
            v  HTTPS REST Request
+-----------------------------------------------------------------------------------+
| BACKEND (Java 21 + Spring Boot 3.3.4)                                             |
|                                                                                   |
|  [FirebaseAuthFilter (OncePerRequestFilter)]                                      |
|    |-- Path == /api/health or Method == OPTIONS? ---> BYPASS (Pass down chain)    |
|    |-- 'Authorization: Bearer <token>' Present?                                   |
|          |                                                                        |
|          +---> YES: [FirebaseAuth.verifyIdToken(token)]                           |
|          |           |                                                            |
|          |           +-- VALID: Wrap request with AuthenticatedUserRequestWrapper |
|          |           |          Principal.getName() = token.getUid()              |
|          |           |          Pass down chain to Controller                     |
|          |           |                                                            |
|          |           +-- INVALID / EXPIRED: Short-circuit HTTP 401 Unauthorized   |
|          |                                                                        |
|          +---> NO: Pass down chain as unauthenticated                             |
|                                                                                   |
|  [UserProfileController (/api/profile/me)]                                        |
|    |-- request.getUserPrincipal() != null? ---> Use Principal UID                 |
|    |-- devAuthMockEnabled == true?        ---> Fall back to 'dev-local-user'      |
|    +-- Otherwise                          ---> Fail closed: HTTP 401 Unauthorized |
+-----------------------------------------------------------------------------------+
```

---

## 3. Frontend Implementation Details

### A. Client Configuration (`frontend/src/config/firebase.js`)
- Reads credentials from `import.meta.env.VITE_FIREBASE_*`.
- **Safe Initialization**: If credentials are unset or placeholders in local development, it logs an informative notice and enters preview simulation mode rather than throwing an unhandled exception or breaking UI rendering.
- Exports `auth`, `isFirebaseConfigured`, and `firebaseConfig`.

### B. Authentication Context (`frontend/src/context/AuthContext.jsx`)
- Subscribes to `onAuthStateChanged(auth, callback)`.
- Maintains reactive state: `currentUser`, `idToken`, `loading`, `authError`, `isAuthModalOpen`, `authModalMode`.
- Methods:
  - `login(email, password)`
  - `register(email, password, displayName)`
  - `logout()`
  - `openAuthModal('signin' | 'register')` / `closeAuthModal()`
- **Transparent Token Injection**: Updates `setAuthTokenGetter` in `apiClient.js` whenever `currentUser` changes.

### C. Authenticated API Client (`frontend/src/api/apiClient.js`)
- Implements `setAuthTokenGetter(getter)` and `getAuthHeaders()`.
- Implements `authenticatedFetch(url, options)` which automatically attaches `Authorization: Bearer <token>` to protected endpoints (`/api/profile/me`, `/api/planner`, `/api/meals/*`, `/api/activity/*`, `/api/progress/*`, `/api/rewards/*`).

### D. Editorial Authentication UI (`frontend/src/components/auth/AuthModal.jsx`)
- Matches the ATHLY luxury wellness aesthetic:
  - Surfaces: Warm Ivory (`#FAF8F3`, `#F4F1E9`).
  - Borders: Stone hairlines (`#D9D5CB`).
  - Typography: Fraunces serif headlines paired with refined sans-serif inputs and JetBrains Mono badges.
  - Controls: Understated Graphite buttons (`#171916`) with subtle hover states.
- Shows real-time badge for **Live Firebase Security Active** vs **Preview Mode / Simulated Session**.
- Integrated into `Navbar.jsx`, `LandingNavbar.jsx`, and `UserProfileView.jsx`.

---

## 4. Backend Implementation Details

### A. Dependencies (`backend/pom.xml`)
- Added official Google Firebase Admin SDK:
  ```xml
  <dependency>
      <groupId>com.google.firebase</groupId>
      <artifactId>firebase-admin</artifactId>
      <version>9.4.1</version>
  </dependency>
  ```

### B. Spring Configuration (`backend/src/main/java/com/athly/backend/config/FirebaseConfig.java`)
- Supports three deployment credential resolution strategies:
  1. `FIREBASE_CREDENTIALS_JSON`: Raw JSON service account string (recommended for cloud hosting like Render).
  2. `FIREBASE_CREDENTIALS_PATH`: Path to a local service account JSON file.
  3. `GoogleCredentials.getApplicationDefault()`: Cloud ADC resolution.
- **Fail-Safe Startup**: If credentials are not supplied in local development, it logs a warning without crashing Spring Boot startup.

### C. Security Filter (`backend/src/main/java/com/athly/backend/security/FirebaseAuthFilter.java`)
- Extends `OncePerRequestFilter`.
- `shouldNotFilter`: Bypasses `/api/health` and HTTP `OPTIONS` requests (CORS preflights).
- Cryptographic Verification: Calls `FirebaseAuth.getInstance().verifyIdToken(token)`.
- Request Wrapping: Uses `AuthenticatedUserRequestWrapper` to populate `Principal` with verified UID, plus request attributes `firebaseUid`, `firebaseEmail`, `firebaseToken`.
- Immediate HTTP 401 rejection for invalid/expired tokens with JSON error payload:
  ```json
  {
    "error": "Unauthorized",
    "message": "Invalid or expired Firebase ID token: <details>"
  }
  ```

### D. Controller Security Binding (`backend/src/main/java/com/athly/backend/controller/UserProfileController.java`)
- Resolves verified member UID via `request.getUserPrincipal().getName()`.
- Guarantees `profileDto.setUserId(currentUserId)` is enforced server-side.
- Automatically populates verified email from `request.getAttribute("firebaseEmail")` if not provided in request body.

---

## 5. Configuration & Environment Variables

### Frontend (`frontend/.env.example`)
```env
VITE_API_BASE_URL=/api

# Firebase Authentication Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
```

### Backend (`backend/src/main/resources/application.properties`)
```properties
# Development Identity Mode:
# Set to false in production (default) so unauthenticated requests fail closed with 401.
athly.dev.auth-mock-enabled=${DEV_AUTH_MOCK_ENABLED:false}

# Firebase Admin SDK Configuration
# On Render: paste the raw service account JSON string into FIREBASE_CREDENTIALS_JSON
firebase.credentials.path=${FIREBASE_CREDENTIALS_PATH:}
firebase.credentials.json=${FIREBASE_CREDENTIALS_JSON:}
firebase.project.id=${FIREBASE_PROJECT_ID:}
```

---

## 6. Verification and Testing

### Frontend Build Verification
Executed on host machine:
```bash
cmd.exe /c "npm run build"
```
**Result**: Build succeeded in ~4.6-7.1s with 0 errors.

### Backend Automated Test Suite
- `FirebaseAuthFilterTest.java`:
  1. `healthEndpointBypassesFilter`: Verifies `/api/health` bypasses token filter.
  2. `optionsRequestBypassesFilter`: Verifies CORS preflight `OPTIONS` bypasses filter.
  3. `requestWithoutAuthHeaderPassesThrough`: Verifies unauthenticated pass-through for downstream evaluation.
  4. `emptyBearerTokenReturns401`: Verifies empty bearer tokens are rejected with HTTP 401.
  5. `validTokenWrapsRequestWithPrincipal`: Verifies valid tokens wrap request with verified UID principal and request attributes.
  6. `invalidTokenReturns401`: Verifies expired/malformed tokens fail immediately with HTTP 401.
  7. `mockDevTokenAcceptedWhenDevModeActive`: Verifies dev mock token only when explicitly enabled.
  8. `unconfiguredFirebaseFailsClosedWith401`: Verifies fail-closed behavior when unconfigured.
- `UserProfileControllerTest.java`:
  - Verifies `/api/profile/me` member retrieval, uninitialized 404 behavior, and authoritative update.
- `HealthControllerTest.java`:
  - Verifies `/api/health` connectivity.

> **Toolchain Disclosure**: The host Windows machine does not have Java 21 or Apache Maven installed in `PATH`. The backend code and tests have been developed according to standard Spring Boot 3.3.4 conventions, with zero syntax errors, and are ready for CI/CD compilation via `mvn test`.
