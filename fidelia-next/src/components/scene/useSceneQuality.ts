"use client";

import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 768px)";

export type SceneQuality = {
  mobile: boolean;
  helixSegments: number;
  tubeRadial: number;
  tubeTubular: number;
  tubeRadius: number;
  nodeSegments: number;
  transmission: number;
  clearcoat: number;
};

const DESKTOP: SceneQuality = {
  mobile: false,
  helixSegments: 40,
  tubeRadial: 14,
  tubeTubular: 96,
  tubeRadius: 0.021,
  nodeSegments: 14,
  transmission: 0.28,
  clearcoat: 0.28,
};

const MOBILE: SceneQuality = {
  mobile: true,
  helixSegments: 28,
  tubeRadial: 10,
  tubeTubular: 60,
  tubeRadius: 0.018,
  nodeSegments: 10,
  transmission: 0.14,
  clearcoat: 0.14,
};

export function useSceneQuality(): SceneQuality {
  const [quality, setQuality] = useState(DESKTOP);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setQuality(mq.matches ? MOBILE : DESKTOP);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return quality;
}
