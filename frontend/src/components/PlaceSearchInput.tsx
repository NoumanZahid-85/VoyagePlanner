import { useState, useRef, useEffect } from "react";
import { usePlaceSearch } from "@/hooks/usePlaceSearch";
import { Input } from "./ui/input";
import { Search, MapPin, Loader2 } from "lucide-react";
import type { PlaceResult } from "@/types";

export function PlaceSearchInput({ onSelect }: { onSelect: (place: PlaceResult) => void }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { results, loading } = usePlaceSearch(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setSelectedIndex(-1); }, [results]);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(e.target as Node) && inputRef.current && !inputRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && selectedIndex >= 0) { onSelect(results[selectedIndex]); setQuery(results[selectedIndex].name.split(",")[0]); setOpen(false); }
    else if (e.key === "Escape") setOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input ref={inputRef} value={query} onChange={(e) => { setQuery(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onKeyDown={handleKeyDown} placeholder="Search for a place..." className="pl-9" />
        {loading && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />}
      </div>
      {open && results.length > 0 && (
        <div ref={listRef} className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-popover shadow-lg animate-in fade-in slide-in-from-top-1">
          {results.map((result, i) => (
            <button key={i} className={`flex items-start gap-3 w-full px-3 py-2.5 text-left text-sm transition-colors ${i === selectedIndex ? "bg-accent text-accent-foreground" : "text-popover-foreground hover:bg-accent/50"} ${i === 0 ? "rounded-t-lg" : ""} ${i === results.length - 1 ? "rounded-b-lg" : ""}`}
              onClick={() => { onSelect(result); setQuery(result.name.split(",")[0]); setOpen(false); }} onMouseEnter={() => setSelectedIndex(i)}>
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
              <span className="line-clamp-2">{result.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
