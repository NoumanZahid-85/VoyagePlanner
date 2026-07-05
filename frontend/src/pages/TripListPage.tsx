import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTrips, createTrip } from "@/api/client";
import { TripCard, TripCardSkeleton } from "@/components/TripCard";
import { NewTripDialog } from "@/components/NewTripDialog";
import { AlertCircle, MapPin } from "lucide-react";
import type { TripIn } from "@/types";

export function TripListPage() {
  const queryClient = useQueryClient();
  const { data: trips, isLoading, isError, error } = useQuery({ queryKey: ["trips"], queryFn: fetchTrips });
  const createMutation = useMutation({ mutationFn: (data: TripIn) => createTrip(data), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["trips"] }) });

  if (isLoading) return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8"><div><div className="h-8 w-48 shimmer-bg rounded mb-2" /><div className="h-4 w-32 shimmer-bg rounded" /></div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({ length: 3 }).map((_, i) => <TripCardSkeleton key={i} />)}</div>
    </div>
  );

  if (isError) return (
    <div className="p-8 flex items-center justify-center h-full">
      <div className="text-center"><AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" /><h2 className="text-xl font-semibold text-foreground mb-2">Failed to load trips</h2><p className="text-muted-foreground">{(error as Error)?.message || "Something went wrong"}</p></div>
    </div>
  );

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-3xl font-bold text-foreground">My Trips</h1><p className="text-muted-foreground mt-1">{trips?.length ? `${trips.length} ${trips.length === 1 ? "trip" : "trips"} planned` : "Plan your next adventure"}</p></div>
        <NewTripDialog onSubmit={(data) => createMutation.mutate(data)} />
      </div>
      {trips && trips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{trips.map((trip, i) => <TripCard key={trip.id} trip={trip} index={i} />)}</div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4"><MapPin className="h-8 w-8 text-muted-foreground" /></div>
          <h2 className="text-xl font-semibold text-foreground mb-2">No trips yet</h2>
          <p className="text-muted-foreground mb-6 max-w-sm">Start planning your journey by creating your first trip.</p>
        </div>
      )}
    </div>
  );
}
