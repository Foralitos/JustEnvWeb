"use client";

import { useState } from "react";
import { Icon, Logo, Button, Brand, GridBG } from "./lib";
import ThemeToggle from "./ThemeToggle";

function EnvPreview() {
  const [env, setEnv] = useState("production");
  const [revealed, setRevealed] = useState({});
  const data = {
    production: [
      { k: "DATABASE_URL", v: "postgres://acme:••••@db.acme.dev:5432/main" },
      { k: "STRIPE_SECRET_KEY", v: "sk_live_51Hx2eL9aQ7vN3mKp0wZ" },
      { k: "NEXT_PUBLIC_API_URL", v: "https://api.acme.dev" },
      { k: "REDIS_URL", v: "rediss://default:••••@cache.acme.dev:6379" },
    ],
    staging: [
      { k: "DATABASE_URL", v: "postgres://acme:••••@db.staging.dev:5432/main" },
      { k: "STRIPE_SECRET_KEY", v: "sk_test_51Hx2eL9aQ7vN3mKp0wZ" },
      { k: "NEXT_PUBLIC_API_URL", v: "https://api.staging.dev" },
    ],
  };
  const tabs = [
    { id: "production", label: "production" },
    { id: "staging", label: "staging" },
  ];
  return (
    <div
      className="ds-glass env-preview"
      style={{
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        boxShadow: "var(--elev-3), 0 0 70px -34px var(--accent-glow)",
        background:
          "color-mix(in srgb, var(--bg-surface) 55%, transparent)",
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
      }}
    >
      <style>{`
        @media (max-width: 720px) {
          .env-preview .env-chrome { gap: 10px; flex-wrap: wrap; padding: 11px 12px; }
          .env-preview .env-chrome .env-filename { font-size: 11px; }
          .env-preview .env-row { padding: 14px 14px; flex-wrap: wrap; gap: 4px; position: relative; }
          .env-preview .env-row .env-key { width: auto; flex: 1 1 100%; padding-right: 36px; }
          .env-preview .env-row .env-value { flex: 1 1 100%; font-size: 12px; }
          .env-preview .env-row .env-eye { position: absolute; right: 12px; top: 12px; }
          .env-preview .env-footer { padding: 11px 14px; flex-wrap: wrap; gap: 6px; }
        }
      `}</style>
      <div
        className="env-chrome"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "13px 16px",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
            <span
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: c,
                boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.2)",
              }}
            />
          ))}
        </div>
        <span
          className="env-filename"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--fg-tertiary)",
          }}
        >
          acme-app / .env
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setEnv(t.id)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
                border: "1px solid",
                transition: "all var(--dur-fast)",
                background: env === t.id ? "var(--accent-soft)" : "transparent",
                borderColor:
                  env === t.id ? "var(--border-accent)" : "var(--border-default)",
                color: env === t.id ? "var(--accent)" : "var(--fg-tertiary)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        {data[env].map((row, i) => {
          const show = revealed[env + row.k];
          return (
            <div
              key={row.k}
              className="env-row"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 18px",
                borderBottom:
                  i < data[env].length - 1
                    ? "1px solid var(--border-subtle)"
                    : "none",
              }}
            >
              <span
                className="env-key"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--accent)",
                  width: 200,
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {row.k}
              </span>
              <span
                className="env-value"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: show ? "var(--fg-primary)" : "var(--fg-tertiary)",
                  flex: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  letterSpacing: show ? 0 : "1px",
                }}
              >
                {show ? row.v : "••••••••••••••••"}
              </span>
              <button
                className="env-eye"
                onClick={() =>
                  setRevealed((r) => ({ ...r, [env + row.k]: !show }))
                }
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--fg-tertiary)",
                  display: "inline-flex",
                  padding: 4,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--fg-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--fg-tertiary)")
                }
              >
                <Icon name={show ? "eye-off" : "eye"} size={15} />
              </button>
            </div>
          );
        })}
      </div>
      <div
        className="env-footer"
        style={{
          padding: "11px 18px",
          borderTop: "1px solid var(--border-subtle)",
          background: "var(--bg-inset)",
          display: "flex",
          alignItems: "center",
          gap: 9,
        }}
      >
        <Icon name="users" size={14} color="var(--fg-tertiary)" />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--fg-secondary)",
          }}
        >
          Shared with 6 teammates · {env}
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--accent)",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--accent)",
            }}
          />
          synced
        </span>
      </div>
    </div>
  );
}

