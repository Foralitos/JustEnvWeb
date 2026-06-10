"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon, Button, Brand, GridBG, BrandMark, Overline } from "@/components/landing/lib";
import ThemeToggle from "@/components/landing/ThemeToggle";
import Footer from "@/components/landing/Footer";
import SignupModal from "@/components/landing/SignupModal";

/* ------------------------------------------------------------------ */
/* Self-destructing share demo — a fake share card that burns on loop. */
/* Purely decorative (aria-hidden): no real shares are created.        */
/* ------------------------------------------------------------------ */

const DEMO_ROWS = [
  { k: "DATABASE_URL", v: "postgres://acme:s3cr3t@db.acme.dev:5432" },
  { k: "STRIPE_SECRET_KEY", v: "sk_live_51Hx2eL9aQ7vN3mKp0wZ" },
  { k: "JWT_SECRET", v: "9f4b1c2aa7d34e0f8c6b5a1d2e3f4a5b" },
];

// live: link just arrived → view: recipient opens it → burn: rows redact → gone: destroyed
const PHASES = [
  { id: "live", ms: 3200 },
  { id: "view", ms: 2400 },
  { id: "burn", ms: 1500 },
  { id: "gone", ms: 3000 },
];

function Pill({ tone = "neutral", children }) {
  const tones = {
    neutral: {
      background: "var(--glass-fill)",
      borderColor: "var(--border-default)",
      color: "var(--fg-secondary)",
    },
    accent: {
      background: "var(--accent-soft)",
      borderColor: "var(--border-accent)",
      color: "var(--accent)",
    },
    danger: {
      background: "rgba(242,85,90,0.10)",
      borderColor: "rgba(242,85,90,0.40)",
      color: "var(--danger)",
    },
  };
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        padding: "4px 10px",
        borderRadius: "var(--radius-full)",
        border: "1px solid",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        whiteSpace: "nowrap",
        ...tones[tone],
      }}
    >
      {children}
    </span>
  );
}

function redact(value) {
  return "▓".repeat(Math.min(value.length, 26));
}

