import Link from "next/link";
import { Logo } from "./Logo";

export function Navbar({ city }: { city?: string }) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          {city && (
            <>
              <Link href={`/${city}`} className="py-3 hover:text-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trust-blue rounded">
                {city.charAt(0).toUpperCase() + city.slice(1)}
              </Link>
              <Link href={`/${city}/market-report`} className="py-3 hover:text-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trust-blue rounded">
                Market Report
              </Link>
              <Link href={`/${city}/compare`} className="py-3 hover:text-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trust-blue rounded">
                Compare Areas
              </Link>
            </>
          )}
          <Link
            href="/#cities"
            className="bg-trust-blue text-white px-4 py-3 rounded-full hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-trust-blue"
          >
            Explore Cities
          </Link>
        </nav>
      </div>
    </header>
  );
}
