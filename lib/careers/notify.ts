import { Resend } from "resend";
import { escapeHtml } from "@/lib/order/sanitize";

export type NotifyApplicationInput = {
  reference: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
};

export async function sendApplicationEmail(input: NotifyApplicationInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;
  const fromEmail = process.env.ORDER_FROM_EMAIL;

  if (!apiKey || !ownerEmail || !fromEmail) {
    console.warn("Resend env vars not configured — skipping application email");
    return { sent: false };
  }

  const resend = new Resend(apiKey);

  const html = `
    <h2>New job application #${escapeHtml(input.reference)}</h2>
    <p><strong>Role:</strong> ${escapeHtml(input.role)}</p>
    <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(input.phone)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(input.message).replace(/\n/g, "<br>")}</p>
  `;

  await resend.emails.send({
    from: fromEmail,
    to: ownerEmail,
    replyTo: input.email,
    subject: `New application #${input.reference} — ${input.role}`,
    html,
  });

  return { sent: true };
}
