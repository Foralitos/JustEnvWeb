import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Feedback from "@/models/Feedback";
import { sendEmail } from "@/libs/resend";
import config from "@/config";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE = 2000;

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req) {
  await connectMongo();

  const body = await req.json();
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message =
    typeof body.message === "string" ? body.message.trim() : "";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Valid email required" },
      { status: 400 }
    );
  }
  if (!message) {
    return NextResponse.json(
      { error: "Message required" },
      { status: 400 }
    );
  }
  if (message.length > MAX_MESSAGE) {
    return NextResponse.json(
      { error: `Message must be ${MAX_MESSAGE} characters or fewer` },
      { status: 400 }
    );
  }

  try {
    await Feedback.create({ email, message });
  } catch (e) {
    console.error("Feedback persist failed:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }

  try {
    const recipient = config.resend.supportEmail;
    if (recipient) {
      const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
      await sendEmail({
        to: recipient,
        replyTo: email,
        subject: `New feedback from ${email}`,
        text: `${message}\n\n— from ${email}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #0E1013;">
            <p style="margin: 0 0 16px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #28C075;">New feedback · justenvs</p>
            <blockquote style="margin: 0 0 20px; padding: 16px 18px; background: #F8F9FA; border-left: 3px solid #38E08A; border-radius: 6px; font-size: 15px; line-height: 1.55;">
              ${safeMessage}
            </blockquote>
            <p style="margin: 0; font-size: 13px; color: #5E6671;">
              From <a href="mailto:${escapeHtml(email)}" style="color: #28C075; text-decoration: none;">${escapeHtml(email)}</a> — reply directly to this email to respond.
            </p>
          </div>
        `,
      });
    }
  } catch (e) {
    console.error("Feedback email notification failed:", e);
  }

  return NextResponse.json({});
}
