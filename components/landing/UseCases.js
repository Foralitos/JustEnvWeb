"use client";

import { useState } from "react";
import { Icon, Overline, GridBG } from "./lib";

function Feature({ icon, title, body }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "var(--bg-surface)" : "var(--bg-raised)",
        padding: "clamp(22px, 4vw, 28px)",
        transition: "background var(--dur-fast)",
      }}
    >
      <span
        style={{
          color: hover ? "var(--accent)" : "var(--fg-secondary)",
          display: "inline-flex",
          transition: "color var(--dur-fast)",
        }}
      >
        <Icon name={icon} size={22} />
      </span>
      <h3
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 16,
          fontWeight: 600,
          color: "var(--fg-primary)",
          margin: "16px 0 7px",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
      <p className="ds-body-sm" style={{ margin: 0 }}>
        {body}
      </p>
    </div>
  );
}

export default function UseCases() {
  const cases = [
    {
      icon: "git-branch",
      title: "Per-environment secrets",
      body: "Keep production, staging and preview separate inside the app. Switch contexts without copy-paste.",
    },
    {
      icon: "refresh-cw",
      title: "Sync with your repo",
      body: "Link a project to a folder and pull or push its .env in one click. justenvs catches edits made outside the app and shows you a diff before anything lands in your vault.",
    },
    {
      icon: "shield-check",
      title: "End-to-end encryption",
      body: "Secrets are sealed on your device before they leave it. We never see plaintext.",
    },
    {
      icon: "timer",
      title: "Self-destructing shares",
      body: "Pick a TTL — 1 hour, 1 day, or 7 days — and a view counter, or burn-after-read so the link dies the moment it's opened. Either way it deletes itself; nothing lingers in a DM.",
    },
    {
      icon: "monitor",
      title: "Native Mac app",
      body: "A fast, native macOS app that lives in your menu bar. Universal binary, macOS 13 or later.",
    },
    {
      icon: "link",
      title: "No signup to receive",
      body: "Send a link to anyone. They open it, decrypt locally in the browser, done. No account, no Slack invite.",
    },
  ];
  return (
    <section
      id="cases"
      style={{
        position: "relative",
        padding: "clamp(64px, 12vw, 104px) 0",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 960px) {
          .uc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .uc-grid { grid-template-columns: 1fr !important; }
          .uc-headline { font-size: clamp(28px, 7vw, 44px) !important; }
        }
      `}</style>
      <GridBG
        fade="radial-gradient(ellipse 90% 80% at 50% 40%, #000 35%, transparent 100%)"
        opacity={0.7}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 32px)",
        }}
      >
        <div style={{ marginBottom: "clamp(32px, 5vw, 48px)", maxWidth: 560 }}>
          <Overline>USE CASES</Overline>
          <h2 className="ds-display-lg uc-headline" style={{ margin: "14px 0 14px" }}>
            Built for the secrets you actually handle.
          </h2>
          <p className="ds-body-lg" style={{ margin: 0 }}>
            From a solo side-project to a quick handoff — justenvs keeps your
            secrets in one place and shares them without leaving a trail.
          </p>
        </div>
        <div
          className="uc-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: "var(--border-subtle)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
        >
          {cases.map((c) => (
            <Feature key={c.title} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
