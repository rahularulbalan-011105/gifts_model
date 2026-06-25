import type { Metadata } from "next";
import { CreditCard, ShieldCheck } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardBody } from "@/components/ui/card";
import { EmptyState, PageHeader } from "@/components/ui/empty-state";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = { title: "Payment Methods" };

const statusStyles: Record<string, string> = {
  CAPTURED: "bg-whatsapp/10 text-whatsapp",
  AUTHORIZED: "bg-gold/15 text-gold-dark",
  PENDING: "bg-navy-50 text-navy",
  FAILED: "bg-danger/10 text-danger",
  REFUNDED: "bg-border text-muted",
};

export default async function PaymentsPage() {
  const session = await auth();
  const payments = await prisma.payment.findMany({
    where: { order: { userId: session!.user.id } },
    orderBy: { createdAt: "desc" },
    include: { order: { select: { orderNumber: true } } },
  });

  return (
    <div>
      <PageHeader
        title="Payment Methods"
        subtitle="Your payment history and how we keep payments safe."
      />

      <Card className="mb-6 border-whatsapp/30 bg-whatsapp/5">
        <CardBody className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-whatsapp" />
          <p className="text-sm text-navy">
            <span className="font-semibold">Your card details are never stored
            on our servers.</span>{" "}
            Payments are processed by a secure, PCI-DSS compliant gateway. We only
            keep a record of the transaction status for your orders.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          {payments.length === 0 ? (
            <EmptyState
              icon={CreditCard}
              title="No payments yet"
              body="When you pay for an order, the transaction will appear here."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
                    <th className="py-2 pr-4 font-medium">Order</th>
                    <th className="py-2 pr-4 font-medium">Method</th>
                    <th className="py-2 pr-4 font-medium">Date</th>
                    <th className="py-2 pr-4 font-medium">Status</th>
                    <th className="py-2 pr-4 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} className="border-b border-border/60">
                      <td className="py-3 pr-4 font-medium text-navy">
                        {p.order.orderNumber}
                      </td>
                      <td className="py-3 pr-4 capitalize text-muted">
                        {p.provider}
                      </td>
                      <td className="py-3 pr-4 text-muted">
                        {p.createdAt.toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            statusStyles[p.status] ?? "bg-navy-50 text-navy"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-right font-semibold text-navy">
                        {formatINR(p.amount)}
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
