export type SlotStatus = "available" | "limited" | "unavailable";

export interface TimeSlot {
  time: string; // "19:30"
  label: string; // "7:30 PM"
  status: SlotStatus;
}

export interface DayAvailability {
  dateISO: string; // "2026-08-28"
  slots: TimeSlot[];
}

export type Occasion =
  | "None"
  | "Birthday"
  | "Anniversary"
  | "Business Dinner"
  | "Other";

export interface GuestDetails {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  occasion: Occasion;
  notes: string;
}

export interface Reservation {
  dateISO: string;
  time: string;
  timeLabel: string;
  guests: number;
  details: GuestDetails;
  status: "draft" | "confirmed";
  reference: string;
}

export type ReservationStep =
  | "date"
  | "guests"
  | "time"
  | "details"
  | "review"
  | "confirmed";

export type LoadState = "idle" | "loading" | "loaded" | "error";
