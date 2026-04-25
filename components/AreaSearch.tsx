"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, TrendingUp } from "lucide-react";
import type { AreaData } from "@/types/area";

type Props = {
  areas: AreaData[];
  city: string;
};

export function AreaSearch({ areas, city }: Props) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? areas.filter(
        (a) =>
          a.name.toLowerCase().includes(query.toLowerCase()) ||
          a.tagline.toLowerCase().includes(query.toLowerCase()) ||
          a.idealFor.toLowerCase().includes(query.toLowerCase())
      )
    : areas;

  return (
    <div>
      <div className="relative mb-8">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search areas — e.g. Gachibowli, IT hub, budget..."
          className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-navy placeholder:text-gray-400 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trust-blue"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center border border-gray-100">
          <p className="text-gray-500">No areas match &ldquo;{query}&rdquo;</p>
          <button
            onClick={() => setQuery("")}
            className="mt-3 text-sm text-trust-blue underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((area) => (
            <Link
              key={area.slug}
              href={`/${city}/${area.slug}`}
              className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-trust-blue hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display font-bold text-xl text-navy group-hover:text-trust-blue transition-colors">
                    {area.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{area.tagline}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="text-2xl font-bold text-navy">
                    {area.heroStats.overallScore}
                    <span className="text-sm font-normal text-gray-400">/10</span>
                  </div>
                  <p className="text-xs text-gray-400">NestTrue score</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-400">Price range</p>
                  <p className="font-medium text-navy text-xs">{area.heroStats.priceRange}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">3yr appreciation</p>
                  <p className="font-medium text-green-600 flex items-center gap-1 text-xs">
                    <TrendingUp size={12} />
                    {area.heroStats.appreciation}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Commute</p>
                  <p className="font-medium text-navy text-xs">{area.heroStats.commuteTime}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-trust-blue text-sm font-medium gap-1 group-hover:gap-2 transition-all">
                Full analysis <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      )}

      {query && filtered.length > 0 && (
        <p className="mt-4 text-xs text-gray-400">
          {filtered.length} of {areas.length} areas
        </p>
      )}
    </div>
  );
}
