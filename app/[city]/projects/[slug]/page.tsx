import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCityMeta } from "@/data/cities";
import { hyderabadProjects } from "@/data/hyderabad";
import { LeadCTA } from "@/components/LeadCTA";
import { CheckCircle, AlertTriangle, MapPin, Building2 } from "lucide-react";

function getProjectData(city: string, slug: string) {
  if (city === "hyderabad") return hyderabadProjects[slug];
  return undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; slug: string }>;
}): Promise<Metadata> {
  const { city, slug } = await params;
  const data = getProjectData(city, slug);
  if (!data) return {};
  return {
    title: `${data.name} by ${data.developer} — Honest Review`,
    description: `${data.verdict.slice(0, 160)}`,
    alternates: { canonical: `https://nesttrue.com/${city}/projects/${slug}` },
  };
}

export async function generateStaticParams() {
  return Object.keys(hyderabadProjects).map((slug) => ({ city: "hyderabad", slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ city: string; slug: string }>;
}) {
  const { city, slug } = await params;
  const cityMeta = getCityMeta(city);
  const data = getProjectData(city, slug);
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
          <Link href={`/${city}/${data.areaSlug}`} className="hover:text-navy">{data.area}</Link>
          <span>/</span>
          <span className="text-navy">{data.name}</span>
        </div>
      </div>

      <section className="bg-navy text-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-3">
            <Building2 size={14} />
            <span>{data.developer}</span>
            <span>·</span>
            <MapPin size={14} />
            <span>{data.area}, {cityMeta.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold">{data.name}</h1>
          <div className="mt-3">
            <span className={`text-sm px-4 py-1.5 rounded-full font-bold tracking-wide ${
              data.verdictBadge === "Buy"
                ? "bg-green-500 text-white"
                : data.verdictBadge === "Caution"
                ? "bg-yellow-400 text-yellow-900"
                : "bg-honest-red text-white"
            }`}>
              {data.verdictBadge === "Buy" ? "✓ Buy" : data.verdictBadge === "Caution" ? "⚠ Caution" : "✗ Avoid"}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <span className={`text-sm px-3 py-1 rounded-full font-medium ${
              data.status === "Ready to Move"
                ? "bg-green-500/20 text-green-200"
                : data.status === "Under Construction"
                ? "bg-yellow-500/20 text-yellow-200"
                : "bg-blue-500/20 text-blue-200"
            }`}>
              {data.status}
            </span>
            <span className="text-sm text-blue-200 bg-white/10 px-3 py-1 rounded-full">
              {data.priceRange}
            </span>
            {data.possessionDate && (
              <span className="text-sm text-blue-200 bg-white/10 px-3 py-1 rounded-full">
                Possession: {data.possessionDate}
              </span>
            )}
          </div>
          <p className="mt-2 text-xs text-blue-300">Last updated: {updated}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">

            {/* Verdict */}
            <div className="bg-trust-blue/5 border border-trust-blue/20 rounded-xl p-6">
              <p className="text-sm font-semibold text-trust-blue uppercase tracking-wider mb-2">
                NestTrue Verdict
              </p>
              <p className="text-navy leading-relaxed">{data.verdict}</p>
            </div>

            {/* Highlights */}
            <section>
              <h2 className="text-2xl font-display font-bold text-navy mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={22} />
                What&apos;s Good
              </h2>
              <ul className="space-y-3">
                {data.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
                    <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-green-800">{h}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Concerns */}
            <section>
              <h2 className="text-2xl font-display font-bold text-navy mb-4 flex items-center gap-2">
                <AlertTriangle className="text-honest-red" size={22} />
                Watch Out For
              </h2>
              <ul className="space-y-3">
                {data.concerns.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-lg p-4">
                    <AlertTriangle size={16} className="text-honest-red shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{c}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Location */}
            <section>
              <h2 className="text-2xl font-display font-bold text-navy mb-4">Location</h2>
              <ul className="space-y-2">
                {data.locationAdvantages.map((loc, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <MapPin size={14} className="text-trust-blue shrink-0 mt-0.5" />
                    {loc}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4 text-sm">
              <h3 className="font-display font-bold text-navy">Project Details</h3>
              {[
                { label: "Developer", value: data.developer },
                { label: "Configuration", value: data.configuration.join(", ") },
                ...(data.totalUnits ? [{ label: "Total Units", value: data.totalUnits.toLocaleString("en-IN") }] : []),
                ...(data.possessionDate ? [{ label: "Possession", value: data.possessionDate }] : []),
              ].map((row) => (
                <div key={row.label} className="flex justify-between">
                  <span className="text-gray-500">{row.label}</span>
                  <span className="font-medium text-navy text-right">{row.value}</span>
                </div>
              ))}
              {data.reraNumber && (
                <div className="flex justify-between">
                  <span className="text-gray-500">RERA No.</span>
                  {data.reraLink ? (
                    <a href={data.reraLink} target="_blank" rel="noopener noreferrer"
                      className="font-medium text-trust-blue text-right hover:underline text-xs">
                      {data.reraNumber} ↗
                    </a>
                  ) : (
                    <span className="font-medium text-navy text-right text-xs">{data.reraNumber}</span>
                  )}
                </div>
              )}
            </div>

            <LeadCTA city={city} area={data.areaSlug} ctaText={`Should you book in ${data.name}?`} />

            <Link
              href={`/${city}/${data.areaSlug}`}
              className="block text-center text-trust-blue text-sm font-medium hover:underline"
            >
              ← Full {data.area} area analysis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
