"use client";

import Image from "next/image";
import logoMe from "../../img/logo-me.png";

export default function Loader() {
  return (
    <div
      className="loader-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[color:var(--background)]"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="absolute left-0 top-0 h-[2px] w-full overflow-hidden bg-[color:var(--border)]">
        <div
          className="loader-progress-bar h-full bg-[color:var(--accent)]"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading progress"
        />
      </div>
      <div className="loader-logo-wrap relative">
        <Image
          src={logoMe}
          alt=""
          width={120}
          height={120}
          className="loader-logo object-contain"
          priority
          aria-hidden
        />
      </div>
    </div>
  );
}
