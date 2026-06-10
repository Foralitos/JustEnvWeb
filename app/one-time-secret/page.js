import { getSEOTags, faqJsonLd } from "@/libs/seo";
import ShareLanding from "./ShareLanding";

// SEO target: "one time secret" (head keyword) plus long-tail variants
// "is one-time secret safe" / "send one time secret" via FAQs.
// Moved from /share on 2026-06-10 (308 redirect in next.config.js).
// See vault note justenvs-seo.
export const metadata = getSEOTags({
  title: "One-Time Secret — Send Self-Destructing Encrypted Links | JustEnvs",
  description:
    "Create a one-time secret link that burns after reading. Encrypted end-to-end on your Mac, expires automatically, zero-knowledge. Built for .env files and API keys.",
  canonicalUrlRelative: "/one-time-secret",
  openGraph: {
    title: "One-Time Secret — Send Self-Destructing Encrypted Links | JustEnvs",
    description:
      "Self-destructing links for environment variables and API keys. End-to-end encrypted, burn after reading, zero-knowledge.",
    url: "https://justenvs.app/one-time-secret",
  },
});

const FAQS = [
  {
    q: "What is a one-time secret link?",
    a: "A one-time secret link is an encrypted URL that can only be opened a limited number of times before it destroys itself. JustEnvs encrypts your environment variables on your Mac, uploads only the ciphertext, and gives you a link. Once it's viewed or expires, the data is permanently deleted.",
  },
  {
    q: "What does burn after reading mean?",
    a: "Burn after reading means the share is destroyed the moment it is first viewed. One view, then gone — the ciphertext is deleted atomically on the server, so the same link can never be opened twice.",
  },
  {
    q: "Can JustEnvs read my secrets?",
    a: "No. Encryption happens on your Mac before anything is uploaded, and the decryption key travels in the URL fragment (#k=...), which browsers never send to servers. JustEnvs stores ciphertext it cannot open — that's zero-knowledge sharing.",
  },
  {
    q: "How long do self-destructing links last?",
    a: "You choose the lifetime when you create the share: 1 hour, 1 day, or 7 days. You can also set a view limit of 1 or 5 views. Whichever limit is reached first destroys the link.",
  },
  {
    q: "Do recipients need to install anything to open the link?",
    a: "No. Links decrypt directly in any modern browser using WebCrypto — recipients just click and read. Creating shares requires the JustEnvs Mac app, where your secrets are encrypted locally.",
  },
  {
    q: "Is a one-time secret link safe?",
    a: "Safer than pasting secrets into Slack or email, where they live forever in searchable history. A one-time secret link is encrypted end-to-end with AES-GCM before upload, the decryption key travels in the URL fragment that browsers never send to servers, and the link destroys itself after viewing or expiry. Even if someone found the link later, there would be nothing left to open.",
  },
  {
    q: "How do I send a one-time secret?",
    a: "Three steps: pick the variables or paste the secret in the JustEnvs Mac app, choose how it burns (one view, five views, or a 1-hour to 7-day timer), and send the generated link over any channel. The recipient opens it in their browser — no account, no install.",
  },
];

export default function OneTimeSecretPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd(FAQS) }}
      />
      <ShareLanding faqs={FAQS} />
    </>
  );
}
