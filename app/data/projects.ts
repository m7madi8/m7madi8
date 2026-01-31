import type { StaticImageData } from "next/image";
import cafeImage from "../../img/99cafe.png";

export type Project = {
  slug: string;
  title: string;
  context: string;
  summary: string;
  image?: StaticImageData;
  url?: string;
  goal: string;
  build: string;
  work: string[];
  result: string;
  overview: string;
};

export const projects: Project[] = [
  {
    slug: "99cafe",
    title: "99cafe",
    context: "Cafe brand website",
    summary: "Modern cafe website with a clean menu flow.",
    image: cafeImage,
    url: "https://99cafe.com",
    goal: "Present the brand clearly and highlight the menu.",
    build: "A clean, responsive site with focused sections.",
    work: ["Structured the content flow.", "Optimized for mobile speed."],
    result: "A clear, reliable site that supports the cafe’s presence.",
    overview: "Clean branding, fast pages, and an easy menu experience.",
  },
  {
    slug: "marble-store",
    title: "Marble Store",
    context: "E-commerce experience",
    summary: "A simple, fast store with an improved buying flow.",
    goal: "Help customers find products and finish checkout smoothly.",
    build: "A streamlined store with clear navigation and confident product pages.",
    work: [
      "Simplified categories and filtering for faster browsing.",
      "Improved product details to build trust.",
      "Tuned the layout for mobile shopping.",
    ],
    result: "Higher add-to-cart rate and fewer support questions.",
    overview:
      "A commerce flow designed for clarity, speed, and decision-making.",
  },
  {
    slug: "signal-launch",
    title: "Signal Launch",
    context: "Landing page campaign",
    summary: "A focused landing page built to convert.",
    goal: "Explain the offer quickly and move users to action.",
    build: "A focused landing flow with short sections and clear proof.",
    work: [
      "Tight copy structure with one primary message.",
      "Fast-loading visuals and responsive layout.",
      "Single conversion path without distractions.",
    ],
    result: "Improved lead quality and a cleaner conversion funnel.",
    overview:
      "A landing page built to communicate fast and convert reliably.",
  },
];
