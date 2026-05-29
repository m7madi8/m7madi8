"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ContactForm = dynamic(() => import("./ContactForm"), {
  ssr: false,
  loading: () => (
    <div
      className="h-40 w-full animate-pulse rounded-2xl bg-[color:var(--surface)]"
      aria-hidden
    />
  ),
});

export default function LazyContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {visible ? (
        <ContactForm />
      ) : (
        <div
          className="h-40 w-full animate-pulse rounded-2xl bg-[color:var(--surface)]"
          aria-hidden
        />
      )}
    </div>
  );
}
