import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { sanitizeText } from "@/lib/order/sanitize";
import { isRateLimited } from "@/lib/order/rateLimit";
import { sendApplicationEmail } from "@/lib/careers/notify";

const MIN_SUBMIT_MS = 2000;

const applicationSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(150),
  phone: z.string().refine((value) => isValidPhoneNumber(value), {
    message: "Invalid phone number",
  }),
  role: z.string().trim().min(1).max(100),
  message: z.string().trim().max(1000).optional().default(""),
  // Honeypot — must be empty.
  company: z.string().max(0).optional().default(""),
  // Time-trap — ms since the form mounted.
  elapsedMs: z.number().nonnegative(),
});

function getAllowedOrigins(): string[] {
  const origins = [process.env.NEXT_PUBLIC_SITE_URL, "http://localhost:3000"].filter(
    (v): v is string => Boolean(v),
  );
  return origins;
}

function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin") ?? req.headers.get("referer");
  if (!origin) return false;

  const allowed = getAllowedOrigins();
  return allowed.some((allowedOrigin) => origin.startsWith(allowedOrigin));
}

function generateReference(): string {
  return `CT-APP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ ok: false, error: "Invalid origin" }, { status: 403 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = applicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid application data" }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot tripped.
  if (data.company) {
    return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 400 });
  }

  // Submitted faster than a human plausibly could.
  if (data.elapsedMs < MIN_SUBMIT_MS) {
    return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 400 });
  }

  const reference = generateReference();

  await sendApplicationEmail({
    reference,
    name: sanitizeText(data.name, 100),
    email: data.email,
    phone: data.phone,
    role: sanitizeText(data.role, 100),
    message: sanitizeText(data.message ?? "", 1000),
  });

  return NextResponse.json({ ok: true, reference });
}
