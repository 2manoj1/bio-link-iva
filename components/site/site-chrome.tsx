"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./navigation";
import { Footer } from "./footer";
import { Chatbot } from "./chatbot";

export function SiteHeader() {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) {
    return null;
  }
  return <Navigation />;
}

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) {
    return null;
  }
  return <Footer />;
}

export function SiteChatbot() {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) {
    return null;
  }
  return <Chatbot />;
}
