import { http, HttpResponse } from "msw";
export const errorHandlers = [
  http.get("/api/trips", ({ request }) => { const url = new URL(request.url); if (url.searchParams.get("error") === "401") return HttpResponse.json({ detail: "Unauthorized" }, { status: 401 }); return HttpResponse.json([]); }),
  http.get("/api/trips/:tripId", ({ request }) => { const url = new URL(request.url); if (url.searchParams.get("error") === "500") return HttpResponse.json({ detail: "Internal server error" }, { status: 500 }); return HttpResponse.json([]); }),
  http.post("/api/trips", ({ request }) => { const url = new URL(request.url); if (url.searchParams.get("error") === "500") return HttpResponse.json({ detail: "Internal server error" }, { status: 500 }); return HttpResponse.json({}); }),
];
