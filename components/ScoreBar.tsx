"use client";

import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = {
  connectivity: "Connectivity",
  infrastructure: "Infrastructure",
  appreciation: "Appreciation",
  safety: "Safety",
  lifestyle: "Lifestyle",
  valueForMoney: "Value for Money",
};

function scoreBarColor(score: number) {
  if (score >= 8) return "bg-green-500";
  if (score >= 6) return "bg-yellow-400";
  return "bg-honest-red";
}

export function ScoreBar({ label, score }: { label: string; score: number }) {
  const pct = (score / 10) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="w-36 text-sm text-gray-600 shrink-0">{LABELS[label] ?? label}</span>
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className={cn("h-2 rounded-full transition-all", scoreBarColor(score))}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-right text-sm font-semibold text-navy">{score}/10</span>
    </div>
  );
}

export function Scorecard({ scores }: { scores: Record<string, number> }) {
  return (
    <div className="space-y-3">
      {Object.entries(scores).map(([key, val]) => (
        <ScoreBar key={key} label={key} score={val} />
      ))}
    </div>
  );
}
