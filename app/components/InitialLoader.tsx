"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";

const MIN_SHOW_MS = 500;

type Phase = "show" | "hide" | "gone";

export default function InitialLoader() {
  const [phase, setPhase] = useState<Phase>("show");

  useEffect(() => {
    const startHide = () => {
      setPhase("hide");
    };

    const onLoad = () => {
      setTimeout(startHide, MIN_SHOW_MS);
    };

    if (document.readyState === "complete") {
      const t = setTimeout(startHide, MIN_SHOW_MS);
      return () => clearTimeout(t);
    }

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
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
      aria-hidden="true"
    >
      <Loader />
    </div>
  );
}
