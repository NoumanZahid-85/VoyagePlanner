import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTrip, createDay, createItem, deleteItem, fetchBookings, createBooking, updateBooking, deleteBooking } from "@/api/client";
import { ItineraryBoard } from "@/components/ItineraryBoard";
import { AddDayDialog } from "@/components/AddDayDialog";
import { TripMap } from "@/components/TripMap";
import { BookingCard } from "@/components/BookingCard";
import { BookingDialog } from "@/components/BookingDialog";
import { ArrowLeft, Calendar, Loader2, AlertCircle } from "lucide-react";
import type { Day, ItineraryItemIn, Booking, BookingIn, BookingUpdate } from "@/types";

export function TripDetailPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const queryClient = useQueryClient();
  const [highlightedItemId, setHighlightedItemId] = useState<number | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const numericTripId = Number(tripId);

  const { data: trip, isLoading, isError } = useQuery({ queryKey: ["trip", numericTripId], queryFn: () => fetchTrip(numericTripId), enabled: !!numericTripId });
  const { data: bookings } = useQuery({ queryKey: ["bookings", numericTripId], queryFn: () => fetchBookings(numericTripId), enabled: !!numericTripId });
  const addDayMutation = useMutation({ mutationFn: (data: { date: string; label?: string }) => createDay(numericTripId, data), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["trip", numericTripId] }) });
  const addItemMutation = useMutation({ mutationFn: ({ dayId, data }: { dayId: number; data: ItineraryItemIn }) => createItem(dayId, data), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["trip", numericTripId] }) });
  const deleteItemMutation = useMutation({ mutationFn: (itemId: number) => deleteItem(itemId), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["trip", numericTripId] }) });
  const addBookingMutation = useMutation({ mutationFn: (data: BookingIn) => createBooking(numericTripId, data), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings", numericTripId] }) });
  const updateBookingMutation = useMutation({ mutationFn: ({ id, data }: { id: number; data: BookingUpdate }) => updateBooking(id, data), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings", numericTripId] }) });
  const deleteBookingMutation = useMutation({ mutationFn: (id: number) => deleteBooking(id), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings", numericTripId] }) });

  if (isLoading) return <div className="p-8 flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (isError || !trip) return (
    <div className="p-8 flex items-center justify-center h-full">
      <div className="text-center"><AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" /><h2 className="text-xl font-semibold text-foreground mb-2">Trip not found</h2><Link to="/trips" className="text-primary hover:underline">Back to trips</Link></div>
    </div>
  );

  const days: Day[] = trip.days || [];
  const sortedDays = [...days].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const lastDate = sortedDays.length > 0 ? sortedDays[sortedDays.length - 1].date : undefined;
  const itemsWithDayIndex = sortedDays.flatMap((day, di) => (day.items || []).map((item) => ({ ...item, dayIndex: di })));

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/trips" className="text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="h-5 w-5" /></Link>
        <div><h1 className="text-2xl font-bold text-foreground">{trip.name}</h1><p className="text-sm text-muted-foreground flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{trip.start_date} – {trip.end_date}</p></div>
      </div>
      <div className="flex items-center gap-3 mb-6"><AddDayDialog lastDate={lastDate} onSubmit={(data) => addDayMutation.mutate(data)} /></div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-3">
          <ItineraryBoard days={sortedDays} tripId={numericTripId} onAddItem={(dayId, data) => addItemMutation.mutate({ dayId, data })} onDeleteItem={(itemId) => deleteItemMutation.mutate(itemId)} highlightedItemId={highlightedItemId} />
        </div>
        <div className="lg:col-span-2">
          <div className="sticky top-8"><TripMap items={itemsWithDayIndex} onItemClick={(itemId) => setHighlightedItemId(itemId)} highlightedItemId={highlightedItemId} /></div>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-semibold text-foreground">Bookings</h2><BookingDialog onSubmit={(data) => addBookingMutation.mutate(data as BookingIn)} /></div>
        {bookings && bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{bookings.map((booking) => <BookingCard key={booking.id} booking={booking} onEdit={(b) => { setEditingBooking(b); setBookingDialogOpen(true); }} onDelete={(id) => deleteBookingMutation.mutate(id)} />)}</div>
        ) : (<p className="text-sm text-muted-foreground py-8 text-center">No bookings yet. Add a flight, hotel, or other reservation.</p>)}
      </div>
      {editingBooking && <BookingDialog key={editingBooking.id} booking={editingBooking} onSubmit={(data) => { updateBookingMutation.mutate({ id: editingBooking.id, data: data as BookingUpdate }); setEditingBooking(null); }} open={bookingDialogOpen} onOpenChange={(open) => { setBookingDialogOpen(open); if (!open) setEditingBooking(null); }} />}
    </div>
  );
}
