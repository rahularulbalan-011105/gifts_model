/** Central site configuration: nav, contact details, WhatsApp deep link. */

/**
 * Master switch for the account system (login/signup, dashboard, checkout).
 * Set to `false` to run the site WhatsApp-only: the Login link is hidden and
 * /login, /dashboard, /checkout all redirect home. Flip to `true` to bring the
 * whole account flow back — none of the code or database is removed.
 */
export const ACCOUNTS_ENABLED = false;

export const WHATSAPP_NUMBER = "919884834205"; // international format, no +
export const WHATSAPP_DEFAULT_MSG =
  "Hi GiftPartner, I'd like to send a gift / shop from Chennai.";

export function whatsappLink(message: string = WHATSAPP_DEFAULT_MSG) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const PRIMARY_NAV = [
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const CONTACT = {
  whatsapp: "+91 98848 34205",
  email: "vanajaarulbalan@gmail.com",
  phone: "+91 98848 34205",
  office: "Chennai, Tamil Nadu, India",
  hours: ["Mon – Sat: 9 AM – 8 PM IST", "Sun: 10 AM – 6 PM IST"],
};
