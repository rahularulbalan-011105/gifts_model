import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/ui/empty-state";
import { SettingsForm } from "./settings-form";

export const metadata: Metadata = { title: "Account Settings" };

export default async function SettingsPage() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
    select: { name: true, email: true, phone: true, createdAt: true },
  });

  return (
    <div>
      <PageHeader
        title="Account Settings"
        subtitle="Manage your profile and contact details."
      />
      <SettingsForm
        initial={{
          name: user?.name ?? "",
          email: user?.email ?? "",
          phone: user?.phone ?? "",
        }}
      />
    </div>
  );
}
