import type { StaticImageData } from "next/image";
import image99 from "../../img/99.png";
import imageSamarammar from "../../img/samarammar.png";

import image03 from "../../img/03.png";
import image04 from "../../img/04.png";
import image88 from "../../img/88.png";
import image8 from "../../img/8.png";

export type ProjectStatus = "live" | "coming-soon";

export type Project = {
  slug: string;
  title: string;
  context: string;
  summary: string;
  image?: StaticImageData;
  url?: string;
  status?: ProjectStatus;
  goal: string;
  build: string;
  work: string[];
  result: string;
  overview: string;
};

export function isComingSoon(project: Project): boolean {
  return project.status === "coming-soon";
}

export function getLiveProjects(): Project[] {
  return projects.filter((p) => !isComingSoon(p));
}

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
    title: 'Samar Ammar Interior Design',
    context: "Interior, exterior & garden design",
    summary: "Showcasing refined interior, exterior, and garden designs.",
    image: imageSamarammar,
    url: "https://samarammar.com",
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
  {
    slug: "od-architects",
    title: "OD ARCHITECTS",
    url: "https://od-architects.com",
    context: "Interior, exterior & landscape design studio",
    summary:
      "Design studio for interior, exterior, and garden projects — from concept through supervision and on-site execution.",
    goal: "Present full-service design capabilities and build trust with residential and commercial clients.",
    build:
      "A brand-led website with portfolio galleries, clear service tiers, and straightforward inquiry paths.",
    work: [
      "Interior, exterior, and landscape project showcases.",
      "Supervision and execution narrative for end-to-end delivery.",
      "Responsive layout tuned for large-format visuals and case studies.",
    ],
    result:
      "A brand-led studio site that communicates full-service design and builds client trust.",
    overview:
      "Interior, exterior, and landscape design — from vision to supervision and build.",
  },
  {
    slug: "shape-up",
    title: "Shape Up",
    status: "coming-soon",
    image: image88,
    context: "Women's fitness studio",
    summary:
      "Studio experience for women-only training — diverse classes, sports programs, and a motivating brand presence.",
    goal: "Help members discover class types, understand the studio's focus, and prepare for seamless booking.",
    build:
      "An energetic marketing site with class categories, studio story, and scheduling-ready structure.",
    work: [
      "Women-focused brand tone and visual identity on the web.",
      "Class and sport category pages for varied training offerings.",
      "Mobile-first layout built for schedules and future booking flows.",
    ],
    result:
      "In active development — publishing soon.",
    overview:
      "Women's fitness studio — varied classes and sports in one clear digital home.",
  },
  {
    slug: "healthy-mama",
    title: "Healthy Mama",
    status: "coming-soon",
    context: "Women's postpartum wellness platform",
    summary:
      "A platform for every mother — postpartum assessments, trusted guidance, and curated books to support real lifestyle change.",
    goal: "Give women a structured way to understand postpartum health and access personalized tips and resources.",
    build:
      "A member-oriented platform with assessment flows, educational content, and recommended reading paths.",
    work: [
      "Assessment UX tailored to postpartum wellness checkpoints.",
      "Advice and content library architecture for ongoing support.",
      "Book and resource recommendations aligned to each user's journey.",
    ],
    result:
      "In active development — publishing soon.",
    overview:
      "Postpartum assessments, guidance, and curated resources — built for every mother.",
  },
  {
    slug: "nanas-biets",
    title: "Nana's Biets",
    url: "https://cheffarahammar.com",
    image: image8,
    context: "Premium bakery & chef brand store",
    summary:
      "E-commerce for Chef Farah Ammar — premium, indulgent products with a luxury food-brand feel.",
    goal: "Launch a distinctive storefront that matches premium positioning and supports online orders.",
    build:
      "A product-focused shop with rich imagery, clear categories, and commerce-ready checkout structure.",
    work: [
      "Brand storytelling around Chef Farah Ammar and her product line.",
      "Product showcase and catalog UX for premium treats.",
      "Mobile commerce layout optimized for discovery and conversion.",
    ],
    result:
      "A premium storefront that matches Chef Farah Ammar's brand and supports online orders.",
    overview:
      "Chef Farah Ammar — premium treats in a dedicated online store.",
  },
  {
    slug: "darna",
    title: "DARNA",
    status: "coming-soon",
    context: "Restaurant · Lounge · Catering — venue booking platform",
    summary:
      "A booking platform for one venue that unites dining, lounge evenings, and catering — guests choose the experience first, then reserve with ease.",
    goal: "Replace a simple contact form with a full booking journey — from experience selection to confirmation — while the team manages tables and reservations in real time.",
    build:
      "Guest-facing flows for restaurant tables, lounge nights, and catering events, paired with a live operations view for the venue team through to reception.",
    work: [
      "Experience-first booking paths for Restaurant, Lounge, and Catering.",
      "Real-time reservation and table management for the venue team.",
      "End-to-end journey from choice through confirmation, tuned for a polished guest arrival.",
    ],
    result: "In active development — publishing soon.",
    overview:
      "Smarter venue booking — not just a contact form, but a complete experience from selection to confirmation.",
  },
  {
    slug: "wolve-store",
    title: "Wolve Store",
    status: "coming-soon",
    context: "Phones & original accessories e-commerce",
    summary:
      "An e-commerce store for phones and original accessories — a clear, fast shopping experience from first glance to order completion.",
    goal: "Make it easy for customers to find a device or accessory by category and brand, explore products, save favorites, and check out without friction.",
    build:
      "A premium storefront with browse and filter flows, product detail pages, cart and wishlist, and a mobile-first checkout path.",
    work: [
      "Category and brand-based browsing with clear product discovery.",
      "Product details, cart, and wishlist for a smooth purchase journey.",
      "Elegant, mobile-ready storefront UI tuned for speed and clarity.",
    ],
    result: "In active development — publishing soon.",
    overview:
      "Phones and accessories e-commerce focused on a smooth buy flow — browse, filter, product details, and cart in a polished mobile-friendly UI.",
  },
  {
    slug: "nora-harb",
    title: "Nora Harb",
    status: "coming-soon",
    context: "Vinyasa yoga instructor — personal brand site",
    summary:
      "A calm, refined personal site for a Vinyasa yoga instructor (RYT 300) — geometric precision meets the presence of practice.",
    goal: "Let visitors meet Nora, explore recorded video courses (each with its own page and content), and book live sessions (studio · beach · private) through direct contact.",
    build:
      "A quiet luxury landing with instructor story, dedicated online course pages, and clear paths to book personal sessions.",
    work: [
      "Brand presence that balances geometric structure with a yoga-led tone.",
      "Recorded course pages with dedicated content per program.",
      "Booking paths for studio, beach, and private live sessions.",
    ],
    result: "In active development — publishing soon.",
    overview:
      "Yoga instructor landing — calm identity, online courses, and personal session booking.",
  },
];
