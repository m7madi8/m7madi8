"use client";

import { motion } from "framer-motion";
import { formatDateReadable, RESTAURANT, type Reservation } from "./data";
import { IconCalendar, IconClose, IconPencil, IconPin } from "./Icons";

type ConfirmationProps = {
  reservation: Reservation;
  onModify: () => void;
  onCancel: () => void;
};

function buildICS(reservation: Reservation) {
  const [h, m] = reservation.time.split(":").map(Number);
  const start = new Date(`${reservation.dateISO}T00:00:00`);
  start.setHours(h, m, 0, 0);
  const end = new Date(start);
  end.setHours(end.getHours() + 2);

  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `UID:${reservation.reference}@noir-ramallah`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:Reservation at ${RESTAURANT.name}`,
    `LOCATION:${RESTAURANT.address}`,
    `DESCRIPTION:Table for ${reservation.guests}. Reference ${reservation.reference}.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `noir-reservation-${reservation.reference}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Confirmation({
  reservation,
  onModify,
  onCancel,
}: ConfirmationProps) {
  const d = reservation.details;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    RESTAURANT.address
  )}`;

  return (
    <div className="nr-confirm">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="nr-check"
      >
        <motion.svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <motion.path
            d="M4 12l5 5L20 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          />
        </motion.svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="nr-display"
      >
        Your table is reserved.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="nr-note"
      >
        We&apos;ll be expecting you, {d.firstName}.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
        className="nr-confirm-card"
      >
        <div>
          <p className="nr-kicker">Date</p>
          <p>{formatDateReadable(reservation.dateISO)}</p>
        </div>
        <div>
          <p className="nr-kicker">Time</p>
          <p>{reservation.timeLabel}</p>
        </div>
        <div>
          <p className="nr-kicker">Guests</p>
          <p>{reservation.guests}</p>
        </div>
        <div>
          <p className="nr-kicker">Restaurant</p>
          <p>{RESTAURANT.name}</p>
        </div>
        <div className="span-2">
          <p className="nr-kicker">Address</p>
          <p>{RESTAURANT.address}</p>
        </div>
      </motion.div>

      <p className="nr-kicker">Reference #{reservation.reference}</p>
      <p className="nr-note">A confirmation has been sent to {d.phone}.</p>

      <div className="nr-confirm-actions">
        <button type="button" className="nr-ghost nr-focus" onClick={() => buildICS(reservation)}>
          <IconCalendar /> Add to Calendar
        </button>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="nr-ghost nr-focus"
        >
          <IconPin /> Get Directions
        </a>
      </div>

      <div className="nr-confirm-edit">
        <button type="button" className="nr-focus" onClick={onModify}>
          <IconPencil /> Modify
        </button>
        <button type="button" className="nr-focus" onClick={onCancel}>
          <IconClose /> Cancel
        </button>
      </div>
    </div>
  );
}
