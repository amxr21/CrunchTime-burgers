import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { branches } from "@/lib/data/branches";
import { menuSections } from "@/lib/data/menu";
import { sanitizeText } from "@/lib/order/sanitize";
import { isRateLimited } from "@/lib/order/rateLimit";
import { sendEmailNotification, sendWhatsAppNotification } from "@/lib/order/notify";

const MAX_ITEM_QTY = 20;
const MIN_SUBMIT_MS = 2000;

const allItemIds = new Set(menuSections.flatMap((section) => section.items.map((item) => item.id)));
const branchById = new Map(branches.map((branch) => [branch.id, branch]));

const orderSchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().refine((value) => isValidPhoneNumber(value), {
    message: "Invalid phone number",
  }),
  note: z.string().max(200).optional().default(""),
  branchId: z.string().refine((id) => branchById.has(id), { message: "Unknown branch" }),
  items: z
    .array(
      z.object({
        id: z.string().refine((id) => allItemIds.has(id), { message: "Unknown item" }),
        qty: z.number().int().positive().max(MAX_ITEM_QTY),
      }),
    )
    .min(1),
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
  return `CT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
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

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid order data" }, { status: 400 });
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

  // TODO: verify a Cloudflare Turnstile / hCaptcha token here for production.

  const branch = branchById.get(data.branchId)!;

  const itemsWithDetails = data.items.map((cartItem) => {
    const menuItem = menuSections
      .flatMap((section) => section.items)
      .find((item) => item.id === cartItem.id)!;

    return { name: menuItem.name, price: menuItem.priceValue, qty: cartItem.qty };
  });

  const subtotal = itemsWithDetails.reduce((sum, item) => sum + item.price * item.qty, 0);

  const sanitizedName = sanitizeText(data.name, 100);
  const sanitizedNote = sanitizeText(data.note ?? "", 200);

  const reference = generateReference();

  const notifyInput = {
    reference,
    name: sanitizedName,
    phone: data.phone,
    note: sanitizedNote,
    branch,
    items: itemsWithDetails,
    subtotal,
  };

  await Promise.all([sendWhatsAppNotification(notifyInput), sendEmailNotification(notifyInput)]);

  return NextResponse.json({ ok: true, reference });
}
