# VoyagePlanner

> Your trips. On a map. Actually organized.

A modern travel itinerary planner that puts your day-by-day plans on an interactive map. Built with **React 19**, **FastAPI**, and **MapLibre GL**. No spreadsheets. Five browser tabs. Just one place.

---

## What It Does

**The problem:** Planning a multi-day trip today means juggling a spreadsheet, five map tabs, and a notes app for confirmation numbers. There is no single place to lay out "Day 3: breakfast here, museum at 10am, hotel confirmation ABC123" and actually see it on a map.

**VoyagePlanner fixes that.**

- Create a trip, add days, and build your itinerary with real places (searched via OpenStreetMap)
- Every place you add appears as a colored pin on an interactive map, grouped by day
- Drag-and-drop to reorder items or move them between days
- Track flights, hotels, and bookings alongside your itinerary
- Dark mode. Because vacations should look good.

---

## Quick Start

### Frontend Only (Mocks — No Backend Needed)

```bash
cd frontend
npm install
npm run dev
# open http://localhost:5173
```

The frontend runs with **MSW (Mock Service Worker)** by default. Login with:
- **Email:** `demo@travelplanner.app`
- **Password:** `demo1234`

### Full Stack (Frontend + Backend + PostgreSQL)

```bash
# 1. Start PostgreSQL
docker compose up -d

# 2. Backend
cd backend
python -m venv .venv
# Windows: .\.venv\Scripts\activate
# Mac/Linux: source .venv/bin/activate
pip install -r requirements.txt
python -m backend.seed        # seeds 5 demo trips
uvicorn backend.main:app --reload

# 3. Frontend (in another terminal)
cd frontend
npm install
# edit .env and set VITE_USE_MOCKS=false
npm run dev
```

API docs: `http://localhost:8000/docs`

---

## Demo Data

The seed script creates a demo user with **5 fully planned trips** spanning 25 days and 52 real-world places:

| Trip | Dates | Days | Places |
|------|-------|------|--------|
| Paris Getaway | Jul 10–14 | 4 | Louvre, Eiffel Tower, Versailles, Montmartre |
| Tokyo Adventure | Sep 15–22 | 7 | Shinjuku, Senso-ji, Shibuya, Mt Fuji, Akihabara |
| Bali Retreat | May 1–7 | 6 | Ubud Monkey Forest, Tanah Lot, Nusa Penida |
| NYC Explorer | Oct 1–5 | 4 | Statue of Liberty, Central Park, Brooklyn Bridge |
| London Explorer | Aug 5–9 | 4 | Tower of London, Buckingham Palace, Windsor |

---

## Features

### Trip Management
Create trips with start and end dates. The app auto-generates days. Each trip shows a gradient card with day and place counts.

### Interactive Map
- **Colored markers** — each day gets its own color, consistent across map and itinerary
- **Path lines** — dashed lines connect places within a day in scheduled order
- **Auto-fit bounds** — the map smoothly re-centers when you add or remove places
- **Cross-highlight** — click a marker to highlight it in the itinerary list, and vice versa
- **Pulsing marker** — the selected place gets an expanding ring animation
- **Legend** — day-color key overlays the map

### Drag-and-Drop Itinerary
Built with **@dnd-kit/core**: drag items to reorder within a day, or drop them onto a different day. Changes persist. Accessible with keyboard.

### Place Search
Type any real place ("Louvre Museum, Paris") and the Nominatim geocoder returns results with coordinates in ~400ms. Select one, add a time and note, and it is in your itinerary.

### Booking Tracker
Add flight, hotel, or custom bookings per trip. Track:
- Name and type
- Start and end times
- Confirmation number
- Free-text notes

### Auth
- Email + password signup and login
- **bcrypt-hashed** passwords
- **JWT** short-lived access token (kept in memory, not localStorage)
- **HttpOnly refresh cookie** for token rotation
- Protected routes with automatic redirect to `/login`

