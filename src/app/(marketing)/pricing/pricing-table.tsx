"use client";

import { useState } from "react";
import { Check, ShieldCheck, Lock, Headset } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { PRICING } from "@/lib/content";
import { formatINR } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PricingTable() {
  const [yearly, setYearly] = useState(false);

  return (
    <Section className="bg-cream">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple & Transparent Pricing"
        subtitle="Choose the plan that suits your needs."
      />

      <div className="mb-12 flex items-center justify-center gap-3">
        <span className={cn("text-sm", !yearly && "font-semibold text-navy")}>
          One-time
        </span>
        <button
          onClick={() => setYearly((v) => !v)}
          className="relative h-7 w-12 rounded-full bg-navy transition-colors"
          aria-label="Toggle billing period"
        >
          <span
            className={cn(
              "absolute top-1 h-5 w-5 rounded-full bg-white transition-transform",
              yearly ? "translate-x-6" : "translate-x-1",
            )}
          />
        </button>
        <span className={cn("text-sm", yearly && "font-semibold text-navy")}>
          Yearly <span className="text-whatsapp">(Save 10%)</span>
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {PRICING.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative flex flex-col rounded-[18px] border bg-white p-7 shadow-sm",
              plan.highlighted
                ? "border-gold ring-2 ring-gold/30"
                : "border-border",
            )}
          >
            {plan.highlighted ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </span>
            ) : null}
            <h3 className="font-display text-xl font-semibold text-navy">
              {plan.name}
            </h3>
            <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
            <div className="mt-5 flex items-end gap-1">
              <span className="font-display text-4xl font-semibold text-navy">
                {formatINR(yearly ? plan.priceYearly : plan.priceOnce)}
              </span>
              <span className="mb-1 text-sm text-muted">/order</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-navy">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp" />
                  {f}
                </li>
              ))}
            </ul>
            <ButtonLink
              href="/request"
              variant={plan.highlighted ? "gold" : "primary"}
              className="mt-7 w-full"
            >
              Get Started
            </ButtonLink>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted">
        <span className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-whatsapp" /> 100% Quality Assured
        </span>
        <span className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-whatsapp" /> Safe &amp; Secure Payments
        </span>
        <span className="flex items-center gap-2">
          <Headset className="h-4 w-4 text-whatsapp" /> 24/7 WhatsApp Support
        </span>
      </div>
    </Section>
  );
}
