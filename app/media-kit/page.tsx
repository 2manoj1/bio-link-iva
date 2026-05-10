import type { Metadata } from "next";

import { MediaKitExperience } from "@/components/site/page-sections";
import { makeMetadata } from "@/lib/brand-data";

export const metadata: Metadata = makeMetadata({
  title: "Media Kit",
  description:
    "Media kit for Iva Chatterjee with audience insights, loved content, brand categories, and collaboration details.",
  path: "/media-kit",
});

export default function MediaKitPage() {
  return <MediaKitExperience />;
}
