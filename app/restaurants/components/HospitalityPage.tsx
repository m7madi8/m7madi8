"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getProject,
  hospitalityWork,
  menuSamples,
  services,
  type HospitalityWork,
} from "../data";
import BrandGallery from "./BrandGallery";
import BrandMark from "../../components/BrandMark";
import Hero from "./Hero";
import MenuDemo from "./MenuDemo";
import Nav from "./Nav";
import ReservationDemo from "./ReservationDemo";
import WorkCard from "./WorkCard";

function WorkPanel({ work }: { work: HospitalityWork }) {
  if (work.kind === "menu-demo" && work.menuKey) {
    return <MenuDemo sample={menuSamples[work.menuKey]} />;
  }

  if (work.kind === "resv-demo") {
    return <ReservationDemo />;
  }

  const project = work.projectSlug ? getProject(work.projectSlug) : undefined;
  if (!project) return null;

  return (
    <BrandGallery
      title={project.title}
      url={project.url}
      status={work.status}
      cover={project.image}
      items={project.gallery ?? []}
    />
  );
}

export default function HospitalityPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = hospitalityWork.find((item) => item.id === openId) ?? null;

  const grouped = services.map((service) => ({
    service,
    items: hospitalityWork.filter((item) => item.services.includes(service.id)),
  }));

  const onOpen = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  useEffect(() => {
    if (!openId) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("r-panel")?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "nearest",
    });
  }, [openId]);

  return (
    <>
      <Nav />
      <Hero />

      <main className="r-main">
        {grouped.map(({ service, items }) => (
          <section
            key={service.id}
            id={service.id}
            className="r-section"
            aria-labelledby={`r-${service.id}`}
          >
            <header className="r-section-head">
              <span className="r-section-idx">{service.index}</span>
              <h2 id={`r-${service.id}`} className="r-section-title">
                {service.label}
              </h2>
            </header>

            <div className="r-grid">
              {items.map((item) => (
                <WorkCard
                  key={`${service.id}-${item.id}`}
                  work={item}
                  active={openId === item.id}
                  onOpen={() => onOpen(item.id)}
                />
              ))}
            </div>

            {open && items.some((item) => item.id === open.id) ? (
              <div className="r-panel" aria-label={open.title} id="r-panel">
                <div className="r-panel-head">
                  <h3>{open.title}</h3>
                  <button
                    type="button"
                    className="r-panel-close"
                    onClick={() => setOpenId(null)}
                  >
                    Close
                  </button>
                </div>
                <div className="r-panel-body">
                  <WorkPanel work={open} />
                </div>
              </div>
            ) : null}
          </section>
        ))}
      </main>

      <footer className="r-footer">
        <div className="r-footer-row">
          <BrandMark
            href={null}
            size="sm"
            tone="light"
            animate={false}
            aria-label="m."
          />
          <Link href="/">Main portfolio</Link>
        </div>
      </footer>
    </>
  );
}
