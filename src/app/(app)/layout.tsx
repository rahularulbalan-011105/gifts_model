import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ACCOUNTS_ENABLED } from "@/lib/site";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Accounts hidden for now — the dashboard is out of the public flow.
  if (!ACCOUNTS_ENABLED) redirect("/");

  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  return (
    <DashboardShell
      user={{
        name: session.user.name ?? "there",
        email: session.user.email ?? "",
      }}
    >
      {children}
    </DashboardShell>
  );
}
