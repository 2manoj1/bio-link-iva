import { getPageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

import { HomeExperience } from "@/components/site/page-sections";
import { makeMetadata } from "@/lib/brand-data";

const fallbackMetadata: Metadata = makeMetadata({
  title: "Bangalore Influencer & Digital Creator",
  description:
    "Iva Chatterjee shares beauty, food, travel, lifestyle, cafés, hotels, fashion moments, and city nights through a polished Bangalore lens.",
  keywords: [
    "Iva Chatterjee Bangalore influencer",
    "Bangalore digital creator",
    "beauty food travel lifestyle creator",
    "Bengaluru lifestyle creator",
    "Bengaluru luxury cafés",
    "Bangalore premium experiences",
    "luxury staycation Bangalore",
  ],
});

export default function HomePage() {
  return <HomeExperience />;
}

export async function generateMetadata(): Promise<Metadata> { return getPageMetadata("/", fallbackMetadata); }
