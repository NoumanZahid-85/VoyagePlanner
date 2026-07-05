import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PlaceSearchInput } from "./PlaceSearchInput";
import { Plus } from "lucide-react";
import type { Day, ItineraryItemIn, PlaceResult } from "@/types";

export function AddItemDialog({ day, onSubmit }: { day: Day; onSubmit: (dayId: number, data: ItineraryItemIn) => void }) {
  const [open, setOpen] = useState(false);
  const [place, setPlace] = useState<PlaceResult | null>(null);
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const handleSubmit = () => {
    if (!place) return;
    onSubmit(day.id, { place_name: place.name, latitude: place.latitude, longitude: place.longitude, scheduled_time: time || undefined, note: note.trim() || undefined });
    setPlace(null); setTime(""); setNote(""); setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground"><Plus className="h-3.5 w-3.5" />Add Item</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add Item to {day.label || day.date}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <PlaceSearchInput onSelect={setPlace} />
          <div><label className="text-sm font-medium">Time (optional)</label><Input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></div>
          <div><label className="text-sm font-medium">Note (optional)</label><Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Book tickets in advance" /></div>
          <Button onClick={handleSubmit} className="w-full" disabled={!place}>Add to Itinerary</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
