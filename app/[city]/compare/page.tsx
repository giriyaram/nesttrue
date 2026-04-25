import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCityMeta } from "@/data/cities";
import { hyderabadAreas } from "@/data/hyderabad";
import type { AreaData } from "@/types/area";

function getAreasForCity(city: string): Record<string, AreaData> {
  if (city === "hyderabad") return hyderabadAreas;
  return {};
}

function getAllPairs(areas: Record<string, AreaData>) {
  const slugs = Object.keys(areas);
  const pairs: { left: AreaData; right: AreaData; slug: string }[] = [];
  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      pairs.push({
        left: areas[slugs[i]],
        right: areas[slugs[j]],
        slug: `${slugs[i]}-vs-${slugs[j]}`,
      });
    }
  }
  return pairs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cityMeta = getCityMeta(city);
  if (!cityMeta) return {};
  return {
    title: `Compare Areas in ${cityMeta.name} — Side-by-Side Analysis`,
    description: `Compare any two areas in ${cityMeta.name} on price, appreciation, commute, infrastructure, and lifestyle. Honest data, no broker spin.`,
    alternates: { canonical: `https://nesttrue.com/${city}/compare` },
  };
}

export async function generateStaticParams() {
  return [{ city: "hyderabad" }];
}

export default async function CompareIndexPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityMeta = getCityMeta(city);
  const areas = getAreasForCity(city);
  if (!cityMeta || Object.keys(areas).length === 0) notFound();

  const pairs = getAllPairs(areas);

  // Group: top-area pairs first (both areas in topAreas), then mixed, then rest
  const topSlugs = new Set(cityMeta.topAreas);
  const topPairs = pairs.filter(
    (p) => topSlugs.has(p.left.slug) && topSlugs.has(p.right.slug)
  );
  const mixedPairs = pairs.filter(
    (p) =>
      (topSlugs.has(p.left.slug) || topSlugs.has(p.right.slug)) &&
      !(topSlugs.has(p.left.slug) && topSlugs.has(p.right.slug))
  );
  const restPairs = pairs.filter(
    (p) => !topSlugs.has(p.left.slug) && !topSlugs.has(p.right.slug)
  );

  function PairCard({
    left,
    right,
    slug,
  }: {
    left: AreaData;
    right: AreaData;
    slug: string;
  }) {
    const avgScore = ((left.heroStats.overallScore + right.heroStats.overallScore) / 2).toFixed(1);
    return (
      <Link
        href={`/${city}/compare/${slug}`}
        className="group bg-white border border-gray-100 rounded-xl p-5 hover:border-trust-blue/40 hover:shadow-sm transition-all"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-navy text-sm truncate">{left.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{left.heroStats.priceRange}</p>
          </div>
          <span className="text-xs font-bold text-gray-300 shrink-0">VS</span>
          <div className="flex-1 min-w-0 text-right">
            <p className="font-semibold text-navy text-sm truncate">{right.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{right.heroStats.priceRange}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-2">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                left.verdictBadge === "Buy"
                  ? "bg-green-50 text-green-700"
                  : left.verdictBadge === "Caution"
                  ? "bg-yellow-50 text-yellow-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {left.verdictBadge}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                right.verdictBadge === "Buy"
                  ? "bg-green-50 text-green-700"
                  : right.verdictBadge === "Caution"
                  ? "bg-yellow-50 text-yellow-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {right.verdictBadge}
            </span>
          </div>
          <span className="text-sm text-trust-blue font-semibold underline">
            Compare →
          </span>
        </div>
      </Link>
    );
  }

  return (
    <div>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span>/</span>
          <Link href={`/${city}`} className="hover:text-navy capitalize">{city}</Link>
          <span>/</span>
          <span className="text-navy">Compare Areas</span>
        </div>
      </div>

      <section className="bg-navy text-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            Compare Areas in {cityMeta.name}
          </h1>
          <p className="mt-3 text-blue-200 max-w-xl">
            Side-by-side analysis on price, appreciation, commute, and lifestyle.
            No broker spin — just the honest data.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        {topPairs.length > 0 && (
          <section>
            <h2 className="text-xl font-display font-bold text-navy mb-4">Top area comparisons</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topPairs.map((p) => (
                <PairCard key={p.slug} {...p} />
              ))}
            </div>
          </section>
        )}

        {mixedPairs.length > 0 && (
          <section>
            <h2 className="text-xl font-display font-bold text-navy mb-4">Mixed comparisons</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mixedPairs.map((p) => (
                <PairCard key={p.slug} {...p} />
              ))}
            </div>
          </section>
        )}

        {restPairs.length > 0 && (
          <section>
            <h2 className="text-xl font-display font-bold text-navy mb-4">All other comparisons</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {restPairs.map((p) => (
                <PairCard key={p.slug} {...p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
