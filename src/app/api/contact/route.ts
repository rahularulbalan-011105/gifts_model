import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { resend, EMAIL_FROM, CONTACT_TO_EMAIL } from "@/lib/email";

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limited = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many messages. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { name, email, phone, message } = parsed.data;

  // If email isn't configured yet, don't lose the message — log it and accept,
  // so local dev works before RESEND_API_KEY is set.
  if (!resend) {
    console.warn(
      "[contact] RESEND_API_KEY not set — message NOT emailed:",
      { name, email, phone },
    );
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  try {
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: CONTACT_TO_EMAIL,
      replyTo: email, // hitting "Reply" in your inbox replies to the visitor
      subject: `New contact message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `WhatsApp: ${phone || "—"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Could not send your message. Please WhatsApp us instead." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please WhatsApp us instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
