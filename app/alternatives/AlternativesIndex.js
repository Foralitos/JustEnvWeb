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

function AltCard({ slug, name, segment, tagline }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={`/alternatives/${slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="ds-glass"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        borderRadius: "var(--radius-xl)",
        padding: "24px 22px",
        textDecoration: "none",
        borderColor: hover ? "var(--border-accent)" : undefined,
        transform: hover ? "translateY(-2px)" : "none",
        transition: "all var(--dur-fast) var(--ease-out)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <h2 className="ds-h3" style={{ margin: 0, fontWeight: 600, color: "var(--fg-primary)" }}>
          JustEnvs vs {name}
        </h2>
        <span style={{ color: hover ? "var(--accent)" : "var(--fg-quaternary)", display: "inline-flex" }}>
          <Icon name="arrow-right" size={17} />
        </span>
      </div>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--fg-quaternary)",
        }}
      >
        {segment}
      </span>
      <p
        className="ds-body-sm"
        style={{ margin: 0, color: "var(--fg-secondary)" }}
      >
        {tagline}
      </p>
    </a>
  );
}

export default function AlternativesIndex({ alternatives }) {
  const [signup, setSignup] = useState(false);
  const open = () => setSignup(true);

  return (
    <>
      <main>
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

            <div style={{ maxWidth: 720, marginTop: "clamp(40px, 7vw, 84px)" }}>
              <Overline>Comparisons</Overline>
              <h1
                className="ds-display-xl"
                style={{ margin: "14px 0 0", fontSize: "clamp(32px, 5.2vw, 52px)" }}
              >
                How JustEnvs{" "}
                <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                  compares
                </span>
                .
              </h1>
              <p
                className="ds-body"
                style={{
                  color: "var(--fg-secondary)",
                  maxWidth: 600,
                  margin: "20px 0 0",
                  fontSize: 16,
                  lineHeight: 1.65,
                }}
              >
                Honest, side-by-side comparisons with the tools developers use to
                manage and share secrets — including where each of them beats us.
                JustEnvs is a native Mac vault for .env files; if another tool
                fits your workflow better, these pages will tell you.
              </p>
            </div>

            <div
              className="alt-index-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 18,
                marginTop: "clamp(36px, 5vw, 56px)",
              }}
            >
              <style>{`
                @media (max-width: 860px) {
                  .alt-index-grid { grid-template-columns: 1fr !important; }
                }
              `}</style>
              {alternatives.map((a) => (
                <AltCard
                  key={a.slug}
                  slug={a.slug}
                  name={a.name}
                  segment={a.segment}
                  tagline={a.tagline}
                />
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                alignItems: "center",
                marginTop: "clamp(36px, 5vw, 56px)",
              }}
            >
              <Button variant="accent" size="lg" onClick={open}>
                <Brand name="apple" size={19} style={{ marginRight: 3, marginTop: -2 }} />
                Download for Mac
              </Button>
              <Button variant="glass" size="lg" href="/secrets-management-tool">
                What is a secrets management tool?
              </Button>
              <Button variant="glass" size="lg" href="/one-time-secret">
                One-time secret links
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer onSignup={open} />
      <SignupModal open={signup} onClose={() => setSignup(false)} />
    </>
  );
}
