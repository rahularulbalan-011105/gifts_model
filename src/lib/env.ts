import { z } from "zod";

/**
 * Validates environment variables at startup so the app fails fast with a
 * clear message instead of misbehaving at runtime. Keep secrets server-only.
 */
const serverSchema = z.object({
  // Optional: the WhatsApp-only deploy runs without a database. Set it once
  // accounts are re-enabled (see ACCOUNTS_ENABLED in lib/site.ts).
  DATABASE_URL: z.string().url().optional(),
  AUTH_SECRET: z.string().min(32, "AUTH_SECRET must be at least 32 chars"),
  AUTH_GOOGLE_ID: z.string().optional(),
  AUTH_GOOGLE_SECRET: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  CONTACT_TO_EMAIL: z.string().email().optional(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const parsed = serverSchema.safeParse(process.env);

if (!parsed.success) {
  // During `next build` without env, surface the issue but don't crash linting.
  console.warn(
    "[env] Invalid or missing environment variables:",
    parsed.error.flatten().fieldErrors,
  );
}

export const env = (parsed.success ? parsed.data : process.env) as z.infer<
  typeof serverSchema
>;
