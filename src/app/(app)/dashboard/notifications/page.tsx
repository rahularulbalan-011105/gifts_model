import type { Metadata } from "next";
import { Bell } from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";
import { EmptyState, PageHeader } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Notifications" };

export default function NotificationsPage() {
  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle="Order updates and messages from your personal shopper."
      />
      <Card>
        <CardBody>
          <EmptyState
            icon={Bell}
            title="You're all caught up"
            body="Notifications about your orders and requests will show up here."
          />
        </CardBody>
      </Card>
    </div>
  );
}
