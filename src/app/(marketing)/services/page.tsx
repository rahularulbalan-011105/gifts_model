import type { Metadata } from "next";
import {
  Gift,
  ShoppingBag,
  Camera,
  BadgeCheck,
  Truck,
  Sparkles,
  Check,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/brand/whatsapp-button";

export const metadata: Metadata = { title: "Our Services" };

const features = [
  { icon: Camera, title: "Real Products", sub: "Photos & Videos" },
  { icon: BadgeCheck, title: "Quality", sub: "Assured" },
  { icon: Truck, title: "On-time", sub: "Delivery" },
  { icon: Sparkles, title: "Hassle-free", sub: "Experience" },
];

export default function ServicesPage() {
  return (
    <>
      <Section className="bg-cream">
        <SectionHeading
          eyebrow="Our Services"
          title="Our Services For Every Need"
          subtitle="Thoughtful shopping and gifting solutions for every occasion."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Gift as a Service */}
          <div className="flex flex-col rounded-[20px] bg-white p-8 shadow-sm">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold">
              <Gift className="h-7 w-7" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-navy">
              Gift as a Service
            </h3>
            <p className="mt-3 text-muted">
              Meaningful gifts for every occasion. We take care of selection,
              packaging, and delivery.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {["Birthdays", "Weddings", "Festivals", "Anniversaries"].map(
                (i) => (
                  <li key={i} className="flex items-center gap-2 text-navy">
                    <Check className="h-4 w-4 text-whatsapp" /> {i}
                  </li>
                ),
              )}
            </ul>
            <ButtonLink href="/gift-as-a-service" variant="gold" className="mt-7 self-start">
              Explore Gifts
            </ButtonLink>
          </div>

          {/* Shopping as a Service */}
          <div className="flex flex-col rounded-[20px] bg-navy p-8 text-white shadow-sm">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-gold">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <h3 className="font-display text-2xl font-semibold">
              Shopping as a Service
            </h3>
            <p className="mt-3 text-white/75">
              Shop authentic products from Chennai with our personal assistance.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {["Clothing", "Jewellery", "Pooja Items", "Home & More"].map(
                (i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold" /> {i}
                  </li>
                ),
              )}
            </ul>
            <ButtonLink href="/shopping-as-a-service" variant="white" className="mt-7 self-start">
              Shop with Us
            </ButtonLink>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <f.icon className="mx-auto h-7 w-7 text-gold" />
              <p className="mt-3 font-semibold text-navy">{f.title}</p>
              <p className="text-sm text-muted">{f.sub}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-[24px] bg-navy px-8 py-12 text-center text-white">
          <h2 className="font-display text-3xl font-semibold">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Message us on WhatsApp and a personal shopper will guide you.
          </p>
          <div className="mt-7 flex justify-center">
            <WhatsAppButton size="lg" />
          </div>
        </div>
      </Section>
    </>
  );
}
