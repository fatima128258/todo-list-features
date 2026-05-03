import nodemailer from "nodemailer";

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** @returns {{ transporter: import('nodemailer').Transporter, from: string } | null} */
export function getMailTransport() {
  const host = process.env.SMTP_HOST;
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (host) {
    const port = Number(process.env.SMTP_PORT) || 587;
    const secure = String(process.env.SMTP_SECURE || "").toLowerCase() === "true";
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    return {
      transporter: nodemailer.createTransport({
        host,
        port,
        secure,
        auth: user && pass ? { user, pass } : undefined,
      }),
      from: process.env.SMTP_FROM || user || "noreply@localhost",
    };
  }
  if (gmailUser && gmailPass) {
    return {
      transporter: nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPass },
      }),
      from: process.env.SMTP_FROM || gmailUser,
    };
  }
  return null;
}

/**
 * Sends a welcome message after signup.
 * @param {{ to: string, name: string }} params
 */
export async function sendWelcomeEmail({ to, name }) {
  const ctx = getMailTransport();
  if (!ctx) {
    console.warn(
      "[email] Welcome email skipped: set SMTP_* or GMAIL_USER + GMAIL_APP_PASSWORD in server/.env"
    );
    return;
  }
  const displayName = name && name.trim() ? name.trim() : "there";
  const safe = escapeHtml(displayName);

  await ctx.transporter.sendMail({
    from: `"Task Manager" <${ctx.from}>`,
    to,
    subject: "Welcome — your account was created successfully",
    text: `Hi ${displayName},

Welcome! Your account was created successfully. You can sign in anytime with this email address.

— Task Manager`,
    html: `<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #0f172a;">
  <p>Hi ${safe},</p>
  <p><strong>Welcome!</strong> Your account was created successfully. You can sign in anytime with this email address.</p>
  <p style="color: #64748b; font-size: 14px;">— Task Manager</p>
</body>
</html>`,
  });
}

/**
 * Sends About-page contact form to the site owner (Nodemailer).
 * Inbox: CONTACT_TO_EMAIL, or falls back to GMAIL_USER.
 */
export async function sendContactNotification({ senderName, senderEmail, message }) {
  const ctx = getMailTransport();
  if (!ctx) {
    const err = new Error("Email not configured");
    err.code = "MAIL_NOT_CONFIGURED";
    throw err;
  }
  const to = process.env.CONTACT_TO_EMAIL || process.env.GMAIL_USER;
  if (!to) {
    const err = new Error("Set CONTACT_TO_EMAIL or GMAIL_USER for contact destination");
    err.code = "MAIL_NOT_CONFIGURED";
    throw err;
  }
  const n = escapeHtml(senderName);
  const e = escapeHtml(senderEmail);
  const m = escapeHtml(message).replace(/\n/g, "<br>");

  await ctx.transporter.sendMail({
    from: `"Task Manager" <${ctx.from}>`,
    to,
    replyTo: senderEmail,
    subject: `[Task Manager] Message from ${senderName}`,
    text: `Name: ${senderName}\nEmail: ${senderEmail}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${n}</p><p><strong>Email:</strong> ${e}</p><p><strong>Message:</strong></p><p>${m}</p>`,
  });
}
