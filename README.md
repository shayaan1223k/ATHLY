# ATHLY — AI-Powered Personal Health & Fitness Platform

> *"Your Goal. Our Plan. Your Progress. Your Reward."*

ATHLY is an AI-powered personal health and fitness platform designed to provide intelligent, individualized fitness planning, computer vision meal analysis, comprehensive biometric activity tracking, and gamified progress rewards.

---

## 💡 What the Project Does

ATHLY guides users through their complete wellness journey with six core capabilities:

1. **User Profile & Biometrics**: Collects personal metrics (age, height, weight, gender), calculates BMI/BMR, and configures fitness goals (e.g., Fat Loss, Muscle Gain) and dietary preferences (e.g., Vegan, Keto, Non-Vegetarian).
2. **Personalized Fitness Planner**: Automatically generates periodized 7-day workout splits, daily step targets, calorie budgets, macronutrient ratios, and dietary recommendations.
3. **AI Meal Analysis**: Allows users to upload or capture meal photos, using AI vision to identify food items, calculate calories and macros, and compare them in real time with the daily target.
4. **Activity & Biometric Tracking**: Tracks daily steps, distance, active calories burned, workout sessions, and water intake.
5. **Progress & Analytics with AI Feedback**: Aggregates daily health scores, 7-day volume trends, body weight changes, and delivers dynamic AI-generated coaching feedback with 24-hour action steps.
6. **Gamification & Rewards Engine**: Motivates continuous adherence with XP points, tier levels, consecutive day streaks, daily/weekly quests, and unlockable achievement badges.

---

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, Tailwind CSS
- **Authentication**: Firebase Authentication
- **Primary Backend**: Java 17, Spring Boot 3, Maven, Spring Data
- **Database**: MongoDB
- **AI Microservice**: Python 3, FastAPI, Google Gemini API
- **Deployment (Target)**:
  - Frontend: Vercel
  - Backend & AI Service: Render

---

## 🏛️ System Architecture

- **General CRUD & Business Logic**:
  `React Frontend` ➔ `Java Spring Boot REST API` ➔ `MongoDB`
- **AI Feature Operations (Meal Vision & AI Feedback)**:
  `React Frontend` ➔ `Java Spring Boot Backend` ➔ `Python FastAPI AI Service` ➔ `Google Gemini API` ➔ `Java Spring Boot Backend` ➔ `MongoDB` ➔ `React Frontend`

The Java Spring Boot backend serves as the main application orchestrator, while the Python FastAPI service is dedicated strictly to AI inference and prompt execution.

---

## 📁 Directory Structure & Purpose of Major Folders

```
ATHLY/
├── frontend/          # React.js client application with Vite and Tailwind CSS
├── backend/           # Main Java Spring Boot REST API application
├── ai-service/        # Isolated Python FastAPI microservice for Gemini AI features
└── documentation/     # Project specifications, architecture documents, and API guides
```

- **`frontend/`**: Contains the React single-page application, UI components, state management context, styling tokens, and API client.
- **`backend/`**: Contains the main Spring Boot server, REST controllers, service layers, DTO validations, security filters, and MongoDB repositories.
- **`ai-service/`**: Contains the Python FastAPI service, Gemini vision and prompt handlers, and image processing utilities.
- **`documentation/`**: Contains detailed architectural specifications (`ATHLY_PROJECT_SPEC.md`), design documents, and phase roadmaps.

---

## 📋 Project Documentation & Guidelines

- **Project Specification**: Refer to [`documentation/ATHLY_PROJECT_SPEC.md`](./documentation/ATHLY_PROJECT_SPEC.md) for full feature specifications, data flows, and phase breakdown.
- **AI Development Guidelines**: Refer to [`CLAUDE.md`](./CLAUDE.md) for architectural rules, security policies, and development workflows.
