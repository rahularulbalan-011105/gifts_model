import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { ACCOUNTS_ENABLED } from "@/lib/site";

export async function POST(req: Request) {
  // Accounts are disabled — this endpoint is closed.
  if (!ACCOUNTS_ENABLED) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const ip = clientIp(req);
  const limited = rateLimit(`register:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { name, email, phone, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // Avoid leaking which emails exist beyond what signup inevitably reveals.
    return NextResponse.json(
      { error: "An account with this email already exists." },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, phone: phone || null, passwordHash },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
