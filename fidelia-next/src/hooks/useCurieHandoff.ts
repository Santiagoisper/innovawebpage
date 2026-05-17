"use client";

import { useEffect, useState } from "react";
import { getCurieEmergence } from "@/lib/scene/journeyPhases";

const INTRO_SELECTOR = '[aria-label="Introducción — del cosmos al ADN"]';

function measureIntroProgress() {
  const el = document.querySelector(INTRO_SELECTOR) as HTMLElement | null;
  if (!el) return 1;

  const rect = el.getBoundingClientRect();
  const scrollRange = el.offsetHeight - window.innerHeight;
  if (scrollRange <= 0) return 1;

  const scrolled = Math.max(0, -rect.top);
  return Math.min(1, scrolled / scrollRange);
}

/**
 * Scroll-driven Curie crossfade (0→1) — works outside HeroScrollProvider.
 * Used to sync the landing hero plate with the intro emergence.
 */
export function useCurieHandoffProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const measure = () => setProgress(measureIntroProgress());

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return progress;
}

/** Opacity for hero plate — mirrors getCurieEmergence on intro scroll. */
export function useCurieHandoffOpacity() {
  const progress = useCurieHandoffProgress();
  return getCurieEmergence(progress);
}

/** True when sticky intro has released (hero plate can take over). */
export function useIntroStickyReleased() {
  const [released, setReleased] = useState(false);

  useEffect(() => {
    const measure = () => {
      const el = document.querySelector(INTRO_SELECTOR);
      if (!el) {
        setReleased(true);
        return;
      }
      setReleased(el.getBoundingClientRect().bottom <= window.innerHeight * 1.02);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return released;
}
