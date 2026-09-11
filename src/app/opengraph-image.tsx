import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Trax Jobs: Curated African Tech Opportunities & Verified Talent";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0C1222",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Brand Red Accent Bar at Top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "10px",
            backgroundColor: "#E7040D",
          }}
        />

        {/* Ambient Subtle Radial Glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(231,4,13,0.18) 0%, rgba(12,18,34,0) 70%)",
          }}
        />

        {/* Top Row: Logo & Domain Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                fontSize: "46px",
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "-0.04em",
                display: "flex",
                alignItems: "center",
              }}
            >
              TRA<span style={{ color: "#E7040D" }}>X</span>
            </div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 800,
                color: "#FFFFFF",
                backgroundColor: "#E7040D",
                padding: "6px 14px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              JOBS
            </div>
          </div>

          <div
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#FFFFFF",
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "10px 22px",
              borderRadius: "4px",
              letterSpacing: "0.02em",
            }}
          >
            jobs.trax.ng
          </div>
        </div>

        {/* Middle: Headline & Value Proposition */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "980px" }}>
          <div
            style={{
              fontSize: "15px",
              fontWeight: 800,
              color: "#E7040D",
              backgroundColor: "rgba(231,4,13,0.12)",
              border: "1px solid rgba(231,4,13,0.3)",
              padding: "6px 14px",
              alignSelf: "flex-start",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            VERIFIED AFRICAN TECH ECOSYSTEM
          </div>

          <div
            style={{
              fontSize: "52px",
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
            }}
          >
            Curated Tech Opportunities & Verified Talent Network
          </div>

          <div
            style={{
              fontSize: "22px",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.45,
            }}
          >
            Rooted in Ogun State, connecting exceptional African engineers, designers, and leaders to vetted opportunities.
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "28px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#FFFFFF", fontSize: "16px", fontWeight: 700 }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#E7040D" }} />
            100% Manually Verified
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#FFFFFF", fontSize: "16px", fontWeight: 700 }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#E7040D" }} />
            Direct Employer Reach
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#FFFFFF", fontSize: "16px", fontWeight: 700 }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#E7040D" }} />
            Zero Platform Fees
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
