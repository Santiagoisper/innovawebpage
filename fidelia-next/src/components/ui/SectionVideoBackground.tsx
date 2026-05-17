"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";

type SectionVideoBackgroundProps = {
  src: string;
  overlay?: number;
  objectPosition?: string;
};

export default function SectionVideoBackground({
  src,
  overlay = 0.48,
  objectPosition = "50% 50%",
}: SectionVideoBackgroundProps) {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  if (reducedMotion) {
    return <div className="pointer-events-none fixed inset-0 z-0 bg-[#020812]" aria-hidden />;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#020812]" aria-hidden>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover brightness-[1.06] saturate-[1.08] contrast-[1.03]"
        style={{ objectPosition }}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(2,8,18,${overlay + 0.04}) 0%, rgba(2,8,18,${overlay}) 50%, rgba(2,8,18,${overlay + 0.06}) 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 40%, rgba(85,162,210,0.12) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
