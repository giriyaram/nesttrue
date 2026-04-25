import { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { hyderabadAreas } from "@/data/hyderabad";

const BASE = "https://nesttrue.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  ];

  const cityRoutes: MetadataRoute.Sitemap = cities.flatMap((city) => [
    {
      url: `${BASE}/${city.slug}`,
      lastModified: new Date(city.lastUpdated),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE}/${city.slug}/market-report`,
      lastModified: new Date(city.lastUpdated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]);

  const areaRoutes: MetadataRoute.Sitemap = Object.values(hyderabadAreas).map((area) => ({
    url: `${BASE}/hyderabad/${area.slug}`,
    lastModified: new Date(area.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/hyderabad/compare/kokapet-vs-narsingi`,
      lastModified: new Date("2025-04-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = [
    "prestige-golden-grove",
    "ramky-one-odyssey",
    "lansum-elena",
    "myhome-apas",
    "godrej-madison-avenue",
    "brigade-gateway-kokapet",
    "prestige-high-fields",
    "myscape-songs-of-the-sun",
    "dsr-twins",
    "sas-diamond-towers",
    "auro-regent",
    "aparna-serene-park",
    "aparna-luxor-park",
    "myhome-mangala",
  ].map((slug) => ({
    url: `${BASE}/hyderabad/projects/${slug}`,
    lastModified: new Date("2025-04-25"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...cityRoutes, ...areaRoutes, ...comparisonRoutes, ...projectRoutes];
}
