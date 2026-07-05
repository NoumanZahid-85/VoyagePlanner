import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { MapPin, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "./ThemeToggle";

export function AppLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => { await logout(); navigate("/login"); };

  return (
    <div className="flex h-screen">
      <aside className="w-60 bg-sidebar border-r border-border flex flex-col">
        <div className="flex items-center gap-2 p-5 border-b border-border">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg text-foreground">VoyagePlanner</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <NavLink to="/trips" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent/10"}`}>
            <LayoutDashboard className="h-4 w-4" /> My Trips
          </NavLink>
        </nav>
        <div className="p-3 border-t border-border space-y-1">
          <ThemeToggle />
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors w-full">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto bg-background"><Outlet /></main>
    </div>
  );
}
