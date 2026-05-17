"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";
import { HISTORY_LENSES, milestonesForLens, type HistoryLensId } from "@/content/historyLenses";
import { EASE_OUT } from "@/lib/motion/presets";

export default function HistoryEvolution() {
  const [lensId, setLensId] = useState<HistoryLensId>("ethics");
  const reducedMotion = useReducedMotion();
  const lens = HISTORY_LENSES.find((l) => l.id === lensId)!;
  const milestones = milestonesForLens(lensId);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0A2342]" aria-labelledby="history-heading">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <SectionLabel>History & evolution</SectionLabel>
            <h2 id="history-heading" className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.05] text-white mb-6">
              Ethics and science — operationalized today.
            </h2>
            <p className="text-[rgba(255,255,255,0.55)] leading-relaxed max-w-xl">
              Each lens connects scientific and regulatory history to how Fidelia executes trials across Latin
              America.
            </p>
          </div>
          <div className="flex items-end">
            <Link href="/history" className="text-[13px] text-[#55A2D2] hover:text-white transition-colors font-medium">
              Full timeline →
            </Link>
          </div>
        </Reveal>

        {/* Lens tabs */}
        <Reveal delay={0.05} className="mb-10">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="History lenses">
            {HISTORY_LENSES.map((l) => {
              const active = l.id === lensId;
              return (
                <button
                  key={l.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="history-lens-panel"
                  onClick={() => setLensId(l.id)}
                  className={`px-4 py-2.5 text-[12px] font-medium tracking-wide border transition-colors ${
                    active
                      ? "border-[#55A2D2] bg-[rgba(85,162,210,0.12)] text-white"
                      : "border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.5)] hover:border-[rgba(85,162,210,0.35)]"
                  }`}
                >
                  {l.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-12">
          {/* Lens narrative */}
          <Reveal delay={0.08}>
            <AnimatePresence mode="wait">
              <motion.div
                key={lensId}
                id="history-lens-panel"
                role="tabpanel"
                initial={reducedMotion ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, x: 8 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                <h3 className="font-serif text-2xl text-white mb-4">{lens.headline}</h3>
                <p className="text-[14px] text-[rgba(255,255,255,0.55)] leading-relaxed mb-6">{lens.narrative}</p>
                <p className="text-[14px] text-[#F8E8C7] leading-relaxed border-l-2 border-[#DDA632] pl-5">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#55A2D2] mb-2">
                    How we run trials today
                  </span>
                  {lens.operationsToday}
                </p>
              </motion.div>
            </AnimatePresence>
          </Reveal>

          {/* Milestones for lens */}
          <Reveal delay={0.12}>
            <AnimatePresence mode="wait">
              <motion.ol
                key={`milestones-${lensId}`}
                className="relative border-l border-[rgba(85,162,210,0.2)] pl-8 space-y-8 list-none m-0"
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {milestones.map((m) => (
                  <li key={m.id} className="relative">
                    <span className="absolute -left-[37px] top-1 w-2 h-2 rounded-full bg-[#55A2D2]" aria-hidden />
                    <p className="font-mono text-[11px] tracking-[0.2em] text-[#DDA632] mb-1">{m.year}</p>
                    <h4 className="font-serif text-lg text-white mb-2">{m.title}</h4>
                    <p className="text-[13px] text-[rgba(255,255,255,0.5)] leading-relaxed mb-2">{m.description}</p>
                    <p className="text-[12px] text-[rgba(255,255,255,0.7)] leading-relaxed border-l-2 border-[#55A2D2] pl-3">
                      {m.operationsLink}
                    </p>
                  </li>
                ))}
              </motion.ol>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
