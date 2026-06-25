import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { TrackForm } from "./track-form";

export const metadata: Metadata = { title: "Track Your Order" };

export default function TrackPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Track Order"
        title="Track Your Order"
        subtitle="Stay updated with your order every step of the way."
      />
      <div className="mx-auto max-w-2xl">
        <TrackForm />
      </div>
    </Section>
  );
}
