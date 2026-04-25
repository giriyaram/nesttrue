import type { AreaData } from "@/types/area";

const kondapur: AreaData = {
  slug: "kondapur",
  name: "Kondapur",
  city: "hyderabad",
  tagline: "The sweet spot between HITEC City and the western corridor — dense, connected, and liveable",
  lastUpdated: "2025-04-25",
  heroStats: {
    priceRange: "₹7,500–11,500 / sq ft",
    appreciation: "+28% in 3 years",
    commuteTime: "8–15 min to HITEC City",
    overallScore: 7.8,
  },
  scorecard: {
    connectivity: 9,
    infrastructure: 8,
    appreciation: 7,
    safety: 8,
    lifestyle: 8,
    valueForMoney: 7,
  },
  redFlags: [
    {
      title: "Traffic congestion on Kondapur main road is severe",
      detail:
        "The stretch from Kothaguda junction to Biodiversity junction jams from 8–10 AM and 6–9 PM daily. If you drive, budget 25–40 extra minutes door-to-door during peak hours.",
      source: "HMDA / NestTrue field analysis",
    },
    {
      title: "Limited new inventory — mostly resale and ageing stock",
      detail:
        "Most Kondapur apartments are 8–15 years old. Fresh launches are rare because the area is built out. Buyers get lower entry prices but take on higher maintenance costs and dated amenities.",
      source: "GHMC completion certificates",
    },
    {
      title: "Parking is chronically undersupplied",
      detail:
        "Many older apartment complexes were built with 1:1 parking ratios before two-car households became the norm. Visitor parking barely exists, and street parking is chaotic.",
      source: "NestTrue field analysis / resident accounts",
    },
  ],
  highlights: [
    {
      title: "Best price-to-location ratio in the HITEC City belt",
      detail:
        "At ₹7,500–11,500 / sq ft, Kondapur is 20–30% cheaper than Gachibowli while offering comparable commute times to the same IT employers. For budget-conscious IT professionals, it consistently ranks first.",
    },
    {
      title: "Fully built-out social infrastructure",
      detail:
        "Inorbit Mall, Sarath City Capital Mall, GSI Bandlaguda Park, Kondapur Metro Station, and reputed schools (Nasr, Indus International) are all within a 3 km radius. Everything is already here.",
    },
    {
      title: "Metro connectivity via Raidurg station",
      detail:
        "Raidurgam Metro Station is a 10-minute walk or quick auto-ride away, giving direct access to Hitech City, Ameerpet, and Secunderabad without touching a car.",
    },
    {
      title: "Strong rental demand keeps vacancy very low",
      detail:
        "IT workforce demand keeps Kondapur vacancy below 4%. A 2 BHK rents for ₹28,000–45,000 / month, delivering gross yields of 3.5–4.5% — among the healthiest in western Hyderabad.",
    },
  ],
  projects: [
    {
      name: "Auro Regent",
      developer: "Auro Realty",
      priceRange: "₹8,500–10,500 / sq ft",
      status: "Ready to Move",
      slug: "auro-regent",
    },
    {
      name: "Aparna Serene Park",
      developer: "Aparna Constructions",
      priceRange: "₹7,800–9,500 / sq ft",
      status: "Ready to Move",
      slug: "aparna-serene-park",
    },
    {
      name: "Aparna Luxor Park",
      developer: "Aparna Constructions",
      priceRange: "₹9,000–11,200 / sq ft",
      status: "Ready to Move",
      slug: "aparna-luxor-park",
    },
    {
      name: "MyHome Mangala",
      developer: "My Home Constructions",
      priceRange: "₹8,200–10,800 / sq ft",
      status: "Ready to Move",
      slug: "myhome-mangala",
    },
  ],
  nearbyAreas: [
    { name: "Gachibowli", slug: "gachibowli", relation: "4 km south" },
    { name: "Financial District", slug: "financial-district", relation: "6 km south" },
    { name: "Kokapet", slug: "kokapet", relation: "10 km southwest" },
    { name: "Narsingi", slug: "narsingi", relation: "12 km southwest" },
  ],
  longDescription: `Kondapur sits in Hyderabad's most competitive real estate belt — close enough to HITEC City and Gachibowli that commutes are short, but priced 20–30% below its southern neighbours. That gap is the core proposition.

The honest reality: Kondapur is a mature, dense neighbourhood. You are not buying into an appreciating frontier. The 28% gain over 3 years is solid but trails Kokapet's 34%. New launches are rare because there is barely any land left to develop — you will mostly be transacting resale. Expect 8–15 year old buildings, older club amenities, and parking that does not add up.

What Kondapur delivers reliably is liveability. The social infrastructure — malls, schools, hospitals, restaurants — is fully built out. Raidurgam Metro removes car dependence for IT commuters. Rental demand is robust and vacancy stays low, which matters if you are buying for yield or keeping the option to rent out later.

Best suited for: IT professionals buying their first home with a tight budget, investors prioritising rental yield over speculative appreciation, and buyers who want an established neighbourhood over a greenfield bet. If you can stretch to Gachibowli or need a newer building, look south. If you want value, connectivity, and a neighbourhood that already works, Kondapur holds up.`,
  verdictBadge: "Buy",
};

export default kondapur;
