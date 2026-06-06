import { getSEOTags } from "@/libs/seo";
import ShareLanding from "./ShareLanding";

// SEO target cluster: "one time secret link", "self destructing secret link",
// "burn after reading secret", "encrypted env sharing". See vault note justenvs-seo.
export const metadata = getSEOTags({
  title: "One-Time Secret Links — Share Env Variables Securely · JustEnvs",
  description:
    "Create self-destructing links for environment variables and API keys. End-to-end encrypted, burn after reading, expires automatically. The server never sees your secrets.",
  canonicalUrlRelative: "/share",
  openGraph: {
    title: "One-Time Secret Links — Share Env Variables Securely · JustEnvs",
    description:
      "Self-destructing links for environment variables and API keys. End-to-end encrypted, burn after reading, zero-knowledge.",
    url: "https://justenvs.app/share",
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
];

function faqJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });
}

export default function SharePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd() }}
      />
      <ShareLanding faqs={FAQS} />
    </>
  );
}
