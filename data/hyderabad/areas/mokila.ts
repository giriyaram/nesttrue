import type { AreaData } from "@/types/area";

const mokila: AreaData = {
  slug: "mokila",
  name: "Mokila",
  city: "hyderabad",
  tagline: "Far-out affordability — buy only if you can handle the distance",
  lastUpdated: "2025-04-01",
  heroStats: {
    priceRange: "₹4,200–6,500 / sq ft",
    appreciation: "+19% in 3 years",
    commuteTime: "50 min to HITEC City",
    overallScore: 5.9,
  },
  scorecard: {
    connectivity: 4,
    infrastructure: 4,
    appreciation: 6,
    safety: 7,
    lifestyle: 4,
    valueForMoney: 8,
  },
  redFlags: [
    {
      title: "50+ minute daily commute to IT hubs",
      detail:
        "Mokila has no ORR access and no metro connectivity. Daily commuters spend 1.5–2 hours in the car. This is a deal-breaker for most IT professionals.",
      source: "NestTrue field analysis",
    },
    {
      title: "Developer quality is inconsistent",
      detail:
        "Several smaller builders have launched in Mokila without strong track records. RERA registration exists, but delivery timelines have slipped by 18–24 months on multiple projects.",
      source: "RERA filings / NestTrue analysis",
    },
    {
      title: "Resale liquidity is thin",
      detail:
        "Finding a buyer in a reasonable timeframe is harder than in Kokapet or Gachibowli. The buyer pool is smaller and more price-sensitive.",
      source: "SRO transaction data",
    },
  ],
  highlights: [
    {
      title: "Lowest entry price in the western corridor",
      detail:
        "₹4,200 / sq ft is accessible for buyers priced out of Kokapet or Narsingi. A 3 BHK is achievable under ₹80 lakhs.",
    },
    {
      title: "Scenic, low-density living",
      detail:
        "Proximity to Osman Sagar reservoir. Green, peaceful, good air quality — a genuine lifestyle trade for buyers who work remotely.",
    },
  ],
  projects: [],
  nearbyAreas: [
    { name: "Tellapur", slug: "tellapur", relation: "8 km east" },
    { name: "Narsingi", slug: "narsingi", relation: "12 km southeast" },
  ],
  longDescription: `Mokila is Hyderabad's most affordable western option — and the one where the trade-offs are most severe. At ₹4,200–6,500 / sq ft, the prices are attractive on paper. But Mokila is 25–30 km from HITEC City with no direct ORR access, which translates to a 50-minute one-way commute on a good day.

The buyers for whom Mokila works: remote-first workers, retirees, or investors with very long horizons who believe Hyderabad's IT expansion will eventually reach this corridor. It is also a market for buyers who prioritise a large, independent house or villa plot and accept the distance as the price.

For anyone who needs to commute 4–5 days a week to Gachibowli, HITEC City, or Financial District, Mokila is a false economy. The daily time cost is significant, and the thinner resale market means your exit strategy is harder to execute.`,
  idealFor: "Remote-first workers, retirees, or long-term plot investors who prioritise green living and low entry cost and can accept a 50-minute commute to IT hubs",
  verdictBadge: "Caution",
};

export default mokila;