function BrandMark() {
  return (
    <a
      href="#top"
      style={{
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
      }}
    >
      <Logo size={19} />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.07em",
          color: "var(--accent)",
          background: "var(--accent-soft)",
          border: "1px solid var(--border-accent)",
          padding: "2px 7px",
          borderRadius: "var(--radius-full)",
          textTransform: "uppercase",
        }}
      >
        Beta
      </span>
    </a>
  );
}

function BigWord({ children }) {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        fontFamily: "var(--font-display)",
        fontWeight: 500,
        fontStyle: "normal",
        fontSize: "min(440px, 34vw)",
        lineHeight: 1,
        letterSpacing: "-0.04em",
        whiteSpace: "nowrap",
        userSelect: "none",
        pointerEvents: "none",
        zIndex: 0,
        background:
          "linear-gradient(180deg, var(--fg-primary) 0%, var(--fg-tertiary) 38%, var(--fg-quaternary) 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        filter: "drop-shadow(0 18px 50px rgba(0,0,0,0.30))",
        opacity: 0.95,
      }}
    >
      {children}
    </span>
  );
}

export default function Hero({ onSignup }) {
  return (
    <section
      id="top"
      style={{
        position: "relative",
        paddingTop: "clamp(24px, 4vw, 40px)",
        paddingBottom: "clamp(40px, 6vw, 64px)",
        overflow: "hidden",
        minHeight: "94vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <GridBG />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -180,
          left: "12%",
          width: 720,
          height: 460,
          background:
            "radial-gradient(ellipse at center, rgba(56,224,138,0.09), transparent 68%)",
          pointerEvents: "none",
          filter: "blur(20px)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 360,
          right: "8%",
          width: 460,
          height: 460,
          background:
            "radial-gradient(circle at center, rgba(91,168,245,0.07), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 40px)",
          flex: 1,
          display: "flex",
          flexDirection: "column",
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
          <BrandMark />
          <ThemeToggle />
        </div>

        <div style={{ maxWidth: 620, marginTop: 44 }}>
            <h1 className="ds-display-xl" style={{ margin: 0, fontSize: "clamp(36px, 7vw, 60px)" }}>
              Your environment variables,
              <br />
              finally in{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                one safe place
              </span>
              .
            </h1>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 15,
                lineHeight: 1.65,
                color: "var(--fg-secondary)",
                maxWidth: 460,
                margin: "26px 0 0",
              }}
            >
              Stop pasting{" "}
              <span style={{ color: "var(--fg-primary)" }}>.env</span> files
              into Slack. Store your secrets once and share them with your team —{" "}
              <span style={{ color: "var(--fg-primary)" }}>
                encrypted end&#8209;to&#8209;end
              </span>
              , never in a DM.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                marginTop: 32,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="accent"
                size="lg"
                onClick={onSignup}
                style={{
                  padding: "clamp(12px, 2.4vw, 15px) clamp(20px, 4vw, 28px)",
                  fontSize: "clamp(14px, 1.7vw, 16px)",
                }}
              >
                <Brand
                  name="apple"
                  size={19}
                  style={{ marginRight: 3, marginTop: -2 }}
                />
                Download for Mac
              </Button>
            </div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--fg-tertiary)",
                margin: "18px 0 0",
                letterSpacing: "0.01em",
              }}
            >
              Free for solo developers · macOS 13 or later
            </p>
        </div>

        <div
          id="product"
          style={{
            position: "relative",
            flex: 1,
            minHeight: 480,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 24,
          }}
        >
          <BigWord>justenv</BigWord>
          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: 740,
            }}
          >
            <EnvPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
