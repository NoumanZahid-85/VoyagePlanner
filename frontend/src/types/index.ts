export interface User { id: number; email: string }
export interface Trip { id: number; owner_id: number; name: string; start_date: string; end_date: string; days: Day[] }
export interface Day { id: number; trip_id: number; date: string; label?: string; items: ItineraryItem[] }
export interface ItineraryItem { id: number; day_id: number; place_name: string; latitude?: number; longitude?: number; scheduled_time?: string; note?: string; order_index: number }
export interface Booking { id: number; trip_id: number; type: "flight" | "hotel" | "other"; name: string; starts_at: string; ends_at: string; confirmation_number?: string; notes?: string }
export interface TripIn { name: string; start_date: string; end_date: string }
export interface DayIn { date: string; label?: string }
export interface ItineraryItemIn { place_name: string; latitude?: number; longitude?: number; scheduled_time?: string; note?: string }
export interface ItineraryItemUpdate { place_name?: string; latitude?: number; longitude?: number; scheduled_time?: string; note?: string; order_index?: number; day_id?: number }
export interface BookingIn { type: string; name: string; starts_at: string; ends_at: string; confirmation_number?: string; notes?: string }
export interface BookingUpdate { type?: string; name?: string; starts_at?: string; ends_at?: string; confirmation_number?: string; notes?: string }
export interface AuthResponse { access_token: string; user: User }
export interface PlaceResult { name: string; latitude: number; longitude: number }
