import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Clock } from "lucide-react";
import type { ItineraryItem } from "@/types";

export function SortableItem({ item, onDelete, isHighlighted }: { item: ItineraryItem; onDelete: (id: number) => void; isHighlighted?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id, data: { type: "item", item } });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className={`group flex items-start gap-2 p-3 rounded-lg border transition-all ${isDragging ? "opacity-50 border-primary/50 bg-primary/5" : "border-border bg-card"} ${isHighlighted ? "ring-2 ring-primary" : ""}`}>
      <button {...attributes} {...listeners} className="mt-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"><GripVertical className="h-4 w-4" /></button>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-card-foreground truncate">{item.place_name}</p>
        <div className="flex items-center gap-3 mt-1">
          {item.scheduled_time && <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{item.scheduled_time}</span>}
          {item.note && <span className="text-xs text-muted-foreground truncate">{item.note}</span>}
        </div>
      </div>
      <button onClick={() => onDelete(item.id)} className="opacity-0 group-hover:opacity-100 transition-opacity mt-1 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
    </div>
  );
}
