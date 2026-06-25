import type { Metadata } from "next";
import {
  Shirt,
  Gem,
  Flame,
  UtensilsCrossed,
  Home,
  Sparkles,
  Check,
  Store,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/brand/whatsapp-button";

export const metadata: Metadata = { title: "Shopping as a Service" };

const categories = [
  { icon: Shirt, label: "Clothing" },
  { icon: Gem, label: "Jewellery" },
  { icon: Flame, label: "Pooja Items" },
  { icon: UtensilsCrossed, label: "Utensils" },
  { icon: Home, label: "Home Decor" },
  { icon: Sparkles, label: "Sarees" },
  { icon: Store, label: "More" },
];

const reasons = [
  "We buy from trusted local stores",
  "Quality check at every step",
  "Best prices & authentic products",
  "Careful packaging & safe delivery",
  "Personal shopper support",
];

export default function ShoppingAsAServicePage() {
  return (
    <>
      <Section className="bg-tint">
        <SectionHeading
          eyebrow="Shopping as a Service"
          title={
            <>
              Shopping as a Service
              <br />
              Shop Authentic. Shop Local.
            </>
          }
          subtitle="We help you buy the best products from trusted local stores in Chennai."
        />

        <div className="mx-auto mb-12 grid max-w-3xl grid-cols-3 gap-4 sm:grid-cols-7">
          {categories.map((c) => (
            <div key={c.label} className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-navy shadow-sm">
                <c.icon className="h-6 w-6 text-gold" />
              </div>
              <span className="text-center text-xs font-medium text-navy">
                {c.label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid items-center gap-8 rounded-[24px] bg-cream p-8 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-semibold text-navy">
              Why Shop with Us?
            </h3>
            <ul className="mt-5 space-y-3">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-3 text-navy">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-whatsapp" />
                  <span className="text-sm">{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-navy-900">
            <Store className="h-24 w-24 text-gold/70" strokeWidth={1} />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <WhatsAppButton size="lg" message="Hi GiftPartner, I'd like shopping assistance.">
            Request Shopping Assistance
          </WhatsAppButton>
          <ButtonLink href="/request" variant="primary" size="lg">
            Request a Personal Shopper
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
