"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { TEAM, TEAM_HERO } from "@/content/team";
import Reveal from "@/components/motion/Reveal";
import RevealGroup, { RevealGroupItem } from "@/components/motion/RevealGroup";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";

const heroMediaFilter = "grayscale(0.5) sepia(0.45) brightness(0.72) contrast(1.02)";

export default function Leadership() {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    videoRef.current?.play().catch(() => {});
  }, [reducedMotion]);

  return (
    <section className="bg-[#0A2342]" aria-labelledby="leadership-heading">
      <Reveal className="relative h-[min(58vh,520px)] min-h-[320px] overflow-hidden">
        {reducedMotion ? (
          <Image
            src={TEAM_HERO.image}
            alt={TEAM_HERO.alt}
            fill
            priority
            className="object-cover object-[center_25%]"
            style={{ filter: heroMediaFilter }}
            sizes="100vw"
          />
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
            style={{ filter: heroMediaFilter }}
            src={TEAM_HERO.video}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(2,14,32,0.18) 0%, rgba(2,14,32,0.72) 100%)",
          }}
        />
        <div className="absolute bottom-12 left-6 md:left-12 max-w-xl z-10">
          <span className="block font-mono text-[11px] font-bold tracking-[0.18em] uppercase text-white/65 mb-3">
            {TEAM_HERO.eyebrow}
          </span>
          <h2
            id="leadership-heading"
            className="font-serif font-light text-white leading-[1.15] tracking-[-0.02em] text-[clamp(1.875rem,4vw,3.25rem)]"
          >
            {TEAM_HERO.headline}
            <br />
            <strong className="font-bold">{TEAM_HERO.headlineEmphasis}</strong>
          </h2>
        </div>
      </Reveal>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <RevealGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 xl:gap-14">
            {TEAM.map((member) => (
              <RevealGroupItem key={member.id}>
                <article className="group flex h-full flex-col border-t-2 border-[#55A2D2] pt-7 transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden bg-[rgba(255,255,255,0.05)]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <h3 className="mb-1.5 text-lg font-semibold tracking-[-0.01em] text-white">{member.name}</h3>
                  <p className="mb-1 text-[13px] font-semibold tracking-[0.04em] text-[#55A2D2]">{member.title}</p>
                  <p className="mb-3.5 text-xs leading-relaxed text-white/40">{member.credentials}</p>
                  <p className="flex-1 text-sm leading-[1.75] text-white/55">{member.bio}</p>
                </article>
              </RevealGroupItem>
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}

