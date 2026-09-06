"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { ArrowLeft } from "lucide-react";
import DateSelector from "./DateSelector";
import GuestSelector from "./GuestSelector";
import TimeSlots from "./TimeSlots";
import DetailsForm from "./DetailsForm";
import ReviewSummary from "./ReviewSummary";
import Confirmation from "./Confirmation";
import Button from "@/components/ui/Button";
import { GuestDetails, Reservation } from "@/lib/types";
import { makeReference } from "@/lib/mock-data";

type Phase = "selecting" | "details" | "review" | "confirmed";

const EMPTY_DETAILS: GuestDetails = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  occasion: "None",
  notes: "",
};

function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

const fadeSlide = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
};

const STEPS: { key: Phase; label: string }[] = [
  { key: "selecting", label: "Table" },
  { key: "details", label: "Details" },
  { key: "review", label: "Review" },
  { key: "confirmed", label: "Confirmed" },
];

export default function ReservationFlow() {
  const [phase, setPhase] = useState<Phase>("selecting");
  const [dateISO, setDateISO] = useState(todayISO());
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState<string | null>(null);
  const [timeLabel, setTimeLabel] = useState<string>("");
  const [details, setDetails] = useState<GuestDetails>(EMPTY_DETAILS);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const stepIndex = STEPS.findIndex((s) => s.key === phase);

  const handleSelectTime = (t: string, label: string) => {
    setTime(t);
    setTimeLabel(label);
  };

  const handleDateChange = (iso: string) => {
    setDateISO(iso);
    setTime(null);
  };

  const handleGuestChange = (n: number) => {
    setGuests(n);
    setTime(null);
  };

  const handleDetailsSubmit = (d: GuestDetails) => {
    setDetails(d);
    setPhase("review");
  };

  const handleConfirm = () => {
    setSubmitting(true);
    setTimeout(() => {
      const res: Reservation = {
        dateISO,
        time: time!,
        timeLabel,
        guests,
        details,
        status: "confirmed",
        reference: makeReference(),
      };
      setReservation(res);
      setSubmitting(false);
      setPhase("confirmed");
    }, 900);
  };

  const resetAll = () => {
    setPhase("selecting");
    setDateISO(todayISO());
    setGuests(2);
    setTime(null);
    setTimeLabel("");
    setDetails(EMPTY_DETAILS);
    setReservation(null);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-6 md:px-10 pt-28 md:pt-40 pb-32 md:pb-24">
      <div className="grid md:grid-cols-12 gap-10 md:gap-16">
        {/* LEFT — editorial */}
        {phase !== "confirmed" && (
          <div className="md:col-span-4">
            <p className="text-[11px] tracking-[0.14em] uppercase text-accent mb-4">
              {String(stepIndex + 1).padStart(2, "0")} / 03
            </p>
            <h1 className="font-display italic text-[clamp(32px,4vw,48px)] leading-[1.15] mb-5">
              Reserve Your Table.
            </h1>
            <p className="text-text-muted text-[15px] leading-[1.75] max-w-[380px]">
              Choose a date, tell us your party size, and we&apos;ll take
              care of the rest.
            </p>

            <div className="hidden md:flex flex-col gap-3 mt-16">
              {STEPS.slice(0, 3).map((s, i) => (
                <div
                  key={s.key}
                  className={clsx(
                    "flex items-center gap-3 text-[12px] tracking-[0.08em] uppercase transition-colors",
                    i <= stepIndex ? "text-text" : "text-text-muted/50"
                  )}
                >
                  <span
                    className={clsx(
                      "w-1.5 h-1.5 rounded-full",
                      i <= stepIndex ? "bg-accent" : "bg-border-strong"
                    )}
                  />
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RIGHT — module */}
        <div className={clsx(phase === "confirmed" ? "md:col-span-12" : "md:col-span-8")}>
          <div className={clsx(
            "border border-border bg-surface px-6 py-8 md:px-10 md:py-10",
            phase === "confirmed" && "border-none bg-transparent px-0 py-0 md:px-0 md:py-16"
          )}>
            <AnimatePresence mode="wait">
              {phase === "selecting" && (
                <motion.div key="selecting" {...fadeSlide} className="space-y-10">
                  <DateSelector selectedISO={dateISO} onSelect={handleDateChange} />
                  <GuestSelector guests={guests} onChange={handleGuestChange} />
                  <TimeSlots
                    dateISO={dateISO}
                    guests={guests}
                    selectedTime={time}
                    onSelectTime={handleSelectTime}
                    onJumpToDate={handleDateChange}
                  />
                  <Button
                    fullWidth
                    disabled={!time}
                    onClick={() => setPhase("details")}
                  >
                    Continue
                  </Button>
                </motion.div>
              )}

              {phase === "details" && (
                <motion.div key="details" {...fadeSlide}>
                  <button
                    onClick={() => setPhase("selecting")}
                    className="focus-ring flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase text-text-muted hover:text-text mb-8 transition-colors"
                  >
                    <ArrowLeft size={13} /> Back
                  </button>
                  <p className="text-[11px] tracking-[0.14em] uppercase text-text-muted mb-6">
                    Your details
                  </p>
                  <DetailsForm initial={details} onSubmit={handleDetailsSubmit} />
                </motion.div>
              )}

              {phase === "review" && (
                <motion.div key="review" {...fadeSlide}>
                  <button
                    onClick={() => setPhase("details")}
                    className="focus-ring flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase text-text-muted hover:text-text mb-8 transition-colors"
                  >
                    <ArrowLeft size={13} /> Back
                  </button>
                  <ReviewSummary
                    reservation={{
                      dateISO,
                      time: time!,
                      timeLabel,
                      guests,
                      details,
                      status: "draft",
                      reference: "",
                    }}
                    onEdit={(step) =>
                      setPhase(step === "details" ? "details" : "selecting")
                    }
                    onConfirm={handleConfirm}
                    submitting={submitting}
                  />
                </motion.div>
              )}

              {phase === "confirmed" && reservation && (
                <motion.div key="confirmed" {...fadeSlide}>
                  <Confirmation
                    reservation={reservation}
                    onModify={() => setPhase("selecting")}
                    onCancel={resetAll}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Sticky mobile CTA while browsing times */}
      {phase === "selecting" && time && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-bg/95 backdrop-blur px-5 py-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <Button fullWidth onClick={() => setPhase("details")}>
            Reserve — {timeLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
