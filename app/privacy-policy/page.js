import { getSEOTags } from "@/libs/seo";
import DocLayout from "@/components/landing/DocLayout";
import {
  DocSection,
  TLDR,
  RoadmapPill,
  DocList,
  DocP,
  Code,
} from "@/components/landing/DocSection";

export const metadata = getSEOTags({
  title: "Privacy Policy · justenv",
  canonicalUrlRelative: "/privacy-policy",
});

const TOC = [
  { id: "short", number: "01", label: "The short version" },
  { id: "vault", number: "02", label: "What you store" },
  { id: "collect", number: "03", label: "What we collect" },
  { id: "never", number: "04", label: "What we never collect" },
  { id: "retention", number: "05", label: "How long we keep it" },
  { id: "processors", number: "06", label: "Sub-processors" },
  { id: "rights", number: "07", label: "Your rights" },
  { id: "cookies", number: "08", label: "Cookies & analytics" },
  { id: "children", number: "09", label: "Children" },
  { id: "changes", number: "10", label: "Changes" },
  { id: "contact", number: "11", label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <DocLayout
      eyebrow="Privacy"
      title="Privacy policy."
      effectiveDate="May 31, 2026"
      version="0.1"
      toc={TOC}
    >
      <TLDR>
        Your secrets are encrypted before they leave your Mac. We never see
        them. What we do collect is your email, your plan, and anonymous usage
        events — that’s it.
      </TLDR>

      <DocSection
        id="short"
        number="01"
        eyebrow="The promise"
        title="The short version."
      >
        <DocP>
          justenv is built so we cannot read your secrets. The cryptographic
          details are on the{" "}
          <a href="/security" style={{ color: "var(--accent)" }}>
            Security page
          </a>
          .
        </DocP>
        <DocP>This policy explains the thin layer of data we do touch:</DocP>
        <DocList>
          <li>Your account email, so you can sign in and we can email you receipts.</li>
          <li>Your plan and billing status (Stripe handles the card; we never see it).</li>
          <li>Anonymous, aggregated usage events about which screens load and how fast.</li>
        </DocList>
      </DocSection>

      <DocSection
        id="vault"
        number="02"
        eyebrow="Your vault"
        title="What you store in justenv."
      >
        <DocP>
          The Mac app encrypts your vault locally with AES-256-GCM using a key
          derived from your master password (PBKDF2-HMAC-SHA256, 210,000
          iterations). The vault lives at{" "}
          <Code>~/Library/Application Support/JustEnv/vault.json</Code> as
          ciphertext only.
        </DocP>
        <DocP>
          If you opt into team sync <RoadmapPill /> the only things that ever
          reach our servers are the encrypted blob and minimal metadata: project
          name, environment label (e.g. <Code>production</Code>), and
          timestamps. Values stay encrypted.
        </DocP>
      </DocSection>

      <DocSection
        id="collect"
        number="03"
        eyebrow="The thin layer"
        title="What we collect from you."
      >
        <DocList>
          <li>
            <strong>Account.</strong> Email address used to sign in. Optional
            display name.
          </li>
          <li>
            <strong>Billing.</strong> Stripe customer ID, plan, and subscription
            status. Stripe handles card data — we never receive or store card
            numbers.
          </li>
          <li>
            <strong>Product analytics.</strong> Page views, button clicks, error
            traces. We use Vercel Analytics, which is privacy-friendly,
            cookieless, and uses no persistent user identifier.
          </li>
          <li>
            <strong>Support correspondence.</strong> If you email us, we keep
            that thread to follow up.
          </li>
        </DocList>
      </DocSection>

      <DocSection
        id="never"
        number="04"
        eyebrow="Things we deliberately don't touch"
        title="What we never collect."
      >
        <DocList>
          <li>The values of your secrets (we only ever see ciphertext).</li>
          <li>The contents of your <Code>.env</Code> files at rest on your Mac.</li>
          <li>Your terminal history, shell sessions, or anything outside the app.</li>
          <li>Cross-site browsing data — we run no third-party trackers.</li>
          <li>Your IP address in product analytics events (Vercel truncates it server-side).</li>
        </DocList>
      </DocSection>

      <DocSection
        id="retention"
        number="05"
        eyebrow="How long it sticks"
        title="How long we keep your data."
      >
        <DocList>
          <li>
            <strong>Account email & plan:</strong> for as long as you have an
            account, plus 30 days after closure for fiscal compliance.
          </li>
          <li>
            <strong>Aggregated analytics:</strong> 90 days, then deleted.
          </li>
          <li>
            <strong>Error logs:</strong> 30 days, with values redacted.
          </li>
          <li>
            <strong>Team workspaces</strong> <RoadmapPill /> — ciphertext blobs
            are kept until the workspace owner deletes them. Hard-delete is
            permanent within 30 days.
          </li>
        </DocList>
      </DocSection>

      <DocSection
        id="processors"
        number="06"
        eyebrow="Who else touches the bytes"
        title="Sub-processors."
      >
        <DocP>We use the following providers to run justenv:</DocP>
        <DocList>
          <li>
            <strong>Stripe</strong> — payment processing.
          </li>
          <li>
            <strong>Resend</strong> — transactional email (magic links, receipts).
          </li>
          <li>
            <strong>Vercel</strong> — hosting and product analytics.
          </li>
          <li>
            <strong>MongoDB Atlas</strong> — ciphertext storage for team sync.{" "}
            <RoadmapPill />
          </li>
        </DocList>
        <DocP>
          We have signed data-processing agreements with each of them. If we add
          a new sub-processor, we update this list at least 30 days before they
          begin handling your data.
        </DocP>
      </DocSection>

      <DocSection
        id="rights"
        number="07"
        eyebrow="What you can ask for"
        title="Your rights."
      >
        <DocP>
          Under Mexican law (LFPDPPP) and equivalent regimes like GDPR, you have
          the right to:
        </DocP>
        <DocList>
          <li>Access the data we hold about you.</li>
          <li>Export it in a portable format.</li>
          <li>Correct anything inaccurate.</li>
          <li>Delete it entirely.</li>
          <li>Withdraw consent for analytics.</li>
        </DocList>
        <DocP>
          To exercise any of these, email <Code>privacy@justenv.app</Code>. We
          respond within 20 business days, usually much faster.
        </DocP>
      </DocSection>

      <DocSection
        id="cookies"
        number="08"
        eyebrow="Browser stuff"
        title="Cookies & analytics."
      >
        <DocP>
          justenv.app sets a single first-party cookie to remember whether you
          are signed in. No cross-site trackers. No advertising pixels. Vercel
          Analytics works without any cookie at all.
        </DocP>
      </DocSection>

      <DocSection
        id="children"
        number="09"
        eyebrow="Age"
        title="Children."
      >
        <DocP>
          justenv is for developers, not for children. We do not knowingly
          accept accounts from anyone under 13. If you believe a minor has
          created an account, email <Code>privacy@justenv.app</Code> and we will
          delete it.
        </DocP>
      </DocSection>

      <DocSection
        id="changes"
        number="10"
        eyebrow="When this document moves"
        title="Changes to this policy."
      >
        <DocP>
          When we change this policy, we bump the version at the top and update
          the effective date. For material changes, we email account holders and
          show an in-app banner at least 14 days before the new version takes
          effect.
        </DocP>
      </DocSection>

      <DocSection
        id="contact"
        number="11"
        eyebrow="Reach us"
        title="Contact."
      >
        <DocP>
          Privacy questions or rights requests:{" "}
          <Code>privacy@justenv.app</Code>.<br />
          General support: <Code>elfora.dev@gmail.com</Code>.
        </DocP>
      </DocSection>
    </DocLayout>
  );
}
