"use client";

import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import {
  cafeCats,
  cafeMenu,
  cafePlace,
  type CafeCategory,
  type CafeItem,
} from "./data";

function IconLeaf() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.5 4.2c-4.2.3-8.1 2.6-10.4 6.2-1.6 2.5-2.1 5.5-1.4 8.3 2.8.7 5.8.2 8.3-1.4 3.6-2.3 5.9-6.2 6.2-10.4-1 .3-2 .4-2.7.4-2.6 0-5-1.1-6.7-3 .8-.2 1.7-.2 2.7-.1Z"
      />
    </svg>
  );
}

function IconStar() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="m12 3.2 2.1 5.4 5.8.4-4.5 3.7 1.5 5.6L12 15.6 6.9 18.3l1.5-5.6L4 9l5.9-.4L12 3.2Z"
      />
    </svg>
  );
}

function IconBloom() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3c.7 2.8 2.4 4.6 5 5.2-2.6.6-4.3 2.4-5 5.2-.7-2.8-2.4-4.6-5-5.2C9.6 7.6 11.3 5.8 12 3Zm0 8.5c.5 2 1.7 3.3 3.6 3.8-1.9.5-3.1 1.8-3.6 3.8-.5-2-1.7-3.3-3.6-3.8 1.9-.5 3.1-1.8 3.6-3.8Z"
      />
    </svg>
  );
}

function Marks({ item }: { item: CafeItem }) {
  const marks = [
    item.seasonal ? { key: "season", label: "موسمي", icon: <IconBloom /> } : null,
    item.signature ? { key: "sig", label: "توقيع", icon: <IconStar /> } : null,
    item.plant ? { key: "plant", label: "نباتي", icon: <IconLeaf /> } : null,
  ].filter(Boolean) as { key: string; label: string; icon: ReactNode }[];

  if (!marks.length) return null;

  return (
    <ul className="cf-marks">
      {marks.map((mark) => (
        <li key={mark.key} title={mark.label}>
          <span className={`cf-mark is-${mark.key}`}>{mark.icon}</span>
        </li>
      ))}
    </ul>
  );
}

function ItemCard({ item }: { item: CafeItem }) {
  return (
    <article className={`cf-card${item.featured ? " is-featured" : ""}`}>
      <div className="cf-card-media">
        <Image src={item.img} alt={item.nameAr} width={900} height={720} unoptimized />
        <span className="cf-card-num">{item.num}</span>
        {item.seasonal ? <span className="cf-ribbon">موسم</span> : null}
      </div>
      <div className="cf-card-body">
        <div className="cf-card-row">
          <h2>{item.nameAr}</h2>
          <p className="cf-price">
            {item.price}
            <span>₪</span>
          </p>
        </div>
        <p className="cf-en">{item.name}</p>
        <p className="cf-desc">{item.ingredients.join(" · ")}</p>
        <Marks item={item} />
      </div>
    </article>
  );
}

export default function CafeMenu() {
  const rootRef = useRef<HTMLDivElement>(null);
  const introDone = useRef(false);
  const [cat, setCat] = useState<"all" | CafeCategory>("all");

  const items = useMemo(
    () => (cat === "all" ? cafeMenu : cafeMenu.filter((item) => item.category === cat)),
    [cat]
  );

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cards = root.querySelectorAll(".cf-card");
      const media = root.querySelectorAll(".cf-card-media");
      const images = root.querySelectorAll(".cf-card-media img");
      const copy = root.querySelectorAll(".cf-card-body");

      if (!introDone.current) {
        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
        intro
          .from(".cf-dot", { scale: 0, duration: 0.5, ease: "back.out(2.2)" })
          .from(
            ".cf-logo-letters span",
            {
              yPercent: 110,
              opacity: 0,
              rotateX: -55,
              stagger: 0.05,
              duration: 0.8,
              transformOrigin: "50% 100%",
            },
            "-=0.25"
          )
          .from(".cf-logo em", { y: 10, opacity: 0, duration: 0.45 }, "-=0.4")
          .from([".cf-back", ".cf-top-meta"], { opacity: 0, duration: 0.4 }, "-=0.35")
          .from(".cf-cat", { y: 16, opacity: 0, stagger: 0.05, duration: 0.45 }, "-=0.25");
        introDone.current = true;
      }

      gsap.fromTo(
        cards,
        { y: 64, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: "power4.out",
          clearProps: "transform,opacity",
        }
      );

      gsap.fromTo(
        media,
        { clipPath: "inset(16% 10% 16% 10% round 24px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          duration: 1.1,
          stagger: 0.08,
          ease: "power4.inOut",
          clearProps: "clipPath",
        }
      );

      gsap.fromTo(
        images,
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1.3,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform",
        }
      );

      gsap.fromTo(
        copy,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          delay: 0.16,
          ease: "power3.out",
          clearProps: "transform,opacity",
        }
      );
    }, root);

    return () => ctx.revert();
  }, [items]);

  return (
    <div className="cf" ref={rootRef}>
      <header className="cf-top">
        <Link href="/restaurants" className="cf-back">
          المعرض
        </Link>
        <div className="cf-logo">
          <strong className="cf-logo-letters" dir="ltr" aria-label={cafePlace.name}>
            <i className="cf-dot" aria-hidden />
            {cafePlace.name.split("").map((letter, index) => (
              <span key={`${letter}-${index}`}>{letter}</span>
            ))}
          </strong>
          <em>{cafePlace.nameAr}</em>
        </div>
        <span className="cf-top-meta">{cafePlace.city}</span>
      </header>

      <nav className="cf-nav" aria-label="أقسام المنيو">
        <div className="cf-cats" role="tablist">
          {cafeCats.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={cat === c.id}
              className={`cf-cat${cat === c.id ? " is-on" : ""}`}
              onClick={() => setCat(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="cf-list">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </main>

      <footer className="cf-foot">
        <p>{cafePlace.hours}</p>
        <p>المنيو للعرض داخل المقهى</p>
      </footer>
    </div>
  );
}
