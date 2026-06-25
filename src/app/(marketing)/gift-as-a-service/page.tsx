import type { Metadata } from "next";
import { GiftGallery } from "./gift-gallery";

export const metadata: Metadata = { title: "Gift as a Service" };

export default function GiftAsAServicePage() {
  return <GiftGallery />;
}
