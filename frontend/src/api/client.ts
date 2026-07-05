import type { Trip, TripIn, Day, DayIn, ItineraryItem, ItineraryItemIn, ItineraryItemUpdate, Booking, BookingIn, BookingUpdate, AuthResponse } from "@/types";

let accessToken: string | null = null;
let refreshPromise: Promise<string | null> | null = null;

export function setAccessToken(token: string | null) { accessToken = token; }
export function getAccessToken() { return accessToken; }

async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await fetch("/auth/refresh", { method: "POST", credentials: "include" });
    if (!res.ok) return null;
    const data = await res.json();
    accessToken = data.access_token;
    return data.access_token;
  } catch { return null; }
}

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json", ...(options.headers as Record<string, string>) };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  let res = await fetch(url, { ...options, headers, credentials: "include" });
  if (res.status === 401 && accessToken) {
    if (!refreshPromise) refreshPromise = refreshAccessToken();
    const newToken = await refreshPromise;
    refreshPromise = null;
    if (newToken) { headers["Authorization"] = `Bearer ${newToken}`; res = await fetch(url, { ...options, headers, credentials: "include" }); }
  }
  if (res.status === 204) return undefined as T;
  if (!res.ok) throw new Error(`Request failed: ${res.statusText}`);
  return res.json();
}

export function signup(email: string, password: string) { return request<AuthResponse>("/auth/signup", { method: "POST", body: JSON.stringify({ email, password }) }); }
export function login(email: string, password: string) { return request<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }); }
export function refresh() { return request<{ access_token: string }>("/auth/refresh", { method: "POST" }); }
export function logoutApi() { return request("/auth/logout", { method: "POST" }); }
export function fetchTrips() { return request<Trip[]>("/trips"); }
export function fetchTrip(tripId: number) { return request<Trip>(`/trips/${tripId}`); }
export function createTrip(data: TripIn) { return request<Trip>("/trips", { method: "POST", body: JSON.stringify(data) }); }
export function createDay(tripId: number, data: DayIn) { return request<Day>(`/trips/${tripId}/days`, { method: "POST", body: JSON.stringify(data) }); }
export function createItem(dayId: number, data: ItineraryItemIn) { return request<ItineraryItem>(`/days/${dayId}/items`, { method: "POST", body: JSON.stringify(data) }); }
export function updateItem(itemId: number, data: ItineraryItemUpdate) { return request<ItineraryItem>(`/items/${itemId}`, { method: "PATCH", body: JSON.stringify(data) }); }
export function deleteItem(itemId: number) { return request<void>(`/items/${itemId}`, { method: "DELETE" }); }
export function fetchBookings(tripId: number) { return request<Booking[]>(`/trips/${tripId}/bookings`); }
export function createBooking(tripId: number, data: BookingIn) { return request<Booking>(`/trips/${tripId}/bookings`, { method: "POST", body: JSON.stringify(data) }); }
export function updateBooking(bookingId: number, data: BookingUpdate) { return request<Booking>(`/bookings/${bookingId}`, { method: "PATCH", body: JSON.stringify(data) }); }
export function deleteBooking(bookingId: number) { return request<void>(`/bookings/${bookingId}`, { method: "DELETE" }); }
