import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#11100e", // Cinematic Charcoal
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#c8a96a", // Champagne Gold
          borderRadius: "50%",
          border: "2px solid #c8a96a",
          fontSize: 18,
          fontWeight: 700,
          fontFamily: "serif",
          textTransform: "uppercase",
          letterSpacing: "-0.05em",
        }}
      >
        IC
      </div>
    ),
    {
      ...size,
    }
  );
}
