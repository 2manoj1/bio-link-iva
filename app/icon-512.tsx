import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#11100e",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#c8a96a",
          fontSize: 260,
          fontWeight: 700,
          fontFamily: "serif",
          textTransform: "uppercase",
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
