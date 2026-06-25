import Link from "next/link";
import { Logo } from "@/components/brand/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <header className="container-page flex h-16 items-center justify-between">
        <Logo />
        <Link href="/" className="text-sm font-medium text-navy hover:underline">
          ← Back to site
        </Link>
      </header>
      <main className="container-page flex flex-1 items-center justify-center py-10">
        {children}
      </main>
    </div>
  );
}
