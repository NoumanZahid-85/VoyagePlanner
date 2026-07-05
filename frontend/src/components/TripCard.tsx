import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import type { Trip } from "@/types";
const GRADIENT_COLORS = ["from-violet-500 to-purple-600", "from-blue-500 to-cyan-500", "from-rose-500 to-pink-600", "from-amber-500 to-orange-600", "from-emerald-500 to-teal-600", "from-indigo-500 to-blue-600"];

export function TripCard({ trip, index }: { trip: Trip; index: number }) {
  const gradient = GRADIENT_COLORS[index % GRADIENT_COLORS.length];
  const dayCount = trip.days?.length ?? 0;
  const itemCount = trip.days?.reduce((s, d) => s + (d.items?.length ?? 0), 0) ?? 0;
  return (
    <Link to={`/trips/${trip.id}`} className="block rounded-xl border border-border bg-card overflow-hidden card-hover group">
      <div className={`h-2 bg-gradient-to-r ${gradient}`} />
      <div className="p-5">
        <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">{trip.name}</h3>
        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{trip.start_date} – {trip.end_date}</span>
        </div>
        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
          <span>{dayCount} {dayCount === 1 ? "day" : "days"}</span>
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{itemCount} {itemCount === 1 ? "place" : "places"}</span>
        </div>
      </div>
    </Link>
  );
}

export function TripCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="h-2 shimmer-bg" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 shimmer-bg rounded" />
        <div className="h-4 w-1/2 shimmer-bg rounded" />
        <div className="h-3 w-1/3 shimmer-bg rounded" />
      </div>
    </div>
  );
}
