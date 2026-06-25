"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { StatusTimeline } from "@/components/order/status-timeline";

/**
 * Demo order lookup. Wire to GET /api/orders/[orderNumber] once orders are live.
 * For now it surfaces a representative timeline so the screen is fully usable.
 */
export function TrackForm() {
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (orderId.trim()) setResult(orderId.trim().toUpperCase());
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardBody>
          <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
            <Input
              placeholder="Enter your Order ID, e.g. GP125678"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="sm:w-auto">
              <Search className="h-4 w-4" /> Track Order
            </Button>
          </form>
        </CardBody>
      </Card>

      {result ? (
        <Card>
          <CardBody>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">Order</p>
                <p className="font-display text-lg font-semibold text-navy">
                  {result}
                </p>
              </div>
              <span className="rounded-full bg-whatsapp/10 px-3 py-1 text-xs font-medium text-whatsapp">
                In Transit
              </span>
            </div>
            <StatusTimeline
              current="OUT_FOR_DELIVERY"
              timestamps={{
                RECEIVED: "20 May, 10:30 AM",
                SHOPPING: "20 May, 02:15 PM",
                QUALITY_CHECK: "21 May, 09:20 AM",
                PACKED: "21 May, 12:30 PM",
                OUT_FOR_DELIVERY: "21 May, 04:10 PM",
              }}
            />
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}
