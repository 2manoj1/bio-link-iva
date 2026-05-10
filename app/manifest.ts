import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Iva Chatterjee | Luxury Lifestyle",
    short_name: "Iva",
    description: "Iva Chatterjee shares beautiful cafés, rooftops, boutique stays, fashion moments, and city nights through a soft luxury lens.",
    start_url: "/",
    display: "standalone",
    background_color: "#11100e",
    theme_color: "#11100e",
    orientation: "portrait",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon-192",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

