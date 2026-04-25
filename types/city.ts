export type CityMeta = {
  slug: string;
  name: string;
  state: string;
  tagline: string;
  heroImage?: string;
  areas: string[];          // area slugs
  topAreas: string[];       // featured on city homepage (3–5)
  lastUpdated: string;
};
