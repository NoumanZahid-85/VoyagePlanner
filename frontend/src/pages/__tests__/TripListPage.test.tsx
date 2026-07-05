import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { TripListPage } from "../TripListPage";

const server = setupServer(
  http.get("/api/trips", () => HttpResponse.json([{ id: 1, owner_id: 1, name: "Paris Getaway", start_date: "2026-07-10", end_date: "2026-07-14", days: [] }])),
  http.post("/api/trips", () => HttpResponse.json({ id: 2, owner_id: 1, name: "New Trip", start_date: "2026-08-01", end_date: "2026-08-05", days: [] }, { status: 201 })),
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderPage() {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={qc}><MemoryRouter><TripListPage /></MemoryRouter></QueryClientProvider>);
}

test("renders trips fetched from API", async () => { renderPage(); await waitFor(() => expect(screen.getByText("Paris Getaway")).toBeInTheDocument()); });
test("shows empty state when no trips", async () => { server.use(http.get("/api/trips", () => HttpResponse.json([]))); renderPage(); await waitFor(() => expect(screen.getByText("No trips yet")).toBeInTheDocument()); });
