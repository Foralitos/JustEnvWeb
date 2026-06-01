"use client";

import { useEffect, useMemo, useState } from "react";
import {
  b64urlDecode,
  aesGcmOpen,
  importAesGcmKey,
  bytesToUtf8,
} from "@/libs/share/webcrypto";
import { Icon, GridBG, Overline, BrandMark } from "@/components/landing/lib";
import ThemeToggle from "@/components/landing/ThemeToggle";

const STATE = {
  LOADING: "loading",
  ERROR: "error",
  READY: "ready",
};

const ERROR_VISUALS = {
  gone: { icon: "clock-alert", headline: "This share has expired" },
  not_found: { icon: "search-x", headline: "Share not found" },
  rate_limited: { icon: "gauge", headline: "Too many requests" },
  decrypt: { icon: "key-round", headline: "Decryption failed" },
  no_key: { icon: "key-round", headline: "Missing decryption key" },
  network: { icon: "wifi-off", headline: "Could not reach the server" },
  server: { icon: "server-crash", headline: "Server error" },
};

function formatCountdown(secondsLeft) {
  if (secondsLeft <= 0) return "expired";
  const s = secondsLeft % 60;
  const m = Math.floor(secondsLeft / 60) % 60;
  const h = Math.floor(secondsLeft / 3600) % 24;
  const d = Math.floor(secondsLeft / 86400);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function needsQuoting(v) {
  return /[\s"'#\\]/.test(v) || v === "" || v.startsWith(" ") || v.endsWith(" ");
}

function envBlock(vars) {
  return Object.entries(vars)
    .map(([k, v]) => `${k}=${needsQuoting(v) ? JSON.stringify(v) : v}`)
    .join("\n");
}

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

function GlassCard({ children, style }) {
  return (
    <div
      className="share-card"
      style={{
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        boxShadow: "var(--elev-3), 0 0 70px -34px var(--accent-glow)",
        background: "color-mix(in srgb, var(--bg-surface) 55%, transparent)",
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
        border: "1px solid var(--glass-border)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function SharePage({ params }) {
  const [token, setToken] = useState(null);
  const [state, setState] = useState(STATE.LOADING);
  const [error, setError] = useState(null);
  const [payload, setPayload] = useState(null);
  const [meta, setMeta] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(null);
  const [revealed, setRevealed] = useState({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Promise.resolve(params).then((p) => setToken(p.token));
  }, [params]);

  useEffect(() => {
    if (!token) return;

    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    const hashParams = new URLSearchParams(hash);
    const keyParam = hashParams.get("k");

    if (!keyParam) {
      setError({ kind: "no_key", message: "This link is missing its decryption key." });
      setState(STATE.ERROR);
      return;
    }

    let cancelled = false;

    (async () => {
      let res;
      try {
        res = await fetch(`/api/share/${token}`, { cache: "no-store" });
      } catch {
        if (!cancelled) {
          setError({ kind: "network", message: "Could not reach the share server." });
          setState(STATE.ERROR);
        }
        return;
      }

      if (res.status === 410) {
        if (!cancelled) {
          setError({
            kind: "gone",
            message: "This link has expired or was already consumed.",
          });
          setState(STATE.ERROR);
        }
        return;
      }
      if (res.status === 404) {
        if (!cancelled) {
          setError({ kind: "not_found", message: "Share not found." });
          setState(STATE.ERROR);
        }
        return;
      }
      if (res.status === 429) {
        if (!cancelled) {
          setError({ kind: "rate_limited", message: "Too many requests. Try again later." });
          setState(STATE.ERROR);
        }
        return;
      }
      if (!res.ok) {
        if (!cancelled) {
          setError({ kind: "server", message: "Server error. Try again later." });
          setState(STATE.ERROR);
        }
        return;
      }

      const data = await res.json();

      try {
        const keyBytes = b64urlDecode(keyParam);
        const key = await importAesGcmKey(keyBytes);
        const plainBytes = await aesGcmOpen(data.ciphertext, key);
        const json = JSON.parse(bytesToUtf8(plainBytes));
        if (cancelled) return;
        setPayload(json);
        setMeta({
          viewsRemaining: data.viewsRemaining,
          ttl: data.ttl,
          openedAt: Date.now(),
        });
        setSecondsLeft(Number(data.ttl));
        setState(STATE.READY);
      } catch {
        if (!cancelled) {
          setError({
            kind: "decrypt",
            message: "Could not decrypt. The key is wrong or the payload is corrupted.",
          });
          setState(STATE.ERROR);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  useEffect(() => {
    if (state !== STATE.READY || !meta) return;
    const tick = () => {
      const elapsed = Math.floor((Date.now() - meta.openedAt) / 1000);
      setSecondsLeft(Math.max(0, meta.ttl - elapsed));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [state, meta]);

  const dotenv = useMemo(() => (payload ? envBlock(payload.vars) : ""), [payload]);

  const copyDotenv = async () => {
    try {
      await navigator.clipboard.writeText(dotenv);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API can fail without document focus or permission; best-effort.
    }
  };

  const expired = secondsLeft !== null && secondsLeft <= 0;
  const lowViews = meta?.viewsRemaining === 1;

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingTop: "clamp(24px, 4vw, 40px)",
        paddingBottom: "clamp(40px, 6vw, 64px)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <GridBG />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -200,
          left: "10%",
          width: 720,
          height: 460,
          background:
            "radial-gradient(ellipse at center, rgba(56,224,138,0.09), transparent 68%)",
          pointerEvents: "none",
          filter: "blur(20px)",
        }}
      />

      <style>{`
        @media (max-width: 720px) {
          .share-card .env-chrome { gap: 10px; flex-wrap: wrap; padding: 11px 12px; }
          .share-card .env-chrome .env-filename { font-size: 11px; }
          .share-card .env-row { padding: 14px 14px; flex-wrap: wrap; gap: 4px; position: relative; }
          .share-card .env-row .env-key { width: auto; flex: 1 1 100%; padding-right: 36px; }
          .share-card .env-row .env-value { flex: 1 1 100%; font-size: 12px; }
          .share-card .env-row .env-eye { position: absolute; right: 12px; top: 12px; }
          .share-card .env-footer { padding: 11px 14px; flex-wrap: wrap; gap: 6px; }
        }
        @keyframes share-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.85); }
        }
        .share-skeleton {
          background: linear-gradient(
            90deg,
            var(--bg-inset) 0%,
            color-mix(in srgb, var(--bg-inset) 60%, var(--fg-quaternary)) 50%,
            var(--bg-inset) 100%
          );
          background-size: 200% 100%;
          animation: share-shimmer 1.4s ease-in-out infinite;
          border-radius: var(--radius-sm);
        }
        @keyframes share-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 740,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 40px)",
          flex: 1,
          display: "flex",
          flexDirection: "column",
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
          <BrandMark href="/" />
          <ThemeToggle />
        </div>

        <div style={{ marginTop: "clamp(40px, 7vw, 64px)" }}>
          {state === STATE.LOADING && <LoadingView />}
          {state === STATE.ERROR && <ErrorView error={error} />}
          {state === STATE.READY && (
            <ReadyView
              payload={payload}
              meta={meta}
              secondsLeft={secondsLeft}
              expired={expired}
              lowViews={lowViews}
              revealed={revealed}
              setRevealed={setRevealed}
              copied={copied}
              onCopy={copyDotenv}
            />
          )}
        </div>

        <footer
          style={{
            marginTop: "auto",
            paddingTop: 48,
            textAlign: "center",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-quaternary)",
            letterSpacing: "0.02em",
          }}
        >
          justenv · the server never read this payload
        </footer>
      </div>
    </main>
  );
}

function LoadingView() {
  return (
    <>
      <Overline>DECRYPTING…</Overline>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "clamp(28px, 4.4vw, 38px)",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: "var(--fg-primary)",
          margin: "10px 0 0",
        }}
      >
        Opening the envelope…
      </h1>
      <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
        <div className="share-skeleton" style={{ height: 22, width: 140 }} />
        <div className="share-skeleton" style={{ height: 22, width: 100 }} />
      </div>

      <GlassCard style={{ marginTop: 32 }}>
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
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
              <span
                key={c}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: c,
                  opacity: 0.5,
                  boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.2)",
                }}
              />
            ))}
          </div>
          <div className="share-skeleton" style={{ height: 14, width: 120 }} />
        </div>
        <div>
          {[180, 220, 160, 200].map((w, i) => (
            <div
              key={i}
              className="env-row"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 18px",
                borderBottom:
                  i < 3 ? "1px solid var(--border-subtle)" : "none",
              }}
            >
              <div
                className="share-skeleton"
                style={{ height: 12, width: 140, flexShrink: 0 }}
              />
              <div
                className="share-skeleton"
                style={{ height: 12, width: w, flex: 1, maxWidth: w }}
              />
            </div>
          ))}
        </div>
      </GlassCard>
    </>
  );
}

function ErrorView({ error }) {
  const visual = ERROR_VISUALS[error?.kind] || ERROR_VISUALS.server;
  return (
    <>
      <Overline>UNAVAILABLE</Overline>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "clamp(28px, 4.4vw, 38px)",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: "var(--fg-primary)",
          margin: "10px 0 0",
        }}
      >
        {visual.headline}
      </h1>

      <GlassCard style={{ marginTop: 32 }}>
        <div
          style={{
            padding: "44px 28px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "var(--radius-full)",
              background: "rgba(242,85,90,0.08)",
              border: "1px solid rgba(242,85,90,0.30)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--danger)",
            }}
          >
            <Icon name={visual.icon} size={26} />
          </div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13.5,
              lineHeight: 1.55,
              color: "var(--fg-secondary)",
              margin: 0,
              maxWidth: 380,
            }}
          >
            {error?.message}
          </p>
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
          <Icon name="lock" size={14} color="var(--fg-tertiary)" />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--fg-secondary)",
            }}
          >
            End-to-end encrypted
          </span>
        </div>
      </GlassCard>
    </>
  );
}

function ReadyView({
  payload,
  meta,
  secondsLeft,
  expired,
  lowViews,
  revealed,
  setRevealed,
  copied,
  onCopy,
}) {
  const entries = Object.entries(payload.vars);
  const hasViewLimit =
    meta?.viewsRemaining !== null && meta?.viewsRemaining !== undefined;

  return (
    <>
      <Overline>SHARED ENV</Overline>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "clamp(30px, 5vw, 44px)",
          lineHeight: 1.1,
          letterSpacing: "-0.022em",
          color: "var(--fg-primary)",
          margin: "10px 0 0",
        }}
      >
        <span style={{ color: "var(--fg-tertiary)" }}>#</span>
        {payload.project}
        <span style={{ color: "var(--fg-tertiary)", margin: "0 0.35em" }}>/</span>
        <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
          {payload.env}
        </span>
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginTop: 18,
        }}
      >
        <Pill tone={expired ? "danger" : "accent"}>
          <Icon
            name={expired ? "clock-alert" : "timer"}
            size={12}
            strokeWidth={2}
          />
          {expired ? "expired" : `expires in ${formatCountdown(secondsLeft)}`}
        </Pill>
        {hasViewLimit && (
          <Pill tone={lowViews ? "danger" : "neutral"}>
            <Icon name="eye" size={12} strokeWidth={2} />
            {meta.viewsRemaining} {meta.viewsRemaining === 1 ? "view" : "views"} left
          </Pill>
        )}
      </div>

      <GlassCard style={{ marginTop: 28 }}>
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
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
              <span
                key={c}
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
            {payload.project}/.env
          </span>
          <button
            type="button"
            onClick={onCopy}
            disabled={expired}
            style={{
              marginLeft: "auto",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              padding: "4px 10px",
              borderRadius: "var(--radius-full)",
              cursor: expired ? "not-allowed" : "pointer",
              border: "1px solid",
              transition: "all var(--dur-fast) var(--ease-out)",
              background: copied ? "var(--accent-soft)" : "transparent",
              borderColor: copied ? "var(--border-accent)" : "var(--border-default)",
              color: copied
                ? "var(--accent)"
                : expired
                ? "var(--fg-quaternary)"
                : "var(--fg-secondary)",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              opacity: expired ? 0.5 : 1,
            }}
          >
            <Icon name={copied ? "check" : "copy"} size={12} strokeWidth={2} />
            {copied ? "Copied" : "Copy .env"}
          </button>
        </div>

        <div>
          {entries.map(([k, v], i) => {
            const show = revealed[k];
            const displayValue = show
              ? needsQuoting(v)
                ? JSON.stringify(v)
                : v
              : "•".repeat(Math.min(16, Math.max(6, v.length)));
            return (
              <div
                key={k}
                className="env-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 18px",
                  borderBottom:
                    i < entries.length - 1
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
                  title={k}
                >
                  {k}
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
                  title={show ? v : undefined}
                >
                  {displayValue}
                </span>
                <button
                  className="env-eye"
                  type="button"
                  onClick={() =>
                    setRevealed((r) => ({ ...r, [k]: !show }))
                  }
                  aria-label={show ? `Hide ${k}` : `Reveal ${k}`}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--fg-tertiary)",
                    display: "inline-flex",
                    padding: 4,
                    transition: "color var(--dur-fast) var(--ease-out)",
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
          <Icon name="lock" size={14} color="var(--fg-tertiary)" />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--fg-secondary)",
            }}
          >
            End-to-end encrypted · {entries.length}{" "}
            {entries.length === 1 ? "variable" : "variables"}
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: expired ? "var(--danger)" : "var(--accent)",
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
                background: expired ? "var(--danger)" : "var(--accent)",
                animation: expired ? "none" : "share-pulse 1.6s ease-in-out infinite",
              }}
            />
            {expired ? "expired" : "live"}
          </span>
        </div>
      </GlassCard>
    </>
  );
}
