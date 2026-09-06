"use client";

import { useMemo, useRef } from "react";
import { cx } from "./cx";
import { toISODate } from "./data";
import { IconChevronLeft, IconChevronRight } from "./Icons";

type DateSelectorProps = {
  selectedISO: string;
  onSelect: (iso: string) => void;
  daysAhead?: number;
};

function buildDays(count: number) {
  const days: {
    iso: string;
    dow: string;
    day: string;
    month: string;
  }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    days.push({
      iso: toISODate(d),
      dow: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      day: d.getDate().toString().padStart(2, "0"),
      month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    });
  }
  return days;
}

export default function DateSelector({
  selectedISO,
  onSelect,
  daysAhead = 21,
}: DateSelectorProps) {
  const days = useMemo(() => buildDays(daysAhead), [daysAhead]);
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="nr-field-head">
        <span className="nr-kicker">Select a date</span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {selectedISO !== days[0].iso ? (
            <button
              type="button"
              className="nr-gold nr-focus"
              onClick={() => onSelect(days[0].iso)}
            >
              Today
            </button>
          ) : null}
          <button
            type="button"
            aria-label="Scroll dates back"
            className="nr-icon-btn nr-focus"
            onClick={() => scrollerRef.current?.scrollBy({ left: -240, behavior: "smooth" })}
          >
            <IconChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Scroll dates forward"
            className="nr-icon-btn nr-focus"
            onClick={() => scrollerRef.current?.scrollBy({ left: 240, behavior: "smooth" })}
          >
            <IconChevronRight />
          </button>
        </div>
      </div>
      <div ref={scrollerRef} className="nr-dates">
        {days.map((d) => (
          <button
            key={d.iso}
            type="button"
            aria-pressed={d.iso === selectedISO}
            className={cx("nr-date nr-focus", d.iso === selectedISO && "is-on")}
            onClick={() => onSelect(d.iso)}
          >
            <small>{d.dow}</small>
            <strong>{d.day}</strong>
            <small>{d.month}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
