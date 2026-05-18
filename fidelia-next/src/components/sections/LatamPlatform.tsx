"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { COUNTRIES } from "@/content/countries";
import {
  LATAM_CONTINENT_PATH,
  LATAM_HUB_ID,
  LATAM_MAP_LINKS,
  LATAM_MAP_NODES,
} from "@/content/latamMap";
import GlassCard from "@/components/ui/GlassCard";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";
import { CRO_PROPOSITION } from "@/lib/constants";
import { EASE_OUT } from "@/lib/motion/presets";

type LatamPlatformProps = {
  /** Tighter padding when embedded in /platform page */
  embedded?: boolean;
};

export default function LatamPlatform({ embedded = false }: LatamPlatformProps) {
  const [activeId, setActiveId] = useState(LATAM_HUB_ID);
  const reducedMotion = useReducedMotion();
  const active = COUNTRIES.find((c) => c.id === activeId) ?? COUNTRIES[0];
  const hub = LATAM_MAP_NODES[LATAM_HUB_ID];

  return (
    <section
      className={embedded ? "py-8 md:py-12" : "py-16 md:py-20 px-6 md:px-12 bg-[#020812]"}
      aria-labelledby="latam-platform-heading"
    >
      <motion.div className={embedded ? "w-full" : "max-w-[1400px] mx-auto px-0"}>
        <Reveal className={`mb-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-end ${embedded ? "" : ""}`}>
          <motion.div>
            <SectionLabel>Latin America operating platform</SectionLabel>
            <h2
              id="latam-platform-heading"
              className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-white mb-4 mt-3"
            >
              Regional expertise you can operationalize.
            </h2>
            <p className="text-[14px] text-[#F8E8C7] leading-relaxed border-l-2 border-[#55A2D2] pl-4 max-w-xl">
              {CRO_PROPOSITION}
            </p>
          </motion.div>
          <p className="text-[rgba(255,255,255,0.55)] text-[14px] leading-relaxed lg:pb-1">
            Hub in Argentina — select a market to trace ethics pathways, timelines, and in-country teams.
          </p>
        </Reveal>

        <motion.div className="grid grid-cols-1 xl:grid-cols-[1.15fr_1fr] gap-8 xl:gap-10 items-stretch">
          <Reveal delay={0.05}>
            <div className="relative">
              <motion.div
                className="relative aspect-[16/11] min-h-[340px] w-full overflow-hidden bg-[rgba(4,18,36,0.92)]"
                style={{ clipPath: "polygon(14px 0%, calc(100% - 14px) 0%, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0% calc(100% - 14px), 0% 14px)" }}
                role="group"
                aria-label="Latin America country selector"
              >
              <Image
                src="/mapa-animado.gif"
                alt=""
                fill
                className="object-cover opacity-[0.22] mix-blend-screen"
                sizes="(max-width: 1280px) 100vw, 60vw"
                unoptimized
              />

              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
                <defs>
                  <radialGradient id="latamGlow" cx="62%" cy="52%" r="45%">
                    <stop offset="0%" stopColor="rgba(85,162,210,0.35)" />
                    <stop offset="100%" stopColor="rgba(85,162,210,0)" />
                  </radialGradient>
                </defs>
                <path d={LATAM_CONTINENT_PATH} fill="url(#latamGlow)" stroke="rgba(85,162,210,0.35)" strokeWidth="0.35" />
                {COUNTRIES.map((c) => {
                  if (c.id === LATAM_HUB_ID) return null;
                  const d = LATAM_MAP_LINKS[c.id];
                  if (!d) return null;
                  const on = c.id === activeId;
                  return (
                    <path
                      key={c.id}
                      d={d}
                      fill="none"
                      stroke={on ? "#55A2D2" : "rgba(85,162,210,0.25)"}
                      strokeWidth={on ? 0.55 : 0.35}
                      strokeDasharray={on ? "none" : "1.2 1.8"}
                      opacity={on ? 1 : 0.7}
                    />
                  );
                })}
              </svg>

              {hub ? (
                <motion.div
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
                  style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#DDA632] bg-[#020812]/90 font-mono text-[9px] text-[#DDA632]">
                    HQ
                  </span>
                </motion.div>
              ) : null}

              {COUNTRIES.map((country) => {
                const node = LATAM_MAP_NODES[country.id];
                if (!node) return null;
                const isActive = country.id === activeId;
                const isHub = country.id === LATAM_HUB_ID;
                return (
                  <button
                    key={country.id}
                    type="button"
                    onClick={() => setActiveId(country.id)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#55A2D2]"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    aria-label={`${country.name}, ${country.sites} sites`}
                    aria-pressed={isActive}
                  >
                    {isActive ? (
                      <span
                        className="absolute inset-0 -m-3 rounded-full border border-[#55A2D2]/60 animate-ping opacity-40"
                        aria-hidden
                      />
                    ) : null}
                    <span
                      className={`relative flex h-10 w-10 items-center justify-center rounded-full border text-[9px] font-mono tracking-wider transition-all duration-300 ${
                        isActive
                          ? "scale-110 border-[#55A2D2] bg-[#55A2D2] text-[#020812] shadow-[0_0_24px_rgba(85,162,210,0.45)]"
                          : isHub
                            ? "border-[#DDA632]/70 bg-[#020812]/85 text-[#DDA632]"
                            : "border-[rgba(85,162,210,0.45)] bg-[#020812]/85 text-[#55A2D2] group-hover:border-[#55A2D2]"
                      }`}
                    >
                      {node.label}
                    </span>
                  </button>
                );
              })}

              {/* CRT scanlines */}
              <div
                className="absolute inset-0 pointer-events-none z-10 opacity-[0.045]"
                style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, #4dffc4 3px, #4dffc4 4px)" }}
                aria-hidden
              />
              </motion.div>

              {/* HUD frame overlay */}
              <div className="absolute inset-0 pointer-events-none z-40" aria-hidden>
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-10 h-[2px] bg-[#4dffc4]" />
                <div className="absolute top-0 left-0 w-[2px] h-10 bg-[#4dffc4]" />
                <div className="absolute top-0 right-0 w-10 h-[2px] bg-[#4dffc4]" />
                <div className="absolute top-0 right-0 w-[2px] h-10 bg-[#4dffc4]" />
                <div className="absolute bottom-0 left-0 w-10 h-[2px] bg-[#4dffc4]" />
                <div className="absolute bottom-0 left-0 w-[2px] h-10 bg-[#4dffc4]" />
                <div className="absolute bottom-0 right-0 w-10 h-[2px] bg-[#4dffc4]" />
                <div className="absolute bottom-0 right-0 w-[2px] h-10 bg-[#4dffc4]" />
                {/* Corner diagonal cuts — thin accent lines matching clip-path */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="14" x2="14" y2="0" stroke="#4dffc4" strokeWidth="1" opacity="0.6" />
                  <line x1="100%" y1="14" x2="calc(100% - 14px)" y2="0" stroke="#4dffc4" strokeWidth="1" opacity="0.6" />
                  <line x1="0" y1="calc(100% - 14px)" x2="14" y2="100%" stroke="#4dffc4" strokeWidth="1" opacity="0.6" />
                  <line x1="100%" y1="calc(100% - 14px)" x2="calc(100% - 14px)" y2="100%" stroke="#4dffc4" strokeWidth="1" opacity="0.6" />
                </svg>
                {/* Top HUD readout */}
                <div className="absolute top-3 left-12 right-12 flex justify-between items-center">
                  <span className="font-mono text-[8px] tracking-[0.3em] text-[#4dffc4] uppercase opacity-70">SYS // LATAM GRID</span>
                  <span className="font-mono text-[8px] tracking-[0.2em] text-[#4dffc4] opacity-50">{COUNTRIES.length}·NODES</span>
                </div>
                {/* Bottom HUD readout */}
                <div className="absolute bottom-3 left-12 right-12 flex justify-between items-center">
                  <span className="font-mono text-[8px] tracking-[0.2em] text-[#4dffc4] uppercase opacity-50">MODE: SELECT</span>
                  <span className="font-mono text-[8px] tracking-[0.2em] text-[#4dffc4] opacity-50">STATUS: ONLINE</span>
                </div>
                {/* Left side ticks */}
                <div className="absolute left-2 top-1/4 w-3 h-px bg-[#4dffc4] opacity-40" />
                <div className="absolute left-2 top-1/2 w-4 h-px bg-[#4dffc4] opacity-60" />
                <div className="absolute left-2 top-3/4 w-3 h-px bg-[#4dffc4] opacity-40" />
                {/* Right side ticks */}
                <div className="absolute right-2 top-1/4 w-3 h-px bg-[#4dffc4] opacity-40" />
                <div className="absolute right-2 top-1/2 w-4 h-px bg-[#4dffc4] opacity-60" />
                <div className="absolute right-2 top-3/4 w-3 h-px bg-[#4dffc4] opacity-40" />
              </div>
            </div>

            <motion.div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
              {COUNTRIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveId(c.id)}
                  className={`text-[11px] px-3 py-1.5 border transition-colors ${
                    c.id === activeId
                      ? "border-[#55A2D2] text-white bg-[rgba(85,162,210,0.15)]"
                      : "border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.45)] hover:border-[rgba(85,162,210,0.35)]"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </motion.div>
          </Reveal>

          <Reveal delay={0.1} className="min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reducedMotion ? false : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, x: -8 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="h-full"
              >
                <GlassCard className="p-6 md:p-8 h-full">
                  <motion.div className="flex items-start justify-between gap-4 mb-4">
                    <motion.div>
                      <h3 className="font-serif text-2xl md:text-3xl text-white">{active.name}</h3>
                      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#55A2D2] mt-2">
                        {active.regulator} · {active.sites} sites
                      </p>
                    </motion.div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[rgba(255,255,255,0.4)] shrink-0">
                      {active.status}
                    </span>
                  </motion.div>
                  <p className="text-[14px] text-[rgba(255,255,255,0.55)] leading-relaxed mb-3">{active.ethicsModel}</p>
                  <p className="text-[13px] text-[#DDA632] mb-3">{active.typicalApproval}</p>
                  <p className="text-[14px] text-white/85 leading-relaxed mb-5">{active.sponsorStrength}</p>
                  <ul className="space-y-2 mb-5 list-none m-0 p-0">
                    {active.operationalNotes.map((note) => (
                      <li
                        key={note}
                        className="text-[12px] text-[rgba(255,255,255,0.45)] pl-3 border-l border-[rgba(85,162,210,0.25)]"
                      >
                        {note}
                      </li>
                    ))}
                  </ul>
                  <p className="font-mono text-[10px] text-[rgba(255,255,255,0.35)] tracking-wide">{active.teamPresence}</p>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </motion.div>
      </motion.div>
    </section>
  );
}
