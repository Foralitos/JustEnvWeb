"use client";

import { Logo, Button, Brand, GridBG } from "./lib";

export default function Footer({ onSignup }) {
  const cols = [
    { h: "Product", items: ["Overview", "How it works", "Changelog", "Status"] },
    {
      h: "Developers",
      items: ["Docs", "Integrations", "Security", "Roadmap", "Open source"],
    },
    { h: "Company", items: ["About", "Blog", "Careers", "Security", "Contact"] },
  ];
  return (
    <footer
      style={{
        position: "relative",
        borderTop: "1px solid var(--border-subtle)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", padding: "96px 0", overflow: "hidden" }}>
        <GridBG fade="radial-gradient(ellipse 60% 120% at 50% 50%, #000 20%, transparent 100%)" />
        <div
          style={{
            position: "relative",
            maxWidth: 720,
            margin: "0 auto",
            padding: "0 32px",
            textAlign: "center",
          }}
        >
          <h2 className="ds-display-lg" style={{ margin: 0 }}>
            Keep your secrets where they belong.
          </h2>
          <p
            className="ds-body-lg"
            style={{ margin: "16px auto 32px", maxWidth: 460 }}
          >
            Download the Mac app, store your team&apos;s secrets, and stop sharing them
            in unsafe places. Free for solo developers.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <Button variant="accent" size="lg" onClick={onSignup}>
              <Brand
                name="apple"
                size={18}
                style={{ marginRight: 3, marginTop: -2 }}
              />
              Download for Mac
            </Button>
          </div>
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid var(--border-subtle)",
          padding: "56px 0 40px",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "0 32px",
            display: "grid",
            gridTemplateColumns: "1.6fr repeat(3, 1fr)",
            gap: 32,
          }}
        >
          <div>
            <Logo size={22} />
            <p
              className="ds-body-sm"
              style={{ margin: "16px 0 0", maxWidth: 240 }}
            >
              The secure home for your environment variables.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h4
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--fg-primary)",
                  margin: "0 0 14px",
                }}
              >
                {c.h}
              </h4>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {c.items.map((it) => (
                  <a
                    key={it}
                    href="#"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      color: "var(--fg-tertiary)",
                      textDecoration: "none",
                      transition: "color var(--dur-fast)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--fg-primary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--fg-tertiary)")
                    }
                  >
                    {it}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            maxWidth: 1120,
            margin: "40px auto 0",
            padding: "24px 32px 0",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className="ds-caption">© 2026 justenv, Inc. All rights reserved.</span>
          <div style={{ display: "flex", gap: 16 }}>
            <a
              href="#"
              style={{ color: "var(--fg-tertiary)", display: "inline-flex" }}
            >
              <Brand name="github" size={17} />
            </a>
            <a
              href="#"
              style={{ color: "var(--fg-tertiary)", display: "inline-flex" }}
            >
              <Brand name="x" size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
