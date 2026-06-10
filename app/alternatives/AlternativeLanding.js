"use client";

import { useState } from "react";
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

function Breadcrumb({ items }) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
      }}
    >
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={item.name} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            {last ? (
              <span style={{ color: "var(--fg-secondary)" }}>{item.name}</span>
            ) : (
              <a
                href={item.href}
                style={{ color: "var(--fg-tertiary)", textDecoration: "none" }}
              >
                {item.name}
              </a>
            )}
            {!last && (
              <Icon name="chevron-right" size={12} color="var(--fg-quaternary)" />
            )}
          </span>
        );
      })}
    </nav>
  );
}

function WinCard({ accent, title, items }) {
  return (
    <div
      className="ds-glass"
      style={{ borderRadius: "var(--radius-xl)", padding: "26px 24px" }}
    >
      <h3
        className="ds-h3"
        style={{
          margin: 0,
          fontWeight: 600,
          color: accent ? "var(--accent)" : "var(--fg-primary)",
        }}
      >
        {title}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 20 }}>
        {items.map((item) => (
          <div key={item.title} style={{ display: "flex", gap: 12 }}>
            <span
              style={{
                color: accent ? "var(--accent)" : "var(--fg-tertiary)",
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              <Icon name={accent ? "check-circle-2" : "minus-circle"} size={16} />
            </span>
            <div>
              <h4 className="ds-body-lg" style={{ margin: 0, fontWeight: 600 }}>
                {item.title}
              </h4>
              <p
                className="ds-body-sm"
                style={{ margin: "4px 0 0", color: "var(--fg-secondary)" }}
              >
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AlternativeLanding({ entry, others }) {
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
            paddingBottom: "clamp(40px, 6vw, 64px)",
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

            <div style={{ maxWidth: 760, marginTop: "clamp(36px, 6vw, 64px)" }}>
              <Breadcrumb
                items={[
                  { name: "Home", href: "/" },
                  { name: "Alternatives", href: "/alternatives" },
                  { name: entry.name },
                ]}
              />
              <div style={{ marginTop: 22 }}>
                <Overline>{entry.name} alternative</Overline>
              </div>
              <h1
                className="ds-display-xl"
                style={{ margin: "14px 0 0", fontSize: "clamp(32px, 5.2vw, 52px)" }}
              >
                The {entry.name} alternative{" "}
                <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                  built for Mac developers
                </span>
                .
              </h1>
              <p
                className="ds-body"
                style={{
                  color: "var(--fg-secondary)",
                  maxWidth: 640,
                  margin: "20px 0 0",
                  fontSize: 16,
                  lineHeight: 1.65,
                }}
              >
                {entry.tagline}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  marginTop: 28,
                  flexWrap: "wrap",
                }}
              >
                <Button variant="accent" size="lg" onClick={open}>
                  <Brand name="apple" size={19} style={{ marginRight: 3, marginTop: -2 }} />
                  Download for Mac
                </Button>
                <Button variant="glass" size="lg" href="#compare">
                  See the comparison
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
                Free for solo developers · macOS 13 or later · Updated {entry.lastUpdated}
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Intro prose ---------- */}
        <SectionShell style={{ padding: "clamp(24px, 4vw, 48px) 0" }}>
          <div style={{ maxWidth: 760 }}>
            {entry.intro.map((p, i) => (
              <p
                key={i}
                className="ds-body"
                style={{
                  color: i === 0 ? "var(--fg-primary)" : "var(--fg-secondary)",
                  fontSize: 16,
                  lineHeight: 1.7,
                  margin: i === 0 ? 0 : "18px 0 0",
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </SectionShell>

        {/* ---------- At a glance ---------- */}
        <SectionShell style={{ padding: "clamp(24px, 4vw, 48px) 0" }}>
          <div
            className="alt-glance"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 18,
            }}
          >
            <style>{`
              @media (max-width: 720px) {
                .alt-glance { grid-template-columns: 1fr !important; }
              }
            `}</style>
            <div
              className="ds-glass"
              style={{ borderRadius: "var(--radius-xl)", padding: "22px 24px" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--fg-quaternary)",
                }}
              >
                {entry.name} at a glance
              </span>
              <p className="ds-body" style={{ margin: "10px 0 0", color: "var(--fg-secondary)" }}>
                {entry.segment}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  margin: "12px 0 0",
                  color: "var(--fg-tertiary)",
                }}
              >
                {entry.pricing.competitor}
              </p>
            </div>
            <div
              className="ds-glass"
              style={{
                borderRadius: "var(--radius-xl)",
                padding: "22px 24px",
                borderColor: "var(--border-accent)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                JustEnvs at a glance
              </span>
              <p className="ds-body" style={{ margin: "10px 0 0", color: "var(--fg-secondary)" }}>
                Native macOS vault for .env files — encrypted locally, shared via
                self-destructing links.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  margin: "12px 0 0",
                  color: "var(--fg-tertiary)",
                }}
              >
                {entry.pricing.justenvs}
              </p>
            </div>
          </div>
        </SectionShell>

        {/* ---------- Comparison table ---------- */}
        <SectionShell>
          <div id="compare" style={{ textAlign: "center", marginBottom: "clamp(32px, 4vw, 48px)" }}>
            <Overline>Side by side</Overline>
            <h2
              className="ds-display-lg"
              style={{ margin: "14px 0 0", fontSize: "clamp(28px, 4vw, 40px)" }}
            >
              JustEnvs vs {entry.name}
            </h2>
          </div>
          <CompareTable competitorName={entry.name} rows={entry.compareRows} />
        </SectionShell>

        {/* ---------- Where each wins ---------- */}
        <SectionShell style={{ padding: "clamp(24px, 4vw, 48px) 0" }}>
          <div
            className="alt-wins"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}
          >
            <style>{`
              @media (max-width: 860px) {
                .alt-wins { grid-template-columns: 1fr !important; }
              }
            `}</style>
            <WinCard
              accent={false}
              title={`Where ${entry.name} wins`}
              items={entry.whereTheyWin}
            />
            <WinCard accent title="Where JustEnvs wins" items={entry.whereWeWin} />
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
                JustEnvs vs {entry.name}, answered
              </h2>
            </div>
            <FaqList faqs={entry.faqs} />
          </div>
        </SectionShell>

        {/* ---------- Other comparisons ---------- */}
        <SectionShell style={{ padding: "clamp(24px, 4vw, 48px) 0 clamp(56px, 9vw, 110px)" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <Overline>Keep comparing</Overline>
            <h2
              className="ds-display-lg"
              style={{ margin: "14px 0 0", fontSize: "clamp(26px, 3.6vw, 36px)" }}
            >
              Other comparisons
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {others.map((o) => (
              <Button key={o.slug} variant="glass" size="md" href={`/alternatives/${o.slug}`}>
                vs {o.name}
              </Button>
            ))}
            <Button variant="glass" size="md" href="/secrets-management-tool">
              Secrets management tool
            </Button>
            <Button variant="glass" size="md" href="/one-time-secret">
              One-time secret links
            </Button>
          </div>
        </SectionShell>
      </main>

      <Footer onSignup={open} />
      <SignupModal open={signup} onClose={() => setSignup(false)} />
    </>
  );
}
