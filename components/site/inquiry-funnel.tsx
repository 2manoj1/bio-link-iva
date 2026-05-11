"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { collaborationTypes } from "@/lib/brand-data";
import { Container, SectionHeader } from "./luxury-ui";
import { Reveal, Stagger, StaggerItem } from "./reveal";

const whatsappNumber = "918431716703"; // Iva's WhatsApp number in international format without the '+' sign
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
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Brand name</label>
                  <Input
                    className="min-h-12 w-full"
                    name="brandName"
                    placeholder="Boutique hotel, café, label"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Market</label>
                  <Select name="market" required>
                    <SelectTrigger className="min-h-12 w-full">
                      <SelectValue placeholder="Select market" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bengaluru">Bengaluru</SelectItem>
                      <SelectItem value="Goa">Goa</SelectItem>
                      <SelectItem value="Mumbai">Mumbai</SelectItem>
                      <SelectItem value="Pune">Pune</SelectItem>
                      <SelectItem value="Kolkata, stay partnership only">Kolkata, stay partnership only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                <label className="text-sm font-medium">What should Iva experience?</label>
                <Textarea
                  className="min-h-36 w-full"
                  name="details"
                  placeholder="Share the place, product, launch window, story idea, and paid collaboration range."
                  required
                />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Brand email</label>
                  <Input
                    className="min-h-12 w-full"
                    name="brandEmail"
                    placeholder="partnerships@brand.com"
                    required
                    type="email"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Collaboration type</label>
                  <Select name="collaborationType" required>
                    <SelectTrigger className="min-h-12 w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paid collaboration">Paid collaboration</SelectItem>
                      <SelectItem value="Launch or event invite">Launch or event invite</SelectItem>
                      <SelectItem value="Stay or travel feature">Stay or travel feature</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
