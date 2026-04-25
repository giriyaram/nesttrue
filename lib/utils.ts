import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatScore(score: number): string {
  return score.toFixed(1);
}

export function scoreColor(score: number): string {
  if (score >= 8) return "text-green-600";
  if (score >= 6) return "text-yellow-600";
  return "text-honest-red";
}

export function scoreBg(score: number): string {
  if (score >= 8) return "bg-green-100 text-green-800";
  if (score >= 6) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
}
