import type { Metadata } from "next";
import { Package } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardBody } from "@/components/ui/card";
import { EmptyState, PageHeader } from "@/components/ui/empty-state";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = { title: "My Orders" };

const statusStyles: Record<string, string> = {
  DELIVERED: "bg-whatsapp/10 text-whatsapp",
  OUT_FOR_DELIVERY: "bg-gold/15 text-gold-dark",
  CANCELLED: "bg-danger/10 text-danger",
};

export default async function OrdersPage() {
  const session = await auth();
  const orders = await prisma.order.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <PageHeader
        title="My Orders"
        subtitle="All your gift and shopping orders in one place."
      />

      <Card>
        <CardBody>
          {orders.length === 0 ? (
            <EmptyState
              icon={Package}
              title="No orders yet"
              body="Once you place a request and approve your items, your orders will appear here."
              action={{ label: "Request a Shopper", href: "/request" }}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
                    <th className="py-2 pr-4 font-medium">Order</th>
                    <th className="py-2 pr-4 font-medium">Items</th>
                    <th className="py-2 pr-4 font-medium">Date</th>
                    <th className="py-2 pr-4 font-medium">Status</th>
                    <th className="py-2 pr-4 text-right font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-border/60">
                      <td className="py-3 pr-4 font-medium text-navy">
                        {o.orderNumber}
                      </td>
                      <td className="py-3 pr-4 text-muted">
                        {o.items.length} item{o.items.length === 1 ? "" : "s"}
                      </td>
                      <td className="py-3 pr-4 text-muted">
                        {o.createdAt.toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            statusStyles[o.status] ?? "bg-navy-50 text-navy"
                          }`}
                        >
                          {o.status.replaceAll("_", " ")}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-right font-semibold text-navy">
                        {formatINR(o.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
