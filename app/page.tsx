import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";
import { cities } from "@/data/cities";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero — full-bleed photo style
          To use a real photo: add `backgroundImage: "url('/hero-hyderabad.jpg')"` to the
          outer div and remove the sky gradient div below. Keep the overlay div. */}
      <header className="relative flex flex-col" style={{ minHeight: "100svh" }}>

        {/* Sky gradient — replace with real Hyderabad cityscape photo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg, #1a3a5c 0%, #2d5f8a 25%, #3d7bb5 45%, #6ba3cc 65%, #c4a882 80%, #e8c87a 100%)",
          }}
        />

        {/* City skyline silhouette */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "48%",
            background: "linear-gradient(to top, #0d1f35 0%, #0d1f35 35%, transparent 100%)",
            clipPath: "polygon(0% 100%, 0% 65%, 3% 65%, 3% 45%, 5% 45%, 5% 55%, 7% 55%, 7% 30%, 8% 30%, 8% 50%, 10% 50%, 10% 38%, 11% 38%, 11% 28%, 12% 28%, 12% 45%, 14% 45%, 14% 32%, 16% 32%, 16% 42%, 18% 42%, 18% 25%, 19% 25%, 19% 18%, 20% 18%, 20% 30%, 21% 30%, 21% 40%, 23% 40%, 23% 22%, 24% 22%, 24% 35%, 26% 35%, 26% 28%, 27% 28%, 27% 20%, 28% 20%, 28% 15%, 29% 15%, 29% 28%, 31% 28%, 31% 38%, 33% 38%, 33% 22%, 35% 22%, 35% 32%, 37% 32%, 37% 18%, 38% 18%, 38% 25%, 40% 25%, 40% 38%, 42% 38%, 42% 28%, 44% 28%, 44% 42%, 46% 42%, 46% 30%, 48% 30%, 48% 22%, 50% 22%, 50% 35%, 52% 35%, 52% 45%, 54% 45%, 54% 28%, 56% 28%, 56% 38%, 58% 38%, 58% 25%, 60% 25%, 60% 40%, 62% 40%, 62% 32%, 64% 32%, 64% 42%, 66% 42%, 66% 22%, 68% 22%, 68% 35%, 70% 35%, 70% 28%, 72% 28%, 72% 45%, 74% 45%, 74% 32%, 76% 32%, 76% 42%, 78% 42%, 78% 25%, 80% 25%, 80% 38%, 82% 38%, 82% 48%, 84% 48%, 84% 35%, 86% 35%, 86% 50%, 88% 50%, 88% 42%, 90% 42%, 90% 55%, 92% 55%, 92% 45%, 94% 45%, 94% 58%, 96% 58%, 96% 65%, 98% 65%, 100% 70%, 100% 100%)",
          }}
        />

        {/* Dark overlay — bottom-heavy so text reads cleanly */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,20,35,0.97) 0%, rgba(10,20,35,0.78) 38%, rgba(15,35,65,0.35) 65%, transparent 100%)",
          }}
        />

        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between px-6 md:px-14 py-6">
          <Logo dark />
          <Link
            href="#cities"
            className="text-sm text-white/70 hover:text-white border border-white/25 hover:border-white/50 px-5 py-2.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            Explore cities
          </Link>
        </nav>

        {/* Content — sits in the lower third */}
        <div className="relative z-10 flex-1 flex items-end">
          <div className="px-6 md:px-14 pb-20 max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/40 mb-5">
              Hyderabad Real Estate Research · 2025
            </p>
            {/* Terracotta rule */}
            <div className="w-16 h-0.5 mb-5" style={{ background: "#c0392b" }} />
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white leading-[1.1] mb-5">
              Honest research for Indian real estate buyers
            </h1>
            <p className="text-white/60 text-lg font-light leading-relaxed mb-9 max-w-md">
              Real prices. Real risks. No broker spin.<br />
              We tell you what the agent won&apos;t.
            </p>
            <Link
              href="/hyderabad"
              className="inline-flex items-center gap-2 bg-white text-navy font-semibold px-7 py-3.5 rounded hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Start your research <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Trust strip */}
        <div className="relative z-10 border-t border-white/[0.07] px-6 md:px-14 py-4 flex flex-wrap gap-x-8 gap-y-2">
          {[
            "No broker commissions",
            "Public records + resident surveys",
            "Updated monthly",
            "RERA data cross-referenced",
          ].map((item) => (
            <span key={item} className="text-xs text-white/35 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
              {item}
            </span>
          ))}
        </div>

      </header>

      {/* Cities */}
      <section id="cities" className="bg-surface py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-navy mb-2">Choose your city</h2>
          <p className="text-gray-500 mb-10">
            Deep-dive analysis available for these markets. More cities coming.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-trust-blue hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-navy group-hover:text-trust-blue transition-colors">
                      {city.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">{city.state}</p>
                    <p className="text-gray-700 mt-3 text-base">{city.tagline}</p>
                  </div>
                  <ArrowRight
                    className="text-gray-300 group-hover:text-trust-blue transition-colors mt-1"
                    size={20}
                  />
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  {city.topAreas.length > 0 ? (
                    city.topAreas.map((area) => (
                      <span
                        key={area}
                        className="text-xs bg-surface border border-gray-100 px-3 py-1 rounded-full text-gray-600 capitalize"
                      >
                        {area}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400 italic">Coming soon</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
