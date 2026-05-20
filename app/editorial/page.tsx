import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

import { makeMetadata } from "@/lib/brand-data";

export const metadata: Metadata = makeMetadata({
  title: "Stories",
  description:
    "Personal stories from Iva Chatterjee covering cafés, stays, fashion, travel, and beautiful city experiences.",
  path: "/editorial",
});

export default function EditorialPage() {
  permanentRedirect("/blog");
}
