"use client";

import { useMemo, useRef } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  selectedISO: string;
  onSelect: (iso: string) => void;
  daysAhead?: number;
}

function buildDays(count: number) {
  const days: { iso: string; dow: string; day: string; month: string; isToday: boolean }[] =
    [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    days.push({
      iso: d.toISOString().slice(0, 10),
      dow: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      day: d.getDate().toString().padStart(2, "0"),
      month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      isToday: i === 0,
    });
  }
  return days;
}

export default function DateSelector({ selectedISO, onSelect, daysAhead = 21 }: Props) {
  const days = useMemo(() => buildDays(daysAhead), [daysAhead]);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (delta: number) => {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  const jumpToday = () => onSelect(days[0].iso);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] tracking-[0.14em] uppercase text-text-muted">
          Select a date
        </span>
        <div className="flex items-center gap-3">
          {selectedISO !== days[0].iso && (
            <button
              onClick={jumpToday}
              className="focus-ring text-[11px] tracking-[0.1em] uppercase text-accent hover:brightness-110"
            >
              Today
            </button>
          )}
          <div className="hidden md:flex items-center gap-1">
            <button
              aria-label="Scroll dates back"
              onClick={() => scrollBy(-240)}
              className="focus-ring p-1.5 border border-border hover:border-accent text-text-muted hover:text-accent transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              aria-label="Scroll dates forward"
              onClick={() => scrollBy(240)}
              className="focus-ring p-1.5 border border-border hover:border-accent text-text-muted hover:text-accent transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1"
      >
        {days.map((d) => {
          const selected = d.iso === selectedISO;
          return (
            <button
              key={d.iso}
              onClick={() => onSelect(d.iso)}
              aria-pressed={selected}
              className={clsx(
                "focus-ring shrink-0 flex flex-col items-center justify-center w-[64px] py-3.5 border transition-all duration-300",
                selected
                  ? "bg-accent border-accent text-[#0a0a0a]"
                  : "border-border text-text hover:border-border-strong"
              )}
            >
              <span
                className={clsx(
                  "text-[10px] tracking-[0.08em]",
                  selected ? "text-[#0a0a0a]/70" : "text-text-muted"
                )}
              >
                {d.dow}
              </span>
              <span className="text-[19px] font-display leading-tight mt-1">
                {d.day}
              </span>
              <span
                className={clsx(
                  "text-[10px] tracking-[0.08em]",
                  selected ? "text-[#0a0a0a]/70" : "text-text-muted"
                )}
              >
                {d.month}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
