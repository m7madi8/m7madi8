"use client";

export default function Loader() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[color:var(--background)]"
      aria-live="polite"
      aria-label="Loading"
    >
      {/* Top progress bar */}
      <div className="absolute left-0 top-0 h-0.5 w-full overflow-hidden bg-[color:var(--border)]">
        <div
          className="loader-progress h-full bg-[color:var(--accent)]"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading progress"
        />
      </div>

      {/* Centered content */}
      <div className="flex flex-col items-center gap-8">
        <p className="eyebrow text-[color:var(--muted)]">Loading</p>
        <div className="flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] loader-dot"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] loader-dot"
            style={{ animationDelay: "160ms" }}
          />
          <span
            className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] loader-dot"
            style={{ animationDelay: "320ms" }}
          />
        </div>
      </div>
    </div>
  );
}
