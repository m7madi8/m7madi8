"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });

/**
 * Loads custom cursor only after pointer interaction (desktop).
 */
export default function LazyCustomCursor() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!media.matches) return;

    const activate = () => {
      setShow(true);
      window.removeEventListener("pointermove", activate);
    };

    window.addEventListener("pointermove", activate, { once: true, passive: true });
    return () => window.removeEventListener("pointermove", activate);
  }, []);

  if (!show) return null;
  return <CustomCursor />;
}
