import { ImageResponse } from "next/og";

export const alt = "Shiv Shakti Holidays — personalized tours and holiday packages";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background:
          "radial-gradient(circle at 82% 18%, rgba(224, 166, 66, 0.34), transparent 31%), linear-gradient(135deg, #08182d 0%, #102742 58%, #172f49 100%)",
        color: "white",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "68px 84px",
        width: "100%",
      }}
    >
      <div
        style={{
          border: "1px solid rgba(224, 166, 66, 0.55)",
          borderRadius: 32,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "58px 68px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#e0a642",
            display: "flex",
            fontSize: 25,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          Explore · Experience · Remember
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "serif",
            fontSize: 82,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.05,
            marginTop: 24,
          }}
        >
          Shiv Shakti Holidays
        </div>
        <div
          style={{
            color: "#d9e2ec",
            display: "flex",
            fontSize: 31,
            lineHeight: 1.4,
            marginTop: 26,
            maxWidth: 880,
          }}
        >
          Personalized domestic, international, honeymoon and spiritual journeys from Roorkee.
        </div>
      </div>
    </div>,
    size,
  );
}
