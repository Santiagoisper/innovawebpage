"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import {
  CatmullRomCurve3,
  Color,
  DoubleSide,
  Object3D,
  Quaternion,
  TubeGeometry,
  Vector3,
  type Group,
  type InstancedMesh,
} from "three";
import { HELIX_RADIUS, sampleHelixPoint } from "@/lib/scene/helixLayout";
import {
  getHelixScaleMultiplier,
  getJourneyPhase,
  getSceneDissolve,
  getTunnelPhase,
} from "@/lib/scene/journeyPhases";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";
import { useHeroScrollProgress } from "./HeroScrollContext";
import { useSceneQuality, type SceneQuality } from "./useSceneQuality";
const STRAND_A_COLOR = "#78d4f0";
const STRAND_B_COLOR = "#4a9fc8";
const DEEP_CORE = "#0c2d4a";
const WARM_EMISSIVE = "#F8E8C7";
const CLINICAL_EMISSIVE = "#55A2D2";

const RUNG_PALETTE = [
  new Color("#6ECDE0"), // clinical cyan
  new Color("#DDA632"), // warm gold
  new Color("#9B7ED8"), // soft violet
  new Color("#72D4A8"), // bio green
  new Color("#55A2D2"), // Fidelia blue
  new Color("#E8A060"), // warm amber
];

/** Perla cálida + clínico + champagne — más cromático, aún refinado. */
const BEAD_PALETTE = [
  "#f0c878",
  "#6ec8ec",
  "#f2d8b0",
  "#88d8f0",
  "#e8b888",
  "#a8e0f5",
] as const;

type HelixData = {
  strandA: Vector3[];
  strandB: Vector3[];
  markers: Vector3[];
  pairs: { a: Vector3; b: Vector3; t: number }[];
};

function buildHelix(segments: number): HelixData {
  const strandA: Vector3[] = [];
  const strandB: Vector3[] = [];
  const markers: Vector3[] = [];
  const pairs: { a: Vector3; b: Vector3; t: number }[] = [];
  const tmp = new Vector3();

  for (let i = 0; i < segments; i++) {
    const t = i / (segments - 1);
    const a = sampleHelixPoint(t, "a", tmp).clone();
    const b = sampleHelixPoint(t, "b", new Vector3());

    strandA.push(a);
    strandB.push(b);
    pairs.push({ a, b, t });

    if (i % 3 === 1) {
      markers.push(a.clone().lerp(b, 0.5));
    }
  }

  return { strandA, strandB, markers, pairs };
}

function makeStrandTube(points: Vector3[], quality: SceneQuality) {
  const curve = new CatmullRomCurve3(points, false, "catmullrom", 0.28);
  return new TubeGeometry(
    curve,
    quality.tubeTubular,
    quality.tubeRadius,
    quality.tubeRadial,
    false,
  );
}

function strandMaterialProps(
  quality: SceneQuality,
  strand: "a" | "b",
) {
  const isA = strand === "a";
  return {
    color: isA ? STRAND_A_COLOR : STRAND_B_COLOR,
    roughness: isA ? 0.18 : 0.22,
    metalness: 0.14,
    transmission: quality.transmission * (isA ? 1.05 : 0.88),
    thickness: 0.55,
    transparent: true,
    opacity: quality.mobile ? 0.62 : 0.72,
    emissive: isA ? CLINICAL_EMISSIVE : DEEP_CORE,
    emissiveIntensity: isA ? 0.18 : 0.1,
    clearcoat: quality.clearcoat * 1.15,
    clearcoatRoughness: 0.22,
    ior: 1.42,
    attenuationColor: DEEP_CORE,
    attenuationDistance: 1.65,
    side: DoubleSide,
  };
}

function InstancedRungs({
  pairs,
}: {
  pairs: { a: Vector3; b: Vector3; t: number }[];
}) {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const visiblePairs = useMemo(
    () => pairs.filter((_, i) => i % 2 === 0),
    [pairs],
  );

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const up = new Vector3(0, 1, 0);
    const dir = new Vector3();
    const quat = new Quaternion();

    visiblePairs.forEach((pair, i) => {
      dir.subVectors(pair.b, pair.a);
      const len = dir.length();
      const mid = new Vector3().addVectors(pair.a, pair.b).multiplyScalar(0.5);
      quat.setFromUnitVectors(up, dir.normalize());

      const taper = 0.82 + Math.sin(pair.t * Math.PI) * 0.12;
      dummy.position.copy(mid);
      dummy.quaternion.copy(quat);
      dummy.scale.set(1, len * taper, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // Multicolor rungs: cycle through palette based on position along helix
      const paletteIdx = i % RUNG_PALETTE.length;
      const nextIdx = (paletteIdx + 1) % RUNG_PALETTE.length;
      const blend = (pair.t * visiblePairs.length) % 1;
      const rungColor = RUNG_PALETTE[paletteIdx].clone().lerp(RUNG_PALETTE[nextIdx], blend);
      mesh.setColorAt(i, rungColor);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [visiblePairs, dummy]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, visiblePairs.length]}>
      <cylinderGeometry args={[0.005, 0.005, 1, 6]} />
      <meshPhysicalMaterial
        vertexColors
        transparent
        opacity={0.52}
        roughness={0.32}
        metalness={0.08}
        transmission={0.04}
        emissiveIntensity={0.12}
      />
    </instancedMesh>
  );
}

