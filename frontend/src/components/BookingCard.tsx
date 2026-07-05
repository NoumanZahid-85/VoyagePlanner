import { Plane, Building2, Clock, Pencil, Trash2 } from "lucide-react";
import type { Booking } from "@/types";
const TYPE_ICONS: Record<string, typeof Plane> = { flight: Plane, hotel: Building2, other: Clock };
const TYPE_BADGES: Record<string, string> = { flight: "bg-sky-500/10 text-sky-500 border-sky-500/20", hotel: "bg-amber-500/10 text-amber-500 border-amber-500/20", other: "bg-gray-500/10 text-gray-500 border-gray-500/20" };

export function BookingCard({ booking, onEdit, onDelete }: { booking: Booking; onEdit: (booking: Booking) => void; onDelete: (id: number) => void }) {
  const Icon = TYPE_ICONS[booking.type] || Clock;
  const badgeClass = TYPE_BADGES[booking.type] || TYPE_BADGES.other;
  return (
    <div className="group relative rounded-xl border border-border bg-card p-4 card-hover">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${badgeClass}`}><Icon className="h-4 w-4" /></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-sm text-card-foreground truncate">{booking.name}</h4>
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${badgeClass}`}>{booking.type}</span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
            <span>{new Date(booking.starts_at).toLocaleString()}</span><span>–</span><span>{new Date(booking.ends_at).toLocaleString()}</span>
          </div>
          {booking.confirmation_number && <p className="text-xs text-muted-foreground mt-1">Confirmation: <span className="font-mono text-primary">{booking.confirmation_number}</span></p>}
          {booking.notes && <p className="text-xs text-muted-foreground mt-1 truncate">{booking.notes}</p>}
        </div>
      </div>
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(booking)} className="p-1 rounded hover:bg-accent/10 text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
        <button onClick={() => onDelete(booking.id)} className="p-1 rounded hover:bg-accent/10 text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
      </div>
    </div>
  );
}
