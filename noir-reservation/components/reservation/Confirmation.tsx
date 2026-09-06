"use client";

import { motion } from "framer-motion";
import { CalendarPlus, MapPin, Pencil, X } from "lucide-react";
import { RESTAURANT, formatDateReadable } from "@/lib/mock-data";
import { Reservation } from "@/lib/types";

interface Props {
  reservation: Reservation;
  onModify: () => void;
  onCancel: () => void;
}

function buildICS(reservation: Reservation) {
  const [h, m] = reservation.time.split(":").map(Number);
  const start = new Date(reservation.dateISO + "T00:00:00");
  start.setHours(h, m, 0, 0);
  const end = new Date(start);
  end.setHours(end.getHours() + 2);

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

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

export default function Confirmation({ reservation, onModify, onCancel }: Props) {
  const d = reservation.details;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    RESTAURANT.address
  )}`;

  return (
    <div className="max-w-[520px] mx-auto text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-16 h-16 rounded-full border border-accent flex items-center justify-center mx-auto mb-8"
      >
        <motion.svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-accent"
        >
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
        className="font-display italic text-[32px] mb-3"
      >
        Your table is reserved.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="text-text-muted text-[14px] mb-10"
      >
        We&apos;ll be expecting you, {d.firstName}.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
        className="border border-border px-6 py-6 text-left mb-3"
      >
        <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-[14px]">
          <div>
            <p className="text-[10px] tracking-[0.14em] uppercase text-text-muted mb-1">Date</p>
            <p>{formatDateReadable(reservation.dateISO)}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.14em] uppercase text-text-muted mb-1">Time</p>
            <p>{reservation.timeLabel}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.14em] uppercase text-text-muted mb-1">Guests</p>
            <p>{reservation.guests}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.14em] uppercase text-text-muted mb-1">Restaurant</p>
            <p>{RESTAURANT.name}</p>
          </div>
          <div className="col-span-2">
            <p className="text-[10px] tracking-[0.14em] uppercase text-text-muted mb-1">Address</p>
            <p>{RESTAURANT.address}</p>
          </div>
        </div>
      </motion.div>

      <p className="text-[12px] tracking-[0.1em] uppercase text-text-muted mb-1">
        Reference #{reservation.reference}
      </p>
      <p className="text-[12px] text-text-muted mb-10">
        A confirmation has been sent to {d.phone}.
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => buildICS(reservation)}
          className="focus-ring flex items-center justify-center gap-2 border border-border-strong px-5 py-3.5 text-[12px] tracking-[0.08em] uppercase hover:border-accent hover:text-accent transition-colors"
        >
          <CalendarPlus size={14} /> Add to Calendar
        </button>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring flex items-center justify-center gap-2 border border-border-strong px-5 py-3.5 text-[12px] tracking-[0.08em] uppercase hover:border-accent hover:text-accent transition-colors"
        >
          <MapPin size={14} /> Get Directions
        </a>
      </div>

      <div className="flex items-center justify-center gap-6">
        <button
          onClick={onModify}
          className="focus-ring flex items-center gap-1.5 text-[12px] tracking-[0.08em] uppercase text-text-muted hover:text-text transition-colors"
        >
          <Pencil size={12} /> Modify
        </button>
        <button
          onClick={onCancel}
          className="focus-ring flex items-center gap-1.5 text-[12px] tracking-[0.08em] uppercase text-text-muted hover:text-danger transition-colors"
        >
          <X size={12} /> Cancel
        </button>
      </div>
    </div>
  );
}
