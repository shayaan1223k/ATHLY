# ATHLY — AI Development Instructions & Project Rules

## 1. Project Overview & Architecture
**ATHLY** is an AI-powered personal health and fitness platform with the theme:
*"Your Goal. Our Plan. Your Progress. Your Reward."*

### System Architecture Flow
1. **Core CRUD / Business Logic Flow**:
   `React Frontend` ➔ `Java Spring Boot REST API` ➔ `MongoDB`
2. **AI-Powered Feature Flow** (Meal Vision Analysis & Dynamic Progress Feedback):
   `React Frontend` ➔ `Java Spring Boot` ➔ `Python FastAPI AI Service` ➔ `Gemini API` ➔ `Java Spring Boot` ➔ `MongoDB` ➔ `React Frontend`

> **Note**: Java Spring Boot is the primary application backend. The Python FastAPI service is completely isolated and strictly used for AI-specific processing (Gemini vision & LLM prompt execution).

---

## 2. Technology Stack

- **Frontend**: React.js, Vite, Tailwind CSS
- **Authentication**: Firebase Authentication
- **Primary Backend**: Java 17, Spring Boot 3, Maven, REST APIs
- **Database**: MongoDB (via Spring Data MongoDB)
- **AI Service**: Python 3, FastAPI, Uvicorn, Google Gemini API
- **Deployment Targets**: Vercel (Frontend), Render (Backend & AI Service)

---

## 3. Directory Structure
```
ATHLY/
├── frontend/          # React + Vite + Tailwind CSS client application
├── backend/           # Java Spring Boot REST API backend
├── ai-service/        # Python FastAPI AI microservice for Gemini integration
└── documentation/     # Technical specifications, API docs, and architecture plans
```

---

## 4. Important Development Rules

1. **Stack Stability**: Do NOT randomly change the technology stack or swap core frameworks.
2. **Lean Dependencies**: Do NOT introduce unnecessary third-party libraries or bloated dependencies.
3. **Strict Separation of Concerns**: Keep frontend, backend, database, and AI service cleanly separated.
4. **Clean Architecture**: Follow standard layered architecture (Controller ➔ Service ➔ Repository / DAO ➔ Model).
5. **Clarity & Documentation**: Explain important code concepts clearly; keep code beginner-friendly and readable.
6. **Pre-Change Communication**: Before making major architectural changes, announce what is going to change.
7. **Clarification Over Assumption**: If a requirement or design decision is ambiguous, ask the user instead of making architectural guesses.
8. **No Fake Backend Functionality**: Do not present fake or hardcoded frontend mocks as completed backend integration.
9. **Controlled Mock Data**: Use mock or sample data only when explicitly developing a feature before backend endpoints are connected.
10. **Target Scope**: Keep the project clean, maintainable, and suitable for a college-level full-stack project that can be completely finished.

---

## 5. Security & Secret Management Rules

1. **Zero Secret Leaks**: NEVER hardcode API keys, Firebase service keys, passwords, connection strings, or JWT secrets in code or repository files.
2. **Environment Variables**: Always use environment variables (`.env`, `application.properties` with `${ENV_VAR}` placeholders, etc.) for sensitive credentials.
3. **Git Hygiene**: Ensure `.gitignore` ignores all `.env`, `.env.local`, `credentials.json`, `node_modules`, `target/`, and `__pycache__` files.
4. **Input Validation & Sanitization**:
   - Backend must validate all incoming DTO payloads using standard validation annotations (`@Valid`, `@NotNull`, `@Min`, `@Max`).
   - AI service must sanitize and structure prompts sent to Gemini to prevent injection.

---

## 6. Step-by-Step Development Workflow

For each development phase / feature:
1. **Explain the Plan**: Briefly describe what will be built before creating/editing files.
2. **Implement Backend First / API Contract**: Define endpoints, MongoDB documents, and validation.
3. **Implement AI Service (if applicable)**: Define FastAPI endpoints and Gemini prompt templates.
4. **Implement Frontend**: Connect UI components to the API client.
5. **Verify & Explain**: After each feature, explain:
   - What was created/modified.
   - How to run and test the feature locally.
   - The exact next recommended step.
6. **Wait for User Confirmation**: Do not jump into the next phase automatically without user approval.
