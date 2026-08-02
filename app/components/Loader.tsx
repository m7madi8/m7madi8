"use client";

import BrandMark from "./BrandMark";

export default function Loader() {
  return (
    <div
      className="loader-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[color:var(--background)]"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="absolute left-0 top-0 h-[2px] w-full overflow-hidden bg-[color:var(--border)]">
        <div className="loader-progress-bar h-full bg-[color:var(--accent)]" aria-hidden />
      </div>
      <div className="loader-logo-wrap relative">
        <BrandMark
          href={null}
          size="xl"
          tone="light"
          animate
          className="loader-brand-mark"
          aria-label="m."
        />
      </div>
    </div>
  );
}
