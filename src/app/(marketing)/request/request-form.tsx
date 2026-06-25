"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { Input, Textarea, Select, Label, FieldError } from "@/components/ui/input";
import { WhatsAppButton } from "@/components/brand/whatsapp-button";
import { shopperRequestSchema, type ShopperRequestInput } from "@/lib/validations";

const CATEGORIES = [
  "Gift / Occasion",
  "Clothing & Sarees",
  "Jewellery",
  "Pooja Items",
  "Home & Decor",
  "Other",
];

export function RequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShopperRequestInput>({
    resolver: zodResolver(shopperRequestSchema),
    defaultValues: { category: "" },
  });

  async function onSubmit(values: ShopperRequestInput) {
    setServerError(null);
    const res = await fetch("/api/shopper-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      setSubmitted(true);
    } else {
      const data = await res.json().catch(() => ({}));
      setServerError(data.error ?? "Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-cream p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-whatsapp" />
        <h3 className="mt-4 font-display text-xl font-semibold text-navy">
          Request received!
        </h3>
        <p className="mt-2 text-sm text-muted">
          Our team will reach out shortly. For a faster response, message us on
          WhatsApp.
        </p>
        <div className="mt-5 flex justify-center">
          <WhatsAppButton />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Your Name</Label>
        <Input id="name" placeholder="Your full name" {...register("name")} />
        <FieldError>{errors.name?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
        <FieldError>{errors.email?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor="phone">WhatsApp Number</Label>
        <Input id="phone" placeholder="+1 555 123 4567" {...register("phone")} />
        <FieldError>{errors.phone?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor="category">What do you need?</Label>
        <Select id="category" {...register("category")}>
          <option value="">Select Category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
        <FieldError>{errors.category?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor="details">Additional Details / Notes</Label>
        <Textarea
          id="details"
          placeholder="e.g. I need a Kanjivaram saree for a wedding"
          {...register("details")}
        />
        <FieldError>{errors.details?.message}</FieldError>
      </div>

      {serverError ? (
        <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-full bg-whatsapp font-medium text-white transition-colors hover:bg-whatsapp-dark disabled:opacity-60"
      >
        {isSubmitting ? "Submitting…" : "Submit on WhatsApp"}
      </button>
    </form>
  );
}
