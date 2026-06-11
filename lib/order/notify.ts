import { Resend } from "resend";
import { escapeHtml } from "@/lib/order/sanitize";
import type { Branch } from "@/lib/data/branches";

export type NotifyOrderInput = {
  reference: string;
  name: string;
  phone: string;
  note: string;
  branch: Branch;
  items: { name: string; price: number; qty: number }[];
  subtotal: number;
};

function buildOrderLines(items: NotifyOrderInput["items"]) {
  return items
    .map((item) => `${item.qty}x ${item.name} - $${(item.price * item.qty).toFixed(2)}`)
    .join("\n");
}

export async function sendWhatsAppNotification(input: NotifyOrderInput) {
  const ownerPhone = process.env.OWNER_WHATSAPP_NUMBER;
  if (!ownerPhone) {
    console.warn("OWNER_WHATSAPP_NUMBER not configured — skipping WhatsApp notification");
    return { sent: false };
  }

  const message = [
    `New pickup order #${input.reference}`,
    `Branch: ${input.branch.city} (${input.branch.address})`,
    "",
    buildOrderLines(input.items),
    "",
    `Subtotal (est.): $${input.subtotal.toFixed(2)}`,
    "",
    `Customer: ${input.name}`,
    `Phone: ${input.phone}`,
    input.note ? `Note: ${input.note}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const url = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(message)}`;

  // Server-side log of the notification link. In production, replace with a
  // call to the WhatsApp Business API to send this message directly.
  console.log("WhatsApp notification link:", url);

  return { sent: true, url };
}

export async function sendEmailNotification(input: NotifyOrderInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;
  const fromEmail = process.env.ORDER_FROM_EMAIL;

  if (!apiKey || !ownerEmail || !fromEmail) {
    console.warn("Resend env vars not configured — skipping email notification");
    return { sent: false };
  }

  const resend = new Resend(apiKey);

  const itemsHtml = input.items
    .map(
      (item) =>
        `<tr><td>${item.qty}x ${escapeHtml(item.name)}</td><td>$${(item.price * item.qty).toFixed(2)}</td></tr>`,
    )
    .join("");

  const html = `
    <h2>New pickup order #${escapeHtml(input.reference)}</h2>
    <p><strong>Branch:</strong> ${escapeHtml(input.branch.city)} (${escapeHtml(input.branch.address)})</p>
    <table>${itemsHtml}</table>
    <p><strong>Subtotal (est.):</strong> $${input.subtotal.toFixed(2)}</p>
    <p><strong>Customer:</strong> ${escapeHtml(input.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(input.phone)}</p>
    ${input.note ? `<p><strong>Note:</strong> ${escapeHtml(input.note)}</p>` : ""}
  `;

  await resend.emails.send({
    from: fromEmail,
    to: ownerEmail,
    subject: `New pickup order #${input.reference} — ${input.branch.city}`,
    html,
  });

  return { sent: true };
}