function MarkerBeads({
  positions,
  nodeSegments,
}: {
  positions: Vector3[];
  nodeSegments: number;
}) {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const beadColors = useMemo(
    () => BEAD_PALETTE.map((hex) => new Color(hex)),
    [],
  );
  const depthCool = useMemo(() => new Color(STRAND_A_COLOR), []);
  const warmAccent = useMemo(() => new Color(WARM_EMISSIVE), []);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const zMin = -HELIX_RADIUS * 1.1;
    const zMax = HELIX_RADIUS * 1.1;

    positions.forEach((pos, i) => {
      const depthT = (pos.z - zMin) / (zMax - zMin);
      const scale = 0.052 + depthT * 0.018;

      dummy.position.copy(pos);
      dummy.scale.set(scale * 1.12, scale * 0.88, scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      const base = beadColors[i % beadColors.length].clone();
      const tint = base
        .lerp(depthCool, depthT * 0.05)
        .lerp(warmAccent, (i % 2) * 0.08);
      mesh.setColorAt(i, tint);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [positions, dummy, beadColors, depthCool, warmAccent]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, positions.length]}>
      <sphereGeometry args={[1, nodeSegments, nodeSegments]} />
      <meshPhysicalMaterial
        vertexColors
        roughness={0.14}
        metalness={0.18}
        transmission={0.08}
        thickness={0.2}
        transparent
        opacity={0.94}
        emissive={CLINICAL_EMISSIVE}
        emissiveIntensity={0.22}
        clearcoat={0.42}
        clearcoatRoughness={0.18}
        ior={1.38}
      />
    </instancedMesh>
  );
}

/** Y-up helix; mouth faces +Z (camera). Spin is primarily on Y. */
const BASE_POSE = {
  rotation: [0.06, 0, 0] as [number, number, number],
  position: [0, 0, 0] as [number, number, number],
  scale: 1.08,
};

export default function DnaHelix() {
  const groupRef = useRef<Group>(null);
  const quality = useSceneQuality();
  const reducedMotion = useReducedMotion();
  const scrollProgress = useHeroScrollProgress();

  const helix = useMemo(
    () => buildHelix(quality.helixSegments),
    [quality.helixSegments],
  );

  const tubeA = useMemo(
    () => makeStrandTube(helix.strandA, quality),
    [helix.strandA, quality],
  );
  const tubeB = useMemo(
    () => makeStrandTube(helix.strandB, quality),
    [helix.strandB, quality],
  );

  const propsA = useMemo(() => strandMaterialProps(quality, "a"), [quality]);
  const propsB = useMemo(() => strandMaterialProps(quality, "b"), [quality]);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group || reducedMotion) return;

    const elapsed = clock.elapsedTime;
    const progress = scrollProgress?.get() ?? 0;
    const phase = getJourneyPhase(progress);
    const tunnel = getTunnelPhase(progress);
    const scaleMul = getHelixScaleMultiplier(progress);

    const spinRate = phase === "galaxy" ? 0.42 : 0.14;
    group.rotation.y = elapsed * spinRate + tunnel * Math.PI * 3.2;
    group.rotation.x = BASE_POSE.rotation[0] + Math.sin(elapsed * 0.06) * 0.006;
    group.rotation.z = 0;
    group.position.y = Math.sin(elapsed * 0.09) * 0.01;
    group.position.z = -tunnel * 0.62;
    group.scale.setScalar(BASE_POSE.scale * scaleMul);

    const dissolve = getSceneDissolve(progress);
    group.traverse((child) => {
      const mesh = child as { material?: { opacity?: number; transparent?: boolean } };
      if (!mesh.material || mesh.material.opacity === undefined) return;
      const base = mesh.material.transparent ? 0.72 : 1;
      mesh.material.opacity = base * (1 - dissolve * 0.92);
    });
  });

  return (
    <group ref={groupRef} rotation={BASE_POSE.rotation} position={BASE_POSE.position}>
      <mesh geometry={tubeA} renderOrder={1}>
        <meshPhysicalMaterial {...propsA} />
      </mesh>
      <mesh geometry={tubeB} renderOrder={1}>
        <meshPhysicalMaterial {...propsB} />
      </mesh>
      <InstancedRungs pairs={helix.pairs} />
      <MarkerBeads positions={helix.markers} nodeSegments={quality.nodeSegments} />
    </group>
  );
}
