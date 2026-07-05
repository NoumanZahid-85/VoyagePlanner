import { useState, useCallback } from "react";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, closestCorners, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { useQueryClient } from "@tanstack/react-query";
import { DayColumn } from "./DayColumn";
import { SortableItem } from "./SortableItem";
import { updateItem } from "@/api/client";
import type { Day, ItineraryItem, ItineraryItemIn } from "@/types";

export function ItineraryBoard({ days, tripId, onAddItem, onDeleteItem, highlightedItemId }: { days: Day[]; tripId: number; onAddItem: (dayId: number, data: ItineraryItemIn) => void; onDeleteItem: (itemId: number) => void; highlightedItemId?: number | null }) {
  const queryClient = useQueryClient();
  const [activeItem, setActiveItem] = useState<ItineraryItem | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragStart = useCallback((event: DragStartEvent) => { setActiveItem(event.active.data.current?.item as ItineraryItem); }, []);

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    setActiveItem(null);
    const { active, over } = event;
    if (!over || !active) return;
    const activeItemData = active.data.current?.item as ItineraryItem;
    if (!activeItemData) return;
    let targetDayId: number, targetOrderIndex: number;
    const overData = over.data.current;
    if (overData?.type === "day") {
      targetDayId = overData.dayId;
      targetOrderIndex = days.find((d) => d.id === targetDayId)?.items.length ?? 0;
    } else if (overData?.type === "item") {
      targetDayId = overData.item.day_id;
      const targetDay = days.find((d) => d.id === targetDayId);
      const sorted = targetDay ? [...targetDay.items].filter((i) => i.id !== activeItemData.id).sort((a, b) => a.order_index - b.order_index) : [];
      targetOrderIndex = Math.max(0, sorted.findIndex((i) => i.id === overData.item.id));
    } else return;

    queryClient.setQueryData(["trip", tripId], (old: any) => {
      if (!old) return old;
      return { ...old, days: old.days.map((d: Day) => ({ ...d, items: d.items.filter((i: ItineraryItem) => i.id !== activeItemData.id) })) };
    });
    try { await updateItem(activeItemData.id, { day_id: targetDayId, order_index: targetOrderIndex }); queryClient.invalidateQueries({ queryKey: ["trip", tripId] }); }
    catch { queryClient.invalidateQueries({ queryKey: ["trip", tripId] }); }
  }, [days, tripId, queryClient]);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="space-y-4">{days.map((day, i) => <DayColumn key={day.id} day={day} dayIndex={i} onAddItem={onAddItem} onDeleteItem={onDeleteItem} highlightedItemId={highlightedItemId} />)}</div>
      <DragOverlay>{activeItem && <div className="opacity-80"><SortableItem item={activeItem} onDelete={() => {}} /></div>}</DragOverlay>
    </DndContext>
  );
}
