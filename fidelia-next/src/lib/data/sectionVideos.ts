/** Stock footage for inner pages — hero stays static (Curie + intro only). */
export const SECTION_VIDEOS = {
  explore: "/videos/humanity-ai.mp4",
  services: "/videos/lab-analysis.mp4",
  platform: "/videos/healthcare-crm.mp4",
  therapeutic: "/videos/cells-energy.mp4",
  history: "/videos/starry-sky.mp4",
  leadership: "/videos/neuroscience-lecture.mp4",
  contact: "/videos/test-tubes.mp4",
} as const;

export type SectionVideoKey = keyof typeof SECTION_VIDEOS;
