"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Magnetic from "./Magnetic";
import { LINKS_CHANNELS } from "./links-data";

function ChannelArrow({ external }: { external: boolean }) {
  return (
    <span className="links-channel-action" aria-hidden>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        {external ? (
          <path
            d="M5.5 2.5H2.75A1.25 1.25 0 0 0 1.5 3.75v7.5c0 .69.56 1.25 1.25 1.25h7.5c.69 0 1.25-.56 1.25-1.25V8.5M8.5 1.5h4v4M5.5 8.5 12.5 1.5"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M2.5 7h9M8 3.5 11.5 7 8 10.5"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </span>
  );
}

export default function LinksChannels() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".links-channel",
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.45,
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={rootRef}
      id="channels"
      className="links-channels"
      aria-label="Links"
    >
      <ul className="links-channel-list">
        {LINKS_CHANNELS.map((channel) => {
          const isMail = channel.href.startsWith("mailto:");
          const showExternal = Boolean(channel.external && !isMail);

          const inner = (
            <>
              <span className="links-channel-index">{channel.mark}</span>
              <span className="links-channel-body">
                <span className="links-channel-label">{channel.label}</span>
                <span className="links-channel-hint">{channel.hint}</span>
              </span>
              <ChannelArrow external={showExternal} />
            </>
          );

          return (
            <li key={channel.id} className="links-channel">
              <Magnetic strength={0.18}>
                {channel.external ? (
                  <a
                    href={channel.href}
                    className="links-channel-link"
                    target={isMail ? undefined : "_blank"}
                    rel={isMail ? undefined : "noreferrer"}
                    data-cursor
                  >
                    {inner}
                  </a>
                ) : (
                  <Link href={channel.href} className="links-channel-link" data-cursor>
                    {inner}
                  </Link>
                )}
              </Magnetic>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
