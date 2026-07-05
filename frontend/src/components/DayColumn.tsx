import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { AddItemDialog } from "./AddItemDialog";
import type { Day, ItineraryItemIn } from "@/types";

const DAY_COLORS = ["bg-violet-500", "bg-blue-500", "bg-rose-500", "bg-amber-500", "bg-emerald-500", "bg-cyan-500", "bg-pink-500", "bg-indigo-500"];

export function DayColumn({ day, dayIndex, onAddItem, onDeleteItem, highlightedItemId }: { day: Day; dayIndex: number; onAddItem: (dayId: number, data: ItineraryItemIn) => void; onDeleteItem: (itemId: number) => void; highlightedItemId?: number | null }) {
  const { setNodeRef, isOver } = useDroppable({ id: `day-${day.id}`, data: { type: "day", dayId: day.id } });
  const sortedItems = [...day.items].sort((a, b) => a.order_index - b.order_index);
  const color = DAY_COLORS[dayIndex % DAY_COLORS.length];

  return (
    <div ref={setNodeRef} className={`rounded-xl border transition-all ${isOver ? "border-primary bg-primary/5" : "border-border"}`}>
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <div className={`w-8 h-8 ${color} rounded-full flex items-center justify-center text-white text-sm font-semibold`}>{dayIndex + 1}</div>
        <div className="flex-1"><p className="text-sm font-medium text-card-foreground">{day.label || `Day ${dayIndex + 1}`}</p><p className="text-xs text-muted-foreground">{day.date}</p></div>
        <AddItemDialog day={day} onSubmit={onAddItem} />
      </div>
      <div className="p-3 space-y-2 min-h-[60px]">
        <SortableContext items={sortedItems.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {sortedItems.map((item) => <SortableItem key={item.id} item={item} onDelete={onDeleteItem} isHighlighted={item.id === highlightedItemId} />)}
        </SortableContext>
        {sortedItems.length === 0 && <p className="text-center text-xs text-muted-foreground py-4">No items yet. Click "Add Item" above.</p>}
      </div>
    </div>
  );
}
