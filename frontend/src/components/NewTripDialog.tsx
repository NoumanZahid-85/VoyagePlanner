import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import type { TripIn } from "@/types";

export function NewTripDialog({ onSubmit }: { onSubmit: (data: TripIn) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) { setError("Trip name is required"); return; }
    if (!startDate) { setError("Start date is required"); return; }
    if (!endDate) { setError("End date is required"); return; }
    if (endDate < startDate) { setError("End date must be after start date"); return; }
    onSubmit({ name: name.trim(), start_date: startDate, end_date: endDate });
    setName(""); setStartDate(""); setEndDate(""); setError(""); setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" />New Trip</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Create New Trip</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><label className="text-sm font-medium">Trip Name</label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Summer in Paris" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-sm font-medium">Start Date</label><Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div>
            <div><label className="text-sm font-medium">End Date</label><Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button onClick={handleSubmit} className="w-full">Create Trip</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
