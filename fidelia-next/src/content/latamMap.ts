/** Node positions on stylized South America (viewBox 0–100). */
export const LATAM_MAP_NODES: Record<
  string,
  { x: number; y: number; label: string }
> = {
  mx: { x: 22, y: 28, label: "MX" },
  co: { x: 38, y: 42, label: "CO" },
  pe: { x: 36, y: 58, label: "PE" },
  br: { x: 62, y: 52, label: "BR" },
  ar: { x: 52, y: 76, label: "AR" },
  cl: { x: 44, y: 88, label: "CL" },
};

export const LATAM_HUB_ID = "ar";

/** SVG path — simplified but recognizable South America silhouette. */
export const LATAM_CONTINENT_PATH =
  "M 8 22 L 20 18 L 26 26 L 24 34 L 18 38 L 14 36 Z " +
  "M 18 36 L 28 34 L 34 40 L 32 48 L 28 54 L 22 58 L 18 52 Z " +
  "M 28 54 L 42 50 L 58 48 L 72 52 L 78 62 L 74 72 L 64 82 L 52 88 L 44 92 L 38 88 L 34 78 L 36 68 L 40 58 L 38 48 L 32 42 Z " +
  "M 58 48 L 68 44 L 76 50 L 80 58 L 76 66 L 68 72 L 58 68 Z";

/** Curved links from Argentina hub → country (quadratic bezier in viewBox coords). */
export const LATAM_MAP_LINKS: Record<string, string> = {
  mx: "M 52 76 Q 36 48 22 28",
  co: "M 52 76 Q 44 56 38 42",
  pe: "M 52 76 Q 42 66 36 58",
  br: "M 52 76 Q 60 62 62 52",
  cl: "M 52 76 Q 48 82 44 88",
};
