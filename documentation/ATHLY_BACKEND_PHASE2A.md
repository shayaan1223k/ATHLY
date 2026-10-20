# ATHLY V2 — Phase 2A: Secure Profile Integration Report

## Executive Summary
This report documents the implementation of the stable current-member profile endpoint (`/api/profile/me`), field normalization between the React frontend and Java Spring Boot backend, fail-closed security boundary design, and local database isolation on branch `rebuild/athly-v2`.

---

## 1. Files Changed

| Component | File Path | Nature of Modification |
| :--- | :--- | :--- |
| **Backend Config** | `backend/src/main/resources/application.properties` | Configured isolated `athly_dev` database for local dev; added `athly.dev.auth-mock-enabled=${DEV_AUTH_MOCK_ENABLED:false}`. |
| **Backend DTO** | `backend/src/main/java/com/athly/backend/dto/UserProfileDto.java` | Removed client-supplied `@NotBlank` constraint on `userId` to allow authoritative server-side assignment on `/me` endpoints. |
| **Backend Controller** | `backend/src/main/java/com/athly/backend/controller/UserProfileController.java` | Implemented `GET /api/profile/me` and `PUT /api/profile/me` with server-side identity resolution and fail-closed security. |
| **Backend Tests** | `backend/src/test/java/com/athly/backend/UserProfileControllerTest.java` | Added unit/slice tests verifying dev mock identity, 404 uninitialized profile handling, 400 validation failures, and server-side `userId` binding. |
| **Frontend API Client** | `frontend/src/api/apiClient.js` | Added bidirectional mapping helpers; updated `getProfile()` and `updateProfile()` to target `/api/profile/me` with transparent fallback and live metadata (`_isLive`, `_isFallback`, `_error`). |
| **Frontend Context** | `frontend/src/context/AthlyContext.jsx` | Updated `updateProfile` to verify persistence results, return success/fallback indicators, and avoid reporting fake success when backend is unreachable. |
| **Frontend View** | `frontend/src/components/profile/UserProfileView.jsx` | Added email input field, live vs fallback session indicator banners, and explicit error message display on failed saves. |

---

## 2. API Contract & Field Normalization

### 2.1 Endpoint Specification
- **`GET /api/profile/me`**:
  - Headers: Standard headers or `Authorization: Bearer <token>`
  - Path / Query Parameters: **None** (caller-selected user IDs are rejected).
  - Status Codes:
    - `200 OK`: Returns member profile JSON.
    - `401 Unauthorized`: Returned in production when unauthenticated.
    - `404 Not Found`: Returns `{"message": "Profile not yet initialized for member", "userId": "..."}`.
