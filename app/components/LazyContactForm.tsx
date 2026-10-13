"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ContactForm = dynamic(() => import("./ContactForm"), {
  ssr: false,
  loading: () => (
    <div
      className="h-56 w-full bg-[color:var(--surface)]"
      aria-hidden
    />
  ),
});

import type { Locale } from "../../lib/i18n/config";

type LazyContactFormProps = {
  locale?: Locale;
};

export default function LazyContactForm({ locale = "en" }: LazyContactFormProps) {
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
        <ContactForm locale={locale} />
      ) : (
        <div
          className="h-56 w-full bg-[color:var(--surface)]"
          aria-hidden
        />
      )}
    </div>
  );
}
