# CITYLENS — Chennai Mobility Intelligence Platform

Frontend application for **CITYLENS (Chennai Mobility Intelligence)**, converting all **15 Figma UI design screens** into a responsive **React + TypeScript + Vite + Tailwind CSS** web application ready for backend & AI integration.

> **Phase 1 Status:** Complete Frontend UI & Local Demonstration State.  
> Authentication, PostgreSQL persistence, live Google Maps routing, Gemini NLP extraction, spatial deduplication, and Supabase Realtime are scheduled for **Phases 2–6**.

---

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 3 (Dark Navy / Civic Slate Design System)
- **Routing:** React Router v6
- **Icons:** Lucide React

---

## Quick Start

```bash
npm install
npm run dev
```

Production build check:

```bash
npm run build
```

---

## All 15 Implemented Screens & Routes

| Screen | Name | Portal | Route |
| :--- | :--- | :--- | :--- |
| **01** | Welcome / Landing Page | Public | `/` |
| **02** | Login Type Selection | Public | `/select-role` |
| **03** | Citizen Login Page | Citizen | `/citizen/login` |
| **04** | Citizen Signup Page | Citizen | `/citizen/signup` |
| **05** | Citizen Main Dashboard / Route Planner | Citizen | `/dashboard` |
| **06** | Incident Details Popup / Expanded View | Citizen | Modal on `/` & `/dashboard` + `/citizen/incidents/:id` |
| **07** | Citizen Report Submission | Citizen | `/citizen/report` |
| **08** | Report Submission Success | Citizen | `/citizen/report/success` |
| **09** | Report Submission Failure & Offline Draft | Citizen | `/citizen/report/error` |
| **10** | Admin Login Page | Admin | `/admin/login` |
| **11** | Admin Signup Page | Admin | `/admin/signup` |
| **12** | Admin Main Dashboard / Report Management | Admin | `/admin/dashboard` |
| **13** | Admin Report Details & Verification Console | Admin | `/admin/reports/:id` |
| **14** | AI Incident Monitoring Stream | Admin | `/admin/ai-monitor` |
| **15** | Admin Resolved Reports Archive | Admin | `/admin/resolved` |

*Tip: Use the floating **"All 15 Screens"** pill in the bottom-right corner at any time to jump directly to any screen or reset the local demonstration state.*
