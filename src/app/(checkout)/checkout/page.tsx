import type { Metadata } from "next";
import {
  MapPin,
  CreditCard,
  Wallet,
  Building2,
  Gift,
  Package,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = { title: "Checkout" };

// Representative summary — wire to a real cart/order once the buy flow is built.
const items = [
  { name: "Kanjivaram Saree", price: 2350, icon: Gift },
  { name: "Brass Diya Set", price: 850, icon: Package },
];
const packaging = 150;
const delivery = 200;
const subtotal = items.reduce((s, i) => s + i.price, 0);
const total = subtotal + packaging + delivery;

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-1 text-center font-display text-3xl font-semibold text-navy">
        Checkout
      </h1>
      <p className="mb-8 text-center text-sm text-muted">
        Secure &amp; encrypted payments
      </p>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          {/* Delivery address */}
          <Card>
            <CardBody>
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gold" />
                <h2 className="font-display text-lg font-semibold text-navy">
                  Delivery Address
                </h2>
              </div>
              <div className="rounded-xl bg-cream p-4 text-sm">
                <p className="font-semibold text-navy">Priya R.</p>
                <p className="mt-1 text-muted">
                  123, Maple Street, Apt 5B
                  <br />
                  New Jersey, NJ 07001, United States
                </p>
                <p className="mt-1 text-muted">Phone / WhatsApp: +1 201-555-0135</p>
              </div>
              <button className="mt-3 text-sm font-medium text-navy hover:underline">
                Change Address
              </button>
            </CardBody>
          </Card>

          {/* Payment methods */}
          <Card>
            <CardBody>
              <div className="mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gold" />
                <h2 className="font-display text-lg font-semibold text-navy">
                  Payment Method
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Card", icon: CreditCard },
                  { label: "UPI", icon: Wallet },
                  { label: "Net Banking", icon: Building2 },
                ].map((m, i) => (
                  <label
                    key={m.label}
                    className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-4 text-sm ${
                      i === 0
                        ? "border-navy bg-navy-50"
                        : "border-border hover:border-navy/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay"
                      defaultChecked={i === 0}
                      className="sr-only"
                    />
                    <m.icon className="h-5 w-5 text-navy" />
                    {m.label}
                  </label>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted">
                You will be redirected to our secure payment partner to complete
                the transaction.
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Order summary */}
        <Card className="h-fit">
          <CardBody>
            <h2 className="mb-4 font-display text-lg font-semibold text-navy">
              Order Summary
            </h2>
            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it.name} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream text-gold">
                    <it.icon className="h-5 w-5" />
                  </span>
                  <span className="flex-1 text-sm text-navy">{it.name}</span>
                  <span className="text-sm font-medium text-navy">
                    {formatINR(it.price)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between text-muted">
                <dt>Subtotal</dt>
                <dd>{formatINR(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-muted">
                <dt>Packaging &amp; Handling</dt>
                <dd>{formatINR(packaging)}</dd>
              </div>
              <div className="flex justify-between text-muted">
                <dt>Delivery</dt>
                <dd>{formatINR(delivery)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-semibold text-navy">
                <dt>Total</dt>
                <dd>{formatINR(total)}</dd>
              </div>
            </dl>

            <ButtonLink
              href="/order-confirmation"
              variant="gold"
              size="lg"
              className="mt-6 w-full"
            >
              Pay Securely {formatINR(total)}
            </ButtonLink>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
