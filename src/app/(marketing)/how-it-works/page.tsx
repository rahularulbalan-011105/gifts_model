import type { Metadata } from "next";
import { MessageSquare, Camera, CheckCircle2, Truck } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { WhatsAppButton } from "@/components/brand/whatsapp-button";
import { ButtonLink } from "@/components/ui/button";
import { HOW_IT_WORKS } from "@/lib/content";

export const metadata: Metadata = { title: "How It Works" };

const icons = [MessageSquare, Camera, CheckCircle2, Truck];

export default function HowItWorksPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Simple & Transparent"
        title="How It Works"
        subtitle="Simple steps to get your shopping and gifting delivered."
      />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {HOW_IT_WORKS.map((s, i) => {
          const Icon = icons[i];
          return (
            <div key={s.step} className="relative text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cream text-navy">
                <Icon className="h-8 w-8 text-gold" />
              </div>
              <span className="mx-auto mt-[-2.75rem] flex h-7 w-7 translate-x-7 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
                {s.step}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-navy">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-14 rounded-[24px] bg-navy px-8 py-12 text-center text-white">
        <h3 className="font-display text-2xl font-semibold">
          Why Choose GiftPartner.in?
        </h3>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Local Expertise", "In Chennai"],
            ["100% Quality", "Assured"],
            ["Safe & Secure", "Payments"],
            ["On-time", "Delivery"],
          ].map(([a, b]) => (
            <div key={a} className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
              <p className="font-display text-lg font-semibold text-gold">{a}</p>
              <p className="text-sm text-white/70">{b}</p>
            </div>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <WhatsAppButton size="lg" />
          <ButtonLink href="/services" variant="white" size="lg">
            Explore Services
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
