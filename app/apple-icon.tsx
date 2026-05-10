import { ImageResponse } from "next/og";
import { siteUrl } from "@/lib/brand-data";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
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
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Fallback Monogram in case image fails */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#c8a96a",
            fontSize: 80,
            fontWeight: "bold",
            fontFamily: "serif",
          }}
        >
          IC
        </div>

        {/* Brighter, more vibrant image */}
        <img
          alt="Iva Chatterjee"
          src={`${siteUrl}/iva/editorial-saree-portrait.jpeg`}
          width="180"
          height="180"
          style={{
            objectFit: "cover",
            objectPosition: "top",
            // Satori doesn't support filters, so we rely on the source image
            // We ensure it covers the monogram
            position: "absolute",
            inset: 0,
          }}
        />
        
        {/* Signature Border */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "8px solid #c8a96a",
            borderRadius: "40px",
          }}
        />

        {/* Small Tag */}
        <div 
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            background: '#c8a96a',
            padding: '6px 12px',
            borderRadius: '6px',
            color: '#11100e',
            fontSize: 18,
            fontWeight: 'bold',
            fontFamily: 'serif'
          }}
        >
          IVA
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
