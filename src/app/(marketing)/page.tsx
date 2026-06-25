import Link from "next/link";
import Image from "next/image";
import {
  BadgeCheck,
  Camera,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/brand/whatsapp-button";
import { Section, SectionHeading } from "@/components/ui/section";

const heroFeatures = [
  { icon: Camera, label: "Real Products", sub: "Photos & Videos" },
  { icon: BadgeCheck, label: "Quality", sub: "Assured" },
  { icon: Truck, label: "On-time", sub: "Delivery" },
  { icon: HeartHandshake, label: "Personal", sub: "Care" },
];

const whyChoose = [
  {
    icon: MapPin,
    title: "Local Expertise in Chennai",
    body: "On-ground team that knows the best local stores and authentic products.",
  },
  {
    icon: ShieldCheck,
    title: "100% Quality Assured",
    body: "Every item is checked for quality and authenticity before it ships.",
  },
  {
    icon: BadgeCheck,
    title: "Safe & Secure Payments",
    body: "Encrypted, transparent payments with full order visibility.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Care",
    body: "A real personal shopper who treats every order like their own.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Trust bar */}
      <div className="bg-navy text-white">
        <div className="container-page flex flex-wrap items-center justify-center gap-2 py-2 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" /> Fast
            response on WhatsApp
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-b from-cream to-white">
        <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold shadow-sm">
              For NRIs &amp; locals in Chennai
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-navy sm:text-5xl">
              Send Gifts &amp; Shop
              <br />
              from Chennai
              <br />
              <span className="italic text-gold">
                Without Online Shopping Risks
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              We help NRIs send thoughtful gifts and shop authentic products
              from Chennai with complete trust and care.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              {heroFeatures.map((f) => (
                <div key={f.label} className="flex items-center gap-2">
                  <f.icon className="h-5 w-5 text-gold" />
                  <span className="text-sm">
                    <span className="font-semibold text-navy">{f.label}</span>{" "}
                    <span className="text-muted">{f.sub}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <WhatsAppButton size="lg" message="Hi GiftPartner, I'd like to start a request.">
                Start Your Request on WhatsApp
              </WhatsAppButton>
              <ButtonLink href="/how-it-works" variant="outline" size="lg">
                View How It Works
              </ButtonLink>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-[28px] shadow-xl">
              <Image
                src="/hero-gift.png"
                alt="A curated Chennai gift hamper with a silk saree, temple-themed treats, and a Chennai gift bag"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 28rem"
                className="object-cover"
              />
            </div>
            <div className="absolute -right-2 top-6 rotate-3 rounded-2xl bg-white px-4 py-3 text-sm shadow-lg">
              <p className="font-display font-semibold text-navy">
                Delivering Smiles,
              </p>
              <p className="text-gold">Across Miles ♥</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <Section className="bg-navy text-white">
        <SectionHeading
          eyebrow="Why GiftPartner.in"
          title={<span className="text-white">Why Choose GiftPartner.in?</span>}
          subtitle={
            <span className="text-white/70">
              Everything you need to gift and shop from Chennai, handled by people
              you can trust.
            </span>
          }
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChoose.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="rounded-[24px] bg-cream px-8 py-12 text-center">
          <h2 className="font-display text-3xl font-semibold text-navy">
            Ready to send a gift or shop from Chennai?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Tell us what you need on WhatsApp. We&apos;ll find the best options,
            share photos &amp; videos, and deliver with care.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <WhatsAppButton size="lg" />
            <ButtonLink href="/request" variant="primary" size="lg">
              Request a Personal Shopper
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-muted">
            Prefer to browse first?{" "}
            <Link href="/services" className="font-medium text-navy underline">
              Explore our services
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
