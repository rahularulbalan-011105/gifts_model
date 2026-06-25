import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ACCOUNTS_ENABLED, CONTACT } from "@/lib/site";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Gift as a Service", href: "/gift-as-a-service" },
      { label: "Shopping as a Service", href: "/shopping-as-a-service" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Request a Shopper", href: "/request" },
      { label: "Track Order", href: "/track" },
    ],
  },
  // Account links only appear when the account system is switched on.
  ...(ACCOUNTS_ENABLED
    ? [
        {
          title: "Account",
          links: [
            { label: "Login", href: "/login" },
            { label: "Dashboard", href: "/dashboard" },
          ],
        },
      ]
    : []),
];

export function Footer() {
  return (
    <footer className="mt-auto bg-navy text-white/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            We help NRIs send thoughtful gifts and shop authentic products from
            Chennai — with complete trust and care.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold" /> {CONTACT.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold" /> {CONTACT.email}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" /> {CONTACT.office}
            </li>
          </ul>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 font-display text-sm font-semibold text-white">
              {col.title}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/60 sm:flex-row">
          <p>© {2026} GiftPartner.in — Trusted by NRIs in 20+ countries.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-gold">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gold">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
