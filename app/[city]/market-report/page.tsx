import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCityMeta } from "@/data/cities";
import { hyderabadAreas } from "@/data/hyderabad";
import { LeadCTA } from "@/components/LeadCTA";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const meta = getCityMeta(city);
  if (!meta) return {};
  return {
    title: `${meta.name} Real Estate Market Report Q1 2025`,
    description: `Current price ranges, appreciation trends, and market outlook for ${meta.name} real estate — Q1 2025 data.`,
  };
}

export async function generateStaticParams() {
  return [{ city: "hyderabad" }];
}

export default async function MarketReportPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const meta = getCityMeta(city);
  if (!meta) notFound();

  const areas =
    city === "hyderabad"
      ? Object.values(hyderabadAreas).sort(
          (a, b) => b.heroStats.overallScore - a.heroStats.overallScore
        )
      : [];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span>/</span>
          <Link href={`/${city}`} className="hover:text-navy capitalize">{city}</Link>
          <span>/</span>
          <span className="text-navy">Market Report</span>
        </div>
      </div>

      <section className="bg-navy text-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-true-accent text-sm font-medium uppercase tracking-widest mb-3">
            Q1 2025 — April 2025
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            {meta.name} Real Estate Market Report
          </h1>
          <p className="mt-3 text-blue-200 text-lg max-w-2xl">
            Price ranges, appreciation trends, and area-by-area outlook. Updated monthly with
            verified data — no broker spin.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* Market summary */}
        <section className="bg-white rounded-xl border border-gray-100 p-8">
          <h2 className="text-2xl font-display font-bold text-navy mb-6">Market Summary</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              {
                label: "Western Corridor Appreciation",
                value: "+28–34%",
                subtext: "3 years, Kokapet to Narsingi",
                trend: "up",
              },
              {
                label: "New Supply (2024–25)",
                value: "22,000+",
                subtext: "units launched in Hyderabad west",
                trend: "up",
              },
              {
                label: "Inventory Overhang",
                value: "18 months",
                subtext: "at current absorption rate",
                trend: "neutral",
              },
            ].map((item) => (
              <div key={item.label} className="bg-surface rounded-lg p-5">
                <div className="flex justify-center mb-2">
                  {item.trend === "up" ? (
                    <TrendingUp className="text-green-500" size={24} />
                  ) : item.trend === "down" ? (
                    <TrendingDown className="text-honest-red" size={24} />
                  ) : (
                    <Minus className="text-yellow-500" size={24} />
                  )}
                </div>
                <p className="text-3xl font-bold text-navy">{item.value}</p>
                <p className="text-sm text-gray-500 mt-1">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.subtext}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-yellow-800">
            <strong>Honest note:</strong> Hyderabad's western corridor has absorbed 3 years of
            aggressive appreciation. Buyers entering at current Kokapet prices (₹10,000–13,000
            / sq ft) should not underwrite double-digit annual appreciation going forward. The
            growth story is real — but it&apos;s partly priced in.
          </div>
        </section>

        {/* Area comparison table */}
        <section>
          <h2 className="text-2xl font-display font-bold text-navy mb-6">Area-by-Area Overview</h2>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface border-b border-gray-100">
                    <th className="text-left px-6 py-4 font-semibold text-navy">Area</th>
                    <th className="text-right px-6 py-4 font-semibold text-navy">Price / sq ft</th>
                    <th className="text-right px-6 py-4 font-semibold text-navy">3yr Growth</th>
                    <th className="text-right px-6 py-4 font-semibold text-navy">NestTrue Score</th>
                    <th className="text-right px-6 py-4 font-semibold text-navy"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {areas.map((area) => (
                    <tr key={area.slug} className="hover:bg-surface transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-navy">{area.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{area.tagline.split("—")[0].trim()}</p>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-700">{area.heroStats.priceRange}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-green-600 font-medium">{area.heroStats.appreciation}</span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-navy">
                        {area.heroStats.overallScore}/10
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/${city}/${area.slug}`}
                          className="text-trust-blue hover:underline text-xs font-medium"
                        >
                          Full analysis →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <LeadCTA
          city={city}
          ctaText={`Which ${meta.name} area fits your budget and timeline?`}
        />
      </div>
    </div>
  );
}
