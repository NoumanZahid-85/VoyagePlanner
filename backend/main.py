from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers import auth, trips, days, items, bookings

app = FastAPI(title="Travel Planner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(trips.router)
app.include_router(days.router)
app.include_router(items.router)
app.include_router(bookings.router)


@app.get("/health")
def health():
    return {"status": "ok"}
