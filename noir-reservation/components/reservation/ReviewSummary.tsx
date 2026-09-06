"use client";

import { formatDateReadable } from "@/lib/mock-data";
import Button from "@/components/ui/Button";
import { Reservation } from "@/lib/types";

interface Props {
  reservation: Reservation;
  onEdit: (step: "date" | "guests" | "time" | "details") => void;
  onConfirm: () => void;
  submitting: boolean;
}

function Row({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit?: () => void;
}) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-border last:border-b-0">
      <div>
        <p className="text-[10px] tracking-[0.14em] uppercase text-text-muted mb-1">
          {label}
        </p>
        <p className="text-[15px]">{value}</p>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="focus-ring text-[11px] tracking-[0.08em] uppercase text-accent hover:brightness-110"
        >
          Edit
        </button>
      )}
    </div>
  );
}

export default function ReviewSummary({
  reservation,
  onEdit,
  onConfirm,
  submitting,
}: Props) {
  const d = reservation.details;
  return (
    <div>
      <p className="text-[11px] tracking-[0.14em] uppercase text-text-muted mb-4">
        Your reservation
      </p>
      <div className="border border-border px-6 mb-8">
        <Row
          label="Date"
          value={formatDateReadable(reservation.dateISO)}
          onEdit={() => onEdit("date")}
        />
        <Row
          label="Time"
          value={reservation.timeLabel}
          onEdit={() => onEdit("time")}
        />
        <Row
          label="Party size"
          value={`${reservation.guests} ${reservation.guests === 1 ? "guest" : "guests"}`}
          onEdit={() => onEdit("guests")}
        />
        <Row
          label="Guest"
          value={`${d.firstName} ${d.lastName}`}
          onEdit={() => onEdit("details")}
        />
        <Row label="Contact" value={`${d.phone} · ${d.email}`} />
        {d.occasion !== "None" && <Row label="Occasion" value={d.occasion} />}
        {d.notes && <Row label="Special request" value={d.notes} />}
      </div>

      <Button
        onClick={onConfirm}
        disabled={submitting}
        fullWidth
        variant="primary"
      >
        {submitting ? "Confirming…" : "Confirm Reservation"}
      </Button>
    </div>
  );
}
