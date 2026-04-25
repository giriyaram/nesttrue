import { redirect } from "next/navigation";
import Link from "next/link";
import type { Lead } from "@prisma/client";

export const dynamic = "force-dynamic";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  converted: "bg-green-100 text-green-800",
  lost: "bg-gray-100 text-gray-600",
};

const WA_COLORS: Record<string, string> = {
  pending: "bg-gray-100 text-gray-600",
  qualifying: "bg-yellow-100 text-yellow-800",
  qualified: "bg-green-100 text-green-800",
  unqualified: "bg-red-100 text-red-800",
};

export default async function LeadsDashboard() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-navy text-white px-6 py-4 flex items-center justify-between">
        <Logo dark />
        <div className="flex items-center gap-4">
          <span className="text-blue-200 text-sm">{leads.length} leads</span>
          <form action="/api/admin/logout" method="POST">
            <button className="text-sm text-blue-200 hover:text-white transition-colors">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-display font-bold text-navy mb-6">Leads Dashboard</h1>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-gray-100">
                  <th className="text-left px-5 py-4 font-semibold text-navy">Phone</th>
                  <th className="text-left px-5 py-4 font-semibold text-navy">Name</th>
                  <th className="text-left px-5 py-4 font-semibold text-navy">City / Area</th>
                  <th className="text-left px-5 py-4 font-semibold text-navy">WA Status</th>
                  <th className="text-left px-5 py-4 font-semibold text-navy">Score</th>
                  <th className="text-left px-5 py-4 font-semibold text-navy">Status</th>
                  <th className="text-left px-5 py-4 font-semibold text-navy">Created</th>
                  <th className="px-5 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.map((lead: Lead) => (
                  <tr key={lead.id} className="hover:bg-surface transition-colors">
                    <td className="px-5 py-4 font-mono text-navy">{lead.phone}</td>
                    <td className="px-5 py-4 text-gray-700">{lead.name ?? "—"}</td>
                    <td className="px-5 py-4">
                      <span className="capitalize">{lead.city}</span>
                      {lead.area && (
                        <span className="text-gray-400 text-xs ml-1">/ {lead.area}</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full font-medium",
                          WA_COLORS[lead.waStatus] ?? "bg-gray-100 text-gray-600"
                        )}
                      >
                        {lead.waStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {lead.score != null ? (
                        <span
                          className={cn(
                            "font-bold",
                            lead.score >= 70
                              ? "text-green-600"
                              : lead.score >= 40
                              ? "text-yellow-600"
                              : "text-honest-red"
                          )}
                        >
                          {lead.score}
                        </span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full font-medium",
                          STATUS_COLORS[lead.status] ?? "bg-gray-100 text-gray-600"
                        )}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="text-trust-blue hover:underline text-xs font-medium"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-gray-400">
                      No leads yet. Share your NestTrue links!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
