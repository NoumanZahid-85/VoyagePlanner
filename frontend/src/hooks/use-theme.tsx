import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
interface ThemeContextType { theme: "dark" | "light"; toggleTheme: () => void }
const ThemeContext = createContext<ThemeContextType | null>(null);
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">(() => { const s = localStorage.getItem("theme"); return s === "light" ? "light" : "dark"; });
  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark"); localStorage.setItem("theme", theme); }, [theme]);
  const toggleTheme = () => setTheme((t) => t === "dark" ? "light" : "dark");
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
export function useTheme() { const ctx = useContext(ThemeContext); if (!ctx) throw new Error("useTheme must be used within ThemeProvider"); return ctx; }
