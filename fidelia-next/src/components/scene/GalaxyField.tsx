"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  AdditiveBlending,
  type Points,
} from "three";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";
import { useHeroScrollProgress } from "./HeroScrollContext";
import { getJourneyPhase } from "@/lib/scene/journeyPhases";

const DESKTOP_COUNT = 720;
const MOBILE_COUNT = 280;
const MOBILE_QUERY = "(max-width: 768px)";

const STAR_A = new Color("#88c9ff");
const STAR_B = new Color("#d4eaf5");
const DUST = new Color("#3a5f7a");

function useGalaxyCount() {
  const [count, setCount] = useState(DESKTOP_COUNT);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setCount(mq.matches ? MOBILE_COUNT : DESKTOP_COUNT);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return count;
}

function buildGalaxy(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = 8 + Math.random() * 22;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = (Math.random() - 0.5) * 14;
    positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 6;

    const roll = Math.random();
    const tint =
      roll < 0.12
        ? DUST.clone().lerp(STAR_A, 0.35)
        : STAR_A.clone().lerp(STAR_B, 0.25 + Math.random() * 0.55);

    colors[i3] = tint.r;
    colors[i3 + 1] = tint.g;
    colors[i3 + 2] = tint.b;
  }

  return { positions, colors };
}

export default function GalaxyField() {
  const reducedMotion = useReducedMotion();
  const progress = useHeroScrollProgress();
  const count = useGalaxyCount();
  const pointsRef = useRef<Points>(null);

  const data = useMemo(() => buildGalaxy(count), [count]);

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(data.positions.slice(), 3));
    geo.setAttribute("color", new BufferAttribute(data.colors, 3));
    return geo;
  }, [data]);

  useFrame(({ clock }) => {
    const points = pointsRef.current;
    if (!points || reducedMotion) return;

    const p = progress?.get() ?? 0;
    const phase = getJourneyPhase(p);
    const material = points.material as { opacity: number };

    if (phase === "galaxy") {
      material.opacity = 0.22;
    } else if (phase === "tunnel") {
      material.opacity = 0.22 * (1 - (p - 0.22) / 0.28);
    } else {
      material.opacity = 0;
    }

    points.rotation.y = clock.elapsedTime * 0.018;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.038}
        vertexColors
        transparent
        opacity={0.22}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
