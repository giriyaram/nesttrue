import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Link href="/" className={cn("font-display text-2xl font-bold tracking-tight", className)}>
      <span style={{ color: dark ? "#ffffff" : "#0a2540" }}>Nest</span>
      <span style={{ color: dark ? "#4db8ff" : "#1d4ed8" }}>True</span>
    </Link>
  );
}
