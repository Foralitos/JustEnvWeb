import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import connectMongo from "@/libs/mongoose";
import Lead from "@/models/Lead";
import { sendEmail } from "@/libs/resend";
import config from "@/config";
import WelcomeBeta from "@/emails/WelcomeBeta";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// This route stores leads captured from the landing page download modal.
// New leads also get a one-time welcome email; repeat downloaders skip it.
export async function POST(req) {
  await connectMongo();

  const body = await req.json();
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Valid email required" },
      { status: 400 }
    );
  }

  try {
    const existing = await Lead.findOne({ email });
    if (!existing) {
      await Lead.create({ email });

      try {
        const siteUrl = `https://${config.domainName}`;
        const html = await render(
          <WelcomeBeta
            heroUrl={`${siteUrl}/email/welcome-hero.png`}
            dmgUrl={config.download.dmgUrl}
            siteUrl={siteUrl}
          />
        );
        await sendEmail({
          to: email,
          subject: "Welcome to the JustEnv beta",
          text: [
            "Thanks for downloading JustEnv. You're now part of a small group helping shape the simplest way teams handle environment variables — secure, in one place, never in a DM.",
            "",
            "We're early, so things move fast. If something breaks, or you can think of a tool you wish JustEnv talked to, just hit reply. The email goes straight to me.",
            "",
            `Re-download the Mac app: ${config.download.dmgUrl}`,
            `Visit: ${siteUrl}`,
            "",
            "— Fora, building JustEnv",
          ].join("\n"),
          html,
        });
      } catch (e) {
        console.error("Welcome email failed:", e);
      }
    }
    return NextResponse.json({});
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
