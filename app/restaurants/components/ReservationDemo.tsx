"use client";

import { useMemo, useState } from "react";
import { reservationGuests, reservationTimes } from "../data";

export default function ReservationDemo() {
  const [guest, setGuest] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const ready = guest !== null && time !== null;

  const summary = useMemo(() => {
    if (guest === null || !time) return "";
    return `Table for ${guest} — ${time}`;
  }, [guest, time]);

  return (
    <div className="r-phone r-resv">
      <div className="r-phone-bar" aria-hidden>
        <span>9:41</span>
        <span className="r-phone-island" />
        <span>100%</span>
      </div>

      <p className="r-resv-label">Party</p>
      <div className="r-resv-row">
        {reservationGuests.map((n) => (
          <button
            key={n}
            type="button"
            className={`r-pill${guest === n ? " is-selected" : ""}`}
            onClick={() => {
              setGuest(n);
              setConfirmed(false);
            }}
          >
            {n} guests
          </button>
        ))}
      </div>

      <p className="r-resv-label">Time</p>
      <div className="r-resv-row">
        {reservationTimes.map((t) => (
          <button
            key={t}
            type="button"
            className={`r-pill${time === t ? " is-selected" : ""}`}
            onClick={() => {
              setTime(t);
              setConfirmed(false);
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="r-resv-btn"
        disabled={!ready}
        onClick={() => setConfirmed(true)}
      >
        Confirm
      </button>

      {confirmed && summary ? (
        <div className="r-resv-confirm">
          <p>{summary}</p>
        </div>
      ) : null}
    </div>
  );
}
