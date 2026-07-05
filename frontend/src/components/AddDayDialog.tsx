import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import type { DayIn } from "@/types";

function getNextDay(dateStr?: string): string {
  if (!dateStr) return new Date().toISOString().split("T")[0];
  const d = new Date(dateStr); d.setDate(d.getDate() + 1); return d.toISOString().split("T")[0];
}

export function AddDayDialog({ lastDate, onSubmit }: { lastDate?: string; onSubmit: (data: DayIn) => void }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(() => getNextDay(lastDate));
  const [label, setLabel] = useState("");
  const handleSubmit = () => { onSubmit({ date, label: label.trim() || undefined }); setDate(getNextDay(date)); setLabel(""); setOpen(false); };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant="outline" size="sm" className="gap-1"><Plus className="h-3.5 w-3.5" />Add Day</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add a Day</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><label className="text-sm font-medium">Date</label><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
          <div><label className="text-sm font-medium">Label (optional)</label><Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Arrival & Explore" /></div>
          <Button onClick={handleSubmit} className="w-full">Add Day</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
