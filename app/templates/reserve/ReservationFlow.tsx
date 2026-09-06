"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DateSelector from "./DateSelector";
import GuestSelector from "./GuestSelector";
import TimeSlots from "./TimeSlots";
import DetailsForm from "./DetailsForm";
import ReviewSummary from "./ReviewSummary";
import Confirmation from "./Confirmation";
import { IconArrowLeft } from "./Icons";
import {
  makeReference,
  todayISO,
  type GuestDetails,
  type Reservation,
} from "./data";
import { cx } from "./cx";

type Phase = "selecting" | "details" | "review" | "confirmed";

const EMPTY_DETAILS: GuestDetails = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  occasion: "None",
  notes: "",
};

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
  const [timeLabel, setTimeLabel] = useState("");
  const [details, setDetails] = useState<GuestDetails>(EMPTY_DETAILS);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const stepIndex = STEPS.findIndex((s) => s.key === phase);

  const resetAll = () => {
    setPhase("selecting");
    setDateISO(todayISO());
    setGuests(2);
    setTime(null);
    setTimeLabel("");
    setDetails(EMPTY_DETAILS);
    setReservation(null);
  };

  const handleConfirm = () => {
    setSubmitting(true);
    setTimeout(() => {
      setReservation({
        dateISO,
        time: time!,
        timeLabel,
        guests,
        details,
        status: "confirmed",
        reference: makeReference(),
      });
      setSubmitting(false);
      setPhase("confirmed");
    }, 900);
  };

  return (
    <div className="nr-wrap nr-book">
      <div className={cx("nr-book-grid", phase === "confirmed" && "is-wide")}>
        {phase !== "confirmed" ? (
          <div className="nr-book-copy">
            <p className="nr-gold nr-step-index">
              {String(stepIndex + 1).padStart(2, "0")}
              <span> / 03</span>
            </p>
            <h1 className="nr-display">Reserve your table.</h1>
            <p className="nr-book-lead">
              Date, party, time — then we take it from there.
            </p>
            <div className="nr-steps">
              {STEPS.slice(0, 3).map((s, i) => (
                <div key={s.key} className={cx("nr-step", i <= stepIndex && "is-on")}>
                  <i />
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className={cx("nr-panel", phase === "confirmed" && "is-bare")}>
          <AnimatePresence mode="wait">
            {phase === "selecting" ? (
              <motion.div key="selecting" {...fadeSlide} className="nr-stack">
                <DateSelector
                  selectedISO={dateISO}
                  onSelect={(iso) => {
                    setDateISO(iso);
                    setTime(null);
                  }}
                />
                <GuestSelector
                  guests={guests}
                  onChange={(n) => {
                    setGuests(n);
                    setTime(null);
                  }}
                />
                <TimeSlots
                  dateISO={dateISO}
                  guests={guests}
                  selectedTime={time}
                  onSelectTime={(t, label) => {
                    setTime(t);
                    setTimeLabel(label);
                  }}
                  onJumpToDate={(iso) => {
                    setDateISO(iso);
                    setTime(null);
                  }}
                />
                <button
                  type="button"
                  className="nr-btn nr-btn--full nr-focus nr-continue-desk"
                  disabled={!time}
                  onClick={() => setPhase("details")}
                >
                  Continue
                </button>
              </motion.div>
            ) : null}

            {phase === "details" ? (
              <motion.div key="details" {...fadeSlide}>
                <button
                  type="button"
                  className="nr-back-btn nr-focus"
                  onClick={() => setPhase("selecting")}
                >
                  <IconArrowLeft /> Back
                </button>
                <p className="nr-kicker" style={{ marginBottom: 24 }}>
                  Your details
                </p>
                <DetailsForm
                  initial={details}
                  onSubmit={(d) => {
                    setDetails(d);
                    setPhase("review");
                  }}
                />
              </motion.div>
            ) : null}

            {phase === "review" ? (
              <motion.div key="review" {...fadeSlide}>
                <button
                  type="button"
                  className="nr-back-btn nr-focus"
                  onClick={() => setPhase("details")}
                >
                  <IconArrowLeft /> Back
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
            ) : null}

            {phase === "confirmed" && reservation ? (
              <motion.div key="confirmed" {...fadeSlide}>
                <Confirmation
                  reservation={reservation}
                  onModify={() => setPhase("selecting")}
                  onCancel={resetAll}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {phase === "selecting" && time ? (
        <div className="nr-sticky">
          <button
            type="button"
            className="nr-btn nr-btn--full nr-focus"
            onClick={() => setPhase("details")}
          >
            Reserve — {timeLabel}
          </button>
        </div>
      ) : null}
    </div>
  );
}
