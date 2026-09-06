import { projects } from "../data/projects";

export const services = [
  { id: "restaurants", label: "Restaurants", index: "01" },
  { id: "cafes", label: "Cafés", index: "02" },
  { id: "reservations", label: "Reservation system", index: "03" },
  { id: "brand", label: "Full brand", index: "04" },
  { id: "custom", label: "Custom", index: "05" },
] as const;

export type ServiceId = (typeof services)[number]["id"];

export type MenuItem = {
  name: string;
  price: string;
  desc: string;
  tags: string[];
};

export type MenuSample = {
  name: string;
  categories: Record<string, MenuItem[]>;
};

export const menuSamples: Record<string, MenuSample> = {
  Restaurant: {
    name: "Restaurant",
    categories: {
      Starters: [
        {
          name: "Charred octopus",
          price: "28",
          desc: "Smoked paprika, lemon, olive oil",
          tags: ["GF"],
        },
        {
          name: "Sourdough & butter",
          price: "9",
          desc: "Cultured butter, sea salt",
          tags: ["V"],
        },
      ],
      Mains: [
        {
          name: "Dry-aged ribeye",
          price: "54",
          desc: "Bone marrow jus, roasted shallot",
          tags: ["GF"],
        },
        {
          name: "Whole branzino",
          price: "38",
          desc: "Fennel, citrus, chili oil",
          tags: ["GF", "DF"],
        },
      ],
      Dessert: [
        {
          name: "Burnt basque cheesecake",
          price: "14",
          desc: "Salted caramel",
          tags: ["V"],
        },
      ],
    },
  },
  Café: {
    name: "Café",
    categories: {
      Coffee: [
        {
          name: "Espresso, single origin",
          price: "4.5",
          desc: "Ethiopia, natural process",
          tags: ["V"],
        },
        {
          name: "Cortado",
          price: "5.5",
          desc: "Oat or whole milk",
          tags: ["V"],
        },
      ],
      Pastry: [
        {
          name: "Almond croissant",
          price: "5.0",
          desc: "Baked fresh every morning",
          tags: ["V"],
        },
        {
          name: "Pistachio babka",
          price: "6.0",
          desc: "House-made, small batch",
          tags: ["V"],
        },
      ],
      Bowls: [
        {
          name: "Greek yogurt bowl",
          price: "8.5",
          desc: "Honey, granola, seasonal fruit",
          tags: ["V", "GF"],
        },
      ],
    },
  },
};

export const reservationGuests = [2, 3, 4, 5, 6];
export const reservationTimes = [
  "6:30 PM",
  "7:00 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
];

const cafe = projects.find((p) => p.slug === "99cafe");

export type WorkKind = "project" | "menu-demo" | "resv-demo" | "page";

export type HospitalityWork = {
  id: string;
  services: ServiceId[];
  title: string;
  kind: WorkKind;
  status?: "live" | "coming-soon";
  url?: string;
  href?: string;
  projectSlug?: string;
  menuKey?: keyof typeof menuSamples;
};

export const hospitalityWork: HospitalityWork[] = [
  {
    id: "menu-restaurant",
    services: ["restaurants"],
    title: "Burger menu",
    kind: "page",
    href: "/templates/burger",
  },
  {
    id: "menu-cafe",
    services: ["cafes"],
    title: "Café menu",
    kind: "page",
    href: "/templates/cafe",
  },
  {
    id: "table-booking",
    services: ["reservations"],
    title: "NOIR reservations",
    kind: "page",
    href: "/templates/reserve",
  },
  {
    id: "99cafe",
    services: ["brand"],
    title: "99cafe",
    kind: "project",
    status: "live",
    href: cafe?.url ?? "https://99cafe.com",
    projectSlug: "99cafe",
  },
  {
    id: "darna",
    services: ["custom"],
    title: "DARNA",
    kind: "project",
    status: "live",
    href: "https://darna-wine.vercel.app/",
    projectSlug: "darna",
  },
];

export const statusLabel = {
  live: "Live",
  "coming-soon": "Soon",
  demo: "Demo",
  page: "Open",
} as const;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
