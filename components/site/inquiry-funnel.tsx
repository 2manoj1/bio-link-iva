"use client";
import { usePageCopy } from "./content-provider";


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
import { useSiteContent } from "./content-provider";
import { Container, SectionHeader } from "./luxury-ui";
import { Reveal, Stagger, StaggerItem } from "./reveal";



export function InquiryFunnel() {
  const copy = usePageCopy("InquiryFunnel");

  const { collaborationTypes, creator } = useSiteContent();
  const whatsappNumber = creator.whatsappNumber;
  const contactEmail = creator.email;
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
              eyebrow={copy("t_72163f2b95")}
              title={copy("t_597fa1149e")}
              description={copy("t_c1e0683f6e")}
            />
          </div>

          <Reveal>
            <form
              className="rounded-md border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-luxury-md md:p-6"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="inquiry-brandName" className="text-sm font-medium">{copy("t_6b4b8b5df0")}</label>
                  <Input
                    className="min-h-12 w-full"
                    id="inquiry-brandName"
                    name="brandName"
                    placeholder={copy("t_3d72f5619f")}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="inquiry-market" className="text-sm font-medium">{copy("t_569bbd757e")}</label>
                  <Select name="market" required>
                    <SelectTrigger id="inquiry-market" className="min-h-12 w-full">
                      <SelectValue placeholder={copy("t_98c21b406f")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bengaluru">{copy("t_a19b5baeec")}</SelectItem>
                      <SelectItem value="Goa">{copy("t_cd39578633")}</SelectItem>
                      <SelectItem value="Mumbai">{copy("t_5a13ea4a93")}</SelectItem>
                      <SelectItem value="Pune">{copy("t_399706abf1")}</SelectItem>
                      <SelectItem value="Kolkata, stay partnership only">{copy("t_6e80b6bdc2")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                <label htmlFor="inquiry-details" className="text-sm font-medium">{copy("t_955385f8ee")}</label>
                <Textarea
                  className="min-h-36 w-full"
                  id="inquiry-details"
                    name="details"
                  placeholder={copy("t_6d1290126e")}
                  required
                />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="inquiry-brandEmail" className="text-sm font-medium">{copy("t_9f137f87c2")}</label>
                  <Input
                    className="min-h-12 w-full"
                    id="inquiry-brandEmail"
                    name="brandEmail"
                    placeholder={copy("t_0951c8a344")}
                    required
                    type="email"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="inquiry-collaborationType" className="text-sm font-medium">{copy("t_a60bc6ae42")}</label>
                  <Select name="collaborationType" required>
                    <SelectTrigger id="inquiry-collaborationType" className="min-h-12 w-full">
                      <SelectValue placeholder={copy("t_905d012288")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paid collaboration">{copy("t_a8d851e27e")}</SelectItem>
                      <SelectItem value="Launch or event invite">{copy("t_5e33e81167")}</SelectItem>
                      <SelectItem value="Stay or travel feature">{copy("t_c6222d8b4f")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                className="mt-5 h-auto min-h-12 w-full rounded-full bg-[var(--text-strong)] px-6 text-sm font-semibold text-[var(--page)] transition duration-300 ease-luxury hover:bg-[var(--gold)] hover:text-[var(--matte)]"
                type="submit"
              >{copy("t_af62fc5240")}</Button>
              <p className="mt-4 text-center text-xs leading-6 text-[var(--text-muted)]">{copy("t_2ed16ab450")}{" "}
                <a
                  className="font-semibold text-[var(--text-strong)] underline decoration-[var(--gold)]/50 underline-offset-4 transition hover:text-[var(--gold)]"
                  href={`mailto:${contactEmail}`}
                >
                  {contactEmail}
                </a>{copy("t_3a52ce7809")}</p>
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
