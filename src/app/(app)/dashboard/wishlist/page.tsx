import type { Metadata } from "next";
import { Heart } from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";
import { EmptyState, PageHeader } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return (
    <div>
      <PageHeader
        title="Wishlist"
        subtitle="Save gift ideas and products you'd like to order later."
      />
      <Card>
        <CardBody>
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            body="Browse our gifts and shopping categories, then save items here to come back to."
            action={{ label: "Explore Gifts", href: "/gift-as-a-service" }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
