import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCityMeta } from "@/data/cities";
import { hyderabadAreas } from "@/data/hyderabad";
import { LeadCTA } from "@/components/LeadCTA";
import { AreaSearch } from "@/components/AreaSearch";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const meta = getCityMeta(city);
  if (!meta) return {};
  return {
    title: `${meta.name} Real Estate — Honest Buyer Research`,
    description: `Hyperlocal area analysis for ${meta.name} real estate. Prices, appreciation, red flags, and commute times — no broker spin.`,
  };
}

export async function generateStaticParams() {
  return [{ city: "hyderabad" }, { city: "bangalore" }];
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const meta = getCityMeta(city);
  if (!meta) notFound();

  const areas =
    city === "hyderabad"
      ? Object.values(hyderabadAreas)
      : [];

  return (
    <div>
      {/* City Hero */}
      <section className="bg-navy text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-true-accent text-sm font-medium uppercase tracking-widest mb-3">
            {meta.state}
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold">{meta.name}</h1>
          <p className="mt-3 text-xl text-blue-200">{meta.tagline}</p>
          <div className="mt-6 flex gap-3">
            <Link
              href={`/${city}/market-report`}
              className="bg-trust-blue hover:bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
            >
              Q1 2025 Market Report
            </Link>
            <Link
              href={`/${city}/compare/kokapet-vs-narsingi`}
              className="border border-white/20 text-white hover:border-white/40 px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
            >
              Compare Areas
            </Link>
          </div>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-display font-bold text-navy mb-2">Top Areas to Research</h2>
        <p className="text-gray-500 mb-8">
          Click any area for a full analysis — prices, appreciation, red flags, and builder data.
        </p>

        {areas.length > 0 ? (
          <AreaSearch areas={areas} city={city} />
        ) : (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
            <p className="text-gray-400 text-lg">Area data coming soon for {meta.name}</p>
            <p className="text-gray-400 text-sm mt-2">
              We&apos;re researching this market. Check back in a few weeks.
            </p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <LeadCTA
          city={city}
          ctaText={`Get personalised area guidance for ${meta.name} on WhatsApp`}
        />
      </section>
    </div>
  );
}
