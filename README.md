# Travel Planner SPA

## Setup & Run

### Backend (FastAPI)
1. `cd backend`
2. `python -m venv .venv`
3. `.\.venv\Scripts\activate` (Windows) or `source .venv/bin/activate` (Mac/Linux)
4. `pip install -r requirements.txt`
5. `uvicorn main:app --reload`
6. Health check: `curl http://localhost:8000/health`
7. Docs: `http://localhost:8000/docs`

### Frontend (React + Vite)
1. `cd frontend`
2. `npm install`
3. `npm run dev`
