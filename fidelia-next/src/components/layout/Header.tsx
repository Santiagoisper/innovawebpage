"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#020812]/95 backdrop-blur-md border-b border-[rgba(85,162,210,0.12)]"
          : "bg-transparent"
      }`}
    >
      <div
        className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between"
        style={{ height: "72px" }}
      >
        <Link href="/" className="flex flex-col leading-none group" aria-label="Fidelia Trials — home">
          <span className="font-serif text-[32px] tracking-[0.14em] text-white group-hover:text-[#55A2D2] transition-colors duration-300">
            FIDELIA
          </span>
          <span className="font-mono text-[11px] tracking-[0.3em] text-[rgba(255,255,255,0.55)] mt-0.5 uppercase">
            TRIALS
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[13px] font-medium tracking-wide text-[rgba(255,255,255,0.75)] hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="text-[12px] font-semibold tracking-[0.08em] uppercase px-5 py-2.5 border border-[rgba(85,162,210,0.5)] text-[#55A2D2] hover:bg-[#55A2D2] hover:text-[#020812] transition-all duration-200 rounded-[2px]"
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden text-white p-2"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-5 h-px bg-current" />
        </button>
      </div>

      {menuOpen ? (
        <div className="md:hidden bg-[#020812] border-t border-[rgba(85,162,210,0.12)] px-6 py-6">
          <ul className="flex flex-col gap-5 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[15px] font-medium text-[rgba(255,255,255,0.8)] hover:text-white transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="inline-block text-[13px] font-semibold tracking-[0.08em] uppercase px-5 py-2.5 border border-[rgba(85,162,210,0.5)] text-[#55A2D2]"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
