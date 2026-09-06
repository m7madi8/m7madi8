"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cx } from "./cx";
import {
  formatDateReadable,
  getMockAvailability,
  nextAvailableSlot,
  type TimeSlot,
} from "./data";
import { IconRefresh } from "./Icons";

type LoadState = "loading" | "loaded" | "error";

type TimeSlotsProps = {
  dateISO: string;
  guests: number;
  selectedTime: string | null;
  onSelectTime: (time: string, label: string) => void;
  onJumpToDate: (dateISO: string) => void;
};

export default function TimeSlots({
  dateISO,
  guests,
  selectedTime,
  onSelectTime,
  onJumpToDate,
}: TimeSlotsProps) {
  const [attempt, setAttempt] = useState(0);
  const queryKey = `${dateISO}|${guests}|${attempt}`;
  const [result, setResult] = useState<{
    key: string;
    status: "loaded" | "error";
    slots: TimeSlot[];
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) return;
      const data = getMockAvailability(dateISO, guests);
      setResult({ key: queryKey, status: "loaded", slots: data.slots });
    }, 450);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [queryKey, dateISO, guests]);

  const state: LoadState = result?.key === queryKey ? result.status : "loading";
  const slots = result?.key === queryKey ? result.slots : [];
  const allBooked = state === "loaded" && slots.every((s) => s.status === "unavailable");
  const selectedSlot = slots.find((s) => s.time === selectedTime);
  const selectedUnavailable = Boolean(
    selectedTime && selectedSlot?.status === "unavailable"
  );
  const nextElsewhere =
    selectedUnavailable || allBooked ? nextAvailableSlot(dateISO, guests) : null;

  return (
    <div>
      <div className="nr-field-head">
        <span className="nr-kicker">Dinner · {formatDateReadable(dateISO)}</span>
      </div>

      {state === "loading" ? (
        <>
          <div className="nr-slots">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="nr-skel" />
            ))}
          </div>
          <p className="nr-note nr-display">Finding your table…</p>
        </>
      ) : null}

      {state === "error" ? (
        <div className="nr-error">
          <p>We couldn&apos;t load availability.</p>
          <p className="nr-note">A connection issue on our end — nothing wrong with your request.</p>
          <button type="button" className="nr-ghost nr-focus" onClick={() => setAttempt((a) => a + 1)}>
            <IconRefresh /> Try again
          </button>
        </div>
      ) : null}

      {state === "loaded" && !allBooked ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="nr-slots"
        >
          {slots.map((slot) => {
            const isSelected = slot.time === selectedTime;
            const disabled = slot.status === "unavailable";
            return (
              <button
                key={slot.time}
                type="button"
                disabled={disabled}
                aria-pressed={isSelected}
                className={cx(
                  "nr-slot nr-focus",
                  disabled && "is-off",
                  isSelected && "is-on",
                  slot.status === "limited" && !isSelected && "is-limited"
                )}
                onClick={() => onSelectTime(slot.time, slot.label)}
              >
                <span>{slot.label}</span>
                <small>
                  {disabled
                    ? "Fully booked"
                    : slot.status === "limited"
                      ? "Few tables"
                      : "Available"}
                </small>
              </button>
            );
          })}
        </motion.div>
      ) : null}

      {state === "loaded" && allBooked ? (
        <div className="nr-empty">
          <p className="nr-display">Tonight is fully booked.</p>
          {nextElsewhere ? (
            <>
              <p className="nr-note">
                Good news — we found availability on {formatDateReadable(nextElsewhere.dateISO)} at{" "}
                {nextElsewhere.label}.
              </p>
              <button
                type="button"
                className="nr-ghost nr-focus"
                onClick={() => onJumpToDate(nextElsewhere.dateISO)}
              >
                View {formatDateReadable(nextElsewhere.dateISO)}
              </button>
            </>
          ) : (
            <p className="nr-note">Please call us at +970 2 240 1188 and we&apos;ll do our best.</p>
          )}
        </div>
      ) : null}

      <AnimatePresence>
        {selectedUnavailable ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="nr-note"
          >
            <p>{selectedSlot?.label} is fully booked.</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
