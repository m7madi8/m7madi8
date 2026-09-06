"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import {
  formatDateReadable,
  getMockAvailability,
  nextAvailableSlot,
} from "@/lib/mock-data";
import { LoadState, TimeSlot } from "@/lib/types";

interface Props {
  dateISO: string;
  guests: number;
  selectedTime: string | null;
  onSelectTime: (time: string, label: string) => void;
  onJumpToDate: (dateISO: string) => void;
}

export default function TimeSlots({
  dateISO,
  guests,
  selectedTime,
  onSelectTime,
  onJumpToDate,
}: Props) {
  const [attempt, setAttempt] = useState(0);
  const queryKey = `${dateISO}|${guests}|${attempt}`;

  // Result of the most recently *completed* fetch (or null before the first
  // one resolves). Loading is derived by comparing its key to the current
  // query, rather than tracked as separate state set inside the effect.
  const [result, setResult] = useState<{
    key: string;
    status: "loaded" | "error";
    slots: TimeSlot[];
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) return;
      // small deterministic-ish failure chance to demonstrate the error state
      const shouldFail = attempt === 0 && Math.random() < 0.08;
      if (shouldFail) {
        setResult({ key: queryKey, status: "error", slots: [] });
        return;
      }
      const data = getMockAvailability(dateISO, guests);
      setResult({ key: queryKey, status: "loaded", slots: data.slots });
    }, 550);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [queryKey, dateISO, guests, attempt]);

  const state: LoadState =
    result?.key === queryKey ? result.status : "loading";
  const slots = result?.key === queryKey ? result.slots : [];

  const retry = () => setAttempt((a) => a + 1);

  const allBooked = state === "loaded" && slots.every((s) => s.status === "unavailable");
  const selectedSlot = slots.find((s) => s.time === selectedTime);
  const selectedUnavailable = selectedTime && selectedSlot?.status === "unavailable";

  const nearestAlternatives = (() => {
    if (!selectedUnavailable) return [];
    const idx = slots.findIndex((s) => s.time === selectedTime);
    const candidates = [...slots.slice(idx + 1), ...slots.slice(0, idx).reverse()];
    return candidates.filter((s) => s.status !== "unavailable").slice(0, 2);
  })();

  const nextElsewhere = selectedUnavailable || allBooked
    ? nextAvailableSlot(dateISO, guests)
    : null;

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-[11px] tracking-[0.14em] uppercase text-text-muted">
          Dinner · {formatDateReadable(dateISO)}
        </span>
      </div>

      {state === "loading" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-[58px] border border-border bg-surface animate-pulse"
              style={{ animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
      )}

      {state === "loading" && (
        <p className="mt-3 text-[13px] text-text-muted italic font-display">
          Finding your table…
        </p>
      )}

      {state === "error" && (
        <div className="border border-border px-6 py-10 text-center">
          <p className="text-[15px] mb-1">We couldn&apos;t load availability.</p>
          <p className="text-[13px] text-text-muted mb-5">
            A connection issue on our end — nothing wrong with your request.
          </p>
          <button
            onClick={retry}
            className="focus-ring inline-flex items-center gap-2 border border-border-strong px-5 py-2.5 text-[12px] tracking-[0.1em] uppercase hover:border-accent hover:text-accent transition-colors"
          >
            <RefreshCw size={13} /> Try again
          </button>
        </div>
      )}

      {state === "loaded" && !allBooked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2"
        >
          {slots.map((slot) => {
            const isSelected = slot.time === selectedTime;
            const disabled = slot.status === "unavailable";
            return (
              <button
                key={slot.time}
                disabled={disabled}
                onClick={() => onSelectTime(slot.time, slot.label)}
                aria-pressed={isSelected}
                className={clsx(
                  "focus-ring flex flex-col items-center justify-center gap-1 py-3.5 border text-[13px] transition-all duration-200",
                  disabled &&
                    "border-border/50 text-text-muted/40 cursor-not-allowed line-through decoration-1",
                  !disabled &&
                    !isSelected &&
                    "border-border text-text hover:border-border-strong",
                  isSelected && "bg-accent border-accent text-[#0a0a0a]"
                )}
              >
                <span>{slot.label}</span>
                {!disabled && slot.status === "limited" && !isSelected && (
                  <span className="text-[10px] tracking-[0.06em] uppercase text-accent">
                    Few tables
                  </span>
                )}
                {!disabled && slot.status === "available" && !isSelected && (
                  <span className="text-[10px] tracking-[0.06em] uppercase text-text-muted">
                    Available
                  </span>
                )}
                {disabled && (
                  <span className="text-[10px] tracking-[0.06em] uppercase">
                    Fully booked
                  </span>
                )}
              </button>
            );
          })}
        </motion.div>
      )}

      {state === "loaded" && allBooked && (
        <div className="border border-border px-6 py-12 text-center">
          <p className="font-display italic text-[20px] mb-2">
            Tonight is fully booked.
          </p>
          {nextElsewhere ? (
            <>
              <p className="text-[13px] text-text-muted mb-5">
                Good news — we found availability{" "}
                {nextElsewhere.dateISO === dateISO
                  ? "later this evening"
                  : `on ${formatDateReadable(nextElsewhere.dateISO)}`}{" "}
                at {nextElsewhere.label}.
              </p>
              <button
                onClick={() => onJumpToDate(nextElsewhere.dateISO)}
                className="focus-ring border border-border-strong px-5 py-2.5 text-[12px] tracking-[0.1em] uppercase hover:border-accent hover:text-accent transition-colors"
              >
                View {formatDateReadable(nextElsewhere.dateISO)}
              </button>
            </>
          ) : (
            <p className="text-[13px] text-text-muted">
              Please call us at +970 2 240 1188 and we&apos;ll do our best to
              find you a table.
            </p>
          )}
        </div>
      )}

      <AnimatePresence>
        {selectedUnavailable && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 border border-accent/30 bg-accent-dim px-5 py-4"
          >
            <p className="text-[13px] mb-3">
              {selectedSlot?.label} is fully booked.
            </p>
            <div className="flex flex-wrap gap-2">
              {nearestAlternatives.map((alt) => (
                <button
                  key={alt.time}
                  onClick={() => onSelectTime(alt.time, alt.label)}
                  className="focus-ring border border-accent/50 text-accent px-4 py-2 text-[12px] tracking-[0.06em] uppercase hover:bg-accent hover:text-[#0a0a0a] transition-colors"
                >
                  Try {alt.label}
                </button>
              ))}
              {nextElsewhere && nextElsewhere.dateISO !== dateISO && (
                <button
                  onClick={() => onJumpToDate(nextElsewhere.dateISO)}
                  className="focus-ring border border-border-strong px-4 py-2 text-[12px] tracking-[0.06em] uppercase text-text-muted hover:text-text transition-colors"
                >
                  Next available: {formatDateReadable(nextElsewhere.dateISO)} at{" "}
                  {nextElsewhere.label}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
