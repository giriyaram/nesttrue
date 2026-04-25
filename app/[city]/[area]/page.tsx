import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { AlertTriangle, CheckCircle, TrendingUp, Clock, MapPin } from "lucide-react";
import { hyderabadAreas } from "@/data/hyderabad";
import { getCityMeta } from "@/data/cities";
import { Scorecard } from "@/components/ScoreBar";
import { LeadCTA } from "@/components/LeadCTA";
import { cn } from "@/lib/utils";

function getAreaData(city: string, area: string) {
  if (city === "hyderabad") return hyderabadAreas[area];
  return undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; area: string }>;
}): Promise<Metadata> {
  const { city, area } = await params;
  const data = getAreaData(city, area);
  if (!data) return {};
  return {
    title: `${data.name}, ${data.city.charAt(0).toUpperCase() + data.city.slice(1)} — Buyer Research`,
    description: `${data.tagline}. Honest price analysis, red flags, appreciation data, and project reviews for ${data.name}.`,
    alternates: {
      canonical: `https://nesttrue.com/${city}/${area}`,
    },
    openGraph: {
      title: `${data.name} Real Estate — NestTrue`,
      description: data.tagline,
    },
  };
}

export async function generateStaticParams() {
  return [
    { city: "hyderabad", area: "financial-district" },
    { city: "hyderabad", area: "kokapet" },
    { city: "hyderabad", area: "narsingi" },
    { city: "hyderabad", area: "gachibowli" },
    { city: "hyderabad", area: "tellapur" },
    { city: "hyderabad", area: "mokila" },
    { city: "hyderabad", area: "kollur" },
    { city: "hyderabad", area: "kondapur" },
  ];
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ city: string; area: string }>;
}) {
  const { city, area } = await params;
  const cityMeta = getCityMeta(city);
  const data = getAreaData(city, area);
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
          <span className="text-navy">{data.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-navy text-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-blue-300 text-sm mb-3">
                <MapPin size={14} />
                <span className="capitalize">{city}</span>
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
              <p className="mt-3 text-blue-200 text-lg max-w-xl">{data.tagline}</p>
              <p className="mt-2 text-xs text-blue-300">Last updated: {updated}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-5 text-center min-w-[140px] border border-white/10">
              <p className="text-5xl font-bold text-white">{data.heroStats.overallScore}</p>
              <p className="text-blue-300 text-sm mt-1">NestTrue Score</p>
              <p className="text-xs text-blue-400 mt-0.5">out of 10</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { label: "Price range", value: data.heroStats.priceRange, icon: <span className="text-lg">₹</span> },
              { label: "3-yr appreciation", value: data.heroStats.appreciation, icon: <TrendingUp size={18} /> },
              { label: "Commute", value: data.heroStats.commuteTime, icon: <Clock size={18} /> },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 text-true-accent mb-1">{stat.icon}</div>
                <p className="text-white font-semibold text-sm">{stat.value}</p>
                <p className="text-blue-300 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="md:col-span-2 space-y-10">

            {/* Red Flags */}
            <section>
              <h2 className="text-2xl font-display font-bold text-navy mb-4 flex items-center gap-2">
                <AlertTriangle className="text-honest-red" size={22} />
                Red Flags — Read Before You Book
              </h2>
              <div className="space-y-4">
                {data.redFlags.map((flag, i) => (
                  <div key={i} className="bg-red-50 border border-red-100 rounded-xl p-5">
                    <p className="font-semibold text-red-800">{flag.title}</p>
                    <p className="text-red-700 text-sm mt-1.5 leading-relaxed">{flag.detail}</p>
                    {flag.source && (
                      <p className="text-xs text-red-400 mt-2">Source: {flag.source}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-2xl font-display font-bold text-navy mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={22} />
                What Works in Your Favour
              </h2>
              <div className="space-y-4">
                {data.highlights.map((h, i) => (
                  <div key={i} className="bg-green-50 border border-green-100 rounded-xl p-5">
                    <p className="font-semibold text-green-800">{h.title}</p>
                    <p className="text-green-700 text-sm mt-1.5 leading-relaxed">{h.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Long description */}
            <section>
              <h2 className="text-2xl font-display font-bold text-navy mb-4">
                The Full Picture
              </h2>
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-4">
                {data.longDescription.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {/* Projects */}
            {data.projects.length > 0 && (
              <section>
                <h2 className="text-2xl font-display font-bold text-navy mb-4">
                  Notable Projects
                </h2>
                <div className="space-y-3">
                  {data.projects.map((project) => (
                    <div
                      key={project.name}
                      className="bg-white border border-gray-100 rounded-xl p-5 flex items-center justify-between"
                    >
                      <div>
                        {project.slug ? (
                          <Link
                            href={`/${city}/projects/${project.slug}`}
                            className="font-semibold text-navy hover:text-trust-blue transition-colors"
                          >
                            {project.name}
                          </Link>
                        ) : (
                          <p className="font-semibold text-navy">{project.name}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-0.5">{project.developer}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-navy">{project.priceRange}</p>
                        <span
                          className={cn(
                            "text-xs px-2 py-0.5 rounded-full mt-1 inline-block",
                            project.status === "Ready to Move"
                              ? "bg-green-100 text-green-700"
                              : project.status === "Under Construction"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          )}
                        >
                          {project.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Nearby areas */}
            {data.nearbyAreas.length > 0 && (
              <section>
                <h2 className="text-2xl font-display font-bold text-navy mb-4">
                  Compare Nearby Areas
                </h2>
                <div className="flex flex-wrap gap-3">
                  {data.nearbyAreas.map((nearby) => (
                    <Link
                      key={nearby.slug}
                      href={`/${city}/${nearby.slug}`}
                      className="bg-white border border-gray-200 hover:border-trust-blue rounded-lg px-4 py-3 text-sm transition-colors group"
                    >
                      <p className="font-medium text-navy group-hover:text-trust-blue transition-colors">
                        {nearby.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{nearby.relation}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Scorecard */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-display font-bold text-navy mb-4">Area Scorecard</h3>
              <Scorecard scores={data.scorecard} />
            </div>

            {/* CTA */}
            <LeadCTA city={city} area={area} />

            {/* Comparison link */}
            {city === "hyderabad" && (area === "kokapet" || area === "narsingi") && (
              <Link
                href="/hyderabad/compare/kokapet-vs-narsingi"
                className="block bg-surface border border-gray-100 rounded-xl p-5 hover:border-trust-blue transition-colors group"
              >
                <p className="font-semibold text-navy group-hover:text-trust-blue transition-colors text-sm">
                  Kokapet vs Narsingi →
                </p>
                <p className="text-xs text-gray-500 mt-1">Side-by-side comparison</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
