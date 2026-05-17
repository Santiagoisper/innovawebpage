export const LEADERSHIP_HERO_VIDEO =
  "/videos/stock-footage-healthcare-experts-integrate-smart-health-apps-diagnostics-in-workflow-hud-icons-symbolizing.mp4";

export type TeamMember = {
  id: string;
  name: string;
  title: string;
  credentials: string;
  bio: string;
  image: string;
};

export const TEAM_HERO = {
  video: LEADERSHIP_HERO_VIDEO,
  image: "/team/person1.jpg",
  alt: "Fidelia Trials Leadership",
  eyebrow: "Our leadership",
  headline: "The people behind",
  headlineEmphasis: "launch excellence.",
};

export const TEAM: TeamMember[] = [
  {
    id: "federico",
    name: "Federico Pérez Manghi",
    title: "Co-Founder & Chief Medical Officer",
    credentials: "Fidelia Trials (US) · Founder, President & CEO CINME (Argentina)",
    bio: "Leads the company's medical and scientific vision, ensuring clinical excellence, regulatory compliance, and patient safety across every study. Physician-leader with more than 20 years integrating international standards with Latin American expertise, bridging sponsor expectations, investigator networks, and authority requirements from protocol design through close-out.",
    image: "/team/person1.jpg",
  },
  {
    id: "milagros",
    name: "Milagros Pérez Manghi",
    title: "Co-Founder & Chief Executive Officer",
    credentials: "Fidelia Trials (US) · Chief Operating Officer CINME (Argentina)",
    bio: "Leads growth strategy, operational excellence, and international partnerships for the group. Brings extensive experience working alongside global pharmaceutical sponsors and CROs across Latin America, aligning enrollment velocity, quality systems, and executive communication so regional programs stay predictable for sponsors and sites alike.",
    image: "/team/person2.jpg",
  },
  {
    id: "santiago",
    name: "Santiago Isbert Perlender",
    title: "Co-Founder & Chief Financial Officer",
    credentials: "Fidelia Trials (US) · JD Attorney / Foreign Affairs · CFO CINME (Argentina)",
    bio: "JD Attorney and foreign affairs specialist who leads financial strategy, governance, and international expansion for Fidelia Trials. Combines legal training with cross-border commercial experience to structure sponsor relationships, compliance frameworks, and capital discipline at the intersection of healthcare, finance, and innovation—scaling clinical research responsibly across the United States and Latin America.",
    image: "/team/person3.jpg",
  },
  {
    id: "daniel",
    name: "Daniel Cascon",
    title: "Co-Founder & Chief Strategy Officer",
    credentials: "Fidelia Trials (US)",
    bio: "More than 30 years leading companies across the United States and Latin America. Drives strategic vision, international business development, and sponsor relationships that position Fidelia Trials as a leading regional CRO—translating market insight into durable partnerships and disciplined execution for global biopharma clients.",
    image: "/team/person4.jpg",
  },
];
