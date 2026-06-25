import type { Metadata } from "next";
import { PricingTable } from "./pricing-table";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return <PricingTable />;
}