function BurnDemo() {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [countdown, setCountdown] = useState(47);
  const phase = PHASES[phaseIdx].id;

  useEffect(() => {
    const t = setTimeout(() => {
      setPhaseIdx((i) => {
        const next = (i + 1) % PHASES.length;
        if (next === 0) setCountdown(47);
        return next;
      });
    }, PHASES[phaseIdx].ms);
    return () => clearTimeout(t);
  }, [phaseIdx]);

  useEffect(() => {
    if (phase === "gone") return;
    const t = setInterval(() => setCountdown((s) => Math.max(s - 1, 0)), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const burned = phase === "burn" || phase === "gone";
  const revealed = phase === "view";

  return (
    <div
      aria-hidden
      className="ds-glass burn-demo"
      style={{
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        boxShadow: burned
          ? "var(--elev-3), 0 0 70px -30px rgba(242,85,90,0.35)"
          : "var(--elev-3), 0 0 70px -34px var(--accent-glow)",
        background: "color-mix(in srgb, var(--bg-surface) 55%, transparent)",
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
        transition: "box-shadow 600ms var(--ease-out)",
      }}
    >
      <style>{`
        .burn-demo .burn-value { transition: color 480ms var(--ease-out), opacity 480ms var(--ease-out), letter-spacing 480ms var(--ease-out); }
        .burn-demo .burn-row-1 .burn-value { transition-delay: 0ms; }
        .burn-demo .burn-row-2 .burn-value { transition-delay: 140ms; }
        .burn-demo .burn-row-3 .burn-value { transition-delay: 280ms; }
        @keyframes burnPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        .burn-demo .burn-dot { animation: burnPulse 1.6s ease-in-out infinite; }
        @media (max-width: 720px) {
          .burn-demo .burn-chrome { flex-wrap: wrap; gap: 10px; padding: 11px 12px; }
          .burn-demo .burn-url { font-size: 10px; }
          .burn-demo .burn-row { padding: 13px 14px; }
          .burn-demo .burn-key { width: 130px; font-size: 12px; }
          .burn-demo .burn-value { font-size: 11px; }
        }
      `}</style>

      {/* chrome bar: traffic lights + fake share URL */}
      <div
        className="burn-chrome"
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
          className="burn-url"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--fg-tertiary)",
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Icon name="lock" size={12} />
          justenvs.app/s/Kx9f…#k=•••••
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 7 }}>
          {phase === "gone" ? (
            <Pill tone="danger">
              <Icon name="flame" size={11} />
              burned
            </Pill>
          ) : (
            <>
              <Pill tone={phase === "burn" ? "danger" : "accent"}>
                <Icon name="eye" size={11} />
                {phase === "burn" || phase === "view" ? "0 views left" : "1 view left"}
              </Pill>
              <Pill tone="neutral">
                <Icon name="timer" size={11} />
                {countdown}s
              </Pill>
            </>
          )}
        </div>
      </div>

      {/* body: env rows that redact themselves, then the destroyed state */}
      {phase === "gone" ? (
        <div
          style={{
            padding: "42px 24px 46px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            textAlign: "center",
          }}
        >
          <span
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(242,85,90,0.10)",
              border: "1px solid rgba(242,85,90,0.40)",
              color: "var(--danger)",
            }}
          >
            <Icon name="flame" size={24} />
          </span>
          <span className="ds-h3" style={{ fontWeight: 600 }}>
            This link no longer exists
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--fg-tertiary)",
            }}
          >
            viewed once · ciphertext deleted · nothing to recover
          </span>
        </div>
      ) : (
        <div>
          {DEMO_ROWS.map((row, i) => (
            <div
              key={row.k}
              className={`burn-row burn-row-${i + 1}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "13px 18px",
                borderBottom:
                  i < DEMO_ROWS.length - 1 ? "1px solid var(--border-subtle)" : "none",
              }}
            >
              <span
                className="burn-key"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: burned ? "var(--fg-quaternary)" : "var(--accent)",
                  width: 190,
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  transition: "color 480ms var(--ease-out)",
                }}
              >
                {row.k}
              </span>
              <span
                className="burn-value"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  flex: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: burned
                    ? "var(--fg-quaternary)"
                    : revealed
                    ? "var(--fg-primary)"
                    : "var(--fg-tertiary)",
                  opacity: burned ? 0.55 : 1,
                  letterSpacing: revealed ? 0 : "1px",
                }}
              >
                {burned ? redact(row.v) : revealed ? row.v : "••••••••••••••••••••"}
              </span>
            </div>
          ))}
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
            <span
              className="burn-dot"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: phase === "burn" ? "var(--danger)" : "var(--accent)",
                transition: "background 300ms",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--fg-secondary)",
              }}
            >
              {phase === "burn"
                ? "burn after reading — destroying share…"
                : phase === "view"
                ? "recipient is viewing · last view"
                : "end-to-end encrypted · burn after reading"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function SectionShell({ children, style }) {
  return (
    <section style={{ position: "relative", padding: "clamp(56px, 9vw, 110px) 0", ...style }}>
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

const STEPS = [
  {
    icon: "lock",
    n: "01",
    title: "Encrypt on your Mac",
    body: "Pick the variables you want to share inside the JustEnvs app. They're encrypted locally with AES-GCM before a single byte leaves your machine.",
  },
  {
    icon: "link",
    n: "02",
    title: "Send the one-time link",
    body: "You get a single URL. The decryption key rides in the #fragment — the part of a link browsers never send to any server. We only ever store ciphertext.",
  },
  {
    icon: "flame",
    n: "03",
    title: "It destroys itself",
    body: "Burn after reading, a view limit, or an expiry timer — whichever hits first deletes the share permanently. There is nothing to un-delete.",
  },
];

const GUARANTEES = [
  {
    icon: "eye-off",
    title: "Zero-knowledge by design",
    body: "The server stores ciphertext it cannot open. The key never leaves the link's #fragment, so we couldn't read your secrets if we wanted to.",
  },
  {
    icon: "globe",
    title: "Decrypts in the browser",
    body: "Recipients open the link anywhere — decryption happens client-side with WebCrypto. Nothing to install on their end.",
  },
  {
    icon: "monitor-smartphone",
    title: "Created only in the app",
    body: "Shares can only be created from the JustEnvs Mac app, never from a web form. Your plaintext stays on hardware you control.",
  },
  {
    icon: "shield",
    title: "Anonymous & rate-limited",
    body: "No account needed to open a share. Creation and viewing are rate-limited, and links use 256-bit unguessable tokens.",
  },
];

const CONTROLS = [
  {
    icon: "flame",
    title: "Burn after reading",
    body: "One view and the secret is gone forever.",
    mono: "views: 1",
  },
  {
    icon: "eye",
    title: "View limits",
    body: "Allow exactly 1 or 5 views. Then it's gone.",
    mono: "views: 1 | 5",
  },
  {
    icon: "timer",
    title: "Expiry timer",
    body: "Links live 1 hour, 1 day, or 7 days. Then they don't.",
    mono: "ttl: 1h | 1d | 7d",
  },
  {
    icon: "file-lock",
    title: "Room for real configs",
    body: "Share a whole .env, not just one password.",
    mono: "payload: ≤ 64KB",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="ds-glass"
      style={{
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "18px 20px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <h3
          className="ds-body-lg"
          style={{ margin: 0, fontWeight: 600, color: "var(--fg-primary)" }}
        >
          {q}
        </h3>
        <Icon
          name="plus"
          size={17}
          color="var(--fg-tertiary)"
          style={{
            flexShrink: 0,
            transform: open ? "rotate(45deg)" : "none",
            transition: "transform var(--dur-fast) var(--ease-out)",
          }}
        />
      </button>
      {open && (
        <p
          className="ds-body"
          style={{
            margin: 0,
            padding: "0 20px 20px",
            color: "var(--fg-secondary)",
            maxWidth: 720,
          }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function ShareLanding({ faqs }) {
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
            aria-hidden
            style={{
              position: "absolute",
              top: 320,
              right: "6%",
              width: 420,
              height: 420,
              background:
                "radial-gradient(circle at center, rgba(242,85,90,0.05), transparent 70%)",
              pointerEvents: "none",
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

            <div
              className="share-hero-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
                gap: "clamp(32px, 5vw, 64px)",
                alignItems: "center",
                marginTop: "clamp(40px, 7vw, 84px)",
              }}
            >
              <style>{`
                @media (max-width: 860px) {
                  .share-hero-grid { grid-template-columns: 1fr !important; }
                }
              `}</style>
              <div>
                <Overline>One-time secret links</Overline>
                <h1
                  className="ds-display-xl"
                  style={{ margin: "14px 0 0", fontSize: "clamp(34px, 5.6vw, 56px)" }}
                >
                  One-time secrets that{" "}
                  <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                    delete themselves
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
                    margin: "24px 0 0",
                  }}
                >
                  Share environment variables and API keys with a{" "}
                  <span style={{ color: "var(--fg-primary)" }}>
                    self-destructing link
                  </span>{" "}
                  — end-to-end encrypted, burned after reading, gone forever.
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
                  <Button variant="glass" size="lg" href="/security">
                    <Icon name="shield" size={16} style={{ marginRight: 2 }} />
                    Security model
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
              <BurnDemo />
            </div>
          </div>
        </section>

        {/* ---------- How it works ---------- */}
        <SectionShell>
          <GridBG fade="radial-gradient(ellipse 70% 80% at 50% 50%, #000 30%, transparent 100%)" opacity={0.5} />
          <div style={{ position: "relative", textAlign: "center", marginBottom: "clamp(36px, 5vw, 56px)" }}>
            <Overline>How it works</Overline>
            <h2 className="ds-display-lg" style={{ margin: "14px 0 0", fontSize: "clamp(30px, 4.4vw, 44px)" }}>
              A self-destructing link in three steps
            </h2>
          </div>
          <div
            className="share-steps"
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 18,
            }}
          >
            <style>{`
              @media (max-width: 860px) {
                .share-steps { grid-template-columns: 1fr !important; }
              }
            `}</style>
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="ds-glass"
                style={{ borderRadius: "var(--radius-xl)", padding: "26px 24px" }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span
                    className="ds-glass"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "var(--radius-md)",
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
                      fontSize: 12,
                      color: "var(--fg-quaternary)",
                    }}
                  >
                    {s.n}
                  </span>
                </div>
                <h3 className="ds-h3" style={{ margin: "20px 0 8px", fontWeight: 600 }}>
                  {s.title}
                </h3>
                <p className="ds-body-sm" style={{ margin: 0, color: "var(--fg-secondary)" }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </SectionShell>

        {/* ---------- Zero-knowledge guarantees ---------- */}
        <SectionShell>
          <div
            className="share-guarantees"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 5fr) minmax(0, 7fr)",
              gap: "clamp(32px, 5vw, 72px)",
              alignItems: "start",
            }}
          >
            <style>{`
              @media (max-width: 860px) {
                .share-guarantees { grid-template-columns: 1fr !important; }
                .share-guarantees .guarantee-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
            <div>
              <Overline>Zero-knowledge</Overline>
              <h2 className="ds-display-lg" style={{ margin: "14px 0 0", fontSize: "clamp(30px, 4.4vw, 44px)" }}>
                Encrypted env sharing the server can&apos;t peek at
              </h2>
              <p className="ds-body" style={{ color: "var(--fg-secondary)", margin: "18px 0 0", maxWidth: 420 }}>
                Most &ldquo;secret sharing&rdquo; tools ask you to paste your secrets into a
                web page —{" "}
                <Link href="/alternatives/onetimesecret" style={{ color: "var(--accent)" }}>
                  OneTimeSecret
                </Link>{" "}
                included. JustEnvs never sees plaintext: encryption happens on
                your Mac, decryption in the recipient&apos;s browser. Read the full{" "}
                <a href="/security" style={{ color: "var(--accent)" }}>
                  security model
                </a>
                .
              </p>
            </div>
            <div
              className="guarantee-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 18,
              }}
            >
              {GUARANTEES.map((g) => (
                <div key={g.title} style={{ padding: "6px 0" }}>
                  <span style={{ color: "var(--accent)", display: "inline-flex" }}>
                    <Icon name={g.icon} size={19} />
                  </span>
                  <h3 className="ds-body-lg" style={{ margin: "12px 0 6px", fontWeight: 600 }}>
                    {g.title}
                  </h3>
                  <p className="ds-body-sm" style={{ margin: 0, color: "var(--fg-secondary)" }}>
                    {g.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionShell>

        {/* ---------- Controls ---------- */}
        <SectionShell>
          <div style={{ textAlign: "center", marginBottom: "clamp(36px, 5vw, 56px)" }}>
            <Overline>You control the burn</Overline>
            <h2 className="ds-display-lg" style={{ margin: "14px 0 0", fontSize: "clamp(30px, 4.4vw, 44px)" }}>
              Burn after reading, on your terms
            </h2>
          </div>
          <div
            className="share-controls"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 18,
            }}
          >
            <style>{`
              @media (max-width: 1020px) {
                .share-controls { grid-template-columns: repeat(2, 1fr) !important; }
              }
              @media (max-width: 560px) {
                .share-controls { grid-template-columns: 1fr !important; }
              }
            `}</style>
            {CONTROLS.map((c) => (
              <div
                key={c.title}
                className="ds-glass"
                style={{
                  borderRadius: "var(--radius-xl)",
                  padding: "24px 22px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <span style={{ color: "var(--accent)", display: "inline-flex" }}>
                  <Icon name={c.icon} size={20} />
                </span>
                <h3 className="ds-body-lg" style={{ margin: "8px 0 0", fontWeight: 600 }}>
                  {c.title}
                </h3>
                <p className="ds-body-sm" style={{ margin: 0, color: "var(--fg-secondary)", flex: 1 }}>
                  {c.body}
                </p>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--fg-tertiary)",
                    background: "var(--bg-inset)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-full)",
                    padding: "4px 10px",
                    alignSelf: "flex-start",
                    marginTop: 6,
                  }}
                >
                  {c.mono}
                </span>
              </div>
            ))}
          </div>
        </SectionShell>

        {/* ---------- FAQ ---------- */}
        <SectionShell>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "clamp(32px, 4vw, 48px)" }}>
              <Overline>FAQ</Overline>
              <h2 className="ds-display-lg" style={{ margin: "14px 0 0", fontSize: "clamp(30px, 4.4vw, 44px)" }}>
                One-time secret links, answered
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {faqs.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </SectionShell>
      </main>

      <Footer onSignup={open} />
      <SignupModal open={signup} onClose={() => setSignup(false)} />
    </>
  );
}
