"use client";

import { useEffect, useState } from "react";

const INTRO_SELECTOR = '[aria-label="Introducción — del cosmos al ADN"]';

/** True once the pinned cosmic intro section has fully scrolled away. */
export function usePastCosmicIntro() {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const measure = () => {
      const el = document.querySelector(INTRO_SELECTOR);
      if (!el) {
        setPast(true);
        return;
      }
      setPast(el.getBoundingClientRect().bottom <= 1);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return past;
}
