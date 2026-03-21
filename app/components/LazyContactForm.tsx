"use client";

import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("./ContactForm"), {
  ssr: false,
  loading: () => (
    <div
      className="h-40 max-w-2xl animate-pulse rounded-2xl bg-[color:var(--surface)]"
      aria-hidden
    />
  ),
});

export default function LazyContactForm() {
  return <ContactForm />;
}
