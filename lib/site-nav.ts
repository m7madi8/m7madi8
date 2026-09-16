export type StaggeredMenuItem = {
  label: string;
  ariaLabel: string;
  link: string;
};

export type StaggeredMenuSocialItem = {
  label: string;
  link: string;
};

export const headerLinks = [
  { num: "01", label: "Work", href: "/work" },
  { num: "02", label: "Method", href: "/#method" },
  { num: "03", label: "Contact", href: "/#contact" },
] as const;

export const menuItems: StaggeredMenuItem[] = [
  { label: "Home", ariaLabel: "Go to home", link: "/" },
  { label: "Projects", ariaLabel: "View all projects", link: "/work" },
  {
    label: "Restaurants",
    ariaLabel: "Restaurant and café work",
    link: "/restaurants",
  },
  { label: "Links", ariaLabel: "Digital identity links", link: "/links" },

  { label: "Contact", ariaLabel: "Get in touch", link: "/#contact" },
  { label: "Work Agreement", ariaLabel: "Work Agreement", link: "/agreement" },
];

export const socialItems: StaggeredMenuSocialItem[] = [
  { label: "WhatsApp", link: "https://wa.me/972592132438" },
  { label: "Instagram", link: "https://www.instagram.com/mohammad._dev/" },
];
