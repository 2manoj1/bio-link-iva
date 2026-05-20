"use client";

import { motion, useScroll } from "framer-motion";

export function ArticleProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-16 z-40 h-px origin-left bg-[var(--gold)] shadow-[0_0_22px_color-mix(in_oklch,var(--gold)_55%,transparent)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