### Theme
Toggle between **dark** and **light** mode. Preference is persisted in localStorage. The VoyagePlanner logo stays white regardless of theme.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + TypeScript + Vite 6 |
| Styling | Tailwind CSS 4 + shadcn/ui (Radix primitives) |
| State | TanStack Query (React Query) |
| DnD | @dnd-kit/core + @dnd-kit/sortable |
| Maps | MapLibre GL JS + react-map-gl |
| Geocoding | OpenStreetMap Nominatim (free, no API key) |
| Mocks | MSW (Mock Service Worker) |
| Backend | FastAPI (Python) |
| ORM | SQLAlchemy + Alembic migrations |
| Database | PostgreSQL |
| Auth | JWT (in-memory access) + HttpOnly refresh cookie + bcrypt |
| Tests | pytest (backend), Vitest + React Testing Library (frontend) |

---

## Architecture

```
┌──────────────────────────────┐
│      React SPA (Vite)        │
│  Tailwind 4  ┃  shadcn/ui    │
│  TanStack Query  ┃  dnd-kit   │
│  MapLibre GL JS  ┃  MSW      │
└──────────────┬───────────────┘
               │ REST/JSON + HTTPS
               │ JWT in Authorization header
               │ Refresh token in HttpOnly cookie
┌──────────────▼───────────────┐
│      FastAPI Backend         │
│  auth  ┃  trips ┃  bookings │
└──────────────┬───────────────┘
               │ SQLAlchemy + Alembic
┌──────────────▼───────────────┐
│        PostgreSQL            │
└──────────────────────────────┘
```

---

## Data Model

```
User
└── Trip
    ├── Day
    │   └── ItineraryItem (place_name, lat, lng, time, note, order_index)
    └── Booking (type, name, starts_at, ends_at, confirmation #, notes)
```

- **Trips** belong to a user. Each trip has many days and many bookings.
- **Days** are auto-ordered by date. Each day has many itinerary items ordered by `order_index`.
- **ItineraryItems** store a real place name, coordinates, optional scheduled time, and a note.
- **Bookings** are linked directly to a trip (not a day) and track reservations independently.

---

