import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";
import { cities } from "@/data/cities";
import { ArrowRight, Shield, TrendingUp, MessageCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <header className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <Logo dark />
          <Link
            href="#cities"
            className="text-sm text-blue-200 hover:text-white transition-colors py-3 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-true-accent rounded"
          >
            Explore cities →
          </Link>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-20 pb-28">
          <p className="text-true-accent font-medium text-sm uppercase tracking-widest mb-4">
            Know before you buy
          </p>
          <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight max-w-3xl">
            Honest research for Indian real estate buyers
          </h1>
          <p className="mt-6 text-xl text-blue-200 max-w-2xl">
            Not a portal. Not a broker. Real data, real risks, hyperlocal analysis — for buyers
            who do their homework.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/hyderabad"
              className="bg-trust-blue hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-colors"
            >
              Explore Hyderabad <ArrowRight size={16} />
            </Link>
            <Link
              href="/hyderabad/market-report"
              className="border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              Q1 2025 Market Report
            </Link>
          </div>
        </div>
      </header>

      {/* Why NestTrue */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-navy mb-3">
            We tell you what brokers won&apos;t
          </h2>
          <p className="text-gray-500 mb-12 max-w-xl">
            Every area page includes the reasons NOT to buy — because honest analysis builds
            better decisions.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="text-trust-blue" size={28} />,
                title: "Red Flags Included",
                body: "Every area analysis lists the real risks — traffic, water supply gaps, builder defaults — not just the good stuff.",
              },
              {
                icon: <TrendingUp className="text-trust-blue" size={28} />,
                title: "Specific Numbers",
                body: "₹8,500–13,000/sq ft. +34% in 3 years. 22-minute commute. We don't say 'good location' — we say what that means.",
              },
              {
                icon: <MessageCircle className="text-trust-blue" size={28} />,
                title: "WhatsApp Qualification",
                body: "Tell us your budget, timeline, and needs. Our AI tells you whether a location actually fits — no callback from a broker.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-surface rounded-xl p-6">
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-display font-semibold text-navy text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
