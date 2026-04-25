export type ProjectData = {
  slug: string;
  name: string;
  developer: string;
  city: string;
  area: string;
  areaSlug: string;
  lastUpdated: string;
  status: "Under Construction" | "Ready to Move" | "New Launch";
  priceRange: string;
  possessionDate?: string;
  totalUnits?: number;
  configuration: string[];  // ["2 BHK", "3 BHK"]
  highlights: string[];
  concerns: string[];
  verdict: string;
  verdictBadge: "Buy" | "Caution" | "Avoid";
  reraNumber?: string;
  reraLink?: string;
  locationAdvantages: string[];
};
