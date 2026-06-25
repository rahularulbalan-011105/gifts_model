import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const ORDER_STEPS = [
  { key: "RECEIVED", label: "Order Received", note: "We have received your requirement" },
  { key: "SHOPPING", label: "Shopping in Progress", note: "We are shopping for your items" },
  { key: "QUALITY_CHECK", label: "Quality Check", note: "Checking quality before purchase" },
  { key: "PACKED", label: "Packed & Ready", note: "Your order is packed with care" },
  { key: "OUT_FOR_DELIVERY", label: "Out for Delivery", note: "Your order is on the way" },
  { key: "DELIVERED", label: "Delivered", note: "Your order has been delivered" },
] as const;

export type OrderStepKey = (typeof ORDER_STEPS)[number]["key"];

export function StatusTimeline({
  current,
  timestamps = {},
}: {
  current: OrderStepKey;
  timestamps?: Partial<Record<OrderStepKey, string>>;
}) {
  const currentIndex = ORDER_STEPS.findIndex((s) => s.key === current);

  return (
    <ol className="relative space-y-6">
      {ORDER_STEPS.map((step, i) => {
        const done = i <= currentIndex;
        const isLast = i === ORDER_STEPS.length - 1;
        return (
          <li key={step.key} className="relative flex gap-4">
            {!isLast ? (
              <span
                className={cn(
                  "absolute left-[15px] top-8 h-[calc(100%-8px)] w-0.5",
                  i < currentIndex ? "bg-whatsapp" : "bg-border",
                )}
              />
            ) : null}
            <span
              className={cn(
                "z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                done
                  ? "border-whatsapp bg-whatsapp text-white"
                  : "border-border bg-white text-muted",
              )}
            >
              {done ? <Check className="h-4 w-4" /> : <span className="h-2 w-2 rounded-full bg-border" />}
            </span>
            <div className="flex flex-1 items-start justify-between pt-0.5">
              <div>
                <p className={cn("text-sm font-semibold", done ? "text-navy" : "text-muted")}>
                  {step.label}
                </p>
                <p className="text-xs text-muted">{step.note}</p>
              </div>
              {timestamps[step.key] ? (
                <span className="whitespace-nowrap text-xs text-muted">
                  {timestamps[step.key]}
                </span>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
