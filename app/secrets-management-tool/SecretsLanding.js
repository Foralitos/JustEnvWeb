"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Icon,
  Button,
  Brand,
  GridBG,
  BrandMark,
  Overline,
} from "@/components/landing/lib";
import ThemeToggle from "@/components/landing/ThemeToggle";
import Footer from "@/components/landing/Footer";
import SignupModal from "@/components/landing/SignupModal";
import CompareTable from "@/components/compare/CompareTable";
import FaqList from "@/components/compare/FaqList";

function SectionShell({ children, style }) {
  return (
    <section
      style={{ position: "relative", padding: "clamp(48px, 8vw, 96px) 0", ...style }}
    >
      <div
        style={{
          position: "relative",
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 40px)",
        }}
      >
        {children}
      </div>
    </section>
  );
}

// JustEnvs vs the generic "enterprise secrets platform" column.
const PLATFORM_ROWS = [
  {
    feature: "Interface",
    justenvs: "Native Mac app, menu bar",
    competitor: "Web dashboard + CLI agents",
  },
  {
    feature: "Encryption",
    justenvs: "End-to-end, zero-knowledge",
    competitor: "Server-side (vendor can decrypt)",
  },
  {
    feature: "Pricing model",
    justenvs: "$50 one-time, free for solo devs",
    competitor: "Per-seat, per-month",
  },
  {
    feature: "Secrets format",
    justenvs: ".env-first — files keep their shape",
    competitor: "Config system with its own schema",
  },
  {
    feature: "Setup",
    justenvs: "Download the app, done",
    competitor: "Workspace, identities, agents, tokens",
  },
  {
    feature: "Runtime injection / rotation",
    justenvs: "No — store and share, not operate",
    competitor: "Yes — their core job",
  },
];

const FIT = {
  forYou: [
    "You're one developer (or a small Mac team) with a growing pile of .env files",
    "Your secrets currently live in plaintext files, Slack history, or Notes.app",
    "You want Touch ID and local encryption, not another cloud dashboard",
    "You occasionally need to hand a config to a teammate or contractor — safely",
    "You'd rather pay once than subscribe to store text files",
  ],
  notForYou: [
    "You run dozens of services that need secrets injected at runtime",
    "You need rotation policies, audit logs, or RBAC for a large team",
    "Your org requires self-hosted infrastructure for compliance",
  ],
};

