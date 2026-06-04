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
  title: "Terms of Service · justenvs",
  canonicalUrlRelative: "/tos",
});

const TOC = [
  { id: "basics", number: "01", label: "The basics" },
  { id: "license", number: "02", label: "Your license" },
  { id: "data", number: "03", label: "Your data, your secrets" },
  { id: "billing", number: "04", label: "Billing & refunds" },
  { id: "acceptable", number: "05", label: "Acceptable use" },
  { id: "termination", number: "06", label: "Termination" },
  { id: "warranty", number: "07", label: "Warranty & liability" },
  { id: "changes", number: "08", label: "Changes" },
  { id: "law", number: "09", label: "Governing law" },
  { id: "contact", number: "10", label: "Contact" },
];

export default function TermsPage() {
  return (
    <DocLayout
      eyebrow="Terms"
      title="Terms of service."
      effectiveDate="May 31, 2026"
      version="0.1"
      toc={TOC}
    >
      <TLDR>
        We make the tool, you keep the secrets. Use justenvs reasonably, pay for
        what you use, and we will not snoop on your vault.
      </TLDR>

      <DocSection
        id="basics"
        number="01"
        eyebrow="What this is"
        title="The basics."
      >
        <DocP>
          These Terms govern your use of <Code>justenvs</Code> — the macOS app,
          the <Code>envsvault</Code> CLI, and any related services we run from{" "}
          <Code>justenvs.app</Code>. By installing the app, opening an account, or
          using the CLI, you accept these Terms.
        </DocP>
        <DocP>
          justenvs is operated by Elfora (&ldquo;we&rdquo;, &ldquo;us&rdquo;). You are the user (&ldquo;you&rdquo;).
          We wrote these Terms in plain language because we use developer tools
          too and we hate legalese as much as you do.
        </DocP>
      </DocSection>

      <DocSection
        id="license"
        number="02"
        eyebrow="What you can do with it"
        title="Your license to use justenvs."
      >
        <DocP>
          We grant you a personal, non-exclusive, non-transferable license to
          install and use the justenvs macOS app and the <Code>envsvault</Code>{" "}
          CLI on devices you control.
        </DocP>
        <DocList>
          <li>
            <strong>Free for solo developers.</strong> If you use justenvs on
            your own devices, the app is free, forever. No card required.
          </li>
          <li>
            <strong>Team plan</strong> <RoadmapPill /> — Paid per seat. Lets you
            invite teammates, share secrets through audited workspaces, and use
            the share-link service.
          </li>
          <li>
            You may not redistribute the binary, sublicense it, reverse-engineer
            it to ship a competing product, or strip the brand.
          </li>
        </DocList>
      </DocSection>

      <DocSection
        id="data"
        number="03"
        eyebrow="What is yours"
        title="Your data, your secrets."
      >
        <DocP>
          Anything you put inside justenvs — environment variables, project
          names, notes — is <strong>yours</strong>. You can export, modify, or
          delete it at any time from the app.
        </DocP>
        <DocP>
          Because we encrypt your vault on your device before it ever leaves it
          (see the{" "}
          <a href="/security" style={{ color: "var(--accent)" }}>
            Security page
          </a>{" "}
          for the cryptographic details), <strong>we cannot read your secret
          values</strong>. That also means we cannot recover them if you lose
          your master password.
        </DocP>
        <DocP>
          You are responsible for what you store. Do not put secrets that are
          not yours to store, and do not use justenvs as a way to bypass the
          security controls of services you do not own.
        </DocP>
      </DocSection>

      <DocSection
        id="billing"
        number="04"
        eyebrow="Money"
        title="Subscription, billing & refunds."
      >
        <DocP>
          The Free tier is free. The Team tier <RoadmapPill /> is billed monthly
          or annually in advance via Stripe. We never see or store your card
          number.
        </DocP>
        <DocList>
          <li>
            <strong>Refunds:</strong> if a Team subscription doesn’t fit, email
            us within 14 days of the charge and we’ll refund it in full.
          </li>
          <li>
            <strong>Auto-renewal:</strong> Team subscriptions renew at the end
            of each billing period until you cancel. Cancel from the app or by
            emailing support.
          </li>
          <li>
            <strong>Taxes:</strong> prices exclude tax. Where required, we
            collect and remit it.
          </li>
        </DocList>
      </DocSection>

      <DocSection
        id="acceptable"
        number="05"
        eyebrow="Don't be that person"
        title="Acceptable use."
      >
        <DocP>While using justenvs, you agree not to:</DocP>
        <DocList>
          <li>Store content that is illegal, infringes someone else’s rights, or violates export control law.</li>
          <li>Abuse the share-link service <RoadmapPill /> (we apply rate limits and may block obvious automated abuse).</li>
          <li>Attempt to break, exhaust, or probe our systems beyond responsible disclosure (see the Security page).</li>
          <li>Resell hosted Team workspaces to third parties as a service.</li>
        </DocList>
      </DocSection>

      <DocSection
        id="termination"
        number="06"
        eyebrow="Leaving"
        title="Termination."
      >
        <DocP>
          You can stop using justenvs at any time. Your local vault stays on
          your Mac — uninstalling the app does not delete the file at{" "}
          <Code>~/Library/Application Support/JustEnv/vault.json</Code>; remove
          it yourself if you want a clean slate.
        </DocP>
        <DocP>
          We may suspend or terminate accounts that violate these Terms,
          especially the acceptable use clause. When we do, we will tell you
          why and, where possible, give you a window to export your data.
        </DocP>
      </DocSection>

      <DocSection
        id="warranty"
        number="07"
        eyebrow="The legal corner"
        title="No warranty, limited liability."
      >
        <DocP>
          justenvs is provided <em>as is</em>, without warranty of any kind. We
          do our best to keep the app stable, the cryptography sound, and the
          servers up, but we can’t guarantee it works without interruption.
        </DocP>
        <DocP>
          To the maximum extent allowed by law, our aggregate liability under
          these Terms is capped at the amount you paid us in the twelve months
          before the claim. For Free users, that cap is zero. We are not liable
          for indirect, incidental, or consequential damages.
        </DocP>
      </DocSection>

      <DocSection
        id="changes"
        number="08"
        eyebrow="When this document moves"
        title="Changes to these Terms."
      >
        <DocP>
          We may update these Terms when the product or law changes. When we do,
          we’ll bump the version number at the top and update the effective
          date. For material changes, we send a notice by email to account
          holders and show an in-app banner at least 14 days before the new
          version takes effect.
        </DocP>
      </DocSection>

      <DocSection
        id="law"
        number="09"
        eyebrow="Where this is anchored"
        title="Governing law & disputes."
      >
        <DocP>
          These Terms are governed by the federal laws of the United Mexican
          States. Any dispute we can’t settle by good-faith conversation will be
          handled by the competent courts of Mexico City.
        </DocP>
        <DocP>
          Before filing anything, please email{" "}
          <Code>legal@justenvs.app</Code>. We will respond within 10 business
          days and try to resolve the issue without paper.
        </DocP>
      </DocSection>

      <DocSection
        id="contact"
        number="10"
        eyebrow="Reach us"
        title="Contact."
      >
        <DocP>
          Questions about these Terms: <Code>legal@justenvs.app</Code>.<br />
          Anything else: <Code>elfora.dev@gmail.com</Code>.
        </DocP>
      </DocSection>
    </DocLayout>
  );
}
