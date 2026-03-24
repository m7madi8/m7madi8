import type { StaticImageData } from "next/image";
import image99 from "../../img/99.png";
import imageSamarammar from "../../img/samarammar.png";

import image03 from "../../img/03.png";
import image04 from "../../img/04.png";

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
    image: image99,
    url: "https://99cafe.com",
    goal: "Present the brand clearly and highlight the menu.",
    build: "A clean, responsive site with focused sections.",
    work: ["Structured the content flow.", "Optimized for mobile speed."],
    result: "A clear, reliable site that supports the cafe’s presence.",
    overview: "Clean branding, fast pages, and an easy menu experience.",
  },
  {
    slug: "nawal-omar-yoga",
    title: "Nawal Omar",
    context: "Yoga, workshops & retreats — bilingual wellness brand",
    url: "https://nawalyoga.com",
    image: image04,
    summary:
      "A calm, bilingual (Arabic / English) site for yoga classes, workshops, and retreats.",
    goal: "Communicate Nawal Omar’s practice clearly in two languages and make bookings and information easy to find.",
    build:
      "A bilingual marketing site with clear paths for classes, workshops, and retreat offerings.",
    work: [
      "Bilingual structure and copy flow for Arabic and English audiences.",
      "Sections tailored to yoga sessions, workshops, and retreat programs.",
      "Responsive layout with a soft, wellness-focused visual tone.",
    ],
    result:
      "A trustworthy, easy-to-navigate presence that reflects the brand’s calm, professional approach.",
    overview:
      "Wellness-focused web experience — yoga, workshops, and retreats in a clear bilingual format.",
  },
  {
    slug: "interior-landscape-elegance",
    title: "Interior & Landscape Elegance",
    context: "Interior, exterior & garden design",
    summary: "Showcasing refined interior, exterior, and garden designs.",
    image: imageSamarammar,
    goal: "Present refined interior, exterior, and garden design work.",
    build: "A portfolio showcasing elegant spaces and landscapes.",
    work: [
      "Interior and exterior design showcases.",
      "Garden and landscape visualizations.",
    ],
    result: "A clear, refined presentation of design projects.",
    overview: "Refined interior, exterior, and garden design portfolio.",
  },
  {
    slug: "vantage",
    title: "Vantage",
    context: "Sportswear & gym gear store",
    summary: "A premium e-commerce experience for athletes and everyday training.",
    image: image03,
    goal: "Build a strong Vantage brand presence and frictionless shopping for fitness-focused customers.",
    build: "A high-performance storefront with clear navigation and product discovery.",
    work: [
      "Bold, energetic UI aligned with the Vantage identity.",
      "Secure checkout and payment integration.",
      "Product pages tuned for clarity and conversion.",
    ],
    result: "A fast, memorable store that supports growth in online sales and engagement.",
    overview: "Vantage — a robust, modern e-commerce site for sportswear and gym gear.",
  },
];
