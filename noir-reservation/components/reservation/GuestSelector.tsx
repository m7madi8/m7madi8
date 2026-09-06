"use client";

import clsx from "clsx";
import { Minus, Plus } from "lucide-react";

interface Props {
  guests: number;
  onChange: (n: number) => void;
}

const PRESETS = [1, 2, 3, 4, 5, 6, 7];

export default function GuestSelector({ guests, onChange }: Props) {
  const isLarge = guests >= 8;

  return (
    <div>
      <span className="text-[11px] tracking-[0.14em] uppercase text-text-muted mb-3 block">
        Party size
      </span>

      <div className="flex items-center justify-between border border-border px-5 py-4 mb-4">
        <button
          aria-label="Decrease guests"
          onClick={() => onChange(Math.max(1, guests - 1))}
          disabled={guests <= 1}
          className="focus-ring p-2 text-text-muted hover:text-accent disabled:opacity-30 disabled:hover:text-text-muted transition-colors"
        >
          <Minus size={16} />
        </button>
        <span className="font-display text-[22px] italic">
          {guests} {guests === 1 ? "Guest" : "Guests"}
        </span>
        <button
          aria-label="Increase guests"
          onClick={() => onChange(Math.min(12, guests + 1))}
          disabled={guests >= 12}
          className="focus-ring p-2 text-text-muted hover:text-accent disabled:opacity-30 disabled:hover:text-text-muted transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-pressed={guests === p}
            className={clsx(
              "focus-ring min-w-[44px] px-3 py-2.5 text-[13px] border transition-colors",
              guests === p
                ? "bg-accent border-accent text-[#0a0a0a]"
                : "border-border text-text-muted hover:border-border-strong hover:text-text"
            )}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onChange(8)}
          aria-pressed={isLarge}
          className={clsx(
            "focus-ring px-3 py-2.5 text-[13px] border transition-colors",
            isLarge
              ? "bg-accent border-accent text-[#0a0a0a]"
              : "border-border text-text-muted hover:border-border-strong hover:text-text"
          )}
        >
          8+
        </button>
      </div>

      {isLarge && (
        <p className="mt-3 text-[13px] text-text-muted leading-relaxed">
          For parties of 8 or more,{" "}
          <a href="tel:+97022401188" className="focus-ring text-accent hover:brightness-110">
            contact us directly
          </a>{" "}
          — we&apos;ll arrange the right table for your group.
        </p>
      )}
    </div>
  );
}
