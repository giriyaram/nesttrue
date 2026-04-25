import type { ComparisonData } from "@/types/comparison";

const comparison: ComparisonData = {
  slug: "kokapet-vs-narsingi",
  city: "hyderabad",
  title: "Kokapet vs Narsingi — Which Should You Buy in 2025?",
  lastUpdated: "2025-04-01",
  verdict:
    "Kokapet wins on commute, developer quality, and brand value. Narsingi wins on value-for-money and appreciation headroom. If your budget is ₹1.2 Cr or above and commute time matters, choose Kokapet. Below ₹1 Cr, Narsingi delivers better per-square-foot value with only 6 extra minutes of commute.",
  left: {
    areaSlug: "kokapet",
    areaName: "Kokapet",
    priceRange: "₹8,500–13,000 / sq ft",
    scorecard: {
      connectivity: 7,
      infrastructure: 7,
      appreciation: 9,
      safety: 8,
      lifestyle: 7,
      valueForMoney: 6,
    },
    pros: [
      "22-minute commute to HITEC City — 6 minutes faster than Narsingi",
      "Premium developers (Prestige, My Home) with proven delivery records",
      "Strongest 3-year appreciation in western Hyderabad (34%)",
      "More mature social infrastructure — malls, hospitals, schools nearby",
    ],
    cons: [
      "₹1,500–3,500 / sq ft more expensive than Narsingi for equivalent flats",
      "Kokapet junction traffic is a genuine daily irritant",
      "Appreciation headroom is narrowing at current price levels",
    ],
    idealFor:
      "IT professionals with ₹1.2 Cr+ budget, commuting 5 days/week to Financial District or HITEC City",
  },
  right: {
    areaSlug: "narsingi",
    areaName: "Narsingi",
    priceRange: "₹7,000–9,500 / sq ft",
    scorecard: {
      connectivity: 6,
      infrastructure: 6,
      appreciation: 8,
      safety: 8,
      lifestyle: 6,
      valueForMoney: 8,
    },
    pros: [
      "15–20% cheaper than Kokapet — buys you an extra bedroom at the same budget",
      "More appreciation headroom — priced below Kokapet with similar fundamentals",
      "Quieter, greener, lower density — better quality of daily life off-office hours",
      "28-minute commute is still very good for western Hyderabad",
    ],
    cons: [
      "Retail and daily convenience infrastructure is 2–3 years behind Kokapet",
      "Fewer premium developer options — more mid-tier builders",
      "No direct metro access",
    ],
    idealFor:
      "Value-oriented buyers, families, investors with 5-year horizon, or hybrid-work professionals with budgets under ₹1 Cr",
  },
};

export default comparison;
