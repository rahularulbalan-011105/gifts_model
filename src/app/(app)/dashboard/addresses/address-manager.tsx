"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Plus, Trash2, X } from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError } from "@/components/ui/input";
import { addressSchema, type AddressInput } from "@/lib/validations";

type Address = {
  id: string;
  isDefault: boolean;
  label: string | null;
  fullName: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string | null;
  country: string;
  postalCode: string | null;
  phone: string | null;
};

export function AddressItem({ address }: { address: Address }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function remove() {
    setDeleting(true);
    await fetch(`/api/addresses?id=${address.id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <Card>
      <CardBody className="relative">
        {address.isDefault ? (
          <span className="absolute right-4 top-4 rounded-full bg-whatsapp/10 px-2 py-0.5 text-xs font-medium text-whatsapp">
            Default
          </span>
        ) : null}
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gold" />
          <p className="font-semibold text-navy">{address.label || "Address"}</p>
        </div>
        <p className="mt-2 text-sm font-medium text-navy">{address.fullName}</p>
        <p className="text-sm text-muted">
          {address.line1}
          {address.line2 ? `, ${address.line2}` : ""}
          <br />
          {[address.city, address.state, address.postalCode]
            .filter(Boolean)
            .join(", ")}
          <br />
          {address.country}
        </p>
        {address.phone ? (
          <p className="mt-1 text-sm text-muted">Phone: {address.phone}</p>
        ) : null}
        <button
          onClick={remove}
          disabled={deleting}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-danger hover:underline disabled:opacity-60"
        >
          <Trash2 className="h-3.5 w-3.5" /> {deleting ? "Removing…" : "Remove"}
        </button>
      </CardBody>
    </Card>
  );
}

export function AddAddressForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressInput>({ resolver: zodResolver(addressSchema) });

  async function onSubmit(values: AddressInput) {
    setServerError(null);
    const res = await fetch("/api/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      reset();
      setOpen(false);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setServerError(data.error ?? "Could not save address.");
    }
  }

  if (!open) {
    return (
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" /> Add New Address
      </Button>
    );
  }

  return (
    <Card>
      <CardBody>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-navy">
            Add Address
          </h3>
          <button onClick={() => setOpen(false)} aria-label="Close">
            <X className="h-5 w-5 text-muted" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="a-label">Label (optional)</Label>
            <Input id="a-label" placeholder="Home, Parents…" {...register("label")} />
          </div>
          <div>
            <Label htmlFor="a-name">Recipient Name</Label>
            <Input id="a-name" {...register("fullName")} />
            <FieldError>{errors.fullName?.message}</FieldError>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="a-line1">Address Line 1</Label>
            <Input id="a-line1" {...register("line1")} />
            <FieldError>{errors.line1?.message}</FieldError>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="a-line2">Address Line 2 (optional)</Label>
            <Input id="a-line2" {...register("line2")} />
          </div>
          <div>
            <Label htmlFor="a-city">City</Label>
            <Input id="a-city" {...register("city")} />
            <FieldError>{errors.city?.message}</FieldError>
          </div>
          <div>
            <Label htmlFor="a-state">State (optional)</Label>
            <Input id="a-state" {...register("state")} />
          </div>
          <div>
            <Label htmlFor="a-country">Country</Label>
            <Input id="a-country" {...register("country")} />
            <FieldError>{errors.country?.message}</FieldError>
          </div>
          <div>
            <Label htmlFor="a-postal">Postal Code (optional)</Label>
            <Input id="a-postal" {...register("postalCode")} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="a-phone">Phone (optional)</Label>
            <Input id="a-phone" {...register("phone")} />
          </div>

          {serverError ? (
            <p className="sm:col-span-2 rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">
              {serverError}
            </p>
          ) : null}

          <div className="sm:col-span-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving…" : "Save Address"}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

