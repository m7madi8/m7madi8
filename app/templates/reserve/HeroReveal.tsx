"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";

type HeroRevealProps = {
  eyebrow: string;
  headline: string;
};

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroReveal({ eyebrow, headline }: HeroRevealProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="nr-wrap nr-hero-copy"
    >
      <motion.p variants={item} className="nr-gold">
        {eyebrow}
      </motion.p>
      <motion.h1 variants={item} className="nr-display">
        {headline}
      </motion.h1>
      <motion.p variants={item}>
        Fire, stone, and a quiet table in Ramallah.
      </motion.p>
      <motion.div variants={item} className="nr-hero-actions">
        <Link href="/templates/reserve/book" className="nr-btn nr-btn--full nr-focus">
          Book a table
        </Link>
      </motion.div>
    </motion.div>
  );
}
