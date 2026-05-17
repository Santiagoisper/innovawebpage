"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";
import { useHeroScrollProgress } from "@/components/scene/HeroScrollContext";
import { GALAXY_SKY_IMAGE, GALAXY_SKY_VIDEO } from "@/lib/data/cosmicAssets";
import { getSceneDissolve } from "@/lib/scene/journeyPhases";

/**
 * Full-bleed orbital Earth loop — DNA WebGL and intro copy render above (z-1 / z-10).
 */
export default function CosmicGalaxyBackground() {
  const reducedMotion = useReducedMotion();
  const progress = useHeroScrollProgress();
  const staticProgress = useMotionValue(0);
  const active = progress ?? staticProgress;
  const videoRef = useRef<HTMLVideoElement>(null);

  const scale = useTransform(active, [0, 0.22, 0.78, 1], [1.06, 1.04, 1.1, 1.14]);
  const opacity = useTransform(active, (v) => {
    const dissolve = getSceneDissolve(v);
    if (v < 0.22) return 1 - dissolve * 0.12;
    if (v < 0.78) return Math.max(0.4, 1 - (v - 0.22) / 0.48);
    return Math.max(0, 0.4 * (1 - dissolve));
  });

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {
      /* autoplay blocked — muted loop should succeed in most browsers */
    });
  }, []);

  if (reducedMotion || !progress) return null;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#020812]"
      style={{ opacity }}
      aria-hidden
    >
      <motion.div className="absolute inset-[-4%]" style={{ scale }}>
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-[50%_55%]"
          src={GALAXY_SKY_VIDEO}
          poster={GALAXY_SKY_IMAGE}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 75% at 50% 48%, transparent 0%, rgba(2,8,18,0.28) 58%, rgba(2,8,18,0.75) 100%)",
        }}
      />
      <motion.div
        className="absolute inset-0 opacity-60 mix-blend-multiply"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,8,18,0.35) 0%, transparent 32%, rgba(2,8,18,0.5) 100%)",
        }}
      />
    </motion.div>
  );
}
