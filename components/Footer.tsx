import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-navy text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <Logo dark />
            <p className="mt-3 text-sm text-blue-200 max-w-xs">
              Honest, hyperlocal buyer intelligence for Indian real estate. No broker commissions,
              no hidden agendas.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="font-semibold text-white mb-3">Cities</p>
              <ul className="space-y-2 text-blue-200">
                <li><Link href="/hyderabad" className="hover:text-white transition-colors">Hyderabad</Link></li>
                <li><Link href="/bangalore" className="hover:text-white transition-colors">Bangalore</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-3">Hyderabad</p>
              <ul className="space-y-2 text-blue-200">
                <li><Link href="/hyderabad/kokapet" className="hover:text-white transition-colors">Kokapet</Link></li>
                <li><Link href="/hyderabad/narsingi" className="hover:text-white transition-colors">Narsingi</Link></li>
                <li><Link href="/hyderabad/gachibowli" className="hover:text-white transition-colors">Gachibowli</Link></li>
                <li><Link href="/hyderabad/market-report" className="hover:text-white transition-colors">Market Report</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-blue-900 text-xs text-blue-300 flex flex-col md:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} NestTrue. Not a broker. Not RERA-registered. Research only.</p>
          <p>Data is sourced from public records, builder disclosures, and resident surveys. Verify all figures independently.</p>
        </div>
      </div>
    </footer>
  );
}
