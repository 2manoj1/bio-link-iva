"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { collaborationTypes } from "@/lib/brand-data";
import { Container, SectionHeader } from "./luxury-ui";
import { Reveal, Stagger, StaggerItem } from "./reveal";

const whatsappNumber = "918892525120";
const contactEmail = "ivachatterjee5@gmail.com";

export function InquiryFunnel() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const message = [
      "Hi Iva, I would like to enquire about a brand collaboration.",
      "",
      `Brand: ${formData.get("brandName")}`,
      `Market: ${formData.get("market")}`,
      `Collaboration type: ${formData.get("collaborationType")}`,
      `Email: ${formData.get("brandEmail")}`,
      "",
      "Details:",
      `${formData.get("details")}`,
    ].join("\n");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <section className="bg-[var(--surface-muted)]/50 py-[var(--spacing-editorial-section)] text-[var(--text-strong)]">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
          <div>
            <SectionHeader
              eyebrow="Work With Iva"
              title="Tell us what Iva should experience."
              description="For thoughtful paid collaborations with cafés, stays, fashion, beauty, wellness, and lifestyle brands that feel natural in Iva’s world."
            />
          </div>

          <Reveal>
            <form
              className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-luxury-md md:p-6"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Brand name
                  <input
                    className="min-h-12 rounded-md border border-[var(--border-soft)] bg-[var(--page)] px-4 text-[var(--text-strong)] outline-none transition focus:border-[var(--gold)]"
                    name="brandName"
                    placeholder="Boutique hotel, café, label"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Market
                  <select
                    className="min-h-12 rounded-md border border-[var(--border-soft)] bg-[var(--page)] px-4 text-[var(--text-strong)] outline-none transition focus:border-[var(--gold)]"
                    name="market"
                    required
                  >
                    <option>Bengaluru</option>
                    <option>Goa</option>
                    <option>Mumbai</option>
                    <option>Pune</option>
                    <option>Kolkata, stay partnership only</option>
                  </select>
                </label>
              </div>
              <label className="mt-4 grid gap-2 text-sm font-medium">
                What should Iva experience?
                <textarea
                  className="min-h-36 rounded-md border border-[var(--border-soft)] bg-[var(--page)] px-4 py-3 text-[var(--text-strong)] outline-none transition focus:border-[var(--gold)]"
                  name="details"
                  placeholder="Share the place, product, launch window, story idea, and paid collaboration range."
                  required
                />
              </label>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Brand email
                  <input
                    className="min-h-12 rounded-md border border-[var(--border-soft)] bg-[var(--page)] px-4 text-[var(--text-strong)] outline-none transition focus:border-[var(--gold)]"
                    name="brandEmail"
                    placeholder="partnerships@brand.com"
                    required
                    type="email"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Collaboration type
                  <select
                    className="min-h-12 rounded-md border border-[var(--border-soft)] bg-[var(--page)] px-4 text-[var(--text-strong)] outline-none transition focus:border-[var(--gold)]"
                    name="collaborationType"
                    required
                  >
                    <option>Paid collaboration</option>
                    <option>Launch or event invite</option>
                    <option>Stay or travel feature</option>
                  </select>
                </label>
              </div>
              <Button
                className="mt-5 h-auto min-h-12 w-full rounded-full bg-[var(--text-strong)] px-6 text-sm font-semibold text-[var(--page)] transition duration-300 ease-luxury hover:bg-[var(--gold)] hover:text-[var(--matte)]"
                type="submit"
              >
                Send Inquiry on WhatsApp
              </Button>
              <p className="mt-4 text-center text-xs leading-6 text-[var(--text-muted)]">
                For more details or branding briefs, write to{" "}
                <a
                  className="font-semibold text-[var(--text-strong)] underline decoration-[var(--gold)]/50 underline-offset-4 transition hover:text-[var(--gold)]"
                  href={`mailto:${contactEmail}`}
                >
                  {contactEmail}
                </a>
                .
              </p>
            </form>
          </Reveal>
        </div>

        <Stagger className="mt-10 grid gap-3 md:grid-cols-4">
          {collaborationTypes.map((type) => (
            <StaggerItem
              key={type}
              className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-4 text-sm font-medium shadow-luxury-sm"
            >
              {type}
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
