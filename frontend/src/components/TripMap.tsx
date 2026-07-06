import { useRef, useMemo, useCallback, useEffect } from "react";
import MapGl, { Marker, Source, Layer, type MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { ItineraryItem } from "@/types";

const DAY_COLORS = [
  { marker: "#8b5cf6", line: "#a78bfa" },
  { marker: "#3b82f6", line: "#60a5fa" },
  { marker: "#f43f5e", line: "#f87171" },
  { marker: "#f59e0b", line: "#fbbf24" },
  { marker: "#10b981", line: "#34d399" },
  { marker: "#06b6d4", line: "#22d3ee" },
  { marker: "#ec4899", line: "#f472b6" },
  { marker: "#6366f1", line: "#818cf8" },
];

const DAY_MARKER_COLORS = DAY_COLORS.map((c) => c.marker);

export function TripMap({
  items,
  onItemClick,
  highlightedItemId,
}: {
  items: (ItineraryItem & { dayIndex: number })[];
  onItemClick?: (itemId: number) => void;
  highlightedItemId?: number | null;
}) {
  const mapRef = useRef<MapRef>(null);

  const coords = useMemo(
    () => items.filter((i) => i.latitude && i.longitude),
    [items]
  );

  const initialViewState = useMemo(() => {
    if (coords.length === 0)
      return { latitude: 48.8566, longitude: 2.3522, zoom: 3 };
    return {
      latitude:
        coords.reduce((s, i) => s + i.latitude!, 0) / coords.length,
      longitude:
        coords.reduce((s, i) => s + i.longitude!, 0) / coords.length,
      zoom: 11,
    };
  }, []);

  const fitMapBounds = useCallback(() => {
    if (coords.length === 0 || !mapRef.current) return;
    const bounds = coords.reduce(
      (acc, i) => {
        acc[0][0] = Math.min(acc[0][0], i.longitude!);
        acc[0][1] = Math.min(acc[0][1], i.latitude!);
        acc[1][0] = Math.max(acc[1][0], i.longitude!);
        acc[1][1] = Math.max(acc[1][1], i.latitude!);
        return acc;
      },
      [[180, 90], [-180, -90]] as [[number, number], [number, number]]
    );
    mapRef.current.fitBounds(bounds, {
      padding: 80,
      maxZoom: 14,
      duration: 1000,
    });
  }, [coords]);

  useEffect(() => {
    fitMapBounds();
  }, [fitMapBounds]);

  const mapStyle = import.meta.env.VITE_MAPTILER_KEY
    ? `https://api.maptiler.com/maps/streets/style.json?key=${import.meta.env.VITE_MAPTILER_KEY}`
    : "https://tiles.openfreemap.org/styles/liberty";

  const { dayPaths, activeDays } = useMemo(() => {
    const byDay = new Map<number, (ItineraryItem & { dayIndex: number })[]>();
    coords.forEach((item) => {
      const arr = byDay.get(item.dayIndex) ?? [];
      arr.push(item);
      byDay.set(item.dayIndex, arr);
    });

    const features: { type: "Feature"; properties: { dayIndex: number }; geometry: { type: "LineString"; coordinates: number[][] } }[] = [];
    byDay.forEach((items, dayIndex) => {
      if (items.length < 2) return;
      const sorted = [...items].sort(
        (a, b) => a.order_index - b.order_index
      );
      features.push({
        type: "Feature",
        properties: { dayIndex },
        geometry: {
          type: "LineString",
          coordinates: sorted.map((i) => [i.longitude!, i.latitude!]),
        },
      });
    });

    return {
      dayPaths: { type: "FeatureCollection" as const, features },
      activeDays: [...new Set(features.map((f) => f.properties.dayIndex))],
    };
  }, [coords]);

  const handleMarkerClick = useCallback(
    (e: { originalEvent: MouseEvent | TouchEvent }, itemId: number) => {
      e.originalEvent.stopPropagation();
      onItemClick?.(itemId);
    },
    [onItemClick]
  );

  const uniqueDays = useMemo(
    () => [...new Set(coords.map((i) => i.dayIndex))].sort(),
    [coords]
  );

  return (
    <div className="rounded-xl overflow-hidden border border-border h-[500px] relative">
      <MapGl
        ref={mapRef}
        mapStyle={mapStyle}
        initialViewState={initialViewState}
        attributionControl={false}
        style={{ width: "100%", height: "100%" }}
        onLoad={() => fitMapBounds()}
      >
        {activeDays.length > 0 && (
          <Source id="day-paths" type="geojson" data={dayPaths}>
            {activeDays.map((dayIndex) => (
              <Layer
                key={`line-${dayIndex}`}
                id={`line-${dayIndex}`}
                type="line"
                source="day-paths"
                paint={{
                  "line-color":
                    DAY_COLORS[dayIndex % DAY_COLORS.length].line,
                  "line-width": 3,
                  "line-opacity": 0.7,
                  "line-dasharray": [3, 2],
                }}
                filter={["==", ["get", "dayIndex"], dayIndex]}
              />
            ))}
          </Source>
        )}

        {coords.map((item) => (
          <Marker
            key={item.id}
            latitude={item.latitude!}
            longitude={item.longitude!}
            onClick={(e) => handleMarkerClick(e, item.id)}
            style={{ cursor: "pointer" }}
          >
            <div
              title={item.place_name}
              className={`relative flex items-center justify-center transition-all duration-300 ${
                highlightedItemId === item.id
                  ? "scale-150 z-10"
                  : "hover:scale-125"
              }`}
            >
              {highlightedItemId === item.id && (
                <div
                  className="absolute inset-0 rounded-full marker-ping"
                  style={{
                    backgroundColor:
                      DAY_MARKER_COLORS[
                        item.dayIndex % DAY_MARKER_COLORS.length
                      ],
                  }}
                />
              )}
              <div
                className="w-8 h-8 rounded-full border-[3px] border-white shadow-xl flex items-center justify-center text-white text-xs font-bold drop-shadow-sm"
                style={{
                  backgroundColor:
                    DAY_MARKER_COLORS[
                      item.dayIndex % DAY_MARKER_COLORS.length
                    ],
                }}
              >
                {item.dayIndex + 1}
              </div>
            </div>
          </Marker>
        ))}
      </MapGl>

      {uniqueDays.length > 1 && (
        <div className="absolute bottom-4 left-4 bg-background/95 rounded-lg shadow-lg border border-border p-3 z-10 text-xs">
          <div className="font-semibold text-foreground mb-1.5">
            Days
          </div>
          <div className="space-y-1">
            {uniqueDays.map((dayIndex) => (
              <div
                key={dayIndex}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{
                    backgroundColor:
                      DAY_MARKER_COLORS[
                        dayIndex % DAY_MARKER_COLORS.length
                      ],
                  }}
                />
                Day {dayIndex + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
