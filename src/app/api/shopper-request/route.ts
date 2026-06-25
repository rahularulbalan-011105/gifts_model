import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { shopperRequestSchema } from "@/lib/validations";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { resend, EMAIL_FROM, CONTACT_TO_EMAIL } from "@/lib/email";

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limited = rateLimit(`shopper:${ip}`, { limit: 8, windowMs: 60_000 });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = shopperRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { name, email, phone, category, details } = parsed.data;

  // Email the lead so it reaches you immediately — works with or without a DB.
  if (resend) {
    try {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: CONTACT_TO_EMAIL,
        replyTo: email,
        subject: `New personal-shopper request from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `WhatsApp: ${phone}`,
          `Category: ${category}`,
          "",
          "Details:",
          details || "—",
        ].join("\n"),
      });
    } catch (err) {
      console.error("[shopper-request] email failed:", err);
    }
  } else {
    console.warn("[shopper-request] RESEND_API_KEY not set — lead:", {
      name,
      email,
      phone,
      category,
    });
  }

  // Best-effort: also persist to the DB when one is configured. If there's no
  // database (e.g. the WhatsApp-only deploy), this is skipped silently — the
  // email above is the source of truth.
  if (process.env.DATABASE_URL) {
    try {
      await prisma.shopperRequest.create({
        data: { name, email, phone, category, details: details || "" },
      });
    } catch (err) {
      console.error("[shopper-request] DB write skipped/failed:", err);
    }
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
