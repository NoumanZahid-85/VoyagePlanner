import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react";
import { setAccessToken, signup as apiSignup, login as apiLogin, logoutApi, refresh } from "@/api/client";

interface AuthContextType { user: { id: number; email: string } | null; isLoading: boolean; isAuthenticated: boolean; login: (email: string, password: string) => Promise<void>; signup: (email: string, password: string) => Promise<void>; logout: () => Promise<void> }

const AuthContext = createContext<AuthContextType | null>(null);

function decodeJwt(token: string) { try { return JSON.parse(atob(token.split(".")[1])); } catch { return null; } }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    refresh().then((data) => { if (data?.access_token) { setAccessToken(data.access_token); const p = decodeJwt(data.access_token); if (p?.sub) setUser({ id: Number(p.sub), email: "" }); } }).catch(() => {}).finally(() => setIsLoading(false));
  }, []);
  const login = useCallback(async (email: string, password: string) => { const data = await apiLogin(email, password); setAccessToken(data.access_token); setUser(data.user); }, []);
  const signup = useCallback(async (email: string, password: string) => { const data = await apiSignup(email, password); setAccessToken(data.access_token); setUser(data.user); }, []);
  const logout = useCallback(async () => { await logoutApi(); setAccessToken(null); setUser(null); }, []);
  return <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, signup, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const ctx = useContext(AuthContext); if (!ctx) throw new Error("useAuth must be used within AuthProvider"); return ctx; }
