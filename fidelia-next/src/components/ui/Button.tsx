import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

const base =
  "inline-flex items-center justify-center px-8 py-4 text-[13px] font-semibold tracking-[0.06em] uppercase rounded-[2px] transition-colors duration-200";

const variants = {
  primary: "bg-[#55A2D2] text-[#020812] hover:bg-white",
  secondary:
    "border border-[rgba(255,255,255,0.25)] text-white hover:border-[#55A2D2] hover:text-[#55A2D2]",
};

export default function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
