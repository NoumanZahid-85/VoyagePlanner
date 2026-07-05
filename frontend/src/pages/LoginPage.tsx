import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Loader2, LogIn } from "lucide-react";

export function LoginPage() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) { setError("Email and password are required"); return; }
    setLoading(true); setError("");
    try { if (mode === "signup") await signup(email, password); else await login(email, password); navigate("/trips"); }
    catch (err: any) { setError(err?.message || "Authentication failed"); }
    finally { setLoading(false); }
  };

  const handleGuestVisit = async () => {
    setLoading(true); setError("");
    try { await login("demo@travelplanner.app", "demo1234"); navigate("/trips"); }
    catch { setError("Guest login unavailable. Try signing up."); setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="relative w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4"><MapPin className="h-8 w-8 text-primary-foreground" /></div>
          <h1 className="text-3xl font-bold text-foreground">VoyagePlanner</h1>
          <p className="text-muted-foreground mt-2">Plan your perfect journey</p>
        </div>
        <div className="glass rounded-2xl p-8 shadow-xl">
          <div className="flex mb-6 bg-muted rounded-lg p-1">
            <button onClick={() => setMode("login")} className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === "login" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}>Sign In</button>
            <button onClick={() => setMode("signup")} className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === "signup" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}>Sign Up</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "login" ? "current-password" : "new-password"} />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full gap-2" disabled={loading}>{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}{mode === "login" ? "Sign In" : "Create Account"}</Button>
          </form>
          <div className="relative my-6"><div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div><div className="relative flex justify-center text-xs"><span className="bg-background/80 px-2 text-muted-foreground">or</span></div></div>
          <Button variant="outline" className="w-full" onClick={handleGuestVisit} disabled={loading}>Guest Visit</Button>
        </div>
      </div>
    </div>
  );
}
