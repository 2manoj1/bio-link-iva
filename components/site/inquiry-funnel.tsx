import { Button } from "@/components/ui/button";
import { collaborationTypes } from "@/lib/brand-data";
import { Container, SectionHeader } from "./luxury-ui";
import { Reveal, Stagger, StaggerItem } from "./reveal";

export function InquiryFunnel() {
  return (
    <section className="bg-[var(--surface-muted)]/50 py-20 text-[var(--text-strong)] md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Work With Iva"
              title="For brands that feel aligned with Iva’s lifestyle."
              description="A quiet space for thoughtful paid collaborations with cafés, stays, fashion, beauty, wellness, and lifestyle brands Iva can share with genuine warmth."
            />
          </div>

          <Reveal>
            <form className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-2xl shadow-black/5">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Brand name
                  <input
                    className="min-h-12 rounded-xl border border-[var(--border-soft)] bg-[var(--page)] px-4 text-[var(--text-strong)] outline-none focus:border-[var(--gold)]"
                    placeholder="Boutique hotel, café, label"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Market
                  <select className="min-h-12 rounded-xl border border-[var(--border-soft)] bg-[var(--page)] px-4 text-[var(--text-strong)] outline-none focus:border-[var(--gold)]">
                    <option>Bengaluru</option>
                    <option>Goa</option>
                    <option>Mumbai</option>
                    <option>Pune</option>
                    <option>Kolkata, stay partnership only</option>
                  </select>
                </label>
              </div>
              <label className="mt-4 grid gap-2 text-sm font-medium">
                  What would you love Iva to experience?
                <textarea
                  className="min-h-36 rounded-xl border border-[var(--border-soft)] bg-[var(--page)] px-4 py-3 text-[var(--text-strong)] outline-none focus:border-[var(--gold)]"
                  placeholder="Share the place, product, story, launch window, and paid collaboration range."
                />
              </label>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Brand email
                  <input
                    className="min-h-12 rounded-xl border border-[var(--border-soft)] bg-[var(--page)] px-4 text-[var(--text-strong)] outline-none focus:border-[var(--gold)]"
                    placeholder="partnerships@brand.com"
                    type="email"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Collaboration type
                  <select className="min-h-12 rounded-xl border border-[var(--border-soft)] bg-[var(--page)] px-4 text-[var(--text-strong)] outline-none focus:border-[var(--gold)]">
                    <option>Paid collaboration</option>
                    <option>Launch or event invite</option>
                    <option>Stay or travel feature</option>
                  </select>
                </label>
              </div>
              <Button
                className="mt-5 h-auto min-h-12 w-full rounded-xl bg-[var(--text-strong)] px-6 text-sm font-semibold text-[var(--page)] hover:bg-[var(--gold)] hover:text-[var(--matte)]"
                type="button"
              >
                Send Collaboration Note
              </Button>
            </form>
          </Reveal>
        </div>

        <Stagger className="mt-10 grid gap-3 md:grid-cols-4">
          {collaborationTypes.map((type) => (
            <StaggerItem
              key={type}
              className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] p-4 text-sm font-medium shadow-sm shadow-black/5"
            >
              {type}
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
