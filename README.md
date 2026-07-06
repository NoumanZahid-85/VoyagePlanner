# VoyagePlanner

A modern, single-page travel itinerary planner built with React and FastAPI. Create trips, build day-by-day itineraries with real places on an interactive map, reorder plans by drag-and-drop, and track flight/hotel booking details.

## Tech Stack

### Frontend
- **React 19** + **TypeScript** + **Vite 6**
- **Tailwind CSS 4** + **shadcn/ui** (Radix primitives) — dark/light theme
- **TanStack Query (React Query)** — server state management
- **dnd-kit** — accessible drag-and-drop reordering
- **MapLibre GL JS** + **react-map-gl** — interactive maps
- **OpenStreetMap / Nominatim** — free place search/geocoding
- **MSW (Mock Service Worker)** — API mocking for frontend development

### Backend
- **FastAPI** (Python) — REST API framework
- **SQLAlchemy** — ORM with Alembic migrations
- **PostgreSQL** — relational database
- **JWT auth** — short-lived access token (in-memory) + HttpOnly refresh cookie
- **bcrypt** — password hashing
- **pytest** — backend test coverage

### Deployment
- **Frontend:** Vercel (static build)
- **Backend:** Render (web service + managed Postgres)

## Features

### Trip Management
- Create, view, and manage multiple trips
- Each trip has a date range and auto-organized day-by-day itinerary
- Visual gradient cards with trip summaries

### Interactive Map
- All itinerary places render as colored markers grouped by day
- Dashed path lines connect places within each day in visit order
- Auto-fit bounds — map smoothly re-centers when places are added/removed
- Click any marker to highlight it across both map and itinerary list
- Pulsing animation on the selected place
- Day-color legend overlay
- 8 distinct day colors with matching itinerary columns

### Place Search
- Real place search via OpenStreetMap Nominatim API
- Debounced (400ms) autocomplete as you type
- Select any real place — coordinates auto-populate

### Drag-and-Drop Itinerary
- Drag items to reorder within a day
- Drop items onto a different day to move them
- Works with keyboard accessibility

### Booking Tracker
- Add flight, hotel, or custom bookings per trip
- Track confirmation numbers, dates, and notes
- Edit or delete existing bookings

### Authentication
- Email + password signup and login
- JWT access token (kept in memory, not localStorage)
- HttpOnly refresh cookie
- Protected routes with automatic redirect

## Demo

**Demo credentials:** `demo@travelplanner.app` / `demo1234`

The app ships with 5 pre-seeded trips:
1. **Paris Getaway** (4 days) — Louvre, Eiffel Tower, Versailles
2. **Tokyo Adventure** (7 days) — Shinjuku, Senso-ji, Mt Fuji
3. **Bali Retreat** (6 days) — Ubud, rice terraces, Uluwatu
4. **NYC Explorer** (4 days) — Statue of Liberty, Central Park
5. **London Explorer** (4 days) — Tower of London, British Museum

## Setup & Run

### Prerequisites
- Node.js 20+
- Python 3.11+
- PostgreSQL (or use MSW mocks for frontend-only development)

### Frontend (standalone with mocks)

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` with MSW mocks enabled by default — no backend needed.

### Backend

```bash
cd backend
python -m venv .venv
# Windows: .\.venv\Scripts\activate
# Mac/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn backend.main:app --reload
```

API docs: `http://localhost:8000/docs`

### Seed Database

```bash
python -m backend.seed
```

### Run Tests

```bash
# Backend
cd backend && pytest -v

# Frontend
cd frontend && npm test
```

## Project Structure

```
TravelPlannerApp/
├── backend/
│   ├── alembic/          # Database migrations
│   ├── routers/          # API route handlers
│   │   ├── auth.py
│   │   ├── trips.py
│   │   ├── days.py
│   │   ├── items.py
│   │   └── bookings.py
│   ├── tests/            # pytest test suite
│   ├── auth.py           # JWT + bcrypt auth logic
│   ├── database.py       # SQLAlchemy engine/session
│   ├── models.py         # ORM models
│   ├── schemas.py        # Pydantic schemas
│   ├── seed.py           # Seed data (5 demo trips)
│   └── main.py           # FastAPI app entry point
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/          # API client + query client
│   │   ├── components/   # React components
│   │   │   └── ui/       # shadcn/ui primitives
│   │   ├── hooks/        # Custom hooks (auth, theme, place search)
│   │   ├── mocks/        # MSW mock handlers + fixtures
│   │   ├── pages/        # Route pages
│   │   ├── types/        # TypeScript interfaces
│   │   └── main.tsx      # App entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── contract/
│   └── openapi.json      # API contract
└── docker-compose.yml    # PostgreSQL for local dev
```

## Architecture

```
                  ┌──────────────────────────┐
                  │   React SPA (Vite)       │
                  │  Tailwind + shadcn/ui    │
                  │  TanStack Query          │
                  │  dnd-kit                 │
                  │  MapLibre GL JS          │
                  └───────────┬──────────────┘
                              │  REST/JSON over HTTPS
                              │  (JWT in Authorization header,
                              │   refresh token in HttpOnly cookie)
                  ┌───────────▼──────────────┐
                  │   FastAPI backend        │
                  │  - auth routes           │
                  │  - trips/days/items      │
                  │  - bookings routes       │
                  └───────────┬──────────────┘
                              │  SQLAlchemy
                  ┌───────────▼──────────────┐
                  │  PostgreSQL              │
                  └──────────────────────────┘
```

## Data Model

- **User** → has many **Trips**
- **Trip** → has many **Days** and **Bookings**
- **Day** → has many **ItineraryItems** (ordered by `order_index`)
- **ItineraryItem** → place name, coordinates, scheduled time, note
- **Booking** → type (flight/hotel/other), name, start/end times, confirmation #

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/signup` | Create account |
| POST | `/auth/login` | Login |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/logout` | Logout |
| GET | `/trips` | List user's trips |
| POST | `/trips` | Create trip |
| GET | `/trips/:id` | Get trip with days + items |
| POST | `/trips/:id/days` | Add day to trip |
| POST | `/days/:id/items` | Add item to day |
| PATCH | `/items/:id` | Update item (reorder/move) |
| DELETE | `/items/:id` | Remove item |
| GET | `/trips/:id/bookings` | List trip bookings |
| POST | `/trips/:id/bookings` | Add booking |
| PATCH | `/bookings/:id` | Update booking |
| DELETE | `/bookings/:id` | Remove booking |

## Environment Variables

### Frontend (`.env`)

```
VITE_MAPTILER_KEY=         # Optional MapTiler API key for map tiles
VITE_API_URL=              # Backend API URL (optional, proxied in dev)
VITE_USE_MOCKS=true        # Use MSW mocks instead of real backend
```

### Backend (`.env`)

```
DATABASE_URL=postgresql://user:pass@localhost:5432/travelplanner
SECRET_KEY=your-secret-key
```

## License

MIT
