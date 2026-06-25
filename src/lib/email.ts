import { Resend } from "resend";

/**
 * Email delivery via Resend.
 *
 * - `RESEND_API_KEY` is required to actually send. If it's missing (e.g. local
 *   dev before you've set it up), `resend` is null and callers fall back to
 *   logging so the app keeps working.
 * - `EMAIL_FROM` must be either Resend's onboarding sender (`onboarding@resend.dev`,
 *   which can only deliver to the address you signed up with) or an address on a
 *   domain you've verified in the Resend dashboard.
 * - `CONTACT_TO_EMAIL` is where contact-form messages are delivered.
 */
const apiKey = process.env.RESEND_API_KEY;

export const resend = apiKey ? new Resend(apiKey) : null;

export const EMAIL_FROM =
  process.env.EMAIL_FROM ?? "GiftPartner <onboarding@resend.dev>";

export const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL ?? "vanajaarulbalan@gmail.com";

export const emailConfigured = Boolean(resend);
