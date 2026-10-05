import { ImageResponse } from "next/og";

export const alt = "Hiromu — Laravel × AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#05070c",
          backgroundImage:
            "radial-gradient(circle at 82% 12%, rgba(34,211,238,0.22) 0%, rgba(5,7,12,0) 45%), radial-gradient(circle at 8% 92%, rgba(251,191,36,0.14) 0%, rgba(5,7,12,0) 40%)",
          color: "#e8edf6",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{ width: 12, height: 12, borderRadius: 999, background: "#f87171" }}
          />
          <div
            style={{ width: 12, height: 12, borderRadius: 999, background: "#fbbf24" }}
          />
          <div
            style={{ width: 12, height: 12, borderRadius: 999, background: "#34d399" }}
          />
          <div style={{ marginLeft: 16, fontSize: 24, color: "#8893a8" }}>
            $ whoami
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 168,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1,
              color: "#ffffff",
            }}
          >
            Hiromu
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              color: "#22d3ee",
            }}
          >
            Laravel × AI-driven Development Engineer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            color: "#4a5468",
          }}
        >
          <div style={{ display: "flex", gap: 20 }}>
            <span>PHP</span>
            <span>Laravel</span>
            <span>Next.js</span>
            <span>Claude Code</span>
          </div>
          <div style={{ color: "#8893a8" }}>portfolio</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
