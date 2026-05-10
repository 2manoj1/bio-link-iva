import type { Metadata } from "next";

import { HomeExperience } from "@/components/site/page-sections";
import { makeMetadata } from "@/lib/brand-data";

export const metadata: Metadata = makeMetadata({
  title: "Bengaluru Lifestyle Creator",
  description:
    "Iva Chatterjee shares her personal world of Bengaluru cafés, rooftops, boutique stays, fashion moments, and beautiful city plans.",
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
