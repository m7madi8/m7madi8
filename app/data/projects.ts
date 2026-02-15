import type { StaticImageData } from "next/image";
import image99 from "../../img/99.png";
import imageSamarammar from "../../img/samarammar.png";

import image03 from "../../img/03.png";

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
    slug: "daily",
    title: "Daily",
    context: "Sportswear & Gym Gear Store",
    summary: "A premium e-commerce platform for athletes.",
    image: image03,
    goal: "Create a powerful online presence and seamless shopping for gym enthusiasts.",
    build: "A high-performance e-commerce site with intuitive product filtering.",
    work: [
      "Designed a bold, energetic UI/UX.",
      "Integrated secure payment gateways.",
      "Optimized product pages for high conversion.",
    ],
    result: "Significant increase in online sales and user engagement.",
    overview: "A robust, fast, and visually striking store for modern fitness gear.",
  },
];
