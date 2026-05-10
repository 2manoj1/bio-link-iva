"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return true;

    const savedTheme = window.localStorage.getItem("iva-theme");
    if (savedTheme) return savedTheme === "dark";

    return true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem("iva-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <Button
      aria-label="Toggle dark and light mode"
      className="size-10 rounded-full border-[var(--border-soft)] bg-[var(--surface)] text-[var(--text-strong)] shadow-sm hover:border-[var(--gold)] hover:bg-[var(--surface-muted)]"
      size="icon"
      variant="outline"
      type="button"
      onClick={() => setDark((value) => !value)}
    >
      {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </Button>
  );
}
