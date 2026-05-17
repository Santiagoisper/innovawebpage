"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  PointsMaterial,
  type Points,
} from "three";
import { getJourneyPhase } from "@/lib/scene/journeyPhases";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";
import { useHeroScrollProgress } from "./HeroScrollContext";

const DESKTOP_COUNT = 1280;
const MOBILE_COUNT = 480;
const MOBILE_QUERY = "(max-width: 768px)";

const X_MIN = -16;
const X_MAX = 16;
const DUST_A = new Color("#8ec4e8");
const DUST_B = new Color("#e8f4fc");

type DustSeed = {
  x: number;
  y: number;
  z: number;
  speed: number;
  phase: number;
};

function useDustCount() {
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

function buildDust(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const seeds: DustSeed[] = [];

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const x = X_MIN + Math.random() * (X_MAX - X_MIN);
    const y = (Math.random() - 0.5) * 11;
    const z = -4 + Math.random() * 16;

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    const tint = DUST_A.clone().lerp(DUST_B, Math.random());
    colors[i3] = tint.r;
    colors[i3 + 1] = tint.g;
    colors[i3 + 2] = tint.b;

    seeds.push({
      x,
      y,
      z,
      speed: 0.022 + Math.random() * 0.068,
      phase: Math.random() * Math.PI * 2,
    });
  }

  return { positions, colors, seeds };
}

export default function CosmicDustField() {
  const reducedMotion = useReducedMotion();
  const progress = useHeroScrollProgress();
  const count = useDustCount();
  const pointsRef = useRef<Points>(null);
  const seedsRef = useRef<DustSeed[]>([]);

  const data = useMemo(() => buildDust(count), [count]);

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(data.positions.slice(), 3));
    geo.setAttribute("color", new BufferAttribute(data.colors, 3));
    return geo;
  }, [data]);

  useEffect(() => {
    seedsRef.current = data.seeds;
  }, [data]);

  useFrame(({ clock }) => {
    const points = pointsRef.current;
    if (!points || reducedMotion) return;

    const positionAttr = points.geometry.attributes.position as BufferAttribute;
    const arr = positionAttr.array as Float32Array;
    const seeds = seedsRef.current;
    const time = clock.elapsedTime;
    const span = X_MAX - X_MIN;

    for (let i = 0; i < seeds.length; i++) {
      const seed = seeds[i];
      const i3 = i * 3;

      let x = seed.x + time * seed.speed * 2.85;
      x = X_MIN + (((x - X_MIN) % span) + span) % span;

      const wobbleY = Math.sin(time * 0.35 + seed.phase) * 0.04;
      const wobbleZ = Math.cos(time * 0.28 + seed.phase * 1.3) * 0.06;

      arr[i3] = x;
      arr[i3 + 1] = seed.y + wobbleY;
      arr[i3 + 2] = seed.z + wobbleZ;
    }

    positionAttr.needsUpdate = true;

    const p = progress?.get() ?? 0;
    const phase = getJourneyPhase(p);
    const material = points.material as PointsMaterial;

    if (phase === "galaxy") {
      material.opacity = 0.58;
      material.size = 0.042;
    } else if (phase === "tunnel") {
      const fade = 1 - (p - 0.22) / 0.45;
      material.opacity = 0.5 * Math.max(0, fade);
      material.size = 0.036;
    } else {
      material.opacity = 0;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} renderOrder={2}>
      <pointsMaterial
        size={0.042}
        vertexColors
        transparent
        opacity={0.58}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
