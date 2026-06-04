import { getSEOTags } from "@/libs/seo";
import DocLayout from "@/components/landing/DocLayout";
import {
  DocSection,
  TLDR,
  RoadmapPill,
  MetaRow,
  DocList,
  DocP,
  Code,
} from "@/components/landing/DocSection";

export const metadata = getSEOTags({
  title: "Security · justenvs",
  canonicalUrlRelative: "/security",
});

const TOC = [
  { id: "tldr", number: "01", label: "TL;DR" },
  { id: "threat", number: "02", label: "Threat model" },
  { id: "crypto", number: "03", label: "How encryption works" },
  { id: "keys", number: "04", label: "Where keys live" },
  { id: "biometrics", number: "05", label: "Touch ID & auto-lock" },
  { id: "share", number: "06", label: "Share links" },
  { id: "infra", number: "07", label: "Sub-processors" },
  { id: "disclosure", number: "08", label: "Responsible disclosure" },
  { id: "never", number: "09", label: "What we never do" },
];

export default function SecurityPage() {
  return (
    <DocLayout
      eyebrow="Security"
      title="How we keep your secrets, secret."
      effectiveDate="May 31, 2026"
      version="0.1"
      toc={TOC}
    >
      <TLDR>
        AES-256-GCM, key derived from your master password through PBKDF2
        (210,000 iterations). Keys sit in the macOS Keychain behind Touch ID.
        We never see plaintext.
      </TLDR>

      <DocSection
        id="tldr"
        number="01"
        eyebrow="The short version"
        title="In one paragraph."
      >
        <DocP>
          justenvs is a local-first, end-to-end-encrypted secrets vault. Your
          master password never leaves your Mac, the data encryption key never
          touches our servers, and your secrets are AEAD-encrypted with a
          modern authenticated cipher before any byte is written to disk. If we
          got hacked tomorrow, the worst an attacker would find is encrypted
          blobs and minimal metadata.
        </DocP>
      </DocSection>

      <DocSection
        id="threat"
        number="02"
        eyebrow="What we protect against"
        title="Threat model."
      >
        <DocP><strong>We do protect against:</strong></DocP>
        <DocList>
          <li>A lost or stolen Mac (vault is at-rest encrypted; no key on disk).</li>
          <li>A breach of our servers (we only hold ciphertext + minimal metadata).</li>
          <li>Network eavesdroppers (TLS in transit; key material never transits).</li>
          <li>Someone shoulder-surfing your Mac (Touch ID gate on destructive ops, auto-lock on sleep/screen-lock).</li>
        </DocList>
        <DocP style={{ marginTop: 24 }}>
          <strong>We cannot protect against:</strong>
        </DocP>
        <DocList>
          <li>Malware running on your Mac with kernel access or a keylogger active while you type your master password.</li>
          <li>You sharing your master password with someone else.</li>
          <li>You disabling auto-lock and walking away from an unlocked Mac.</li>
          <li>Coercion (rubber-hose cryptanalysis is, regrettably, still a thing).</li>
        </DocList>
      </DocSection>

      <DocSection
        id="crypto"
        number="03"
        eyebrow="The cryptographic chain"
        title="How encryption works."
      >
        <DocP>
          When you create a vault, you pick a master password. The app uses it
          to derive a Key Encryption Key (KEK), which then unwraps a per-vault
          random Data Encryption Key (DEK). The DEK encrypts your vault JSON
          with AES-256-GCM. None of these steps require a network call.
        </DocP>
        <div style={{ marginTop: 24, marginBottom: 8 }}>
          <MetaRow label="Mac app KDF" value="PBKDF2-HMAC-SHA256 · 210,000 iters · 16-byte salt" />
          <MetaRow label="CLI KDF" value="Scrypt · N=16384 r=8 p=1 · 16-byte salt" />
          <MetaRow label="Cipher" value="AES-256-GCM (authenticated)" />
          <MetaRow label="DEK length" value="32 bytes (CSPRNG)" />
          <MetaRow label="Vault format" value={"{ kdf, wrappedKey, vault }  ·  base64-SealedBox"} />
          <MetaRow label="Mac vault path" value="~/Library/Application Support/JustEnv/vault.json" />
          <MetaRow label="CLI vault path" value="~/.envsvault/vault.enc" />
        </div>
        <DocP style={{ marginTop: 24 }}>
          The implementation is in{" "}
          <Code>Sources/Core/Security/Crypto.swift</Code> for the Mac app and{" "}
          <Code>src/core/crypto.ts</Code> for the CLI.
        </DocP>
      </DocSection>

      <DocSection
        id="keys"
        number="04"
        eyebrow="Where the keys live"
        title="The Keychain, not our servers."
      >
        <DocP>
          The data encryption key is stored in the macOS system Keychain with{" "}
          <Code>kSecAccessControlUserPresence</Code> — meaning it can only be
          read when the user is physically present (Touch ID or system
          password). The key never leaves your Mac, never reaches our servers,
          and is never written to plain disk outside the Keychain.
        </DocP>
        <div style={{ marginTop: 16, marginBottom: 8 }}>
          <MetaRow label="Keychain service" value="dev.elfora.JustEnv" />
          <MetaRow label="Keychain account" value="vault-dek" />
          <MetaRow label="Access control" value=".userPresence (Touch ID or system password)" />
        </div>
      </DocSection>

      <DocSection
        id="biometrics"
        number="05"
        eyebrow="Locks that close themselves"
        title="Touch ID & auto-lock."
      >
        <DocP>
          Destructive operations (deleting a project, deleting a variable) are
          gated on Touch ID. The DEK is read from the Keychain only on
          successful presence check.
        </DocP>
        <DocP>
          The vault auto-locks when the system sleeps, when the screen locks,
          or after a user-configurable idle timeout. We subscribe to{" "}
          <Code>NSWorkspace.willSleepNotification</Code>,{" "}
          <Code>screensDidSleepNotification</Code>, and the distributed{" "}
          <Code>com.apple.screenIsLocked</Code> notification. Both auto-lock
          triggers are toggleable in settings.
        </DocP>
      </DocSection>

      <DocSection
        id="share"
        number="06"
        eyebrow="Sharing without trusting the server"
        title={<>Self-destructing share links.<RoadmapPill /></>}
      >
        <DocP>
          At launch, justenvs ships a share-link service that lets you send a
          secret (or a small bundle) to a teammate without ever exposing
          plaintext to our servers. The protocol:
        </DocP>
        <DocList>
          <li>Sender picks the secrets, the TTL, and (optionally) the maximum number of views.</li>
          <li>The app generates a random 256-bit AES key locally, encrypts the payload, and uploads only the ciphertext + envelope.</li>
          <li>The app produces a URL where the key lives in the URL fragment (the part after <Code>#</Code>) — fragments are never sent to servers.</li>
          <li>The recipient opens the link. Their browser pulls the ciphertext, derives the key from the fragment, and decrypts in-page.</li>
          <li>The server marks the link consumed (single-view) or schedules deletion at TTL expiry. Defaults: <Code>24h</Code> TTL, single view.</li>
        </DocList>
        <DocP>
          Our server sees: an opaque ciphertext blob, an envelope (algorithm
          identifier, IV, tag), a TTL, a view counter. It never sees: the
          decryption key, the recipient identity, the secret values.
        </DocP>
      </DocSection>

      <DocSection
        id="infra"
        number="07"
        eyebrow="Who runs what"
        title="Sub-processors & infrastructure."
      >
        <DocList>
          <li><strong>Vercel</strong> — web hosting and product analytics; us-east-1 (Washington, DC).</li>
          <li><strong>MongoDB Atlas</strong> — ciphertext storage and minimal metadata for team sync. <RoadmapPill /></li>
          <li><strong>Resend</strong> — transactional email (sign-in links, receipts).</li>
          <li><strong>Stripe</strong> — payment processing; PCI handled entirely on Stripe’s side.</li>
        </DocList>
        <DocP>All providers have a DPA in force.</DocP>
      </DocSection>

      <DocSection
        id="disclosure"
        number="08"
        eyebrow="Found a bug?"
        title="Responsible disclosure."
      >
        <DocP>
          Email <Code>security@justenvs.app</Code>. We acknowledge new reports
          within 72 hours and commit to a remediation plan within 14 days for
          confirmed issues.
        </DocP>
        <DocP>
          Please give us a chance to fix the issue before public disclosure. We
          do not currently run a paid bug bounty; we do credit reporters in the
          changelog when fixes ship, with permission.
        </DocP>
        <DocP>
          PGP key:{" "}
          <Code>https://justenvs.app/.well-known/pgp.asc</Code>
          {" "}<RoadmapPill />
        </DocP>
      </DocSection>

      <DocSection
        id="never"
        number="09"
        eyebrow="Lines we don't cross"
        title="What we never do."
      >
        <DocList>
          <li>We never log plaintext values, not even briefly, not even in error traces.</li>
          <li>We never transmit the vault except as ciphertext, and only when you explicitly opt into team sync or share a link.</li>
          <li>We never sell, rent, or share data with third parties for advertising.</li>
          <li>We never add a sub-processor without updating this page first.</li>
          <li>We never store cryptographic keys server-side. The vault is yours; we just rent the cabinet.</li>
        </DocList>
      </DocSection>
    </DocLayout>
  );
}
