export type NavLink = {
  label: string;
  href: string;
};

export const PRIMARY_NAV: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Platform", href: "/platform" },
  { label: "Therapeutic Areas", href: "/therapeutic-experience" },
  { label: "History", href: "/history" },
  { label: "Leadership", href: "/leadership" },
];

export const FOOTER_NAV: NavLink[] = [...PRIMARY_NAV, { label: "Contact", href: "/contact" }];
