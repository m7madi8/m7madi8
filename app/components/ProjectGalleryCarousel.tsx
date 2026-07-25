"use client";

import Image, { type StaticImageData } from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";

export type GallerySlide = {
  src: StaticImageData;
  alt: string;
  label?: string;
};

type ProjectGalleryCarouselProps = {
  items: GallerySlide[];
  title?: string;
  description?: string;
};

export default function ProjectGalleryCarousel({
  items,
  title = "Mobile experience",
  description = "Key flows across product, cart, and checkout — designed for conversion on small screens.",
}: ProjectGalleryCarouselProps) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const count = items.length;
  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  if (count === 0) return null;

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const onTouchMove = (e: TouchEvent) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    const dx = touchDeltaX.current;
    touchStartX.current = null;
    touchDeltaX.current = 0;
    if (Math.abs(dx) < 40) return;
    if (dx > 0) prev();
    else next();
  };

  const active = items[index];

  return (
    <section
      className="case-carousel reveal"
      data-reveal
      aria-roledescription="carousel"
      aria-label="Project interface mockups"
    >
      <div className="case-carousel-header">
        <div className="case-carousel-heading">
          <p className="eyebrow">Interfaces</p>
          <h2 className="case-carousel-title">{title}</h2>
          <p className="case-carousel-copy">{description}</p>
        </div>

        <div className="case-carousel-controls">
          <span className="case-carousel-count" aria-live="polite">
            {String(index + 1).padStart(2, "0")}
            <span aria-hidden> / </span>
            {String(count).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="case-carousel-nav"
            onClick={prev}
            aria-label="Previous interface"
            data-cursor
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M10 3.5 5.5 8 10 12.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="case-carousel-nav"
            onClick={next}
            aria-label="Next interface"
            data-cursor
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M6 3.5 10.5 8 6 12.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="case-carousel-viewport"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="case-carousel-track"
          style={{
            transform: `translateX(calc(50% - ${index} * var(--slide-span) - var(--slide-span) / 2))`,
          }}
        >
          {items.map((item, i) => {
            const offset = i - index;
            const state =
              offset === 0 ? "is-active" : Math.abs(offset) === 1 ? "is-near" : "is-far";

            return (
              <figure
                key={item.alt}
                className={`case-carousel-slide ${state}`}
                aria-hidden={i !== index}
                onClick={() => goTo(i)}
              >
                <div className="phone-device">
                  <div className="phone-device-shell">
                    <div className="phone-device-island" aria-hidden />
                    <div className="phone-device-screen">
                      {Math.abs(offset) <= 1 ? (
                        <Image
                          src={item.src}
                          alt={item.alt}
                          className="phone-device-image"
                          sizes="(max-width: 640px) 200px, 260px"
                          placeholder="blur"
                          loading={i === index ? "eager" : "lazy"}
                          priority={i === 0 && index === 0}
                          decoding="async"
                        />
                      ) : (
                        <div
                          className="phone-device-image phone-device-image--placeholder"
                          aria-hidden
                        />
                      )}
                    </div>
                  </div>
                </div>
              </figure>
            );
          })}
        </div>
      </div>

      <div className="case-carousel-footer">
        <p className="case-carousel-label">{active.label ?? active.alt}</p>
        <div className="case-carousel-dots" role="tablist" aria-label="Interface slides">
          {items.map((item, i) => (
            <button
              key={item.alt}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={item.label ?? `Show slide ${i + 1}`}
              className={`case-carousel-dot${i === index ? " is-active" : ""}`}
              onClick={() => goTo(i)}
              data-cursor
            />
          ))}
        </div>
      </div>
    </section>
  );
}
