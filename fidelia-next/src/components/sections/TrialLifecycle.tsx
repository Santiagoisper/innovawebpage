"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LIFECYCLE_PHASES } from "@/content/lifecycle";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";
import { EASE_OUT } from "@/lib/motion/presets";

export default function TrialLifecycle() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const active = LIFECYCLE_PHASES[activeIndex];
  const progress = ((activeIndex + 1) / LIFECYCLE_PHASES.length) * 100;

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0A2342]" aria-labelledby="lifecycle-heading">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="mb-12 max-w-2xl">
          <SectionLabel>Trial lifecycle</SectionLabel>
          <h2 id="lifecycle-heading" className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.05] text-white mb-6">
            From feasibility to close-out — one disciplined arc.
          </h2>
          <p className="text-[rgba(255,255,255,0.55)] leading-relaxed">
            Select a phase to see deliverables and the sponsor outcome we commit to.
          </p>
        </Reveal>

        {/* Progress rail */}
        <Reveal delay={0.05} className="mb-10">
          <div className="hidden md:block relative h-[2px] bg-[rgba(85,162,210,0.15)] mb-8">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#55A2D2]"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.45, ease: EASE_OUT }}
            />
          </div>

          <ol className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-3 list-none m-0 p-0" role="tablist" aria-label="Trial lifecycle phases">
            {LIFECYCLE_PHASES.map((phase, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={phase.id} role="presentation">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="lifecycle-panel"
                    id={`lifecycle-tab-${phase.id}`}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full md:w-auto text-left px-4 py-3 border transition-colors duration-200 ${
                      isActive
                        ? "border-[#55A2D2] bg-[rgba(85,162,210,0.1)] text-white"
                        : "border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.55)] hover:border-[rgba(85,162,210,0.35)]"
                    }`}
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#55A2D2] block mb-1">{phase.label}</span>
                    <span className="text-[13px] font-medium">{phase.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </Reveal>

        {/* Detail panel */}
        <Reveal delay={0.1}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              id="lifecycle-panel"
              role="tabpanel"
              aria-labelledby={`lifecycle-tab-${active.id}`}
              className="border border-[rgba(85,162,210,0.15)] bg-[rgba(2,8,18,0.55)] p-8 md:p-10"
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              <p className="font-mono text-[11px] tracking-[0.25em] text-[#55A2D2] mb-3">{active.label}</p>
              <h3 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] text-white mb-4">{active.title}</h3>
              <p className="text-[15px] text-[rgba(255,255,255,0.55)] leading-relaxed mb-8 max-w-3xl">{active.description}</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[rgba(255,255,255,0.4)] mb-4">
                    Deliverables
                  </h4>
                  <ul className="space-y-2 list-disc pl-4 text-[13px] text-[rgba(255,255,255,0.5)]">
                    {active.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[rgba(255,255,255,0.4)] mb-4">
                    Sponsor outcome
                  </h4>
                  <p className="text-[15px] text-[#F8E8C7] leading-relaxed border-l-2 border-[#DDA632] pl-5">
                    {active.sponsorOutcome}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
