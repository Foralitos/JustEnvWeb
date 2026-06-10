import { getSEOTags, faqJsonLd } from "@/libs/seo";
import SecretsLanding from "./SecretsLanding";

// SEO target: "secrets management tool" + "secrets management" (see vault
// note justenvs-seo). Framing: lightweight, Mac-native, free-for-solo —
// the anti-platform for indie devs.
export const metadata = getSEOTags({
  title: "Secrets Management Tool for Mac Developers — Free for Solo Devs | JustEnvs",
  description:
    "A lightweight secrets management tool that lives on your Mac. Store, organize, and share .env files and API keys — end-to-end encrypted, no cloud platform to babysit. Free for solo developers.",
  canonicalUrlRelative: "/secrets-management-tool",
  openGraph: {
    title: "Secrets Management Tool for Mac Developers | JustEnvs",
    description:
      "Store, organize, and share .env files and API keys — end-to-end encrypted, native macOS, free for solo developers.",
    url: "https://justenvs.app/secrets-management-tool",
  },
});

const FAQS = [
  {
    q: "What is a secrets management tool?",
    a: "A secrets management tool stores sensitive configuration — API keys, database credentials, tokens, .env files — in an encrypted, organized way, so secrets don't live in plaintext files, chat history, or sticky notes. Enterprise platforms add rotation, audit logs, and runtime injection; lightweight tools like JustEnvs focus on the core job: keeping your secrets encrypted, findable, and safely shareable.",
  },
  {
    q: "Do solo developers need secrets management?",
    a: "If you have more than a couple of projects, yes — just not an enterprise platform. The real failure modes for solo devs are mundane: a .env committed to git, an API key pasted into Slack, a credential lost with a dead laptop. An encrypted local vault solves those without the operational weight of a cloud secrets platform.",
  },
  {
    q: "Is JustEnvs free?",
    a: "Free for solo developers with up to 5 projects, including encrypted storage and one-time share links. Pro is a $50 one-time purchase — lifetime, unlimited projects, no subscription.",
  },
  {
    q: "How is JustEnvs different from Doppler or HashiCorp Vault?",
    a: "Those are operational platforms: they inject secrets into running applications and CI pipelines, manage team access, and require a service to operate (and usually a subscription per seat). JustEnvs is a native Mac app for the storage-and-sharing half of the problem — your secrets are encrypted on your machine and shared via self-destructing links. See our full Doppler comparison for details.",
  },
  {
    q: "Where are my secrets stored?",
    a: "In an encrypted vault on your Mac — local-first, protected by Touch ID. When you share, encryption happens on your machine before upload and the decryption key travels in the URL fragment, which browsers never send to servers. The share relay stores only ciphertext it cannot read.",
  },
];

export default function SecretsManagementToolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd(FAQS) }}
      />
      <SecretsLanding faqs={FAQS} />
    </>
  );
}
