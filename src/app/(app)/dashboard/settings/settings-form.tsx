"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError } from "@/components/ui/input";
import { profileSchema, type ProfileInput } from "@/lib/validations";

export function SettingsForm({
  initial,
}: {
  initial: { name: string; email: string; phone: string };
}) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: initial.name, phone: initial.phone },
  });

  async function onSubmit(values: ProfileInput) {
    setServerError(null);
    setSaved(false);
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      setSaved(true);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setServerError(data.error ?? "Could not save changes.");
    }
  }

  return (
    <Card className="max-w-xl">
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="p-name">Full Name</Label>
            <Input id="p-name" {...register("name")} />
            <FieldError>{errors.name?.message}</FieldError>
          </div>

          <div>
            <Label htmlFor="p-email">Email Address</Label>
            <Input id="p-email" value={initial.email} disabled readOnly />
            <p className="mt-1 text-xs text-muted">
              Email can&apos;t be changed here. Contact support to update it.
            </p>
          </div>

          <div>
            <Label htmlFor="p-phone">WhatsApp Number</Label>
            <Input id="p-phone" placeholder="+1 555 123 4567" {...register("phone")} />
            <FieldError>{errors.phone?.message}</FieldError>
          </div>

          {serverError ? (
            <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">
              {serverError}
            </p>
          ) : null}

          {saved ? (
            <p className="flex items-center gap-2 rounded-lg bg-whatsapp/10 px-3 py-2 text-sm text-whatsapp">
              <CheckCircle2 className="h-4 w-4" /> Changes saved.
            </p>
          ) : null}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : "Save Changes"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
