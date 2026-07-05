import { useRef, useMemo, useCallback } from "react";
import Map, { Marker, type MapRef, type MapLayerMouseEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { ItineraryItem } from "@/types";
const DAY_MARKER_COLORS = ["#8b5cf6", "#3b82f6", "#f43f5e", "#f59e0b", "#10b981", "#06b6d4", "#ec4899", "#6366f1"];

export function TripMap({ items, onItemClick, highlightedItemId }: { items: (ItineraryItem & { dayIndex: number })[]; onItemClick?: (itemId: number) => void; highlightedItemId?: number | null }) {
  const mapRef = useRef<MapRef>(null);
  const coords = items.filter((i) => i.latitude && i.longitude);
  const initialViewState = useMemo(() => {
    if (coords.length === 0) return { latitude: 48.8566, longitude: 2.3522, zoom: 3 };
    return { latitude: coords.reduce((s, i) => s + i.latitude!, 0) / coords.length, longitude: coords.reduce((s, i) => s + i.longitude!, 0) / coords.length, zoom: 11 };
  }, [coords]);
  const handleMarkerClick = useCallback((e: MapLayerMouseEvent, itemId: number) => { e.originalEvent.stopPropagation(); onItemClick?.(itemId); }, [onItemClick]);
  const mapStyle = import.meta.env.VITE_MAPTILER_KEY ? `https://api.maptiler.com/maps/streets/style.json?key=${import.meta.env.VITE_MAPTILER_KEY}` : "https://tiles.openfreemap.org/styles/liberty";

  return (
    <div className="rounded-xl overflow-hidden border border-border h-full min-h-[400px]">
      <Map ref={mapRef} mapStyle={mapStyle} initialViewState={initialViewState} attributionControl={false} style={{ width: "100%", height: "100%" }}>
        {coords.map((item) => (
          <Marker key={item.id} latitude={item.latitude!} longitude={item.longitude!} onClick={(e) => handleMarkerClick(e, item.id)} style={{ cursor: "pointer" }}>
            <div className={`w-6 h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-bold transition-transform ${highlightedItemId === item.id ? "scale-150 z-10" : "hover:scale-125"}`} style={{ backgroundColor: DAY_MARKER_COLORS[item.dayIndex % DAY_MARKER_COLORS.length] }}>{item.dayIndex + 1}</div>
          </Marker>
        ))}
      </Map>
    </div>
  );
}
