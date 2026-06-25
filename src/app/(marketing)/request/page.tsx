import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { RequestForm } from "./request-form";

export const metadata: Metadata = { title: "Request a Personal Shopper" };

const steps = [
  "We understand your requirement",
  "We share best options with photos/videos",
  "You approve & we purchase",
  "We deliver with care and updates",
];

export default function RequestPage() {
  return (
    <Section className="bg-cream">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[20px] bg-white p-8 shadow-sm">
          <h1 className="font-display text-3xl font-semibold text-navy">
            Request a Personal Shopper
          </h1>
          <p className="mt-2 text-muted">
            Tell us what you need. We&apos;ll take care of the rest.
          </p>
          <div className="mt-8">
            <RequestForm />
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-navy">
            What happens next?
          </h2>
          <ol className="mt-6 space-y-5">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <p className="pt-1.5 text-sm text-navy">{s}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-2xl bg-navy p-6 text-white">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Check className="h-4 w-4 text-gold" /> No payment until you approve
            </p>
            <p className="mt-2 text-sm text-white/70">
              You only pay after you&apos;ve seen and approved your options.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
