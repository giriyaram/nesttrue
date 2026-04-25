import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How NestTrue Makes Money",
  description:
    "NestTrue earns a referral fee when we connect a buyer with a developer. Our research is always independent. Here's exactly how it works.",
  alternates: { canonical: "https://nesttrue.com/about/how-we-earn" },
};

export default function HowWeEarnPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-navy">Home</Link>
            <span>/</span>
            <span className="text-navy">How we make money</span>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-navy text-white py-14">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-true-accent text-sm font-medium uppercase tracking-widest mb-3">
              Full transparency
            </p>
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              How NestTrue makes money
            </h1>
            <p className="mt-4 text-blue-200 text-lg">
              You deserve to know exactly how we earn — and why our research stays independent regardless.
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">

          {/* The model */}
          <section className="bg-white rounded-xl border border-gray-100 p-8">
            <h2 className="text-2xl font-display font-bold text-navy mb-4">The model, plainly stated</h2>
            <p className="text-gray-700 leading-relaxed">
              NestTrue earns a <strong>flat referral fee from developers</strong> when we connect a buyer with a project and that buyer books. We do not charge buyers. We do not charge for our research. We do not earn from brokers or portals.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              That&apos;s it. One revenue stream, clearly disclosed.
            </p>
          </section>

          {/* What this means for you */}
          <section>
            <h2 className="text-2xl font-display font-bold text-navy mb-6">What this means for you</h2>
            <div className="space-y-3">
              {[
                {
                  allowed: true,
                  text: "We will tell you to avoid a project even if that developer pays a referral fee — our verdicts are written before any commercial relationship exists.",
                },
                {
                  allowed: true,
                  text: "We will recommend a project we have no commercial relationship with if it genuinely fits your situation better.",
                },
                {
                  allowed: true,
                  text: "Every red flag on every project page stays up permanently — including on projects where we earn referrals.",
                },
                {
                  allowed: false,
                  text: "We will never charge you more, give you worse research, or hide risks because a developer is paying us.",
                },
                {
                  allowed: false,
                  text: "We will never rank a project higher because of a commercial relationship. Rankings are based solely on our research.",
                },
                {
                  allowed: false,
                  text: "We will never refer you to a broker or earn from a brokerage — our fee comes directly from the developer, not from a middleman.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 p-4 rounded-lg border ${
                    item.allowed
                      ? "bg-green-50 border-green-100"
                      : "bg-surface border-gray-100"
                  }`}
                >
                  {item.allowed ? (
                    <CheckCircle size={18} className="text-green-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle size={18} className="text-gray-400 shrink-0 mt-0.5" />
                  )}
                  <p className={`text-sm leading-relaxed ${item.allowed ? "text-green-800" : "text-gray-600"}`}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* The structural safeguard */}
          <section className="bg-white rounded-xl border border-gray-100 p-8">
            <h2 className="text-2xl font-display font-bold text-navy mb-4">The structural safeguard</h2>
            <p className="text-gray-700 leading-relaxed">
              Every project verdict is written and published <em>before</em> any commercial relationship with that developer exists. Once a verdict is published, it cannot be changed for commercial reasons — only for factual updates (new RERA data, possession date changes, verified resident feedback).
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              If you ever see something on NestTrue that feels like it&apos;s hiding a risk for commercial reasons, email us. We&apos;ll investigate and update the page — or explain why we disagree.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Contact:{" "}
              <a href="mailto:honest@nesttrue.com" className="text-trust-blue hover:underline">
                honest@nesttrue.com
              </a>
            </p>
          </section>

          {/* Why we're different */}
          <section className="bg-white rounded-xl border border-gray-100 p-8">
            <h2 className="text-2xl font-display font-bold text-navy mb-4">Why this is different from a portal</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 text-gray-500 font-medium"></th>
                    <th className="text-center py-3 font-semibold text-navy">NestTrue</th>
                    <th className="text-center py-3 text-gray-500 font-medium">99acres / MagicBricks</th>
                    <th className="text-center py-3 text-gray-500 font-medium">Brokers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { label: "Earns from", nesttrue: "Developer referral (disclosed)", portal: "Developer listings + ads", broker: "Commission on any sale" },
                    { label: "Publishes red flags", nesttrue: "Yes — every project", portal: "No", broker: "No" },
                    { label: "Recommends against projects", nesttrue: "Yes", portal: "No", broker: "Rarely" },
                    { label: "Research independent of revenue", nesttrue: "Yes (structural)", portal: "No", broker: "No" },
                    { label: "Charges the buyer", nesttrue: "Never", portal: "Never", broker: "Sometimes (fees)" },
                  ].map((row) => (
                    <tr key={row.label}>
                      <td className="py-3 text-gray-600">{row.label}</td>
                      <td className="py-3 text-center font-medium text-navy">{row.nesttrue}</td>
                      <td className="py-3 text-center text-gray-400">{row.portal}</td>
                      <td className="py-3 text-center text-gray-400">{row.broker}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Back to research */}
          <div className="text-center pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-trust-blue text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              Back to honest research
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
