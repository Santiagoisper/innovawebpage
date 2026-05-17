function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

/** Smooth, adult pacing — no snap. */
export function easeTunnelProgress(t: number) {
  const x = clamp01(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

export type JourneyPhase = "galaxy" | "tunnel" | "arrival";

export function getJourneyPhase(progress: number): JourneyPhase {
  if (progress < 0.22) return "galaxy";
  if (progress < 0.78) return "tunnel";
  return "arrival";
}

/** 0→1 while inside the DNA tunnel (scroll through cylinder). */
export function getTunnelPhase(progress: number) {
  const raw = (progress - 0.12) / 0.62;
  return easeTunnelProgress(Math.min(1, Math.max(0, raw)));
}

/** Helix grows as the camera moves inward — mouth opens around the lens. */
export function getHelixScaleMultiplier(progress: number) {
  const t = getTunnelPhase(progress);
  const eased = easeTunnelProgress(t);
  return 1 + eased * 2.65;
}

/** 0→1 — Curie plate materializes as DNA dissolves (crossfade, no vertical motion). */
export function getCurieEmergence(progress: number) {
  const raw = (progress - 0.52) / 0.32;
  return easeTunnelProgress(clamp01(raw));
}

/** Fade the WebGL layer out in sync with Curie emergence. */
export function getSceneDissolve(progress: number) {
  return getCurieEmergence(progress);
}
