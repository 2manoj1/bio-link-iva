import { getPageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

import { AboutExperience } from "@/components/site/page-sections";
import { makeMetadata } from "@/lib/brand-data";

const fallbackMetadata: Metadata = makeMetadata({
  title: "About",
  description:
    "Meet Iva Chatterjee, a Bengaluru-based Bengali lifestyle creator with a soft eye for style, music, beauty, and cinematic city moments.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutExperience />;
}

export async function generateMetadata(): Promise<Metadata> { return getPageMetadata("/about", fallbackMetadata); }
