export type StoryPrinciple = {
  id: string;
  title: string;
  summary: string;
  detail: string;
};

export const STORY_PRINCIPLES: StoryPrinciple[] = [
  {
    id: "regional",
    title: "Regional by design",
    summary: "Latin America is the headquarters, not a satellite.",
    detail:
      "Regulatory submissions, site relationships, and leadership decisions are made in the countries we serve — not relayed through a US or EU parent office.",
  },
  {
    id: "precision",
    title: "Operational precision",
    summary: "Protocols executed as written — deviations managed, not normalized.",
    detail:
      "We treat protocol adherence, query resolution timelines, and TMF completeness as operational KPIs visible to sponsors throughout the study.",
  },
  {
    id: "ethics",
    title: "Ethics as infrastructure",
    summary: "Participant protection is built into feasibility, not added at audit.",
    detail:
      "Informed consent quality, ethics committee engagement, and safety reporting are designed into start-up — not repaired after inspection findings.",
  },
  {
    id: "partnership",
    title: "Sponsor partnership",
    summary: "Transparent communication when timelines shift.",
    detail:
      "Enrollment shortfalls and regulatory delays are reported with mitigation options early. Sponsors should never learn operational problems from a monitoring report alone.",
  },
];

export const STORY_STATS = [
  {
    value: "15+",
    label: "Years of regional experience",
    detail: "Across the founding leadership team",
  },
  {
    value: "80+",
    label: "Completed trials",
    detail: "Phase I through Phase IV, multiple therapeutic areas",
  },
  {
    value: "100%",
    label: "Latin American leadership",
    detail: "Regional decisions made by regional people",
  },
  {
    value: "0",
    label: "Failed inspections",
    detail: "Across regulatory agency audits to date",
  },
] as const;
