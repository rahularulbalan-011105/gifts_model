import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardBody } from "@/components/ui/card";
import { EmptyState, PageHeader } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "My Requests" };

const statusStyles: Record<string, string> = {
  NEW: "bg-navy-50 text-navy",
  IN_REVIEW: "bg-gold/15 text-gold-dark",
  QUOTED: "bg-gold/15 text-gold-dark",
  CONVERTED: "bg-whatsapp/10 text-whatsapp",
  CLOSED: "bg-border text-muted",
};

export default async function RequestsPage() {
  const session = await auth();
  const requests = await prisma.shopperRequest.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <PageHeader
        title="My Requests"
        subtitle="Personal-shopper requests you've submitted."
      />

      {requests.length === 0 ? (
        <Card>
          <CardBody>
            <EmptyState
              icon={ClipboardList}
              title="No requests yet"
              body="Tell us what you'd like to gift or shop for and we'll get to work."
              action={{ label: "New Request", href: "/request" }}
            />
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map((r) => (
            <Card key={r.id}>
              <CardBody className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-navy">{r.category}</h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        statusStyles[r.status] ?? "bg-navy-50 text-navy"
                      }`}
                    >
                      {r.status.replaceAll("_", " ")}
                    </span>
                  </div>
                  {r.details ? (
                    <p className="mt-1 text-sm text-muted">{r.details}</p>
                  ) : null}
                </div>
                <span className="whitespace-nowrap text-xs text-muted">
                  {r.createdAt.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
