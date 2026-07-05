import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppLayout } from "./components/AppLayout";
import { LoginPage } from "./pages/LoginPage";
import { TripListPage } from "./pages/TripListPage";
import { TripDetailPage } from "./pages/TripDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/trips" element={<TripListPage />} />
              <Route path="/trips/:tripId" element={<TripDetailPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/trips" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
