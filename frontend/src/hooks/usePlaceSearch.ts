import { useState, useEffect } from "react";
import type { PlaceResult } from "@/types";
interface NominatimResult { display_name: string; lat: string; lon: string }
export function usePlaceSearch(query: string) {
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (query.length < 3) { setResults([]); return; }
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`, { headers: { "User-Agent": "VoyagePlanner/1.0" } });
        const data: NominatimResult[] = await res.json();
        setResults(data.map((r) => ({ name: r.display_name, latitude: parseFloat(r.lat), longitude: parseFloat(r.lon) })));
      } catch { setResults([]); } finally { setLoading(false); }
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);
  return { results, loading };
}
