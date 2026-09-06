"use client";

import Link from "next/link";

export default function MobileReserveBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-bg/95 backdrop-blur px-5 py-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
      <Link
        href="/reserve"
        className="focus-ring flex items-center justify-center w-full bg-accent text-[#0a0a0a] py-4 text-[13px] tracking-[0.1em] uppercase font-medium active:scale-[0.98] transition-transform"
      >
        Reserve a Table
      </Link>
    </div>
  );
}
