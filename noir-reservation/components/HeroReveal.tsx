"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

interface Props {
  eyebrow: string;
  headline: string;
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroReveal({ eyebrow, headline }: Props) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative h-full w-full flex flex-col items-start justify-end px-6 md:px-10 pb-24 md:pb-28 max-w-[1440px] mx-auto"
    >
      <motion.p
        variants={item}
        className="text-[12px] tracking-[0.22em] uppercase text-accent mb-5"
      >
        {eyebrow}
      </motion.p>
      <motion.h1
        variants={item}
        className="font-display italic text-[clamp(38px,7vw,84px)] leading-[1.05] max-w-[900px] mb-6"
      >
        {headline}
      </motion.h1>
      <motion.p
        variants={item}
        className="text-text-muted text-[15px] md:text-[16px] max-w-[440px] leading-[1.7] mb-10"
      >
        Contemporary Palestinian dining in the heart of Ramallah.
      </motion.p>
      <motion.div variants={item} className="flex items-center gap-8">
        <Link
          href="/reserve"
          className="focus-ring inline-flex items-center justify-center bg-accent text-[#0a0a0a] px-8 py-4 text-[13px] tracking-[0.1em] uppercase font-medium hover:brightness-110 active:scale-[0.98] transition-all"
        >
          Reserve a Table
        </Link>
        <a
          href="#about"
          className="focus-ring text-[13px] tracking-[0.1em] uppercase text-text-muted hover:text-text transition-colors"
        >
          Explore the Experience
        </a>
      </motion.div>
    </motion.div>
  );
}
