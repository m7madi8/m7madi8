"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export type ShowcaseItem = {
  slug: string;
  title: string;
  context: string;
  summary: string;
  image: StaticImageData;
  tech: string;
  href: string;
  external?: boolean;
};

type Props = {
  items: ShowcaseItem[];
};

export default function LinksShowcase({ items }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onWheel = (e: WheelEvent) => {
      const canScroll = scroller.scrollWidth > scroller.clientWidth + 4;
      if (!canScroll) return;

      const atStart = scroller.scrollLeft <= 0;
      const atEnd =
        scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 2;

      const mostlyVertical = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      if (!mostlyVertical) return;

      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;

      e.preventDefault();
      scroller.scrollLeft += e.deltaY;
    };

    scroller.addEventListener("wheel", onWheel, { passive: false });
    return () => scroller.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="links-showcase" aria-label="Featured work">
      <p className="links-show-kicker">Selected work · scroll sideways</p>

      <div
        ref={scrollerRef}
        className="links-show-viewport"
        tabIndex={0}
        aria-label="Project gallery — scroll horizontally"
      >
        <div className="links-show-track">
          {items.map((item, index) => {
            const content = (
              <>
                <div className="links-show-media">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="links-show-image object-cover"
                    sizes="(max-width: 768px) 70vw, 28vw"
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <div className="links-show-media-veil" aria-hidden />
                  <div className="links-show-overlay">
                    <span className="links-show-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="links-show-cat">{item.context}</span>
                  </div>
                </div>
                <div className="links-show-meta">
                  <h3 className="links-show-title">{item.title}</h3>
                  <div className="links-show-footer">
                    <span className="links-show-tech">{item.tech}</span>
                    <span className="links-show-cta">
                      View
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden
                      >
                        {item.external ? (
                          <path
                            d="M5.5 2.5H2.75A1.25 1.25 0 0 0 1.5 3.75v7.5c0 .69.56 1.25 1.25 1.25h7.5c.69 0 1.25-.56 1.25-1.25V8.5M8.5 1.5h4v4M5.5 8.5 12.5 1.5"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        ) : (
                          <path
                            d="M2.5 7h9M8 3.5 11.5 7 8 10.5"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        )}
                      </svg>
                    </span>
                  </div>
                </div>
              </>
            );

            return (
              <article key={item.slug} className="links-show-card">
                {item.external ? (
                  <a
                    href={item.href}
                    className="links-show-card-link"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="links-show-card-link"
                    data-cursor
                  >
                    {content}
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
