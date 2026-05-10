import type { Metadata } from "next";

import { HomeExperience } from "@/components/site/page-sections";
import { makeMetadata } from "@/lib/brand-data";

export const metadata: Metadata = makeMetadata({
  title: "Luxury Lifestyle Creator",
  description:
    "Iva Chatterjee shares cafés, rooftops, boutique stays, fashion moments, and city nights through a soft luxury lens.",
  keywords: [
    "Bengaluru lifestyle creator",
    "Bengaluru luxury cafés",
    "Bangalore premium experiences",
    "luxury staycation Bangalore",
  ],
});

export default function HomePage() {
  return <HomeExperience />;
}
