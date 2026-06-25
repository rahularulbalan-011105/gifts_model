"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { Input, Textarea, Label, FieldError } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactInput } from "@/lib/validations";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactInput) {
    setServerError(null);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) setSubmitted(true);
    else {
      const data = await res.json().catch(() => ({}));
      setServerError(data.error ?? "Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="py-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-whatsapp" />
        <h3 className="mt-4 font-display text-xl font-semibold text-navy">
          Message sent!
        </h3>
        <p className="mt-2 text-sm text-muted">
          Thanks for reaching out — we&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Honeypot — hidden from real users, bots tend to fill it. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("company")}
      />
      <div>
        <Label htmlFor="c-name">Your Name</Label>
        <Input id="c-name" {...register("name")} />
        <FieldError>{errors.name?.message}</FieldError>
      </div>
      <div>
        <Label htmlFor="c-email">Email Address</Label>
        <Input id="c-email" type="email" {...register("email")} />
        <FieldError>{errors.email?.message}</FieldError>
      </div>
      <div>
        <Label htmlFor="c-phone">WhatsApp Number</Label>
        <Input id="c-phone" {...register("phone")} />
        <FieldError>{errors.phone?.message}</FieldError>
      </div>
      <div>
        <Label htmlFor="c-msg">Your Message</Label>
        <Textarea id="c-msg" placeholder="How can we help you?" {...register("message")} />
        <FieldError>{errors.message?.message}</FieldError>
      </div>

      {serverError ? (
        <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">
          {serverError}
        </p>
      ) : null}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
