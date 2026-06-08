import { render } from "@react-email/render";
import { sendEmail } from "@/libs/resend";
import config from "@/config";
import WelcomeBeta from "@/emails/WelcomeBeta";

// Sends the one-time "Welcome to the beta" email to a new user/lead.
// Triggered on first sign-in (NextAuth createUser event). Best-effort:
// never throws — a failed email must not break the auth flow.
export async function sendWelcomeEmail(email) {
  if (!email) return;

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
      subject: "Welcome to the JustEnvs beta",
      text: [
        "Thanks for downloading JustEnvs. You're now part of a small group helping shape the simplest way teams handle environment variables — secure, in one place, never in a DM.",
        "",
        "We're early, so things move fast. If something breaks, or you can think of a tool you wish JustEnvs talked to, just hit reply. The email goes straight to me.",
        "",
        `Re-download the Mac app: ${config.download.dmgUrl}`,
        `Visit: ${siteUrl}`,
        "",
        "— Fora, building JustEnvs",
      ].join("\n"),
      html,
    });
  } catch (e) {
    console.error("Welcome email failed:", e);
  }
}
