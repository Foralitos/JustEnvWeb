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
        padding: 28,
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
      body: "Separate production, staging, and preview. Promote a value upstream when it's ready.",
    },
    {
      icon: "shield-check",
      title: "End-to-end encryption",
      body: "Secrets are sealed with your team key before they leave your machine. We never see plaintext.",
    },
    {
      icon: "history",
      title: "Versioned & auditable",
      body: "Every change is logged. Roll back a bad value and see who touched what, when.",
    },
    {
      icon: "refresh-cw",
      title: "One-click rotation",
      body: "Rotate a key and everyone on your team gets the new value instantly — no stale secrets left behind.",
    },
    {
      icon: "monitor",
      title: "Native Mac app",
      body: "A fast, native macOS app for your whole team. Quick access from the menu bar — nothing to configure.",
    },
    {
      icon: "user-plus",
      title: "Granular access",
      body: "Invite by environment. Read-only for contractors, full access for the core team.",
    },
  ];
  return (
    <section
      id="cases"
      style={{ position: "relative", padding: "104px 0", overflow: "hidden" }}
    >
      <GridBG
        fade="radial-gradient(ellipse 90% 80% at 50% 40%, #000 35%, transparent 100%)"
        opacity={0.7}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        <div style={{ marginBottom: 48, maxWidth: 560 }}>
          <Overline>USE CASES</Overline>
          <h2 className="ds-display-lg" style={{ margin: "14px 0 14px" }}>
            Built for the way teams actually ship.
          </h2>
          <p className="ds-body-lg" style={{ margin: 0 }}>
            From a solo side-project to a 50-person engineering org — justenv
            scales with how you manage secrets.
          </p>
        </div>
        <div
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
