import { ImageResponse } from "next/og";

export const alt = "Techyera Consultancy Services — Engineering Technology. Enabling Growth.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#ffffff", padding: 72, fontFamily: "sans-serif", backgroundImage: "radial-gradient(circle at 1px 1px, rgba(36,71,214,0.16) 1px, transparent 0)", backgroundSize: "26px 26px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 16, background: "#0b1b34", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ position: "absolute", left: 18, top: 22, width: 36, height: 5, background: "#fff", borderRadius: 3 }} />
            <div style={{ position: "absolute", left: 33.5, top: 22, width: 5, height: 26, background: "#fff", borderRadius: 3 }} />
            <div style={{ position: "absolute", left: 29, top: 44, width: 14, height: 14, background: "#6f8bff", borderRadius: 7 }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: "#0b1b34", letterSpacing: -1 }}>Techyera</div>
            <div style={{ fontSize: 22, color: "#5f6b82" }}>Consultancy Services</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, color: "#0b1b34", letterSpacing: -3, lineHeight: 1.05, maxWidth: 900 }}>Engineering Technology. Enabling Growth.</div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#34425a" }}>Software engineering · Cloud · Data · AI · Digital transformation</div>
        </div>
        <div style={{ height: 8, width: 160, background: "#2447d6", borderRadius: 4 }} />
      </div>
    ),
    size,
  );
}
