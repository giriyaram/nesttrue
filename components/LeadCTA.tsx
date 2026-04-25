"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

export function LeadCTA({
  city,
  area,
  ctaText = "Get personalised guidance on WhatsApp",
}: {
  city: string;
  area?: string;
  ctaText?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.match(/^[6-9]\d{9}$/)) {
      setError("Enter a valid 10-digit Indian mobile number");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, name: name.trim() || undefined, city, area }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <MessageCircle className="mx-auto mb-3 text-green-600" size={32} />
        <p className="font-semibold text-green-800">You&apos;re on the list!</p>
        <p className="text-sm text-green-700 mt-1">
          Our WhatsApp assistant will reach you within a few minutes to understand your needs.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-navy rounded-xl p-6 text-white">
      <div className="flex items-start gap-3 mb-4">
        <MessageCircle className="text-true-accent shrink-0 mt-0.5" size={24} />
        <div>
          <p className="font-semibold">{ctaText}</p>
          <p className="text-sm text-blue-200 mt-1">
            Answer 5 quick questions. We tell you if {area ?? city} fits your goals.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-blue-300 text-sm focus:outline-none focus:ring-2 focus:ring-true-accent"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
          placeholder="98765 43210"
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-blue-300 text-sm focus:outline-none focus:ring-2 focus:ring-true-accent"
        />
        <button
          type="submit"
          disabled={loading || submitted}
          className="bg-trust-blue hover:bg-blue-600 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          {loading ? "Sending…" : "Start on WhatsApp"}
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-honest-red">{error}</p>}
      <p className="mt-3 text-xs text-blue-300">
        No spam. We earn a referral fee only when we connect you with a developer — never from brokers.
      </p>
    </div>
  );
}
