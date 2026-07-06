import { http, HttpResponse, delay } from "msw";
import { mockTrips, mockBookings, getId } from "./fixtures";

let trips = [...mockTrips];
let bookings = [...mockBookings];

export const handlers = [
  http.post("/auth/signup", async ({ request }) => { await delay(300); return HttpResponse.json({ access_token: "mock-token", user: { id: 3, email: (await request.json() as any).email } }); }),
  http.post("/auth/login", async ({ request }) => { await delay(300); const body = await request.json() as any; if (body.email === "demo@travelplanner.app" && body.password === "demo1234") return HttpResponse.json({ access_token: "mock-token", user: { id: 1, email: "demo@travelplanner.app" } }); return HttpResponse.json({ detail: "Invalid email or password" }, { status: 401 }); }),
  http.post("/auth/refresh", async () => { await delay(200); return HttpResponse.json({ access_token: "mock-token" }); }),
  http.post("/auth/logout", async () => { await delay(100); return HttpResponse.json({ message: "Logged out" }); }),
  http.get("/trips", async () => { await delay(400); return HttpResponse.json(trips); }),
  http.post("/trips", async ({ request }) => { await delay(400); const body = await request.json() as any; const trip = { id: getId(), owner_id: 1, ...body, days: [] }; trips.push(trip); return HttpResponse.json(trip, { status: 201 }); }),
  http.get("/trips/:tripId", async ({ params }) => { await delay(300); const trip = trips.find((t) => t.id === Number(params.tripId)); if (!trip) return HttpResponse.json({ detail: "Not found" }, { status: 404 }); return HttpResponse.json(trip); }),
  http.post("/trips/:tripId/days", async ({ params, request }) => { await delay(300); const trip = trips.find((t) => t.id === Number(params.tripId)); if (!trip) return HttpResponse.json({ detail: "Not found" }, { status: 404 }); const body = await request.json() as any; const day = { id: getId(), trip_id: trip.id, items: [], ...body }; trip.days.push(day); return HttpResponse.json(day, { status: 201 }); }),
  http.post("/days/:dayId/items", async ({ params, request }) => { await delay(300); const body = await request.json() as any; const item = { id: getId(), day_id: Number(params.dayId), place_name: body.place_name, latitude: body.latitude ?? null, longitude: body.longitude ?? null, scheduled_time: body.scheduled_time ?? null, note: body.note ?? null, order_index: 0 }; for (const trip of trips) { for (const day of trip.days) { if (day.id === Number(params.dayId)) { day.items.push(item); item.order_index = day.items.length - 1; return HttpResponse.json(item, { status: 201 }); } } } return HttpResponse.json({ detail: "Day not found" }, { status: 404 }); }),
  http.patch("/items/:itemId", async ({ params, request }) => { await delay(200); const body = await request.json() as any; for (const trip of trips) { for (const day of trip.days) { const item = day.items.find((i: any) => i.id === Number(params.itemId)); if (item) { Object.assign(item, body); return HttpResponse.json(item); } } } return HttpResponse.json({ detail: "Not found" }, { status: 404 }); }),
  http.delete("/items/:itemId", async ({ params }) => { await delay(200); for (const trip of trips) { for (const day of trip.days) { const idx = day.items.findIndex((i: any) => i.id === Number(params.itemId)); if (idx >= 0) { day.items.splice(idx, 1); return new HttpResponse(null, { status: 204 }); } } } return HttpResponse.json({ detail: "Not found" }, { status: 404 }); }),
  http.get("/trips/:tripId/bookings", async ({ params }) => { await delay(300); return HttpResponse.json(bookings.filter((b) => b.trip_id === Number(params.tripId))); }),
  http.post("/trips/:tripId/bookings", async ({ params, request }) => { await delay(300); const body = await request.json() as any; const booking = { id: getId(), trip_id: Number(params.tripId), ...body }; bookings.push(booking); return HttpResponse.json(booking, { status: 201 }); }),
  http.patch("/bookings/:bookingId", async ({ params, request }) => { await delay(200); const body = await request.json() as any; const booking = bookings.find((b) => b.id === Number(params.bookingId)); if (!booking) return HttpResponse.json({ detail: "Not found" }, { status: 404 }); Object.assign(booking, body); return HttpResponse.json(booking); }),
  http.delete("/bookings/:bookingId", async ({ params }) => { await delay(200); const idx = bookings.findIndex((b) => b.id === Number(params.bookingId)); if (idx < 0) return HttpResponse.json({ detail: "Not found" }, { status: 404 }); bookings.splice(idx, 1); return new HttpResponse(null, { status: 204 }); }),
];
