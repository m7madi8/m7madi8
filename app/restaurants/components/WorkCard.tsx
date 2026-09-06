"use client";

import Image from "next/image";
import Link from "next/link";
import { getProject, statusLabel, type HospitalityWork } from "../data";

type WorkCardProps = {
  work: HospitalityWork;
  active: boolean;
  onOpen: () => void;
};

export default function WorkCard({ work, active, onOpen }: WorkCardProps) {
  const project = work.projectSlug ? getProject(work.projectSlug) : undefined;
  const image = project?.image;
  const meta =
    work.status === "coming-soon"
      ? statusLabel["coming-soon"]
      : work.status === "live"
        ? statusLabel.live
        : work.kind === "page"
          ? statusLabel.page
          : statusLabel.demo;

  const media = image ? (
    <span className="r-card-media">
      <Image src={image} alt="" fill sizes="(max-width: 720px) 100vw, 50vw" />
    </span>
  ) : (
    <span className="r-card-media r-card-media--blank" aria-hidden />
  );

  const body = (
    <span className="r-card-body">
      <span className="r-card-title">{work.title}</span>
      <span className="r-card-meta">{meta}</span>
    </span>
  );

  if (work.href) {
    const external = work.href.startsWith("http");
    if (external) {
      return (
        <a
          href={work.href}
          className="r-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          {media}
          {body}
        </a>
      );
    }

    return (
      <Link href={work.href} className="r-card">
        {media}
        {body}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={`r-card${active ? " is-active" : ""}`}
      onClick={onOpen}
      aria-expanded={active}
      aria-controls="r-panel"
    >
      {media}
      {body}
    </button>
  );
}
