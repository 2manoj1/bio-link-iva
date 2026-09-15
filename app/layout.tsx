import type { Metadata } from "next";
import { Cormorant_Garamond, Geist_Mono, Inter } from "next/font/google";
import { siteUrl } from "@/lib/brand-data";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const editorialSerif = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Iva Chatterjee | Luxury Lifestyle & Experience Creator",
    template: "%s | Iva Chatterjee",
  },
  description:
    "Iva Chatterjee shares beautiful cafés, rooftops, boutique stays, fashion moments, and city nights through a soft luxury lens.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Iva Chatterjee",
    "Bengaluru lifestyle creator",
    "Bengaluru luxury cafés",
    "Bangalore premium experiences",
    "Luxury staycation India",
    "Boutique hospitality influencer",
    "High-end fashion creator",
    "Bangalore couple experiences",
    "hidden luxury cafés Bangalore",
    "luxury staycation Bangalore",
  ],
  openGraph: {
    title: "Iva Chatterjee | Bangalore Influencer & Digital Creator",
    description:
      "Beauty, food, travel, lifestyle, cafés, hotels, fashion, and city nights through a polished Bangalore lens.",
    type: "website",
    url: siteUrl,
    siteName: "Iva Chatterjee",
    locale: "en_IN",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Iva Chatterjee | Bangalore Influencer & Digital Creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@iva_mana5",
    creator: "@iva_mana5",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#11100e",
  width: "device-width",
  initialScale: 1,
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${inter.variable} ${editorialSerif.variable} ${geistMono.variable} dark h-full antialiased`} suppressHydrationWarning>
    <body className="min-h-full bg-background text-foreground font-sans">{children}</body>
  </html>;
}
