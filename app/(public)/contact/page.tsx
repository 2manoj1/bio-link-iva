import { getPageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

import { ContactExperience } from "@/components/site/page-sections";
import { makeMetadata } from "@/lib/brand-data";

const fallbackMetadata: Metadata = makeMetadata({
  title: "Contact & Partnerships",
  description:
    "Contact Iva Chatterjee for premium paid collaborations across Bengaluru luxury culture, boutique stays, cafes, rooftops, fashion, beauty, wellness, and travel.",
  path: "/contact",
  keywords: [
    "Iva Chatterjee contact",
    "Bengaluru luxury creator collaboration",
    "premium creator partnerships India",
    "luxury lifestyle influencer contact",
  ],
});

export default function ContactPage() {
  return <ContactExperience />;
}

export async function generateMetadata(): Promise<Metadata> { return getPageMetadata("/contact", fallbackMetadata); }
