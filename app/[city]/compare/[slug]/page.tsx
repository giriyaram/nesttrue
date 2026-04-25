import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCityMeta } from "@/data/cities";
import comparison from "@/data/hyderabad/comparisons/kokapet-vs-narsingi";
import { Scorecard } from "@/components/ScoreBar";
import { LeadCTA } from "@/components/LeadCTA";
import { CheckCircle, XCircle } from "lucide-react";

function getComparison(city: string, slug: string) {
  if (city === "hyderabad" && slug === "kokapet-vs-narsingi") return comparison;
  return undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; slug: string }>;
}): Promise<Metadata> {
  const { city, slug } = await params;
  const data = getComparison(city, slug);
  if (!data) return {};
  return {
    title: data.title,
    description: data.verdict.slice(0, 160),
    alternates: { canonical: `https://nesttrue.com/${city}/compare/${slug}` },
  };
}

export async function generateStaticParams() {
  return [{ city: "hyderabad", slug: "kokapet-vs-narsingi" }];
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ city: string; slug: string }>;
}) {
  const { city, slug } = await params;
  const cityMeta = getCityMeta(city);
  const data = getComparison(city, slug);
  if (!data || !cityMeta) notFound();

  const updated = new Date(data.lastUpdated).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

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
          <h1 className="text-4xl md:text-5xl font-display font-bold max-w-3xl">{data.title}</h1>
          <p className="mt-3 text-xs text-blue-300">Last updated: {updated}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">

        {/* Verdict */}
        <div className="bg-trust-blue/5 border border-trust-blue/20 rounded-xl p-6">
          <p className="text-sm font-semibold text-trust-blue uppercase tracking-wider mb-2">
            NestTrue Verdict
          </p>
          <p className="text-navy text-base leading-relaxed">{data.verdict}</p>
        </div>

        {/* Side-by-side */}
        <div className="grid md:grid-cols-2 gap-6">
          {[data.left, data.right].map((side) => (
            <div key={side.areaSlug} className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
              <div>
                <Link
                  href={`/${city}/${side.areaSlug}`}
                  className="font-display font-bold text-2xl text-navy hover:text-trust-blue transition-colors"
                >
                  {side.areaName}
                </Link>
                <p className="text-gray-500 text-sm mt-1">{side.priceRange}</p>
              </div>

              <Scorecard scores={side.scorecard} />

              <div>
                <p className="text-sm font-semibold text-green-700 mb-2">Pros</p>
                <ul className="space-y-2">
                  {side.pros.map((pro, i) => (
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
                  {side.cons.map((con, i) => (
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
                <p className="text-sm text-navy">{side.idealFor}</p>
              </div>

              <Link
                href={`/${city}/${side.areaSlug}`}
                className="block text-center text-trust-blue text-sm font-medium hover:underline"
              >
                Full {side.areaName} analysis →
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <LeadCTA
          city={city}
          ctaText={`Still deciding between ${data.left.areaName} and ${data.right.areaName}?`}
        />
      </div>
    </div>
  );
}
