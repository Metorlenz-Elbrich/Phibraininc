import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — Product engineering studio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(900px 600px at 80% 10%, rgba(41,171,226,0.35), transparent), linear-gradient(135deg, #0c0d0f 0%, #1a1b1d 60%, #082837 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #29ABE2, #67C2E9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 26,
              color: "#0c0d0f",
            }}
          >
            φ
          </div>
          <div style={{ fontSize: 28, letterSpacing: "-0.01em", fontWeight: 700 }}>
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              fontWeight: 700,
              maxWidth: 980,
            }}
          >
            Software that moves your business forward.
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 880,
              lineHeight: 1.35,
            }}
          >
            Custom web & mobile applications · UI/UX design · APIs · Cloud
            platforms — engineered by a senior product studio.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <span>phibrain.com</span>
          <span style={{ color: "#29ABE2" }}>· Product engineering studio</span>
        </div>
      </div>
    ),
    size,
  );
}
