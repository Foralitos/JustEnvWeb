import { render } from "@react-email/render";
import { sendEmail } from "@/libs/resend";
import config from "@/config";
import MagicLink from "@/emails/MagicLink";

// Sends the branded magic-link sign-in email. Used by NextAuth's EmailProvider
// (sendVerificationRequest) so the magic link matches the rest of our emails
// instead of NextAuth's default white template.
export async function sendMagicLinkEmail({ to, url }) {
  const host = config.domainName;
  const html = await render(<MagicLink url={url} host={host} />);

  await sendEmail({
    to,
    from: config.resend.fromNoReply,
    subject: "Sign in to JustEnvs",
    text: [
      "Sign in to JustEnvs",
      "",
      "Click the link below to sign in. It expires shortly and can only be used once:",
      url,
      "",
      "If you didn't request this, you can safely ignore this email.",
    ].join("\n"),
    html,
  });
}
