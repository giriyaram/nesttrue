import type { CityMeta } from "@/types/city";

export const cities: CityMeta[] = [
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    tagline: "India's fastest-growing IT real estate market",
    areas: ["financial-district", "kokapet", "narsingi", "tellapur", "gachibowli", "mokila", "kollur", "kondapur"],
    topAreas: ["financial-district", "kokapet", "narsingi", "gachibowli", "kondapur"],
    lastUpdated: "2025-04-25",
  },
  {
    slug: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    tagline: "Silicon Valley of India — where demand never sleeps",
    areas: [],
    topAreas: [],
    lastUpdated: "2025-03-01",
  },
];

export function getCityMeta(slug: string): CityMeta | undefined {
  return cities.find((c) => c.slug === slug);
}
