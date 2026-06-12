export const siteConfig = {
  name: "CRUNCHTIME",
  tagline: "More than a restaurant, a lovely place, a food hub, a family",
  description: "Hand-pressed burgers, crispy fries, and bold flavor — made fresh, fast.",
};

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Find Us", href: "/find-us" },
  { label: "Make It", href: "/make-it" },
];

export const footerLinks = {
  links: [
    { label: "Order Now", href: "/menu" },
    { label: "Careers", href: "/careers" },
    { label: "News", href: "/news" },
    { label: "Branches", href: "/find-us" },
  ],
  privacy: [
    { label: "Customer's Data", href: "/customer-data" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Info", href: "/info" },
  ],
};

export const cityLocations = ["Detroit", "Michigan", "SA", "Luizana", "Florida"];

export const socialLinks = [
  { label: "WhatsApp", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "X", href: "#" },
];
