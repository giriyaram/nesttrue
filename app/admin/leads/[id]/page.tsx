"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

type Lead = {
  id: string;
  phone: string;
  name: string | null;
  email: string | null;
  city: string;
  area: string | null;
  budget: string | null;
  timeline: string | null;
  purpose: string | null;
  waStatus: string;
  rawMessages: { role: string; text: string; timestamp: string }[];
  score: number | null;
  scoreReason: string | null;
  qualified: boolean;
  notes: string | null;
  assignedTo: string | null;
  status: string;
  createdAt: string;
};

export default function LeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/leads/${id}`)
      .then((r) => {
        if (r.status === 401) router.push("/admin/login");
        return r.json();
      })
      .then((data) => {
        setLead(data);
        setNotes(data.notes ?? "");
        setStatus(data.status ?? "new");
      });
  }, [id, router]);

  async function save() {
    setSaving(true);
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes, status }),
    });
    setSaving(false);
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <p className="text-gray-400">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-navy text-white px-6 py-4 flex items-center justify-between">
        <Logo dark />
        <Link href="/admin/leads" className="text-sm text-blue-200 hover:text-white">
          ← All leads
        </Link>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h1 className="text-2xl font-display font-bold text-navy mb-4">Lead: {lead.phone}</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            {[
              { label: "Name", value: lead.name },
              { label: "Email", value: lead.email },
              { label: "City", value: lead.city },
              { label: "Area", value: lead.area },
              { label: "Budget", value: lead.budget },
              { label: "Timeline", value: lead.timeline },
              { label: "Purpose", value: lead.purpose },
              { label: "WA Status", value: lead.waStatus },
              { label: "Created", value: new Date(lead.createdAt).toLocaleString("en-IN") },
            ].map((row) => (
              <div key={row.label}>
                <p className="text-gray-400 text-xs">{row.label}</p>
                <p className="text-navy font-medium capitalize">{row.value ?? "—"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Score */}
        {lead.score != null && (
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-semibold text-navy mb-3">AI Score</h2>
            <div className="flex items-center gap-4">
              <span
                className={cn(
                  "text-4xl font-bold",
                  lead.score >= 70 ? "text-green-600" : lead.score >= 40 ? "text-yellow-600" : "text-honest-red"
                )}
              >
                {lead.score}
              </span>
              <p className="text-gray-600 text-sm">{lead.scoreReason}</p>
            </div>
          </div>
        )}

        {/* WhatsApp transcript */}
        {lead.rawMessages.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-semibold text-navy mb-4">WhatsApp Transcript</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {lead.rawMessages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm max-w-sm",
                    msg.role === "user"
                      ? "bg-surface text-navy ml-auto text-right"
                      : "bg-trust-blue/10 text-navy"
                  )}
                >
                  <p>{msg.text}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admin actions */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-navy">Admin Notes</h2>
          <div className="flex gap-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-trust-blue"
            >
              {["new", "contacted", "converted", "lost"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes about this lead…"
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-trust-blue resize-none"
          />
          <button
            onClick={save}
            disabled={saving}
            className="bg-trust-blue text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
