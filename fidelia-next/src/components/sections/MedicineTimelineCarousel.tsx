"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import MedicineTimelineSlideMedia from "@/components/sections/MedicineTimelineSlideMedia";
import { AnimatePresence, motion } from "motion/react";
import SectionLabel from "@/components/ui/SectionLabel";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";
import { MEDICINE_TIMELINE } from "@/content/medicineTimeline";
import { EASE_OUT } from "@/lib/motion/presets";

const SLIDES = MEDICINE_TIMELINE;
const AUTO_MS = 9000;

export default function MedicineTimelineCarousel() {
  const [current, setCurrent] = useState(0);
  const reducedMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const slide = SLIDES[current];

  const goTo = useCallback(
    (index: number, manual = false) => {
      const next = (index + SLIDES.length) % SLIDES.length;
      setCurrent(next);
      if (manual) {
        const btn = btnRefs.current[next];
        btn?.scrollIntoView({ block: "nearest", behavior: reducedMotion ? "auto" : "smooth" });
      }
    },
    [reducedMotion],
  );

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-12 bg-[rgba(10,35,66,0.82)] backdrop-blur-[2px]"
      aria-labelledby="medicine-timeline-heading"
    >
      <motion.div className="max-w-[1400px] mx-auto">
        <header className="max-w-[720px] mb-10 md:mb-12">
          <SectionLabel>History & evolution</SectionLabel>
          <h2
            id="medicine-timeline-heading"
            className="font-serif text-[clamp(1.75rem,3.5vw,3rem)] font-light leading-[1.15] tracking-[-0.02em] text-white mt-4"
          >
            Therapeutic innovation from antiquity to the{" "}
            <strong className="font-bold text-[#55A2D2]">next frontier of medicine.</strong>
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-[rgba(255,255,255,0.62)] max-w-[620px]">
            A curated timeline — from the Hippocratic oath and Argentina&apos;s laureates to landmark
            Physiology or Medicine prizes — tracing discoveries that reshaped infection, infertility,
            cancer, hepatitis, and genetic disease.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-12 items-stretch">
          {/* Stage — sepia portrait */}
          <div
            className="relative min-h-[360px] lg:min-h-[480px] overflow-hidden rounded-sm bg-[#061018]"
            aria-live="polite"
          >
            {SLIDES.map((s, i) => (
              <div
                key={s.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  i === current ? "opacity-100 z-[1]" : "opacity-0 z-0 pointer-events-none"
                }`}
                aria-hidden={i !== current}
              >
                <MedicineTimelineSlideMedia
                  slide={s}
                  active={i === current}
                  reducedMotion={reducedMotion}
                  priority={i < 2}
                />
                <motion.div
                  className={`medicine-timeline-sepia-wash ${
                    i === current && !reducedMotion ? "medicine-timeline-living-wash" : ""
                  }`}
                  aria-hidden
                />
                <div
                  className="absolute inset-0 z-[1]"
                  style={{
                    background: s.contain
                      ? "linear-gradient(0deg, rgba(6,16,24,0.78) 0%, rgba(6,16,24,0.08) 42%, rgba(6,16,24,0.12) 100%)"
                      : "linear-gradient(0deg, rgba(6,16,24,0.88) 0%, rgba(6,16,24,0.18) 50%, rgba(6,16,24,0.28) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 z-[2] p-7 md:p-8">
                  <span className="block font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#55A2D2] mb-2">
                    {s.era}
                    {s.argentine ? (
                      <span className="ml-2 text-[#DDA632]">· Argentina</span>
                    ) : null}
                  </span>
                  <h3 className="font-serif text-[clamp(1.35rem,2.4vw,2rem)] font-bold text-white tracking-[-0.02em]">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-[13px] font-medium tracking-wide text-[rgba(255,255,255,0.55)]">
                    {s.prize}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Panel — timeline + story */}
          <div className="flex flex-col justify-between min-h-[360px] lg:min-h-[480px]">
            <div
              ref={timelineRef}
              className="flex flex-col mb-8 max-h-[min(360px,42vh)] overflow-y-auto pr-2 scrollbar-thin"
              role="tablist"
              aria-label="Medicine history timeline"
            >
              {SLIDES.map((item, index) => {
                const active = index === current;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      btnRefs.current[index] = el;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => goTo(index, true)}
                    className={`flex w-full items-start gap-6 border-0 border-b border-[rgba(255,255,255,0.1)] bg-transparent py-5 text-left cursor-pointer transition-opacity duration-250 last:border-b-0 ${
                      active ? "opacity-100" : "opacity-45 hover:opacity-85"
                    }`}
                  >
                    <span className="shrink-0 min-w-[64px] pt-0.5 font-mono text-[12px] font-semibold tracking-[0.08em] text-[#55A2D2]">
                      {item.year}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-2">
                      <span className="text-[15px] font-semibold leading-snug text-white">{item.label}</span>
                      <span className="text-[12px] tracking-wide text-[rgba(255,255,255,0.45)]">{item.sub}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="flex-1 border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] rounded-sm p-7 md:p-8"
              >
                <p className="text-[15px] leading-[1.8] text-[rgba(255,255,255,0.78)]">{slide.story}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-between">
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-[rgba(255,255,255,0.4)]">
                {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </span>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => goTo(current - 1, true)}
                  className="flex h-11 w-11 items-center justify-center rounded-sm border border-[rgba(255,255,255,0.25)] bg-transparent text-lg text-white transition-colors hover:border-[rgba(255,255,255,0.45)] hover:bg-[rgba(255,255,255,0.08)]"
                  aria-label="Previous milestone"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => goTo(current + 1, true)}
                  className="flex h-11 w-11 items-center justify-center rounded-sm border border-[rgba(255,255,255,0.25)] bg-transparent text-lg text-white transition-colors hover:border-[rgba(255,255,255,0.45)] hover:bg-[rgba(255,255,255,0.08)]"
                  aria-label="Next milestone"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
