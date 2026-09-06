"use client";

import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import {
  burgerMenu,
  burgerPlace,
  foodCats,
  groups,
  type BurgerItem,
  type MenuGroup,
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

function IconFlame() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2s1.8 3.1 1.8 5.4c0 1.4-.7 2.6-1.8 3.4-1.1-.8-1.8-2-1.8-3.4C10.2 5.1 12 2 12 2Zm0 8.2c2.6 1.6 4.3 4.4 4.3 7.3A4.3 4.3 0 0 1 12 22a4.3 4.3 0 0 1-4.3-4.5c0-2.9 1.7-5.7 4.3-7.3Z"
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

function Marks({ item }: { item: BurgerItem }) {
  const marks = [
    item.signature ? { key: "sig", label: "توقيع البيت", icon: <IconStar /> } : null,
    item.veg ? { key: "veg", label: "نباتي", icon: <IconLeaf /> } : null,
    item.spicy > 0
      ? { key: "spicy", label: `حار ${item.spicy}`, icon: <IconFlame /> }
      : null,
  ].filter(Boolean) as { key: string; label: string; icon: ReactNode }[];

  if (!marks.length) return null;

  return (
    <ul className="gb-marks">
      {marks.map((mark) => (
        <li key={mark.key} title={mark.label}>
          <span className={`gb-mark${mark.key === "spicy" ? ` is-hot-${item.spicy}` : ""}`}>
            {mark.icon}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ItemCard({ item }: { item: BurgerItem }) {
  return (
    <article className="gb-card">
      <div className="gb-card-media">
        <Image
          src={item.img}
          alt={item.nameAr}
          width={900}
          height={720}
          unoptimized
        />
        <span className="gb-card-num">{item.num}</span>
      </div>
      <div className="gb-card-body">
        <div className="gb-card-row">
          <h2>{item.nameAr}</h2>
          <p className="gb-price">
            {item.price}
            <span>₪</span>
          </p>
        </div>
        <p className="gb-en">{item.name}</p>
        <p className="gb-desc">{item.ingredients.join("، ")}</p>
        <Marks item={item} />
      </div>
    </article>
  );
}

export default function BurgerMenu() {
  const rootRef = useRef<HTMLDivElement>(null);
  const introDone = useRef(false);
  const [group, setGroup] = useState<MenuGroup>("food");
  const [foodCat, setFoodCat] = useState<"all" | "burgers" | "sides">("all");

  const items = useMemo(() => {
    if (group === "drinks") {
      return burgerMenu.filter((item) => item.category === "drinks");
    }
    if (foodCat === "all") {
      return burgerMenu.filter((item) => item.category !== "drinks");
    }
    return burgerMenu.filter((item) => item.category === foodCat);
  }, [group, foodCat]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cards = root.querySelectorAll(".gb-card");
      const media = root.querySelectorAll(".gb-card-media");
      const images = root.querySelectorAll(".gb-card-media img");
      const copy = root.querySelectorAll(".gb-card-body");

      if (!introDone.current) {
        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
        intro
          .from(".gb-logo-letters span", {
            yPercent: 120,
            rotateX: -70,
            opacity: 0,
            stagger: 0.045,
            duration: 0.85,
            transformOrigin: "50% 100%",
          })
          .from(".gb-logo span", { y: 12, opacity: 0, duration: 0.5 }, "-=0.45")
          .from([".gb-back", ".gb-top-meta"], { opacity: 0, y: 8, duration: 0.4 }, "-=0.4")
          .from(".gb-group", { y: 18, opacity: 0, stagger: 0.08, duration: 0.5 }, "-=0.35")
          .from(".gb-sub", { y: 14, opacity: 0, stagger: 0.05, duration: 0.4 }, "-=0.3");
        introDone.current = true;
      }

      gsap.fromTo(
        cards,
        { y: 72, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power4.out",
          clearProps: "transform,opacity",
        }
      );

      gsap.fromTo(
        media,
        { clipPath: "inset(14% 12% 14% 12% round 28px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          duration: 1.15,
          stagger: 0.1,
          ease: "power4.inOut",
          clearProps: "clipPath",
        }
      );

      gsap.fromTo(
        images,
        { scale: 1.22 },
        {
          scale: 1,
          duration: 1.35,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform",
        }
      );

      gsap.fromTo(
        copy,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          delay: 0.18,
          ease: "power3.out",
          clearProps: "transform,opacity",
        }
      );
    }, root);

    return () => ctx.revert();
  }, [items]);

  return (
    <div className="gb" ref={rootRef}>
      <header className="gb-top">
        <Link href="/restaurants" className="gb-back">
          المعرض
        </Link>
        <div className="gb-logo">
          <strong className="gb-logo-letters" dir="ltr" aria-label={burgerPlace.name}>
            {burgerPlace.name.split("").map((letter, index) => (
              <span key={`${letter}-${index}`}>{letter}</span>
            ))}
          </strong>
          <span>{burgerPlace.nameAr}</span>
        </div>
        <span className="gb-top-meta">{burgerPlace.city}</span>
      </header>

      <nav className="gb-nav" aria-label="أقسام المنيو">
        <div className="gb-groups" role="tablist">
          {groups.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={group === g.id}
              className={`gb-group${group === g.id ? " is-on" : ""}`}
              onClick={() => setGroup(g.id)}
            >
              {g.label}
            </button>
          ))}
        </div>
        {group === "food" ? (
          <div className="gb-subs" role="tablist" aria-label="تصنيف الطعام">
            {foodCats.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={foodCat === c.id}
                className={`gb-sub${foodCat === c.id ? " is-on" : ""}`}
                onClick={() => setFoodCat(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        ) : null}
      </nav>

      <main className="gb-list">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </main>

      <footer className="gb-foot">
        <p>{burgerPlace.hours}</p>
        <p>المنيو للعرض داخل المطعم</p>
      </footer>
    </div>
  );
}
