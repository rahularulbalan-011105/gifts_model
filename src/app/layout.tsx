import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://giftpartner.in"),
  title: {
    default: "GiftPartner.in — Send Gifts & Shop from Chennai",
    template: "%s · GiftPartner.in",
  },
  description:
    "We help NRIs send thoughtful gifts and shop authentic products from Chennai with complete trust and care.",
  keywords: [
    "send gifts to Chennai",
    "NRI gifting",
    "personal shopper Chennai",
    "shop from Chennai",
  ],
  openGraph: {
    type: "website",
    title: "GiftPartner.in — Send Gifts & Shop from Chennai",
    description:
      "Thoughtful gifting and personal shopping from Chennai, delivered with care.",
    siteName: "GiftPartner.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-dvh flex-col bg-white antialiased">
        {children}
      </body>
    </html>
  );
}