- **`PUT /api/profile/me`**:
  - Request Body: JSON matching [UserProfileDto](file:///C:/Users/niksa/OneDrive/Desktop/ATHLY/backend/src/main/java/com/athly/backend/dto/UserProfileDto.java) fields.
  - Server Behavior: Overwrites `profileDto.setUserId(currentUserId)` server-side, preventing caller from modifying another member's profile.
  - Status Codes:
    - `200 OK`: Returns updated persisted profile JSON.
    - `400 Bad Request`: Validation failure on input (e.g. malformed email, age < 10, weight < 20).
    - `401 Unauthorized`: Returned in production when unauthenticated.

### 2.2 Bidirectional Normalization Mappings
Implemented in [frontend/src/api/apiClient.js](file:///C:/Users/niksa/OneDrive/Desktop/ATHLY/frontend/src/api/apiClient.js):

| UI Label / Field (`UserProfileView`) | Backend DTO Token (`UserProfileDto`) | Validation Constraints |
| :--- | :--- | :--- |
| `name` | `name` | `@NotBlank`, `@Size(min=2, max=100)` |
| `email` | `email` | `@NotBlank`, `@Email` |
| `age` | `age` | `@NotNull`, `@Min(10)`, `@Max(120)` |
| `height` | `height` (cm) | `@NotNull`, `@DecimalMin("50.0")`, `@DecimalMax("300.0")` |
| `weight` | `weight` (kg) | `@NotNull`, `@DecimalMin("20.0")`, `@DecimalMax("500.0")` |
| `fitnessLevel`: `"Beginner"` | `activityLevel`: `"LIGHTLY_ACTIVE"` | `@NotBlank` |
| `fitnessLevel`: `"Intermediate"` | `activityLevel`: `"MODERATELY_ACTIVE"` | `@NotBlank` |
| `fitnessLevel`: `"Advanced"` / `"Elite"` | `activityLevel`: `"VERY_ACTIVE"` | `@NotBlank` |
| `fitnessGoal`: `"Fat Loss"` | `fitnessGoal`: `"FAT_LOSS"` | `@NotBlank` |
| `fitnessGoal`: `"Muscle Gain"` | `fitnessGoal`: `"MUSCLE_GAIN"` | `@NotBlank` |
| `fitnessGoal`: `"Endurance"` | `fitnessGoal`: `"ENDURANCE"` | `@NotBlank` |
| `fitnessGoal`: `"Maintenance"` | `fitnessGoal`: `"MAINTENANCE"` | `@NotBlank` |
| `foodPreference`: `"Non-Vegetarian"` | `dietaryPreference`: `"NON_VEGETARIAN"` | `@NotBlank` |
| `foodPreference`: `"Vegetarian"` | `dietaryPreference`: `"VEGETARIAN"` | `@NotBlank` |
| `foodPreference`: `"Vegan"` | `dietaryPreference`: `"VEGAN"` | `@NotBlank` |
| `foodPreference`: `"Keto"` | `dietaryPreference`: `"KETO"` | `@NotBlank` |
| `foodPreference`: `"Pescatarian"` | `dietaryPreference`: `"PESCATARIAN"` | `@NotBlank` |

---

## 3. Security Behavior: Development vs. Production

### 3.1 Production Environment (`DEV_AUTH_MOCK_ENABLED=false`)
- **Default Behavior**: **Fail-Closed**.
- `resolveCurrentUserId(request)` verifies `request.getUserPrincipal()`.
- If no authenticated principal exists:
  - Immediately rejects the request with HTTP 401 Unauthorized:
    ```json
    {
      "error": "Unauthorized",
      "message": "Authentication required: No verified user session found."
    }
    ```
- It is impossible for an unauthenticated user on the public internet to access or modify arbitrary records.

### 3.2 Local Development Environment (`DEV_AUTH_MOCK_ENABLED=true`)
- When explicitly enabled via server configuration, `resolveCurrentUserId(request)` returns `"dev-local-user"`.
- Binds all queries and mutations to the single isolated developer document.
- Client cannot supply or alter the `userId`.

---

## 4. Database Isolation

- Local development strictly connects to:
  ```properties
  spring.data.mongodb.uri=mongodb://localhost:27017/athly_dev
  ```
- No connections are made to MongoDB Atlas clusters or production databases during local development or testing.

---

## 5. Verification Commands and Actual Results

### 5.1 Frontend Verification
- **Command**: `cmd.exe /c "npm run build"` in `frontend/`
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
  dist/index.html                   1.52 kB │ gzip:  0.86 kB
  dist/assets/index-BXwWyk_H.css   30.16 kB │ gzip:  5.93 kB
  dist/assets/index-BqTwjtZq.js   278.34 kB │ gzip: 74.31 kB
  ✓ built in 5.12s
  ```

### 5.2 Backend Toolchain Verification & Honest Limitation
- **Commands Executed**:
  1. `cmd.exe /c "mvn -version"` -> `'mvn' is not recognized as an internal or external command` (Exit code: 1)
  2. `cmd.exe /c "where java"` -> `Could not find files for the given pattern(s)` (Exit code: 1)
- **Status**: The local Windows machine does not have JDK 21 or Apache Maven installed in `PATH`.
- **Honest Finding**: The Java test suite cannot be executed locally on this host. Unit tests in [UserProfileControllerTest.java](file:///C:/Users/niksa/OneDrive/Desktop/ATHLY/backend/src/test/java/com/athly/backend/UserProfileControllerTest.java) and [HealthControllerTest.java](file:///C:/Users/niksa/OneDrive/Desktop/ATHLY/backend/src/test/java/com/athly/backend/HealthControllerTest.java) follow strict Spring Boot 3 / Mockito / MockMvc standards and will execute in CI/CD or Render's cloud build container.

---

## 6. Remaining Dependencies & Next Steps

1. **Firebase Authentication (Phase 2B Dependency)**:
   - To replace the `athly.dev.auth-mock-enabled` local bypass in production, Firebase Authentication (or JWT bearer token verification) must be integrated into Spring Boot.
   - An authentication filter will parse the incoming `Authorization: Bearer <firebase_id_token>`, verify it with Firebase Admin SDK, and set the authenticated principal in `SecurityContextHolder`.
2. **Next Recommended Step**:
   - Review and align on Phase 2B (Firebase Authentication and secure token propagation from frontend `apiClient` to backend `/api/profile/me`).
