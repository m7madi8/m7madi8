"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";

const MIN_SHOW_MS = 350;
const MAX_SHOW_MS = 1200;

type Phase = "show" | "hide" | "gone";

export default function InitialLoader() {
  const [phase, setPhase] = useState<Phase>("show");

  useEffect(() => {
    const start = Date.now();
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_SHOW_MS - elapsed);
      window.setTimeout(() => setPhase("hide"), wait);
    };

    const maxTimer = window.setTimeout(finish, MAX_SHOW_MS);

    if (document.readyState === "interactive" || document.readyState === "complete") {
      finish();
    } else {
      document.addEventListener("DOMContentLoaded", finish, { once: true });
    }

    return () => {
      done = true;
      window.clearTimeout(maxTimer);
      document.removeEventListener("DOMContentLoaded", finish);
    };
  }, []);

  const onTransitionEnd = () => {
    if (phase === "hide") setPhase("gone");
  };

  if (phase === "gone") return null;

  return (
    <div
      className="initial-loader-overlay"
      data-phase={phase}
      onTransitionEnd={onTransitionEnd}
      role="status"
      aria-live="polite"
      aria-label="Loading site"
    >
      <Loader />
    </div>
  );
}
