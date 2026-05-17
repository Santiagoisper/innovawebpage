export type Country = {
  id: string;
  name: string;
  regulator: string;
  sites: number;
  status: "active" | "expanding";
  /** Operational focus — not map decoration */
  ethicsModel: string;
  typicalApproval: string;
  sponsorStrength: string;
  operationalNotes: string[];
  teamPresence: string;
};

export const COUNTRIES: Country[] = [
  {
    id: "ar",
    name: "Argentina",
    regulator: "ANMAT",
    sites: 28,
    status: "active",
    ethicsModel: "Central + local IRBs; Spanish dossiers; strong academic hospital network",
    typicalApproval: "8–14 weeks ethics · 12–20 weeks ANMAT (parallel where possible)",
    sponsorStrength: "Southern Cone hub for oncology and metabolic trials; rapid ethics in experienced centers",
    operationalNotes: [
      "ANMAT submission formats and pharmacovigilance reporting in local language",
      "Import permit coordination for IMP and comparators",
      "GDP-compliant depot relationships in Buenos Aires corridor",
    ],
    teamPresence: "Regulatory lead + 6 CRAs based in Buenos Aires and Córdoba",
  },
  {
    id: "br",
    name: "Brazil",
    regulator: "ANVISA",
    sites: 45,
    status: "active",
    ethicsModel: "CONEP national ethics + local CEPs; Portuguese dossiers mandatory",
    typicalApproval: "16–24 weeks combined ethics and ANVISA for Phase III",
    sponsorStrength: "Largest enrollment capacity in LATAM; diverse genetic populations for global programs",
    operationalNotes: [
      "RDC 09/2015 GCP alignment and RDC 36 pharmacovigilance",
      "Complex but navigable importation for biologics and ATMPs",
      "Site contracts under local labor and tax requirements",
    ],
    teamPresence: "Dedicated Brazil unit — regulatory, operations, and 18 CRAs",
  },
  {
    id: "co",
    name: "Colombia",
    regulator: "INVIMA",
    sites: 18,
    status: "active",
    ethicsModel: "Institutional ethics committees; Resolución 008437 framework",
    typicalApproval: "10–16 weeks ethics · INVIMA review in parallel for many designs",
    sponsorStrength: "Competitive enrollment in infectious disease and cardiovascular studies",
    operationalNotes: [
      "Health technology assessment considerations for certain designs",
      "Bogotá and Medellín site clusters with proven enrollment",
      "Spanish-language informed consent and lay summaries",
    ],
    teamPresence: "Country manager + 4 CRAs · regulatory specialist in Bogotá",
  },
  {
    id: "mx",
    name: "Mexico",
    regulator: "COFEPRIS",
    sites: 32,
    status: "active",
    ethicsModel: "Federal and institutional committees; NOM-012 compliance",
    typicalApproval: "12–18 weeks depending on study type and import classification",
    sponsorStrength: "High-volume Phase II–III; proximity to US sponsors and bilingual operations",
    operationalNotes: [
      "COFEPRIS registration and amendment pathways for protocol changes",
      "Cross-border logistics for US-manufactured IMP",
      "Mexico City, Monterrey, and Guadalajara investigator networks",
    ],
    teamPresence: "Operations hub in Mexico City · 7 CRAs nationwide",
  },
  {
    id: "pe",
    name: "Peru",
    regulator: "DIGEMID",
    sites: 14,
    status: "active",
    ethicsModel: "Institutional ethics + DIGEMID; Spanish documentation",
    typicalApproval: "10–14 weeks for ethics-led timelines",
    sponsorStrength: "Underserved populations in rare disease and infectious trials",
    operationalNotes: [
      "DIGEMID import licenses and customs coordination in Lima",
      "Strong public hospital participation for sponsor access",
      "GCP training aligned to local inspector expectations",
    ],
    teamPresence: "Lima-based regulatory and 3 CRAs",
  },
  {
    id: "cl",
    name: "Chile",
    regulator: "ISP",
    sites: 16,
    status: "active",
    ethicsModel: "Scientific Ethics Committees; ISP under Ministry of Health",
    typicalApproval: "8–12 weeks for ethics · ISP review streamlined for experienced sites",
    sponsorStrength: "High-quality data; strong inspectorate rapport; ideal for global pivotal subsets",
    operationalNotes: [
      "ISP clinical trial authorization and safety reporting",
      "Santiago academic centers with ICH-trained investigators",
      "Stable regulatory environment for long-running studies",
    ],
    teamPresence: "Santiago office · 3 CRAs · shared Southern Cone regulatory counsel",
  },
];

export const PLATFORM_METRICS = [
  { value: "153+", label: "Active investigator sites" },
  { value: "6", label: "Operating countries" },
  { value: "14", label: "Regulatory pathways mastered" },
  { value: "~580M", label: "Patient population reach" },
] as const;
