"use client";

import { useState } from "react";
import { Gift } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { WhatsAppButton } from "@/components/brand/whatsapp-button";
import { GIFT_CATEGORIES } from "@/lib/content";
import { cn } from "@/lib/utils";

const TABS = [
  "All",
  "Birthday",
  "Wedding",
  "Festivals",
  "Anniversary",
  "Corporate",
];

export function GiftGallery() {
  const [active, setActive] = useState("All");

  const items =
    active === "All"
      ? GIFT_CATEGORIES
      : GIFT_CATEGORIES.filter((g) => g.tag === active);

  return (
    <Section className="bg-cream">
      <SectionHeading
        eyebrow="Gift as a Service"
        title={
          <>
            Gift as a Service
            <br />
            For Every Occasion
          </>
        }
        subtitle="Carefully curated gifts to make your moments special."
      />

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active === t
                ? "bg-navy text-white"
                : "bg-white text-navy hover:bg-navy-50",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="group overflow-hidden rounded-[18px] bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-cream-200 to-gold-light/40">
              <Gift className="h-16 w-16 text-gold" strokeWidth={1.2} />
              <span className="absolute left-3 top-3 rounded-full bg-navy/90 px-2.5 py-1 text-[11px] font-medium text-white">
                {item.tag}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-semibold text-navy">
                {item.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <WhatsAppButton size="lg" message="Hi GiftPartner, I'd like to send a gift.">
          Send a Gift Now on WhatsApp
        </WhatsAppButton>
      </div>
    </Section>
  );
}
