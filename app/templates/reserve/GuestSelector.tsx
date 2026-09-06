"use client";

import { cx } from "./cx";
import { RESTAURANT } from "./data";
import { IconMinus, IconPlus } from "./Icons";

const PRESETS = [1, 2, 3, 4, 5, 6, 7];

type GuestSelectorProps = {
  guests: number;
  onChange: (n: number) => void;
};

export default function GuestSelector({ guests, onChange }: GuestSelectorProps) {
  const isLarge = guests >= 8;

  return (
    <div>
      <span className="nr-kicker" style={{ display: "block", marginBottom: 12 }}>
        Party size
      </span>
      <div className="nr-guest-bar">
        <button
          type="button"
          aria-label="Decrease guests"
          className="nr-focus"
          disabled={guests <= 1}
          onClick={() => onChange(Math.max(1, guests - 1))}
        >
          <IconMinus />
        </button>
        <span>
          {guests} {guests === 1 ? "Guest" : "Guests"}
        </span>
        <button
          type="button"
          aria-label="Increase guests"
          className="nr-focus"
          disabled={guests >= 12}
          onClick={() => onChange(Math.min(12, guests + 1))}
        >
          <IconPlus />
        </button>
      </div>
      <div className="nr-pills">
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            aria-pressed={guests === p}
            className={cx("nr-pill nr-focus", guests === p && "is-on")}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          aria-pressed={isLarge}
          className={cx("nr-pill nr-focus", isLarge && "is-on")}
          onClick={() => onChange(8)}
        >
          8+
        </button>
      </div>
      {isLarge ? (
        <p className="nr-note">
          For parties of 8 or more,{" "}
          <a href={`tel:${RESTAURANT.phoneTel}`} className="nr-gold nr-focus">
            contact us directly
          </a>{" "}
          — we&apos;ll arrange the right table for your group.
        </p>
      ) : null}
    </div>
  );
}
