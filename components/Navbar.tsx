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
              <Link href={`/${city}`} className="hover:text-navy transition-colors">
                {city.charAt(0).toUpperCase() + city.slice(1)}
              </Link>
              <Link href={`/${city}/market-report`} className="hover:text-navy transition-colors">
                Market Report
              </Link>
              <Link href={`/${city}/compare`} className="hover:text-navy transition-colors">
                Compare Areas
              </Link>
            </>
          )}
          <Link
            href="/#cities"
            className="bg-trust-blue text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition-colors"
          >
            Explore Cities
          </Link>
        </nav>
      </div>
    </header>
  );
}
