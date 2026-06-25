import type { Metadata } from "next";
import { MessageCircle, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { CONTACT, whatsappLink } from "@/lib/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <Section className="bg-cream">
      <SectionHeading
        eyebrow="Contact Us"
        title="Contact Us"
        subtitle="We are here to help!"
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          {[
            {
              icon: MessageCircle,
              label: "Chat on WhatsApp",
              value: CONTACT.whatsapp,
              href: whatsappLink(),
            },
            {
              icon: Mail,
              label: "Email Us",
              value: CONTACT.email,
              href: `mailto:${CONTACT.email}`,
            },
            {
              icon: Phone,
              label: "Call Us",
              value: CONTACT.phone,
              href: `tel:${CONTACT.phone.replace(/\s/g, "")}`,
            },
            {
              icon: MapPin,
              label: "Office",
              value: CONTACT.office,
            },
          ].map((c) => (
            <div
              key={c.label}
              className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5 text-navy">
                <c.icon className="h-5 w-5 text-gold" />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy">{c.label}</p>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:text-navy"
                  >
                    {c.value}
                  </a>
                ) : (
                  <p className="text-sm text-muted">{c.value}</p>
                )}
              </div>
            </div>
          ))}

          <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5">
              <Clock className="h-5 w-5 text-gold" />
            </span>
            <div>
              <p className="text-sm font-semibold text-navy">Working Hours</p>
              {CONTACT.hours.map((h) => (
                <p key={h} className="text-sm text-muted">
                  {h}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[20px] bg-white p-8 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
