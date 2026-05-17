"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { MedicineTimelineEntry } from "@/content/medicineTimeline";

type Props = {
  slide: MedicineTimelineEntry;
  active: boolean;
  reducedMotion: boolean;
  priority?: boolean;
};

/** Convention: AI portrait clips live at /videos/timeline/{id}.mp4 (3s loop). */
export function timelineVideoSrc(slide: MedicineTimelineEntry): string {
  return slide.video ?? `/videos/timeline/${slide.id}.mp4`;
}

export default function MedicineTimelineSlideMedia({
  slide,
  active,
  reducedMotion,
  priority = false,
}: Props) {
  const [useVideo, setUseVideo] = useState(false);
  const videoSrc = timelineVideoSrc(slide);

  useEffect(() => {
    setUseVideo(active && !reducedMotion);
  }, [active, reducedMotion, slide.id]);

  const objectClass = slide.contain
    ? "object-contain object-center"
    : "object-cover object-center";
  const objectStyle = slide.imagePosition ? { objectPosition: slide.imagePosition } : undefined;
  const filterClass = "img-medicine-timeline";

  if (useVideo) {
    return (
      <div className="absolute inset-0">
        <video
          key={videoSrc}
          src={videoSrc}
          poster={slide.image}
          autoPlay
          loop
          muted
          playsInline
          preload={active ? "auto" : "none"}
          onError={() => setUseVideo(false)}
          className={`absolute inset-0 h-full w-full ${filterClass} ${objectClass}`}
          style={objectStyle}
          aria-label={slide.alt}
        />
      </div>
    );
  }

  return (
    <motion.div
      className={active && !reducedMotion ? "medicine-portrait-alive" : "absolute inset-0"}
      style={
        active && !reducedMotion && slide.portraitDelay != null
          ? { animationDelay: `${slide.portraitDelay}s` }
          : undefined
      }
    >
      <Image
        src={slide.image}
        alt={slide.alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 55vw"
        className={`${filterClass} ${objectClass}`}
        style={objectStyle}
      />
    </motion.div>
  );
}
