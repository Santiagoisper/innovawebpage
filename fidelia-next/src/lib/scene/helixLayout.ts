import { Vector3 } from "three";

/** Shared helix layout — keep in sync with DnaHelix and cameraTunnel. */
export const HELIX_RADIUS = 0.58;
export const HELIX_HEIGHT = 2.85;
export const TURNS = 2.2;

export type HelixStrand = "a" | "b";

function organicRadius(t: number, strand: HelixStrand) {
  const breathe = 1 + 0.032 * Math.sin(t * TURNS * Math.PI * 4.2);
  const wave = 1 + 0.018 * Math.cos(t * 11.5 + (strand === "a" ? 0 : 0.6));
  const groove = strand === "a" ? 1.028 : 0.972;
  return HELIX_RADIUS * breathe * wave * groove;
}

/** Sample point on helix backbone with restrained organic variation. */
export function sampleHelixPoint(t: number, strand: HelixStrand, out = new Vector3()) {
  const y = (t - 0.5) * HELIX_HEIGHT;
  const phase = strand === "b" ? Math.PI : 0;
  const angle = t * TURNS * Math.PI * 2 + phase;
  const r = organicRadius(t, strand);

  return out.set(r * Math.cos(angle), y, r * Math.sin(angle));
}

/** Mid-rung bead closest to +Z — tunnel entry target (camera mouth). */
export function computeEntranceMarkerLocal(out = new Vector3()) {
  let bestZ = -Infinity;

  for (let i = 0; i <= 48; i++) {
    const t = i / 48;
    const a = sampleHelixPoint(t, "a", new Vector3());
    const b = sampleHelixPoint(t, "b", new Vector3());
    const mid = a.lerp(b, 0.5);
    if (mid.z > bestZ) {
      bestZ = mid.z;
      out.copy(mid);
    }
  }

  return out;
}

export function helixPoint(tAlong: number, phaseOffset = 0) {
  const t = Math.min(1, Math.max(0, tAlong));
  const y = (t - 0.5) * HELIX_HEIGHT;
  const angle = t * TURNS * Math.PI * 2 + phaseOffset;
  const r = HELIX_RADIUS * (1 + 0.028 * Math.sin(t * TURNS * Math.PI * 4));
  return new Vector3(r * Math.cos(angle), y, r * Math.sin(angle));
}
