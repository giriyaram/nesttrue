import type { Scorecard } from "./area";

export type ComparisonSide = {
  areaSlug: string;
  areaName: string;
  priceRange: string;
  scorecard: Scorecard;
  pros: string[];
  cons: string[];
  idealFor: string;
};

export type ComparisonData = {
  slug: string;
  city: string;
  title: string;           // "Kokapet vs Narsingi — Which is Better to Buy in 2025?"
  lastUpdated: string;
  verdict: string;         // 2–3 sentence honest verdict
  left: ComparisonSide;
  right: ComparisonSide;
};
