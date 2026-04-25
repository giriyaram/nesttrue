export type Scorecard = {
  connectivity: number;     // 0–10
  infrastructure: number;
  appreciation: number;
  safety: number;
  lifestyle: number;
  valueForMoney: number;
};

export type HeroStats = {
  priceRange: string;       // e.g. "₹7,500–11,000 / sq ft"
  appreciation: string;     // e.g. "+18% in 3 years"
  commuteTime: string;      // e.g. "28 min to HITEC City"
  overallScore: number;     // 0–10
};

export type RedFlag = {
  title: string;
  detail: string;
  source?: string;
};

export type Highlight = {
  title: string;
  detail: string;
};

export type Project = {
  name: string;
  developer: string;
  priceRange: string;
  status: string;         // "Under Construction" | "Ready to Move" | "New Launch"
  slug?: string;
};

export type NearbyArea = {
  name: string;
  slug: string;
  relation: string;       // e.g. "5 km south"
};

export type AreaData = {
  slug: string;
  name: string;
  city: string;
  tagline: string;
  lastUpdated: string;    // ISO date — SEO freshness
  heroStats: HeroStats;
  scorecard: Scorecard;
  redFlags: RedFlag[];
  highlights: Highlight[];
  projects: Project[];
  nearbyAreas: NearbyArea[];
  longDescription: string;  // markdown-safe plain text, 2–3 paragraphs
  idealFor: string;         // 1-liner buyer persona — used on area page and in comparisons
  verdictBadge: "Buy" | "Caution" | "Avoid";
};
