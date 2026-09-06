"use client";

import Link from "next/link";

export default function Nav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="focus-ring font-display text-2xl tracking-[0.02em] italic"
        >
          NOIR
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-[13px] tracking-[0.12em] uppercase text-text-muted">
          <Link href="/reserve" className="focus-ring hover:text-text transition-colors">
            Reserve
          </Link>
          <a href="#about" className="focus-ring hover:text-text transition-colors">
            About
          </a>
          <a href="#location" className="focus-ring hover:text-text transition-colors">
            Location
          </a>
        </nav>
        <Link
          href="/reserve"
          className="focus-ring hidden md:inline-flex border border-border-strong px-5 py-2.5 text-[12px] tracking-[0.12em] uppercase hover:border-accent hover:text-accent transition-colors"
        >
          Reserve a Table
        </Link>
        <Link
          href="/reserve"
          className="focus-ring md:hidden text-[12px] tracking-[0.12em] uppercase border border-border-strong px-4 py-2"
        >
          Reserve
        </Link>
      </div>
    </header>
  );
}
