import { getCreatorIdentity } from '@/lib/creator-identity';
import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const creator = await getCreatorIdentity();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#fdfcf9",
          padding: 80,
          fontFamily: "serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 600,
            height: 600,
            background: "#f3ecdf",
            borderRadius: "50%",
            opacity: 0.5,
          }}
        />
        
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{
              color: "#c8a96a",
              fontSize: 24,
              letterSpacing: 10,
              textTransform: "uppercase",
              marginBottom: 40,
            }}
          >
            {`${creator.title} · ${creator.primaryMarket?.name || creator.location}`}
          </div>
          
          <div style={{ fontSize: 120, lineHeight: 0.85, color: "#11100e", marginBottom: 40 }}>
            {creator.name}
          </div>
          
          <div style={{ fontSize: 32, color: "#555", maxWidth: 700, lineHeight: 1.4 }}>
            {creator.positioning}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 40, height: 1, background: "#c8a96a" }} />
          <div style={{ color: "#c8a96a", fontSize: 20, letterSpacing: 4 }}>{creator.handle}</div>
        </div>
      </div>
    ),
    size,
  );
}

