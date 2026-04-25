import { ImageResponse } from "next/og";
import { hyderabadProjects } from "@/data/hyderabad";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return Object.keys(hyderabadProjects).map((slug) => ({ city: "hyderabad", slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ city: string; slug: string }>;
}) {
  const { city, slug } = await params;
  const data = city === "hyderabad" ? hyderabadProjects[slug] : undefined;

  const name = data?.name ?? "Project Review";
  const developer = data?.developer ?? "";
  const priceRange = data?.priceRange ?? "";
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

        {/* Project name */}
        <div style={{ color: "#ffffff", fontSize: 54, fontWeight: 700, lineHeight: 1.15, marginBottom: 16 }}>
          {name}
        </div>

        {/* Developer + price */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: "auto" }}>
          <span style={{ color: "#93c5fd", fontSize: 24 }}>{developer}</span>
          {priceRange && (
            <>
              <span style={{ color: "#475569", fontSize: 20 }}>·</span>
              <span style={{ color: "#93c5fd", fontSize: 24 }}>{priceRange}</span>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 40 }}>
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
