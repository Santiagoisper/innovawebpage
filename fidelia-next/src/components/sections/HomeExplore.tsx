"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";
import { PRIMARY_NAV } from "@/content/navigation";
import { SECTION_VIDEOS } from "@/lib/data/sectionVideos";

const CARDS = [
  {
    href: "/services",
    title: "Services",
    desc: "Feasibility through close-out — full CRO scope.",
    accent: "from-[rgba(85,162,210,0.2)] to-transparent",
  },
  {
    href: "/platform",
    title: "LATAM Platform",
    desc: "Six countries, ethics models, and site networks.",
    accent: "from-[rgba(221,166,50,0.15)] to-transparent",
  },
  {
    href: "/therapeutic-experience",
    title: "Therapeutic areas",
    desc: "Oncology, rare disease, vaccines, and more.",
    accent: "from-[rgba(85,162,210,0.15)] to-transparent",
  },
  {
    href: "/history",
    title: "History",
    desc: "Ethics, science, and operations across decades.",
    accent: "from-[rgba(248,232,199,0.08)] to-transparent",
  },
  {
    href: "/leadership",
    title: "Leadership",
    desc: "Regional operators who know every regulator.",
    accent: "from-[rgba(85,162,210,0.12)] to-transparent",
  },
  {
    href: "/contact",
    title: "Contact",
    desc: "Start a feasibility or full-service conversation.",
    accent: "from-[rgba(85,162,210,0.18)] to-transparent",
  },
] as const;

/** Compact hub after hero — deep sections live on menu routes. */
export default function HomeExplore() {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section
      className="relative z-10 overflow-hidden border-t border-[rgba(85,162,210,0.12)] py-16 md:py-24 px-6 md:px-12"
      aria-labelledby="explore-heading"
    >
      {!reducedMotion ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-[center_35%] brightness-[1.1] saturate-[1.12] contrast-[1.04] scale-105"
            src={SECTION_VIDEOS.explore}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020812]/75 via-[#020812]/42 to-[#020812]/88" />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 50% 30%, rgba(85,162,210,0.18) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(221,166,50,0.08) 0%, transparent 55%)",
            }}
          />
        </div>
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-[#020812]" aria-hidden />
      )}

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <Reveal className="mb-10 max-w-2xl">
          <SectionLabel>Explore</SectionLabel>
          <h2 id="explore-heading" className="font-serif text-[clamp(1.75rem,4vw,2.75rem)] text-white leading-tight mt-4">
            Regional depth, one section at a time.
          </h2>
          <p className="text-[rgba(255,255,255,0.65)] mt-3 text-[15px] leading-relaxed">
            The homepage keeps the cinematic hero. Services, platform, therapeutic areas, and team profiles open from the menu — each with its own visual atmosphere.
          </p>
        </Reveal>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none m-0 p-0">
          {CARDS.map((card, i) => (
            <Reveal key={card.href} delay={i * 0.04}>
              <li>
                <Link
                  href={card.href}
                  className="group relative block h-full overflow-hidden border border-[rgba(85,162,210,0.22)] bg-[rgba(4,18,36,0.55)] backdrop-blur-md p-6 transition-all duration-300 hover:border-[#55A2D2]/55 hover:bg-[rgba(10,35,66,0.72)] hover:shadow-[0_8px_40px_rgba(85,162,210,0.12)]"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
                    aria-hidden
                  />
                  <span className="relative font-mono text-[10px] tracking-[0.2em] uppercase text-[#55A2D2]">
                    {PRIMARY_NAV.find((n) => n.href === card.href)?.label ?? card.title}
                  </span>
                  <h3 className="relative font-serif text-xl text-white mt-3 mb-2 group-hover:text-[#55A2D2] transition-colors">
                    {card.title}
                  </h3>
                  <p className="relative text-[13px] text-[rgba(255,255,255,0.58)] leading-relaxed">{card.desc}</p>
                  <span className="relative inline-block mt-4 text-[12px] text-[#55A2D2] tracking-wide">Enter →</span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
