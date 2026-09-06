"use client";

import { formatDateReadable, type Reservation } from "./data";

type ReviewSummaryProps = {
  reservation: Reservation;
  onEdit: (step: "date" | "guests" | "time" | "details") => void;
  onConfirm: () => void;
  submitting: boolean;
};

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
    <div className="nr-review-row">
      <div>
        <p className="nr-kicker" style={{ marginBottom: 4 }}>
          {label}
        </p>
        <p>{value}</p>
      </div>
      {onEdit ? (
        <button type="button" className="nr-gold nr-focus" onClick={onEdit}>
          Edit
        </button>
      ) : null}
    </div>
  );
}

export default function ReviewSummary({
  reservation,
  onEdit,
  onConfirm,
  submitting,
}: ReviewSummaryProps) {
  const d = reservation.details;
  return (
    <div>
      <p className="nr-kicker" style={{ marginBottom: 16 }}>
        Your reservation
      </p>
      <div className="nr-review">
        <Row
          label="Date"
          value={formatDateReadable(reservation.dateISO)}
          onEdit={() => onEdit("date")}
        />
        <Row label="Time" value={reservation.timeLabel} onEdit={() => onEdit("time")} />
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
        {d.occasion !== "None" ? <Row label="Occasion" value={d.occasion} /> : null}
        {d.notes ? <Row label="Special request" value={d.notes} /> : null}
      </div>
      <button
        type="button"
        className="nr-btn nr-btn--full nr-focus"
        disabled={submitting}
        onClick={onConfirm}
      >
        {submitting ? "Confirming…" : "Confirm Reservation"}
      </button>
    </div>
  );
}
