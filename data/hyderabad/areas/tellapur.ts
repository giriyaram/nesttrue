import type { AreaData } from "@/types/area";

const tellapur: AreaData = {
  slug: "tellapur",
  name: "Tellapur",
  city: "hyderabad",
  tagline: "Emerging township corridor — spacious plots, long horizon needed",
  lastUpdated: "2025-04-01",
  heroStats: {
    priceRange: "₹5,500–8,000 / sq ft",
    appreciation: "+41% in 3 years",
    commuteTime: "35 min to HITEC City",
    overallScore: 6.8,
  },
  scorecard: {
    connectivity: 5,
    infrastructure: 5,
    appreciation: 9,
    safety: 7,
    lifestyle: 5,
    valueForMoney: 9,
  },
  redFlags: [
    {
      title: "Infrastructure is 3–5 years behind prices",
      detail:
        "Roads, sewage, and reliable electricity are still patchy in the newer sectors. Developers have built; civic agencies have not caught up.",
      source: "GHMC / HMDA infrastructure status",
    },
    {
      title: "Long commute without ORR exit",
      detail:
        "Getting to HITEC City involves navigating through Miyapur or Kondapur, not a direct ORR access. A 35-minute drive easily becomes 55+ minutes in peak traffic.",
      source: "HMDA road network / NestTrue field analysis",
    },
  ],
  highlights: [
    {
      title: "Highest raw appreciation in western Hyderabad",
      detail:
        "41% in 3 years on a lower base — Tellapur is where the growth story is still early.",
    },
    {
      title: "Large-format villa plots available",
      detail:
        "300–500 sq yd DTCP-approved plots for buyers who want land banking or independent house construction.",
    },
  ],
  projects: [
    {
      name: "Aliens Space Station",
      developer: "Aliens Developers",
      priceRange: "₹6,500–8,000 / sq ft",
      status: "Ready to Move",
    },
  ],
  nearbyAreas: [
    { name: "Kokapet", slug: "kokapet", relation: "10 km southeast" },
    { name: "Mokila", slug: "mokila", relation: "8 km west" },
  ],
  longDescription: `Tellapur is a high-risk, high-reward bet in western Hyderabad. The area has delivered the highest price growth in the corridor — 41% in 3 years — driven by large township launches and land banking demand. Prices remain lower than Kokapet or Gachibowli, which keeps the entry point accessible.

The honest case against: Tellapur is buying into a promise. The infrastructure is thin, the commute is long, and daily conveniences require driving to Kondapur or Miyapur. If you need to live there today with school-age children, the quality of daily life will disappoint.

Tellapur makes sense as a 7–10 year investment horizon play — particularly for plot buyers who can wait for HMDA's township master plan to materialise. It is not a choice for families who need the area fully functional on possession day.`,
  idealFor: "Long-horizon investors (7–10 years) and plot buyers who believe western Hyderabad will expand to this corridor and can accept thin infrastructure today in exchange for a lower base price",
  verdictBadge: "Caution",
};

export default tellapur;
