import type { Metadata } from "next";
import { Cormorant_Garamond, Geist_Mono, Inter } from "next/font/google";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/site/json-ld";
import { Navigation } from "@/components/site/navigation";
import { ThemeScript } from "@/components/site/theme-script";
import { creator, siteUrl } from "@/lib/brand-data";
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
    default: "Iva Chatterjee | Bengaluru Lifestyle Creator",
    template: "%s | Iva Chatterjee",
  },
  description:
    "Iva Chatterjee shares her personal world of Bengaluru cafés, rooftops, boutique stays, fashion moments, and beautiful city plans.",
  metadataBase: new URL(siteUrl),
  keywords: [
    "Bengaluru lifestyle creator",
    "Bengaluru luxury cafés",
    "Bangalore premium experiences",
    "Bangalore couple experiences",
    "hidden luxury cafés Bangalore",
    "luxury staycation Bangalore",
  ],
  openGraph: {
    title: "Iva Chatterjee | Bengaluru Lifestyle Creator",
    description:
      "Cafés, boutique stays, elevated fashion, and beautiful Bengaluru lifestyle moments.",
    type: "website",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${editorialSerif.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeScript />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: creator.name,
            alternateName: creator.handle,
            url: siteUrl,
            description: creator.description,
            jobTitle: "Lifestyle & Experience Creator",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Bengaluru",
              addressCountry: "IN",
            },
            sameAs: [creator.instagramUrl, creator.youtubeUrl, creator.websiteUrl],
          }}
        />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
