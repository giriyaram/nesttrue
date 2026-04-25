import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCityMeta } from "@/data/cities";
import { hyderabadAreas } from "@/data/hyderabad";
import type { AreaData } from "@/types/area";
import type { Scorecard } from "@/types/area";
import { Scorecard as ScorecardUI } from "@/components/ScoreBar";
import { LeadCTA } from "@/components/LeadCTA";
import { CheckCircle, XCircle } from "lucide-react";

// Editorial verdicts for high-traffic pairs — everything else auto-generates
const EDITORIAL_VERDICTS: Record<string, string> = {
  "kokapet-vs-narsingi":
    "Kokapet wins on commute, developer quality, and brand value. Narsingi wins on value-for-money and appreciation headroom. If your budget is ₹1.2 Cr or above and commute time matters, choose Kokapet. Below ₹1 Cr, Narsingi delivers better per-square-foot value with only 6 extra minutes of commute.",
};

function getAreasForCity(city: string): Record<string, AreaData> {
  if (city === "hyderabad") return hyderabadAreas;
  return {};
}

function parseSlug(
  slug: string,
  areas: Record<string, AreaData>
): [AreaData, AreaData] | null {
  for (const leftSlug of Object.keys(areas)) {
    const prefix = `${leftSlug}-vs-`;
    if (slug.startsWith(prefix)) {
      const rightSlug = slug.slice(prefix.length);
      if (areas[rightSlug]) return [areas[leftSlug], areas[rightSlug]];
    }
  }
  return null;
}

const SCORECARD_LABELS: Record<keyof Scorecard, string> = {
  connectivity: "connectivity",
  infrastructure: "infrastructure",
  appreciation: "appreciation potential",
  safety: "safety",
  lifestyle: "lifestyle",
  valueForMoney: "value for money",
};

function generateAutoVerdict(a: AreaData, b: AreaData): string {
  const dims = Object.keys(SCORECARD_LABELS) as (keyof Scorecard)[];
  const aWins = dims.filter((d) => a.scorecard[d] > b.scorecard[d]);
  const bWins = dims.filter((d) => b.scorecard[d] > a.scorecard[d]);

  const [higher, lower, higherWins, lowerWins] =
    a.heroStats.overallScore >= b.heroStats.overallScore
      ? [a, b, aWins, bWins]
      : [b, a, bWins, aWins];

  const higherAdvantage = higherWins
    .slice(0, 2)
    .map((d) => SCORECARD_LABELS[d])
    .join(" and ");
  const lowerAdvantage = lowerWins
    .slice(0, 2)
    .map((d) => SCORECARD_LABELS[d])
    .join(" and ");

  const higherStr = higherAdvantage
    ? `${higher.name} leads on ${higherAdvantage} (${higher.heroStats.overallScore}/10 vs ${lower.heroStats.overallScore}/10)`
    : `${higher.name} scores higher overall (${higher.heroStats.overallScore}/10 vs ${lower.heroStats.overallScore}/10)`;

  const lowerStr = lowerAdvantage
    ? `${lower.name} wins on ${lowerAdvantage}`
    : `${lower.name} offers a lower entry price at ${lower.heroStats.priceRange}`;

  return `${higherStr}. ${lowerStr}. Choose ${higher.name} if: ${higher.idealFor}. Choose ${lower.name} if: ${lower.idealFor}.`;
}

function mostRecentDate(a: string, b: string): string {
  return a > b ? a : b;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; slug: string }>;
}): Promise<Metadata> {
  const { city, slug } = await params;
  const areas = getAreasForCity(city);
  const pair = parseSlug(slug, areas);
  if (!pair) return {};
  const [left, right] = pair;
  const title = `${left.name} vs ${right.name} — Which Should You Buy in 2025?`;
  const verdict = EDITORIAL_VERDICTS[slug] ?? generateAutoVerdict(left, right);
  return {
    title,
    description: verdict.slice(0, 160),
    alternates: { canonical: `https://nesttrue.com/${city}/compare/${slug}` },
  };
}

export async function generateStaticParams() {
  const params: { city: string; slug: string }[] = [];
  const slugs = Object.keys(hyderabadAreas);
  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      params.push({
        city: "hyderabad",
        slug: `${slugs[i]}-vs-${slugs[j]}`,
      });
    }
  }
  return params;
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ city: string; slug: string }>;
}) {
  const { city, slug } = await params;
  const cityMeta = getCityMeta(city);
  const areas = getAreasForCity(city);
  const pair = parseSlug(slug, areas);
  if (!pair || !cityMeta) notFound();

  const [left, right] = pair;
  const verdict = EDITORIAL_VERDICTS[slug] ?? generateAutoVerdict(left, right);
  const lastUpdated = mostRecentDate(left.lastUpdated, right.lastUpdated);
  const updated = new Date(lastUpdated).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
  const title = `${left.name} vs ${right.name} — Which Should You Buy in 2025?`;

  const sides = [
    {
      area: left,
      pros: left.highlights.map((h) => h.title + " — " + h.detail),
      cons: left.redFlags.map((r) => r.title),
    },
    {
      area: right,
      pros: right.highlights.map((h) => h.title + " — " + h.detail),
      cons: right.redFlags.map((r) => r.title),
    },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span>/</span>
          <Link href={`/${city}`} className="hover:text-navy capitalize">{city}</Link>
          <span>/</span>
          <span className="text-navy">Compare</span>
        </div>
      </div>

      <section className="bg-navy text-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold max-w-3xl">{title}</h1>
          <p className="mt-3 text-xs text-blue-300">Last updated: {updated}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">

        {/* Verdict */}
        <div className="bg-trust-blue/5 border border-trust-blue/20 rounded-xl p-6">
          <p className="text-sm font-semibold text-trust-blue uppercase tracking-wider mb-2">
            NestTrue Verdict
          </p>
          <p className="text-navy text-base leading-relaxed">{verdict}</p>
        </div>

        {/* Side-by-side */}
        <div className="grid md:grid-cols-2 gap-6">
          {sides.map(({ area, pros, cons }) => (
            <div key={area.slug} className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
              <div>
                <Link
                  href={`/${city}/${area.slug}`}
                  className="font-display font-bold text-2xl text-navy hover:text-trust-blue transition-colors"
                >
                  {area.name}
                </Link>
                <p className="text-gray-500 text-sm mt-1">{area.heroStats.priceRange}</p>
              </div>

              <ScorecardUI scores={area.scorecard} />

              <div>
                <p className="text-sm font-semibold text-green-700 mb-2">Pros</p>
                <ul className="space-y-2">
                  {pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-red-700 mb-2">Cons</p>
                <ul className="space-y-2">
                  {cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <XCircle size={16} className="text-honest-red shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-surface rounded-lg p-4">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">
                  Ideal for
                </p>
                <p className="text-sm text-navy">{area.idealFor}</p>
              </div>

              <Link
                href={`/${city}/${area.slug}`}
                className="block text-center text-trust-blue text-sm font-medium hover:underline"
              >
                Full {area.name} analysis →
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <LeadCTA
          city={city}
          ctaText={`Still deciding between ${left.name} and ${right.name}?`}
        />
      </div>
    </div>
  );
}
