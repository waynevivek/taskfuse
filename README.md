# TaskFuse

> **Know what every finished agent task actually costs.**  
> Per-task cost observability and dollar budget caps for teams running production AI agent workflows.

TaskFuse is a modern, high-craft web application and Launch HQ built for AI operations leads, technical founders, and automation agencies spending $5K–$50K a month on AI agents. It surfaces real cost per completed task (incorporating runaway retry loops, model over-provisioning, and context re-send overhead) and pairs it with a private **Launch HQ** for early-access founder validation.

---

## Key Features

### Public Landing Page
- **Light Bento Grid Architecture:** Inspired by modern FinOps interfaces (Zentra & Autopilot craft standards) with high-density tabular-numeral precision.
- **Hero Simulation Terminal:** Interactive morphing SVG cost graph comparing a `$4.00 Cap` against an `Uncapped Loop` (Call #41 breaker stop).
- **Live Audit Console:** Volumetric textured bar chart showing initiated tasks, clean passes, retry loops, budget cap stops, and delivered tasks.
- **Interactive Spend Calculator:** Dynamic calculation of unmonitored loop waste and recoverable spend with per-task budget ceilings.
- **Zero-SDK Code Passthrough:** Syntax-highlighted integration examples for Python, TypeScript, and cURL illustrating a single base-URL proxy swap.
- **Firebase Lead Capture:** Public waitlist submissions with honeypot protection, tier selection, and instant confirmation feedback.

### Launch HQ (`/admin`)
- **Gated Authentication:** Google Sign-In with permanent ownership registration (`/settings/app`) for the first authorized account.
- **Live Scoreboard:** Real-time Firestore `onSnapshot` streaming leads with Total, Today, Yesterday, and Past 7 Days counters.
- **Validation Launch Kit:** Pre-written distribution posts for Reddit (`r/AI_Agents`, `r/AIToolsPerformance`), X/Twitter, and 1-on-1 DMs with dynamic Live URL replacement.
- **Welcome Email Sequence:** 3 copyable follow-up emails (Instant confirmation, Day 2 problem insight, Day 5 latency & circuit breaker objection handling).
- **Progression Checklist:** Persisted Firestore checklist tracking milestones toward 100 visitors.
- **Validation Verdict:** Real-time conversion calculation (`leads ÷ visitors`) with automated viability thresholds (10%+ real interest, 3–9% pitch pivot, <3% move on).

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 8
- **Styling:** Tailwind CSS v4, custom Geist / JetBrains Mono typography
- **Database & Auth:** Firebase Firestore & Firebase Authentication (Google OAuth)
- **Icons & Animation:** Lucide React, Motion, custom SVG circuit breaker emblems

---

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy the example environment configuration:
```bash
cp .env.example .env
```
Ensure `firebase-applet-config.json` contains your Firebase project credentials.

### 3. Run Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```

---

## Security & Architecture

- **Zero-Trust Firestore Rules:**
  - Anonymous visitors can **only create** leads adhering strictly to schema rules (`/leads/{leadId}`).
  - Read access to `leads` is restricted to the authenticated owner registered in `/settings/app`.
  - Non-owners receive Firestore `PERMISSION_DENIED`.
- **Honeypot Bot Defense:** Client-side invisible field silently traps automated bot submissions.
