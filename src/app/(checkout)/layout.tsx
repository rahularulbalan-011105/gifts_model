import Link from "next/link";
import { redirect } from "next/navigation";
import { Lock } from "lucide-react";
import { auth } from "@/lib/auth";
import { Logo } from "@/components/brand/logo";
import { ACCOUNTS_ENABLED } from "@/lib/site";

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Accounts hidden for now — checkout is out of the public flow.
  if (!ACCOUNTS_ENABLED) redirect("/");

  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/checkout");

  return (
    <div className="flex min-h-dvh flex-col bg-tint">
      <header className="border-b border-border bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <Logo />
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <Lock className="h-3.5 w-3.5 text-whatsapp" /> Secure &amp; Encrypted
          </span>
        </div>
      </header>
      <main className="container-page flex-1 py-10">{children}</main>
      <footer className="border-t border-border py-5 text-center text-xs text-muted">
        © 2026 GiftPartner.in ·{" "}
        <Link href="/" className="hover:text-navy">
          Back to site
        </Link>
      </footer>
    </div>
  );
}
