import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AuthForms } from "@/components/auth/auth-forms";
import { ACCOUNTS_ENABLED } from "@/lib/site";

export const metadata: Metadata = { title: "Login or Sign Up" };

export default function LoginPage() {
  // Accounts are hidden for now — send anyone hitting /login back home.
  if (!ACCOUNTS_ENABLED) redirect("/");

  return (
    <div className="w-full max-w-4xl">
      <Suspense>
        <AuthForms />
      </Suspense>
    </div>
  );
}
