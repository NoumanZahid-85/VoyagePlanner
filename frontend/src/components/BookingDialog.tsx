import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import type { Booking, BookingIn, BookingUpdate } from "@/types";

export function BookingDialog({ booking, onSubmit, trigger, open: controlledOpen, onOpenChange }: { booking?: Booking | null; onSubmit: (data: BookingIn | BookingUpdate) => void; trigger?: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [type, setType] = useState("hotel"); const [name, setName] = useState(""); const [startsAt, setStartsAt] = useState(""); const [endsAt, setEndsAt] = useState(""); const [confirmationNumber, setConfirmationNumber] = useState(""); const [notes, setNotes] = useState(""); const [error, setError] = useState("");
  const isEdit = !!booking;
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  useEffect(() => {
    if (booking) { setType(booking.type); setName(booking.name); setStartsAt(booking.starts_at.slice(0, 16)); setEndsAt(booking.ends_at.slice(0, 16)); setConfirmationNumber(booking.confirmation_number || ""); setNotes(booking.notes || ""); }
    else { setType("hotel"); setName(""); setStartsAt(""); setEndsAt(""); setConfirmationNumber(""); setNotes(""); }
    setError("");
  }, [booking, open]);

  const handleSubmit = () => {
    if (!name.trim()) { setError("Name is required"); return; }
    if (!startsAt) { setError("Start date/time is required"); return; }
    if (!endsAt) { setError("End date/time is required"); return; }
    onSubmit({ type, name: name.trim(), starts_at: new Date(startsAt).toISOString(), ends_at: new Date(endsAt).toISOString(), confirmation_number: confirmationNumber.trim() || undefined, notes: notes.trim() || undefined });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      {!trigger && !isEdit && <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" />Add Booking</Button></DialogTrigger>}
      <DialogContent>
        <DialogHeader><DialogTitle>{isEdit ? "Edit Booking" : "New Booking"}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><label className="text-sm font-medium">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
              <option value="flight">Flight</option><option value="hotel">Hotel</option><option value="other">Other</option>
            </select>
          </div>
          <div><label className="text-sm font-medium">Name</label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Air France AF1234" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-sm font-medium">Start</label><Input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} /></div>
            <div><label className="text-sm font-medium">End</label><Input type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} /></div>
          </div>
          <div><label className="text-sm font-medium">Confirmation # (optional)</label><Input value={confirmationNumber} onChange={(e) => setConfirmationNumber(e.target.value)} /></div>
          <div><label className="text-sm font-medium">Notes (optional)</label><Input value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button onClick={handleSubmit} className="w-full">{isEdit ? "Save Changes" : "Add Booking"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