## API

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/auth/signup` | No | Create account |
| `POST` | `/auth/login` | No | Login |
| `POST` | `/auth/refresh` | No | Rotate access token |
| `POST` | `/auth/logout` | No | Clear refresh cookie |
| `GET` | `/trips` | Yes | List user's trips |
| `POST` | `/trips` | Yes | Create trip |
| `GET` | `/trips/{id}` | Yes | Get trip with days + items |
| `POST` | `/trips/{id}/days` | Yes | Add day |
| `POST` | `/days/{id}/items` | Yes | Add item to day |
| `PATCH` | `/items/{id}` | Yes | Update / reorder / move |
| `DELETE` | `/items/{id}` | Yes | Remove item |
| `GET` | `/trips/{id}/bookings` | Yes | List bookings |
| `POST` | `/trips/{id}/bookings` | Yes | Add booking |
| `PATCH` | `/bookings/{id}` | Yes | Update booking |
| `DELETE` | `/bookings/{id}` | Yes | Remove booking |

Full contract: `contract/openapi.json`

---

## Project Structure

```
TravelPlannerApp/
├── backend/
│   ├── alembic/
│   │   └── versions/          # Alembic migrations
│   ├── routers/
│   │   ├── auth.py            # Signup, login, refresh, logout
│   │   ├── trips.py           # Trip CRUD
│   │   ├── days.py            # Day creation
│   │   ├── items.py           # Itinerary item CRUD + reorder
│   │   └── bookings.py        # Booking CRUD
│   ├── tests/                 # pytest suite
│   ├── auth.py                # JWT + bcrypt logic
│   ├── database.py            # SQLAlchemy engine + session
│   ├── models.py              # ORM models
│   ├── schemas.py             # Pydantic request/response schemas
│   ├── main.py                # FastAPI app factory
│   └── seed.py                # 5 demo trips, 52 places, 11 bookings
├── frontend/
│   ├── public/
│   │   └── mockServiceWorker.js
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.ts      # Axios client + silent token refresh
│   │   │   └── query-client.ts # TanStack Query config
│   │   ├── components/
│   │   │   ├── AppLayout.tsx          # Sidebar + navigation
│   │   │   ├── TripMap.tsx            # Interactive map with path lines
│   │   │   ├── ItineraryBoard.tsx     # Drag-and-drop board
│   │   │   ├── DayColumn.tsx          # Single day column
│   │   │   ├── SortableItem.tsx       # Draggable itinerary item
│   │   │   ├── AddItemDialog.tsx      # Place search + add item
│   │   │   ├── AddDayDialog.tsx       # Add a new day
│   │   │   ├── NewTripDialog.tsx      # Create trip
│   │   │   ├── BookingDialog.tsx      # Add/edit booking
│   │   │   ├── BookingCard.tsx        # Booking display card
│   │   │   ├── TripCard.tsx           # Trip list card
│   │   │   ├── PlaceSearchInput.tsx   # Nominatim search
│   │   │   ├── ThemeToggle.tsx        # Dark/light switch
│   │   │   └── ui/                    # shadcn/ui primitives
│   │   ├── hooks/
│   │   │   ├── use-auth.tsx           # Auth context
│   │   │   ├── use-theme.tsx          # Dark/light theme
│   │   │   └── usePlaceSearch.ts      # Debounced geocoding
│   │   ├── mocks/
│   │   │   ├── browser.ts             # MSW worker setup
│   │   │   ├── fixtures.ts            # Demo data (5 trips)
│   │   │   ├── handlers.ts            # MSW route handlers
│   │   │   └── error-handlers.ts      # Error simulation
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx          # Auth page
│   │   │   ├── TripListPage.tsx       # Dashboard
│   │   │   └── TripDetailPage.tsx     # Map + itinerary + bookings
│   │   ├── types/
│   │   │   └── index.ts               # TypeScript interfaces
│   │   ├── index.css                  # Tailwind entry + custom animations
│   │   ├── main.tsx                   # App bootstrap (MSW conditional)
│   │   ├── App.tsx                    # Router + auth providers
│   │   └── test-setup.ts             # Vitest setup
│   ├── .env                           # VITE_USE_MOCKS=true
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── tsconfig.app.json
├── contract/
│   └── openapi.json                   # OpenAPI 3.1 spec
├── docker-compose.yml                 # PostgreSQL container
└── README.md
```

---

## Environment Variables

### Frontend (`frontend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_MAPTILER_KEY` | *(empty)* | MapTiler API key for styled tiles. Falls back to OpenFreeMap if empty. |
| `VITE_API_URL` | *(empty)* | Backend URL. In dev, Vite proxies `/api` to `localhost:8000`. |
| `VITE_USE_MOCKS` | `true` | If `true`, frontend uses MSW instead of real backend. |

### Backend (`backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | `postgresql://user:pass@host:5432/dbname` |
| `SECRET_KEY` | Yes | JWT secret. Generate with `openssl rand -hex 32` |

---

## Running Tests

```bash
# Backend
cd backend
pytest -v                    # run all tests
pytest tests/test_trips.py  # run specific module

# Frontend
cd frontend
npm test                     # run Vitest suite
```

---

## Deployment

### Frontend (Vercel)

1. Push repo to GitHub
2. Import into Vercel
3. Set environment variables (`VITE_API_URL`, `VITE_MAPTILER_KEY`)
4. Deploy

### Backend (Render)

1. Create a **Web Service** pointing to your repo
2. Set start command: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
3. Create a **PostgreSQL** database
4. Add env vars: `DATABASE_URL` and `SECRET_KEY`
5. Deploy

---

## Development Conventions

| Guideline | Implementation |
|-----------|----------------|
| Contract-first | OpenAPI spec in `contract/openapi.json`. Frontend built against MSW mocks; backend built against the same contract. |
| Auth security | JWT access token in memory (never localStorage). HttpOnly refresh cookie. Silent refresh on 401. |
| No scope creep | v1 has no multi-user sharing, no booking API integrations, no AI suggestions, no offline mode. Just the core itinerary loop. |
| Desktop-first | Layout is optimized for desktop. Responsive scaling is a v2 concern. |
| Free tiers only | No paid map APIs. Map tiles from OpenFreeMap (or MapTiler free tier). Geocoding from Nominatim. |

---

## License

MIT
