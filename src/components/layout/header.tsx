"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { WhatsAppButton } from "@/components/brand/whatsapp-button";
import { ACCOUNTS_ENABLED, PRIMARY_NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-foreground/80 transition-colors hover:text-navy",
                pathname === item.href && "text-navy",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {ACCOUNTS_ENABLED ? (
            <Link
              href="/login"
              className="text-sm font-medium text-navy hover:underline"
            >
              Login
            </Link>
          ) : null}
          <WhatsAppButton size="sm" />
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-white lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-navy-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center gap-3">
              {ACCOUNTS_ENABLED ? (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-navy/25 px-5 py-2 text-sm font-medium text-navy"
                >
                  Login
                </Link>
              ) : null}
              <WhatsAppButton size="sm" />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
