# Hiring Funnel — From Chaos to Clarity

**QSTP Hackathon — Challenge 3: Hiring Funnel Black Box**

Once interns are nominated to a host startup, there's no structured tracking of interviews, feedback, offers, or onboarding — QSTP spends ~40% of its time chasing signatures and follow-ups. This app tracks the full pipeline (**Nomination → Startup Review → Interview → Feedback → Offer → Accepted → Documents → Internship Started**) in one shared view, with three role-based logins: **QSTP Admin**, **Startup Lead**, and **Intern**.

## Features

- Pipeline dashboard with a live pie-chart snapshot by stage
- Per-candidate funnel timeline with interview feedback capture
- Document checklist for onboarding, with approvals gated to QSTP People Ops
- Email inbox — QSTP can message any candidate, who sees and replies from their own Intern view
- AI-assisted inbox scan that auto-detects offer acceptances and triggers document requests
- Analytics (conversion rate, acceptance rate, avg. time-to-hire)
- In-app Guide page walking through the pipeline and each role
- Role switcher to demo all three perspectives, including "view as" any candidate

## Tech Stack

Vanilla JavaScript, HTML, and CSS, bundled with [Vite](https://vitejs.dev/). No backend — all data is in-memory mock data, resettable via "Reset Demo."

## Project Structure

```
hiring-funnel/
├── index.html          # App shell — sidebar nav, role switcher, page container
├── main.js             # Data model, routing, page renders, event handlers
├── style.css            # Design system + component styles
├── public/
│   └── vite.svg
├── package.json
└── package-lock.json
```

## Getting Started

Requires Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL Vite prints (typically `http://localhost:5173`).

```bash
npm run build      # production build → dist/
npm run preview    # preview the production build
```
