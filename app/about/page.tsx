import type { Metadata } from "next";

import { AboutExperience } from "@/components/site/page-sections";
import { makeMetadata } from "@/lib/brand-data";

export const metadata: Metadata = makeMetadata({
  title: "About",
  description:
    "Meet Iva Chatterjee, a Bengaluru-based lifestyle creator sharing cafés, stays, fashion, and city moments with a polished personal style.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutExperience />;
}
