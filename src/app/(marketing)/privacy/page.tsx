import type { Metadata } from "next";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-semibold text-navy">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-muted">Last updated: May 2026</p>
        <div className="prose mt-8 space-y-4 text-sm leading-relaxed text-foreground/80">
          <p>
            GiftPartner.in (&ldquo;we&rdquo;) respects your privacy. This page
            summarises what we collect and how we protect it. Replace this
            placeholder with your finalised policy reviewed by legal counsel
            before launch.
          </p>
          <h2 className="font-display text-lg font-semibold text-navy">
            Information we collect
          </h2>
          <p>
            Account details (name, email, phone), delivery addresses, order
            history, and payment status. We do not store full card numbers —
            payments are processed by a PCI-DSS compliant gateway.
          </p>
          <h2 className="font-display text-lg font-semibold text-navy">
            How we protect it
          </h2>
          <p>
            Passwords are hashed with bcrypt, data is transmitted over HTTPS,
            and access to personal data is restricted. You may request deletion
            of your account at any time by contacting us.
          </p>
        </div>
      </div>
    </Section>
  );
}
