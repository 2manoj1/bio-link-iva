import type { Metadata } from "next";

import { EditorialExperience } from "@/components/site/page-sections";
import { makeMetadata } from "@/lib/brand-data";

export const metadata: Metadata = makeMetadata({
  title: "Stories",
  description:
    "Personal stories from Iva Chatterjee covering Bengaluru lifestyle, cafés, Goa boutique stays, and beautiful city experiences.",
  path: "/editorial",
});

export default function EditorialPage() {
  return <EditorialExperience />;
}
