"use client";

import { useState } from "react";
import { Icon, Logo, Button, Brand, GridBG } from "./lib";

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
      className="ds-glass"
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
      <div
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

function PromoCard() {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 22,
        padding: "16px 16px 16px 24px",
        borderRadius: "var(--radius-2xl)",
        background:
          "linear-gradient(135deg, rgba(56,224,138,0.10), rgba(56,224,138,0.03))",
        border: "1px solid var(--border-accent)",
        backdropFilter: "blur(28px) saturate(170%)",
        WebkitBackdropFilter: "blur(28px) saturate(170%)",
        boxShadow:
          "inset 0 1px 0 0 var(--glass-highlight), var(--elev-2), 0 0 60px -28px var(--accent-glow)",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            color: "var(--fg-secondary)",
            lineHeight: 1.35,
          }}
        >
          Introducing
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 22,
            color: "var(--fg-primary)",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          Team&nbsp;sync
        </div>
      </div>
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: "relative",
          width: 124,
          height: 70,
          flexShrink: 0,
          cursor: "pointer",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          border: "1px solid var(--border-strong)",
          background:
            "repeating-linear-gradient(135deg, rgba(56,224,138,0.16) 0 2px, transparent 2px 9px), var(--bg-inset)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          transition: "transform var(--dur-fast) var(--ease-out)",
          transform: hover ? "scale(1.03)" : "none",
        }}
      >
        <span
          style={{
            width: 34,
            height: 34,
            borderRadius: "var(--radius-full)",
            background: "var(--glass-fill)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--fg-primary)",
          }}
        >
          <Icon name="play" size={15} style={{ marginLeft: 2 }} />
        </span>
        <span
          style={{
            position: "absolute",
            bottom: 5,
            left: 7,
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: "var(--fg-tertiary)",
            letterSpacing: "0.04em",
          }}
        >
          watch demo
        </span>
      </button>
    </div>
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
        fontSize: "min(340px, 27vw)",
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
        opacity: 0.85,
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
        paddingTop: 40,
        paddingBottom: 64,
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
          padding: "0 40px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ paddingTop: 8 }}>
          <BrandMark />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 48,
            flexWrap: "wrap",
            marginTop: 44,
          }}
        >
          <div style={{ maxWidth: 620, flex: "1 1 480px" }}>
            <h1 className="ds-display-xl" style={{ margin: 0, fontSize: 60 }}>
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
              <Button variant="accent" size="lg" onClick={onSignup}>
                <Brand
                  name="apple"
                  size={18}
                  style={{ marginRight: 3, marginTop: -2 }}
                />
                Download for Mac
              </Button>
              <Button variant="glass" size="lg" iconLeft="book-open">
                Read the docs
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
          <div style={{ flex: "0 1 auto" }}>
            <PromoCard />
          </div>
        </div>

        <div
          id="product"
          style={{
            position: "relative",
            flex: 1,
            minHeight: 440,
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
