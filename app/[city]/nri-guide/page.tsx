import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCityMeta } from "@/data/cities";
import { hyderabadAreas } from "@/data/hyderabad";
import { LeadCTA } from "@/components/LeadCTA";
import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const meta = getCityMeta(city);
  if (!meta) return {};
  return {
    title: `NRI Guide: Buying Property in ${meta.name} from Abroad`,
    description: `Complete guide for NRIs buying apartments in ${meta.name} — FEMA rules, best areas, remote buying process, and honest project verdicts. No broker spin.`,
    alternates: { canonical: `https://nesttrue.com/${city}/nri-guide` },
  };
}

export async function generateStaticParams() {
  return [{ city: "hyderabad" }];
}

export default async function NriGuidePage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const meta = getCityMeta(city);
  if (!meta) notFound();

  const topAreas =
    city === "hyderabad"
      ? meta.topAreas.map((slug) => hyderabadAreas[slug]).filter(Boolean)
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
          <span className="text-navy">NRI Buying Guide</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-navy text-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-true-accent text-sm font-medium uppercase tracking-widest mb-3">
            For NRI Buyers
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold max-w-3xl">
            Buying Property in {meta.name} from Abroad
          </h1>
          <p className="mt-4 text-blue-200 text-lg max-w-2xl">
            Honest area analysis, FEMA rules, and remote buying process — for NRIs who can't visit every weekend and need a source they can actually trust.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* Legal disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-yellow-600 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-yellow-800 mb-1">Legal disclaimer</p>
              <p className="text-sm text-yellow-700 leading-relaxed">
                This guide covers real estate research only — area analysis, project verdicts, and the buying process from a practical standpoint. NRI property purchases in India involve FEMA compliance, RBI permissions, and tax obligations that vary by country of residence and property type. <strong>Consult a CA and a FEMA-qualified lawyer before transacting.</strong> This is not legal or tax advice.
              </p>
            </div>
          </div>
        </div>

        {/* Can NRIs buy? */}
        <section className="bg-white rounded-xl border border-gray-100 p-8">
          <h2 className="text-2xl font-display font-bold text-navy mb-6">Can NRIs buy residential property in {meta.name}?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
                <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-800 text-sm">Allowed without RBI permission</p>
                  <p className="text-sm text-green-700 mt-0.5">Residential apartments and flats, commercial property, plots in approved layouts</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
                <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-800 text-sm">No limit on number of properties</p>
                  <p className="text-sm text-green-700 mt-0.5">NRIs can hold multiple residential and commercial properties in India</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-lg p-4">
                <AlertTriangle size={16} className="text-honest-red shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-800 text-sm">Not allowed (FEMA restriction)</p>
                  <p className="text-sm text-red-700 mt-0.5">Agricultural land, plantation property, farmhouses — require special RBI approval</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-lg p-4">
                <AlertTriangle size={16} className="text-honest-red shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-800 text-sm">Payment rules are strict</p>
                  <p className="text-sm text-red-700 mt-0.5">Must pay from NRE/NRO account or foreign inward remittance. No cash, no third-party payment.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Remote buying process */}
        <section>
          <h2 className="text-2xl font-display font-bold text-navy mb-6">The Remote Buying Process</h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Research areas and shortlist projects",
                detail: "Start here — with NestTrue area analysis and project verdicts. Read the red flags before you read the highlights. Most NRIs skip this and rely entirely on the developer's pitch.",
              },
              {
                step: "2",
                title: "Appoint a trusted Power of Attorney",
                detail: "You need a POA to sign documents in India on your behalf. Typically a family member or trusted professional. The POA must be registered at the Indian consulate or embassy in your country and notarised. A lawyer will charge ₹5,000–15,000 to draft this.",
              },
              {
                step: "3",
                title: "Arrange an NRI home loan (if needed)",
                detail: "SBI, HDFC, ICICI, and Axis all offer NRI home loans. You'll need: valid passport and visa, NRE/NRO account, overseas salary proof, and a credit history. Expect 8.5–10% interest rates. Loan amount is typically 75–80% of property value.",
              },
              {
                step: "4",
                title: "Verify RERA registration",
                detail: "Every under-construction project must be RERA-registered. Check the RERA number on the Telangana RERA portal (rera.telangana.gov.in). Verify the developer's past delivery record — RERA shows complaints and delays.",
              },
              {
                step: "5",
                title: "Book and pay via NRE/NRO account",
                detail: "All payments must flow from your NRE (repatriable) or NRO account in India, or from foreign inward remittance with a FIRC (Foreign Inward Remittance Certificate). Keep all FIRC documents — you'll need them when you eventually sell.",
              },
              {
                step: "6",
                title: "Registration and handover",
                detail: "Your POA can register the sale deed on your behalf. TDS is deducted at source: 20% for under-construction, 1% for ready-to-move (if property value >₹50L). The developer or your lawyer files TDS with Form 26QB.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 bg-white rounded-xl border border-gray-100 p-6">
                <div className="shrink-0 w-8 h-8 rounded-full bg-trust-blue text-white flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-navy">{item.title}</p>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tax overview */}
        <section className="bg-white rounded-xl border border-gray-100 p-8">
          <h2 className="text-2xl font-display font-bold text-navy mb-2">Tax at a glance</h2>
          <p className="text-sm text-gray-500 mb-6">Key numbers — verify with your CA before transacting.</p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            {[
              { label: "TDS on purchase (under-construction)", value: "20% of payment" },
              { label: "TDS on purchase (ready-to-move, >₹50L)", value: "1% of value" },
              { label: "Long-term capital gains tax (held >2 years)", value: "12.5% without indexation" },
              { label: "Short-term capital gains (held <2 years)", value: "As per income slab" },
              { label: "Stamp duty (Telangana)", value: "4% of market value" },
              { label: "Registration charges", value: "0.5% of market value" },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-start gap-4 py-3 border-b border-gray-50 last:border-0">
                <span className="text-gray-600">{row.label}</span>
                <span className="font-semibold text-navy text-right">{row.value}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-400">Tax rates effective FY 2024–25. Subject to change. Consult a CA.</p>
        </section>

        {/* Best areas for NRI investment */}
        {topAreas.length > 0 && (
          <section>
            <h2 className="text-2xl font-display font-bold text-navy mb-2">
              Best areas for NRI investment in {meta.name}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              NRIs typically prioritise rental yield, strong appreciation, and low management hassle. These areas score best on all three.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {topAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/${city}/${area.slug}`}
                  className="group bg-white rounded-xl border border-gray-100 hover:border-trust-blue hover:shadow-lg transition-all p-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-bold text-xl text-navy group-hover:text-trust-blue transition-colors">
                          {area.name}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                          area.verdictBadge === "Buy"
                            ? "bg-green-100 text-green-700"
                            : area.verdictBadge === "Caution"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {area.verdictBadge}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">{area.heroStats.priceRange}</p>
                    </div>
                    <ArrowRight className="text-gray-300 group-hover:text-trust-blue transition-colors mt-1" size={20} />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-gray-400">3yr appreciation</p>
                      <p className="font-medium text-green-600">{area.heroStats.appreciation}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Commute to IT hub</p>
                      <p className="font-medium text-navy">{area.heroStats.commuteTime}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Common NRI mistakes */}
        <section className="bg-white rounded-xl border border-gray-100 p-8">
          <h2 className="text-2xl font-display font-bold text-navy mb-6">Common NRI mistakes to avoid</h2>
          <div className="space-y-4">
            {[
              {
                mistake: "Trusting the developer's payment plan without verifying RERA escrow compliance",
                detail: "RERA requires developers to deposit 70% of collections in an escrow account. Ask for the escrow balance before booking any under-construction project.",
              },
              {
                mistake: "Buying based on a virtual tour without sending someone for a site visit",
                detail: "Virtual tours are scripted. Location disadvantages (traffic, water issues, noise) never appear in a developer walkthrough. Send a family member or hire an independent inspector.",
              },
              {
                mistake: "Underestimating the total transaction cost",
                detail: "Stamp duty (4%) + registration (0.5%) + GST on under-construction (5%) + legal fees can add 10–12% to the sticker price. Factor this into your budget before comparing projects.",
              },
              {
                mistake: "Choosing a property manager without references",
                detail: "NRIs who can't manage the property themselves often rush this. A bad property manager means missed rent, poor tenant selection, and maintenance neglect. Interview at least three and check references.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-red-50 border border-red-100 rounded-lg">
                <AlertTriangle size={16} className="text-honest-red shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-800 text-sm">{item.mistake}</p>
                  <p className="text-sm text-red-700 mt-1">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <LeadCTA
          city={city}
          ctaText={`Get NRI-specific guidance on ${meta.name} real estate on WhatsApp`}
        />
      </div>
    </div>
  );
}
