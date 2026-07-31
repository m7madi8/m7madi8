export type LinksChannel = {
  id: string;
  label: string;
  hint: string;
  href: string;
  external?: boolean;
  mark: string;
};

export const LINKS_CHANNELS: LinksChannel[] = [
  {
    id: "portfolio",
    label: "Portfolio",
    hint: "Full site experience",
    href: "/",
    mark: "01",
  },
  {
    id: "work",
    label: "Selected Work",
    hint: "Case studies & launches",
    href: "/work",
    mark: "02",
  },
  {
    id: "instagram",
    label: "Instagram",
    hint: "@mohammad._dev",
    href: "https://www.instagram.com/mohammad._dev/",
    external: true,
    mark: "03",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    hint: "Start a conversation",
    href: "https://wa.me/972592132438",
    external: true,
    mark: "04",
  },
  {
    id: "email",
    label: "Email",
    hint: "eslamhuhu1@gmail.com",
    href: "mailto:eslamhuhu1@gmail.com",
    external: true,
    mark: "05",
  },
];
