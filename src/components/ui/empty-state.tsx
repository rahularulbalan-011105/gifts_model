import type { LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export function EmptyState({
  icon: Icon,
  title,
  body,
  action,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream text-gold">
        <Icon className="h-8 w-8" />
      </span>
      <h3 className="font-display text-lg font-semibold text-navy">{title}</h3>
      <p className="max-w-sm text-sm text-muted">{body}</p>
      {action ? (
        <ButtonLink href={action.href} size="sm" className="mt-1">
          {action.label}
        </ButtonLink>
      ) : null}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-2xl font-semibold text-navy">{title}</h1>
      {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
    </div>
  );
}
