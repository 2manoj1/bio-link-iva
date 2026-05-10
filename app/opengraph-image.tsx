import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

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
          justifyContent: "flex-end",
          background: "#11100e",
          color: "#f3ecdf",
          padding: 72,
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            color: "#c8a96a",
            fontSize: 28,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          Bengaluru Lifestyle Creator
        </div>
        <div style={{ marginTop: 24, maxWidth: 900, fontSize: 88, lineHeight: 0.9 }}>
          Iva Chatterjee
        </div>
        <div style={{ marginTop: 28, maxWidth: 760, fontSize: 34, color: "#c9b89f" }}>
          Cafés, stays, fashion, and beautiful city moments.
        </div>
      </div>
    ),
    size,
  );
}
