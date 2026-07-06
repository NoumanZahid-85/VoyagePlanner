# VoyagePlanner

**Plan trips on an interactive map. Ditch the spreadsheets.**

A travel itinerary app that puts your day-by-day plans on a live MapLibre map with colored paths, drag-and-drop reordering, and booking tracking.

---

## Quick Start

```bash
cd frontend && npm install && npm run dev
```

Login: `demo@travelplanner.app` / `demo1234`

The app runs standalone with mock data — no backend needed.

---

## What It Does

- **Interactive map** — markers grouped by day, dashed paths connecting places in order, auto-centers when you add places
- **Place search** — type any real place, Nominatim geocodes it with lat/lng
- **Drag-and-drop** — reorder items within a day or move them across days (dnd-kit)
- **Booking tracker** — flights, hotels, anything with dates and confirmation numbers
- **Dark/light theme** — toggle persisted in localStorage
- **Auth** — email/password, JWT access token in memory, HttpOnly refresh cookie
- **5 demo trips** — Paris, Tokyo, Bali, NYC, London — 52 places, 11 bookings

---

## Tech

| Frontend | Backend |
|----------|---------|
| React 19 + TypeScript + Vite 6 | FastAPI (Python) |
| Tailwind CSS 4 + shadcn/ui | SQLAlchemy + Alembic |
| TanStack Query | PostgreSQL |
| dnd-kit | JWT + bcrypt |
| MapLibre GL JS + react-map-gl | pytest |

Any free map tile provider works (OpenFreeMap default, no API key).

---

## Backend Setup

```bash
docker compose up -d                    # PostgreSQL
cd backend && pip install -r requirements.txt
python -m backend.seed                  # seed demo data
uvicorn backend.main:app --reload       # http://localhost:8000/docs
```

---

## One-Line Data Model

**User** → Trip → **Day** → ItineraryItem *(place, coords, time, note)*  
**Trip** → Booking *(flight/hotel/other, dates, confirmation)*

---

## Tests

```bash
cd backend && pytest -v
cd frontend && npm test
```

---

## License

MIT
