export type TeamMember = {
  id: string;
  name: string;
  title: string;
  credentials: string;
  bio: string;
  focusAreas: string[];
};

export const TEAM: TeamMember[] = [
  {
    id: "ceo",
    name: "Dr. María Elena Vásquez",
    title: "Chief Executive Officer",
    credentials: "MD, MBA — Universidad de Buenos Aires / IESE",
    bio: "20 years directing multi-country Phase II–IV programs across ANMAT, ANVISA, and COFEPRIS jurisdictions.",
    focusAreas: ["Sponsor strategy", "Multi-country study design", "Regional expansion"],
  },
  {
    id: "cso",
    name: "Dr. Roberto Nascimento",
    title: "Chief Scientific Officer",
    credentials: "PhD Pharmacology — USP São Paulo",
    bio: "Former ANVISA scientific advisor. Specialist in oncology and rare disease regulatory strategy for the Latin American region.",
    focusAreas: ["Protocol design review", "Oncology & rare disease", "ANVISA scientific dialogue"],
  },
  {
    id: "coo",
    name: "Ing. Claudia Morales",
    title: "Chief Operations Officer",
    credentials: "MS Biomedical Engineering — UNAM",
    bio: "Built and managed site networks across 6 countries. Led 40+ trial activations in under 12 months.",
    focusAreas: ["Site networks", "Enrollment recovery", "Vendor & supply chain"],
  },
  {
    id: "ra",
    name: "Dr. Juan Ignacio Ferreyra",
    title: "VP Regulatory Affairs",
    credentials: "PharmD — UNC Córdoba",
    bio: "Expert in ANMAT submissions, ethics committee strategy, and GCP compliance audits throughout the Southern Cone.",
    focusAreas: ["Ethics & authority submissions", "Inspection readiness", "Southern Cone regulatory"],
  },
];