export default function SecretsLanding({ faqs }) {
  const [signup, setSignup] = useState(false);
  const open = () => setSignup(true);

  return (
    <>
      <main>
        {/* ---------- Hero ---------- */}
        <section
          style={{
            position: "relative",
            paddingTop: "clamp(24px, 4vw, 40px)",
            paddingBottom: "clamp(48px, 7vw, 80px)",
            overflow: "hidden",
          }}
        >
          <GridBG />
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -160,
              left: "16%",
              width: 680,
              height: 440,
              background:
                "radial-gradient(ellipse at center, rgba(56,224,138,0.09), transparent 68%)",
              pointerEvents: "none",
              filter: "blur(20px)",
            }}
          />
          <div
            style={{
              position: "relative",
              maxWidth: 1120,
              margin: "0 auto",
              padding: "0 clamp(20px, 4vw, 40px)",
            }}
          >
            <div
              style={{
                paddingTop: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <BrandMark href="/" />
              <ThemeToggle />
            </div>

            <div style={{ maxWidth: 760, marginTop: "clamp(40px, 7vw, 84px)" }}>
              <Overline>Secrets management</Overline>
              <h1
                className="ds-display-xl"
                style={{ margin: "14px 0 0", fontSize: "clamp(34px, 5.6vw, 56px)" }}
              >
                A secrets management tool that{" "}
                <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                  lives on your Mac
                </span>
                .
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "var(--fg-secondary)",
                  maxWidth: 560,
                  margin: "24px 0 0",
                }}
              >
                Store, organize, and share your{" "}
                <span style={{ color: "var(--fg-primary)" }}>.env files and API keys</span>{" "}
                — end-to-end encrypted, native macOS, no cloud platform to
                babysit. Free for solo developers.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  marginTop: 30,
                  flexWrap: "wrap",
                }}
              >
                <Button variant="accent" size="lg" onClick={open}>
                  <Brand name="apple" size={19} style={{ marginRight: 3, marginTop: -2 }} />
                  Download for Mac
                </Button>
                <Button variant="glass" size="lg" href="/alternatives">
                  Compare alternatives
                </Button>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--fg-tertiary)",
                  margin: "18px 0 0",
                }}
              >
                Free for solo developers · macOS 13 or later
              </p>
            </div>
          </div>
        </section>

        {/* ---------- What is secrets management ---------- */}
        <SectionShell style={{ padding: "clamp(24px, 4vw, 48px) 0" }}>
          <div style={{ maxWidth: 760 }}>
            <h2
              className="ds-display-lg"
              style={{ margin: 0, fontSize: "clamp(26px, 3.6vw, 36px)" }}
            >
              What is secrets management?
            </h2>
            <p
              className="ds-body"
              style={{
                color: "var(--fg-secondary)",
                fontSize: 16,
                lineHeight: 1.7,
                margin: "18px 0 0",
              }}
            >
              Secrets management is keeping sensitive configuration — API keys,
              database credentials, tokens, entire .env files — encrypted,
              organized, and out of the places it usually ends up: plaintext
              files in a repo, Slack threads, screenshots, Notes.app. Good
              secrets management means you always know where a credential
              lives, who can reach it, and how it gets to a teammate without
              leaving a permanent copy along the way.
            </p>
            <p
              className="ds-body"
              style={{
                color: "var(--fg-secondary)",
                fontSize: 16,
                lineHeight: 1.7,
                margin: "18px 0 0",
              }}
            >
              Most secrets management tools, though, are built for a different
              customer: platform teams operating fleets of services. Doppler,
              Infisical, and HashiCorp Vault are excellent at injecting secrets
              into Kubernetes at runtime — and wildly oversized for a developer
              whose actual problem is twelve projects&apos; worth of .env files
              scattered across a laptop. That gap is what JustEnvs fills:
              the storage-and-sharing half of secrets management, as a native
              Mac app, with none of the platform overhead.
            </p>
          </div>
        </SectionShell>

        {/* ---------- Who it's for / not for ---------- */}
        <SectionShell style={{ padding: "clamp(24px, 4vw, 48px) 0" }}>
          <div
            className="smt-fit"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}
          >
            <style>{`
              @media (max-width: 860px) {
                .smt-fit { grid-template-columns: 1fr !important; }
              }
            `}</style>
            <div
              className="ds-glass"
              style={{
                borderRadius: "var(--radius-xl)",
                padding: "26px 24px",
                borderColor: "var(--border-accent)",
              }}
            >
              <h3 className="ds-h3" style={{ margin: 0, fontWeight: 600, color: "var(--accent)" }}>
                JustEnvs is for you if…
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 18 }}>
                {FIT.forYou.map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10 }}>
                    <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }}>
                      <Icon name="check" size={15} />
                    </span>
                    <p className="ds-body-sm" style={{ margin: 0, color: "var(--fg-secondary)" }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="ds-glass"
              style={{ borderRadius: "var(--radius-xl)", padding: "26px 24px" }}
            >
              <h3 className="ds-h3" style={{ margin: 0, fontWeight: 600 }}>
                …and honestly not, if
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 18 }}>
                {FIT.notForYou.map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10 }}>
                    <span style={{ color: "var(--fg-quaternary)", flexShrink: 0, marginTop: 2 }}>
                      <Icon name="x" size={15} />
                    </span>
                    <p className="ds-body-sm" style={{ margin: 0, color: "var(--fg-secondary)" }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <p
                className="ds-body-sm"
                style={{ margin: "18px 0 0", color: "var(--fg-tertiary)" }}
              >
                If that&apos;s you, an operational platform is the right call —{" "}
                <Link href="/alternatives/doppler" style={{ color: "var(--accent)" }}>
                  our Doppler comparison
                </Link>{" "}
                says so out loud.
              </p>
            </div>
          </div>
        </SectionShell>

        {/* ---------- Lightweight vs platform ---------- */}
        <SectionShell>
          <div style={{ textAlign: "center", marginBottom: "clamp(32px, 4vw, 48px)" }}>
            <Overline>Lightweight vs platform</Overline>
            <h2
              className="ds-display-lg"
              style={{ margin: "14px 0 0", fontSize: "clamp(28px, 4vw, 40px)" }}
            >
              A tool you use, not a platform you operate
            </h2>
          </div>
          <CompareTable
            competitorName="Enterprise secrets platforms"
            rows={PLATFORM_ROWS}
          />
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--fg-tertiary)",
              textAlign: "center",
              margin: "18px 0 0",
            }}
          >
            Named comparisons:{" "}
            <Link href="/alternatives/doppler" style={{ color: "var(--accent)" }}>
              Doppler
            </Link>
            {" · "}
            <Link href="/alternatives/infisical" style={{ color: "var(--accent)" }}>
              Infisical
            </Link>
            {" · "}
            <Link href="/alternatives/1password" style={{ color: "var(--accent)" }}>
              1Password
            </Link>
            {" · "}
            <Link href="/alternatives" style={{ color: "var(--accent)" }}>
              all alternatives
            </Link>
          </p>
        </SectionShell>

        {/* ---------- One-time sharing ---------- */}
        <SectionShell style={{ padding: "clamp(24px, 4vw, 48px) 0" }}>
          <div
            className="ds-glass"
            style={{
              borderRadius: "var(--radius-xl)",
              padding: "clamp(28px, 4vw, 44px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 14,
            }}
          >
            <span style={{ color: "var(--accent)", display: "inline-flex" }}>
              <Icon name="flame" size={22} />
            </span>
            <h2
              className="ds-display-lg"
              style={{ margin: 0, fontSize: "clamp(24px, 3.4vw, 34px)" }}
            >
              Sharing that destroys the evidence
            </h2>
            <p
              className="ds-body"
              style={{ margin: 0, color: "var(--fg-secondary)", maxWidth: 640 }}
            >
              Secrets management isn&apos;t just storage — secrets move. JustEnvs
              generates one-time links that burn after reading: encrypted on
              your Mac, opened in any browser, destroyed by a view limit or
              timer. No more API keys living forever in Slack history.
            </p>
            <Button variant="glass" size="md" href="/one-time-secret">
              How one-time secret links work
              <Icon name="arrow-right" size={15} style={{ marginLeft: 2 }} />
            </Button>
          </div>
        </SectionShell>

        {/* ---------- FAQ ---------- */}
        <SectionShell>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "clamp(32px, 4vw, 48px)" }}>
              <Overline>FAQ</Overline>
              <h2
                className="ds-display-lg"
                style={{ margin: "14px 0 0", fontSize: "clamp(28px, 4vw, 40px)" }}
              >
                Secrets management, answered
              </h2>
            </div>
            <FaqList faqs={faqs} />
          </div>
        </SectionShell>
      </main>

      <Footer onSignup={open} />
      <SignupModal open={signup} onClose={() => setSignup(false)} />
    </>
  );
}
