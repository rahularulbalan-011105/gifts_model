import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { WhatsAppButton } from "@/components/brand/whatsapp-button";
import { FAQS } from "@/lib/content";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        subtitle="We are here to help!"
      />

      <div className="mx-auto max-w-3xl space-y-3">
        {FAQS.map((f) => (
          <details
            key={f.q}
            className="group rounded-xl border border-border bg-white px-5 py-4 shadow-sm [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium text-navy">
              {f.q}
              <span className="text-xl text-gold transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-3xl rounded-[20px] bg-navy px-8 py-10 text-center text-white">
        <h3 className="font-display text-2xl font-semibold">
          Still have questions?
        </h3>
        <p className="mt-2 text-white/70">
          Chat with us on WhatsApp — we usually reply within minutes.
        </p>
        <div className="mt-6 flex justify-center">
          <WhatsAppButton size="lg" />
        </div>
      </div>
    </Section>
  );
}
