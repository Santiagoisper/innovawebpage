import Link from "next/link";
import { FOOTER_NAV } from "@/content/navigation";
import { SITE } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[rgba(85,162,210,0.1)] bg-[#020812] py-16 px-6 md:px-12"
      aria-label="Site footer"
      style={{
        backgroundImage: "url('/Fondo Fidelia.png')",
        backgroundSize: "120%",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="mb-4">
              <span className="font-serif text-[28px] tracking-[0.14em] text-white block">FIDELIA</span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-[rgba(255,255,255,0.4)] uppercase">
                TRIALS
              </span>
            </div>
            <p className="text-[13px] text-[rgba(255,255,255,0.5)] leading-relaxed max-w-xs">
              Clinical Research Organization.
              <br />
              Latin America.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[rgba(255,255,255,0.35)] mb-5">
              Navigation
            </p>
            <ul className="flex flex-col gap-3 list-none m-0 p-0">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[rgba(255,255,255,0.55)] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[rgba(255,255,255,0.35)] mb-5">
              Contact
            </p>
            <address className="not-italic text-[13px] text-[rgba(255,255,255,0.55)] leading-relaxed">
              <p>Buenos Aires · São Paulo · Bogotá</p>
              <p>Mexico City · Lima · Santiago</p>
              <p className="mt-3">
                <a href="mailto:info@fideliatrials.com" className="text-[#55A2D2] hover:text-white transition-colors">
                  info@fideliatrials.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-[rgba(85,162,210,0.08)] pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] text-[rgba(255,255,255,0.3)]">
              © {year} {SITE.name}. All rights reserved.
            </p>
            <p className="font-mono text-[11px] text-[rgba(255,255,255,0.18)] mt-1">
              By Santiago J. Isbert Perlender
            </p>
          </div>
          <p className="font-mono text-[11px] text-[rgba(255,255,255,0.25)]">
            ICH-GCP · ANVISA · ANMAT · COFEPRIS · INVIMA · DIGEMID · ISP
          </p>
        </div>
      </div>
    </footer>
  );
}
