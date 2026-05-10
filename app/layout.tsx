import type { Metadata } from "next";
import { Cormorant_Garamond, Geist_Mono, Inter } from "next/font/google";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/site/json-ld";
import { Navigation } from "@/components/site/navigation";
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
    default: "Iva Chatterjee | Luxury Lifestyle & Experience Creator",
    template: "%s | Iva Chatterjee",
  },
  description:
    "Iva Chatterjee shares beautiful cafés, rooftops, boutique stays, fashion moments, and city nights through a soft luxury lens.",
  metadataBase: new URL(siteUrl),
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
    title: "Iva Chatterjee | Luxury Lifestyle Creator",
    description:
      "Exploring beautiful cafés, boutique stays, fashion, beauty and city nights through a soft luxury lens.",
    type: "website",
    url: siteUrl,
    siteName: "Iva Chatterjee",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@iva_mana5",
    creator: "@iva_mana5",
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
  maximumScale: 1,
  userScalable: false,
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
      <body className="min-h-full bg-background text-foreground font-sans">
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Person",
              name: creator.name,
              alternateName: creator.handle,
              url: siteUrl,
              image: `${siteUrl}${creator.profileImage}`,
              description: creator.description,
              jobTitle: "Luxury Lifestyle & Experience Creator",
              knowsAbout: [
                "Luxury Lifestyle",
                "Boutique Hospitality",
                "Fine Dining",
                "Fashion",
                "Bengaluru Culture",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bengaluru",
                addressRegion: "Karnataka",
                addressCountry: "IN",
              },
              sameAs: [
                creator.instagramUrl,
                creator.youtubeUrl,
                creator.facebookPageUrl,
                creator.websiteUrl
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Iva Chatterjee",
              url: siteUrl,
              description: creator.description,
              publisher: {
                "@type": "Person",
                name: creator.name,
              },
            }
          ]}
        />
          <Navigation />
          {children}
          <Footer />
      </body>
    </html>
  );
}


