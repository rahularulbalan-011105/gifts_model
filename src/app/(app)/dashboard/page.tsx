import type { Metadata } from "next";
import Link from "next/link";
import { Gift, ShoppingBag, Search, Headset, Package } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardBody } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

const statusStyles: Record<string, string> = {
  DELIVERED: "bg-whatsapp/10 text-whatsapp",
  OUT_FOR_DELIVERY: "bg-gold/15 text-gold-dark",
  CANCELLED: "bg-danger/10 text-danger",
};

const quickActions = [
  { label: "New Gift Request", href: "/request", icon: Gift },
  { label: "Shopping Request", href: "/shopping-as-a-service", icon: ShoppingBag },
  { label: "Track Order", href: "/track", icon: Search },
  { label: "Support", href: "/contact", icon: Headset },
];

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user.id;

  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const [total, pending, delivered] = await Promise.all([
    prisma.order.count({ where: { userId } }),
    prisma.order.count({
      where: { userId, status: { notIn: ["DELIVERED", "CANCELLED"] } },
    }),
    prisma.order.count({ where: { userId, status: "DELIVERED" } }),
  ]);

  const firstName = (session!.user.name ?? "there").split(" ")[0];

  return (
    <div className="space-y-6">
      <Card>
        <CardBody>
          <p className="text-sm text-muted">Welcome back,</p>
          <h1 className="font-display text-2xl font-semibold text-navy">
            {firstName} 👋
          </h1>
          <div className="mt-6 grid grid-cols-3 divide-x divide-border text-center">
            <div>
              <p className="font-display text-3xl font-semibold text-navy">
                {total}
              </p>
              <p className="text-xs text-muted">Total Orders</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-gold">
                {pending}
              </p>
              <p className="text-xs text-muted">Pending Orders</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-whatsapp">
                {delivered}
              </p>
              <p className="text-xs text-muted">Delivered Orders</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-navy">
              Recent Orders
            </h2>
            <Link href="/dashboard/orders" className="text-sm text-navy hover:underline">
              View All
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-gold">
                <Package className="h-7 w-7" />
              </span>
              <p className="text-sm text-muted">
                No orders yet. Start by requesting a personal shopper.
              </p>
              <ButtonLink href="/request" size="sm">
                New Request
              </ButtonLink>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
                    <th className="py-2 pr-4 font-medium">Order</th>
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

      <div>
        <h2 className="mb-4 font-display text-lg font-semibold text-navy">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {quickActions.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 text-navy">
                <a.icon className="h-6 w-6 text-gold" />
              </span>
              <span className="text-sm font-medium text-navy">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
