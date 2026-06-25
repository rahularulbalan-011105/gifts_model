import Link from "next/link";
import { Gift } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const text = variant === "light" ? "text-white" : "text-navy";
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white">
        <Gift className="h-5 w-5" />
      </span>
      <span className="leading-tight">
        <span className={cn("block font-display text-lg font-semibold", text)}>
          GiftPartner<span className="text-gold">.in</span>
        </span>
        <span
          className={cn(
            "block text-[10px] tracking-wide",
            variant === "light" ? "text-white/70" : "text-muted",
          )}
        >
          We Shop. You Relax.
        </span>
      </span>
    </Link>
  );
}
