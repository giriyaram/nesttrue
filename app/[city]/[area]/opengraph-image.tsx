import { ImageResponse } from "next/og";
import { hyderabadAreas } from "@/data/hyderabad";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return Object.keys(hyderabadAreas).map((area) => ({ city: "hyderabad", area }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ city: string; area: string }>;
}) {
  const { city, area } = await params;
  const data = city === "hyderabad" ? hyderabadAreas[area] : undefined;

  const name = data?.name ?? "Area Analysis";
  const tagline = data?.tagline ?? "";
  const priceRange = data?.heroStats.priceRange ?? "";
  const appreciation = data?.heroStats.appreciation ?? "";
  const score = data?.heroStats.overallScore ?? 0;
  const badge = data?.verdictBadge ?? "Caution";

  const badgeColor =
    badge === "Buy" ? "#16a34a" : badge === "Caution" ? "#ca8a04" : "#e24b4a";
  const badgeLabel =
    badge === "Buy" ? "BUY" : badge === "Caution" ? "CAUTION" : "AVOID";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a2540",
          padding: "60px 70px",
          fontFamily: "sans-serif",
        }}
      >
        {/* NestTrue label */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
          <span style={{ color: "#4db8ff", fontSize: 18, fontWeight: 700, letterSpacing: 3 }}>
            NESTTRUE
          </span>
          <span style={{ color: "#4db8ff", fontSize: 14, marginLeft: 12, opacity: 0.7 }}>
            Honest Real Estate Research
          </span>
        </div>

        {/* Verdict badge */}
        <div
          style={{
            display: "flex",
            backgroundColor: badgeColor,
            borderRadius: 8,
            padding: "10px 20px",
            width: "fit-content",
            marginBottom: 24,
          }}
        >
          <span style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>{badgeLabel}</span>
        </div>

        {/* Area name */}
        <div style={{ color: "#ffffff", fontSize: 60, fontWeight: 700, lineHeight: 1.1, marginBottom: 14 }}>
          {name}
        </div>

        {/* Tagline */}
        <div style={{ color: "#93c5fd", fontSize: 22, marginBottom: "auto", maxWidth: 800, lineHeight: 1.4 }}>
          {tagline.split("—")[0].trim()}
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 48, marginTop: 40, marginBottom: 32 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#64748b", fontSize: 14, marginBottom: 4 }}>Price range</span>
            <span style={{ color: "#fff", fontSize: 22, fontWeight: 600 }}>{priceRange}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#64748b", fontSize: 14, marginBottom: 4 }}>3yr appreciation</span>
            <span style={{ color: "#4ade80", fontSize: 22, fontWeight: 600 }}>{appreciation}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#64748b", fontSize: 14, marginBottom: 4 }}>NestTrue score</span>
            <span style={{ color: "#fff", fontSize: 22, fontWeight: 600 }}>{score}/10</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#475569", fontSize: 18 }}>nesttrue.com</span>
          <span style={{ color: "#4db8ff", fontSize: 18 }}>
            Honest verdicts. No broker spin.
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
