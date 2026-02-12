"use client";

import { useEffect } from "react";

export default function NoCopy() {
  useEffect(() => {
    const prevent = (e: ClipboardEvent) => e.preventDefault();
    document.addEventListener("copy", prevent);
    document.addEventListener("cut", prevent);
    return () => {
      document.removeEventListener("copy", prevent);
      document.removeEventListener("cut", prevent);
    };
  }, []);
  return null;
}
