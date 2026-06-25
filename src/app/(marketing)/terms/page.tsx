import type { Metadata } from "next";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-semibold text-navy">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-muted">Last updated: May 2026</p>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-foreground/80">
          <p>
            These terms govern your use of GiftPartner.in. This is a placeholder
            — replace with your finalised terms reviewed by legal counsel before
            launch.
          </p>
          <p>
            By placing a request you agree that we act as your personal shopping
            agent in Chennai. Final purchases are made only after your explicit
            approval of the shared options. Prices, availability, and delivery
            timelines are confirmed before payment.
          </p>
        </div>
      </div>
    </Section>
  );
}
