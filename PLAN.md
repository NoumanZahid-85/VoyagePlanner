# Travel Planner SPA

A collaborative-later, solo-for-now travel itinerary planner. Users create trips, build a day-by-day itinerary with real places on an interactive map, reorder plans by drag-and-drop, and track flight/hotel booking details — all in a polished, dark-mode desktop web app. Built as a team portfolio project over 2–4 weeks.

## Problem & Success Criteria

**Problem:** Planning a multi-day trip today means juggling a spreadsheet, five browser tabs of maps, and a notes app for confirmation numbers. There's no single, good-looking place to lay out "Day 3: breakfast here, museum at 10am, hotel confirmation ABC123" and see it on a map.

**Success criteria:**
- A logged-in user can create a trip, add multiple days, search for a real place (e.g. "Louvre Museum, Paris") and add it to a specific day with a time and note.
- All places added to a trip render as pins on an interactive map, grouped/colored by day.
- A user can drag an itinerary item to reorder it within a day, or drop it onto a different day, and the change persists after a page refresh.
- A user can add a flight or hotel booking record (airline/hotel name, dates, confirmation number, free-text notes) to a trip and see it listed alongside the itinerary.
- All of the above works after a real deploy (Vercel frontend + Render backend/Postgres), not just on localhost.
- Backend endpoints have passing pytest coverage for CRUD + auth; frontend has passing Vitest coverage for the itinerary and drag-and-drop logic.

**Explicit non-goals (v1):**
- No real collaboration/multi-user sharing of a trip (single owner per trip for now — data model should not actively block adding this later, but no invite/permission UI is built).
- No real booking integration (no live flight status, no payment, no actual reservation — just user-entered records).
- No mobile-responsive layout — desktop only.
- No "Sign in with Google" — email + password only.
- No AI-generated itinerary suggestions.

## Constraints (locked in during grilling)

| Constraint | Value |
|---|---|
| Scale/users | Portfolio/demo scale — dozens of users, not production traffic |
| Deployment target | Vercel (frontend) + Render (backend + managed Postgres) |
| Budget | Free tiers only (MapTiler free tier, Render free/starter tier, no paid map/geocoding APIs) |
| Timeline | 2–4 weeks, team effort |
| Team | Small team, mixed skill — team members know React and/or Python/SQL to varying degrees; plan is written so each phase is learnable standalone |
| Data/compliance | Stores user email + hashed password only; no PII beyond that; no payment data |

## Research Summary

- **Contract-first is the industry-standard workflow, not "UI then API then DB" as separate silos.** Teams define the data model and API contract (OpenAPI) first, build the frontend against a mock server, and build the real backend against the same contract in parallel — this is how integration bugs get caught at design time instead of during a "final integration weekend." This plan follows that pattern: contract → mocked UI → real backend → swap mocks for real API.
- **React remains the safe 2026 default** for a new SPA — biggest ecosystem, most hiring-relevant, works well with a mixed-skill team since most tutorials/AI tooling assume it.
- **PostgreSQL is the correct database for this domain.** Trips → Days → ItineraryItems → Bookings is a genuinely relational shape (foreign keys, ordering, joins), and booking-adjacent data benefits from ACID guarantees. MongoDB would fight you here, not help you.
- **MapLibre GL JS + OpenStreetMap/Nominatim** is the standard free/open stack for a project at this budget — no API key, no credit card, no usage-based billing surprise, unlike Google Maps or Mapbox.
- **The single biggest failure mode for solo/small-team travel apps is scope creep** — trying to ship booking integrations, AI, and offline mode all in v1 instead of nailing the core itinerary loop. This plan deliberately locks those out as non-goals.
- **JWT in localStorage is the most common beginner security mistake** in SPA auth — this plan uses a short-lived JWT access token (kept in memory) plus an HttpOnly refresh cookie instead.
- **dnd-kit is the current standard React drag-and-drop library** (successor to react-beautiful-dnd, which is no longer actively maintained) — accessible, works with keyboard, and is the library most current tutorials/docs assume.

## Tech Stack Decision

**Frontend framework:** React + Vite + TypeScript

**Styling/components:** Tailwind CSS + shadcn/ui

**Server state management:** TanStack Query (React Query)

**Drag and drop:** dnd-kit

**Maps:** MapLibre GL JS + MapTiler (tiles) + OpenStreetMap/Nominatim (place search/geocoding)

**Backend framework:** FastAPI (Python)

**Database:** PostgreSQL, via SQLAlchemy (ORM) + Alembic (migrations)

**Auth:** Email + password, bcrypt-hashed, JWT access token (short-lived, kept in memory on the frontend) + HttpOnly refresh cookie

**Deployment:** Vercel (frontend static build) + Render (backend web service + managed Postgres)

**Testing:** pytest (backend), Vitest + React Testing Library (frontend)

## Architecture Overview

```
                  ┌─────────────────────────┐
                  │   React SPA (Vite)      │
                  │  Tailwind + shadcn/ui   │
                  │  TanStack Query         │
                  │  dnd-kit                │
                  │  MapLibre GL JS         │
                  └───────────┬─────────────┘
                              │  REST/JSON over HTTPS
                              │  (JWT in Authorization header,
                              │   refresh token in HttpOnly cookie)
                  ┌───────────▼─────────────┐
                  │   FastAPI backend       │
                  │  (Render web service)   │
                  │  - auth routes          │
                  │  - trips/days/items     │
                  │  - bookings routes      │
                  └───────────┬─────────────┘
                              │  SQLAlchemy
                  ┌───────────▼─────────────┐
                  │  PostgreSQL (Render)    │
                  └──────────────────────────┘
```

## Phases

Each phase depends ONLY on earlier phases. Each is independently runnable/testable and can be lifted into its own ticket for a team member to pick up.

### Phase 1: Repo & Tooling Foundations
**Goal:** A shared monorepo skeleton exists, with linting/formatting configured, that any team member can clone and run with one command each for frontend and backend.

### Phase 2: Data Model & API Contract Design
**Goal:** A written data model and a stubbed-but-complete OpenAPI contract exist.

### Phase 3: Design System & App Shell
**Goal:** A running React app with Tailwind + shadcn/ui installed, dark mode working, and a navigable shell.

### Phase 4: Mock API Layer
**Goal:** Every route has a working mock implementation via MSW.

### Phase 5: Trip List & Trip Creation
**Goal:** A logged-in user can see a list of trips and create a new one.

### Phase 6: Day-by-Day Itinerary UI
**Goal:** Inside a Trip Detail page, a user can see the trip broken into days.

### Phase 7: Map Integration
**Goal:** The Trip Detail page shows an interactive MapLibre map.

### Phase 8: Real Place Search
**Goal:** The Add Item form includes a real, debounced place search via Nominatim.

### Phase 9: Drag-and-Drop Itinerary Reordering
**Goal:** A user can drag items to reorder within/across days.

### Phase 10: Booking/Reservation Tracker
**Goal:** A user can add flight/hotel booking records.

### Phase 11: Backend Foundations — Database & Models
**Goal:** Real PostgreSQL database with SQLAlchemy models and Alembic migrations.

### Phase 12: Backend CRUD Endpoints + Tests
**Goal:** Every route does real database work with passing pytest coverage.

### Phase 13: Authentication
**Goal:** Real signup/login/logout works end-to-end with JWT and refresh cookies.

### Phase 14: Frontend–Backend Integration
**Goal:** Frontend talks to the real backend instead of MSW mocks.

### Phase 15: Deployment & Polish
**Goal:** The app is deployed to Vercel + Render with a polished UI.
