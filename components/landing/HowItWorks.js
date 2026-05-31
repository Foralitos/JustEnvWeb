"use client";

import { Icon, Overline, GridBG } from "./lib";

export default function HowItWorks() {
  const steps = [
    {
      n: "01",
      icon: "import",
      title: "Store your .env",
      body: "Paste a file or add keys one by one. Values are encrypted on your device before they ever reach our servers.",
    },
    {
      n: "02",
      icon: "users",
      title: "Share with your team",
      body: "Invite a workspace or a single teammate. Grant per-environment access — no more secrets in DMs.",
    },
    {
      n: "03",
      icon: "refresh-cw",
      title: "Stay in sync",
      body: "Update or rotate a secret and your whole team gets the new value instantly. No more out-of-date .env files.",
    },
  ];
  return (
    <section
      id="how"
      style={{
        position: "relative",
        padding: "clamp(64px, 12vw, 104px) 0",
        overflow: "hidden",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <style>{`
        @media (max-width: 720px) {
          .hiw-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          .hiw-headline { font-size: clamp(28px, 7vw, 44px) !important; }
        }
      `}</style>
      <GridBG fade="radial-gradient(ellipse 70% 90% at 50% 50%, #000 30%, transparent 100%)" />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 700,
          height: 300,
          background:
            "radial-gradient(ellipse at center, rgba(56,224,138,0.10), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 32px)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "clamp(36px, 6vw, 56px)" }}>
          <Overline>HOW IT WORKS</Overline>
          <h2 className="ds-display-lg hiw-headline" style={{ margin: "14px 0 0" }}>
            Three steps. Zero copy-paste.
          </h2>
        </div>
        <div
          className="hiw-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {steps.map((s) => (
            <div
              key={s.n}
              className="ds-glass"
              style={{
                borderRadius: "var(--radius-lg)",
                padding: "clamp(20px, 4vw, 26px)",
                background: "var(--glass-fill)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "var(--radius-md)",
                    background: "var(--accent-soft)",
                    border: "1px solid var(--border-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent)",
                  }}
                >
                  <Icon name={s.icon} size={20} />
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    color: "var(--fg-quaternary)",
                    fontWeight: 600,
                  }}
                >
                  {s.n}
                </span>
              </div>
              <h3 className="ds-h3" style={{ margin: "20px 0 8px", fontWeight: 600 }}>
                {s.title}
              </h3>
              <p className="ds-body-sm" style={{ margin: 0 }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
