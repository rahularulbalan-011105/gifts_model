import type { Metadata } from "next";
import { CheckCircle2, Gift } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Order Confirmed" };

const next = [
  "We'll share options soon",
  "You approve the items",
  "We purchase & pack with care",
  "We deliver & keep you updated",
];

export default function OrderConfirmationPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-[24px] bg-white p-8 text-center shadow-sm sm:p-12">
        <CheckCircle2 className="mx-auto h-16 w-16 text-whatsapp" />
        <h1 className="mt-5 font-display text-3xl font-semibold text-navy">
          Thank You!
        </h1>
        <p className="mt-2 text-lg text-navy">
          Your Order is <span className="font-semibold text-whatsapp">Confirmed</span> 🎉
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          We have received your order and will start working on it. A confirmation
          has been sent to your email.
        </p>

        <div className="mx-auto mt-7 inline-flex items-center gap-3 rounded-2xl bg-cream px-6 py-4">
          <Gift className="h-6 w-6 text-gold" />
          <div className="text-left">
            <p className="text-xs text-muted">Order ID</p>
            <p className="font-display text-lg font-semibold text-navy">
              GP125678
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
          {next.map((n, i) => (
            <div
              key={n}
              className="flex items-center gap-3 rounded-xl border border-border p-3 text-sm"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
                {i + 1}
              </span>
              <span className="text-navy">{n}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/services" variant="primary">
            Continue Shopping
          </ButtonLink>
          <ButtonLink href="/track" variant="outline">
            Track Your Order
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
