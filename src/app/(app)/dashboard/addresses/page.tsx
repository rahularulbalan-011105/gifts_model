import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardBody } from "@/components/ui/card";
import { EmptyState, PageHeader } from "@/components/ui/empty-state";
import { AddressItem, AddAddressForm } from "./address-manager";

export const metadata: Metadata = { title: "Address Book" };

export default async function AddressesPage() {
  const session = await auth();
  const addresses = await prisma.address.findMany({
    where: { userId: session!.user.id },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <PageHeader
        title="Address Book"
        subtitle="Saved delivery addresses for your orders."
      />

      {addresses.length === 0 ? (
        <Card className="mb-6">
          <CardBody>
            <EmptyState
              icon={MapPin}
              title="No addresses saved"
              body="Add a delivery address so checkout is faster next time."
            />
          </CardBody>
        </Card>
      ) : (
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          {addresses.map((a) => (
            <AddressItem key={a.id} address={a} />
          ))}
        </div>
      )}

      <AddAddressForm />
    </div>
  );
}
