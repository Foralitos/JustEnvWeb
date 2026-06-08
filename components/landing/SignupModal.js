"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import config from "@/config";
import { Logo, Button, Brand } from "./lib";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// After auth (Google round-trip or magic-link landing) the user lands on
// /welcome, which auto-triggers the .dmg download. Keeping it a dedicated page
// makes both providers converge on the same "your download is starting" UX.
const DOWNLOAD_CALLBACK = "/welcome";

export default function SignupModal({ open, onClose }) {
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (open) {
      setEmail("");
      setError("");
      setSubmitting(false);
      setSent(false);
    }
  }, [open]);

  // Already signed in → no need to log in again, just hand them the download.
  useEffect(() => {
    if (open && status === "authenticated") {
      window.location.href = config.download.dmgUrl;
      onClose();
    }
  }, [open, status, onClose]);

  if (!open) return null;

  const glass = {
    width: "min(420px, calc(100vw - 32px))",
    borderRadius: 22,
    padding: "clamp(22px, 5vw, 30px)",
    background: "color-mix(in srgb, var(--bg-surface) 55%, transparent)",
    backdropFilter: "blur(40px) saturate(180%)",
    WebkitBackdropFilter: "blur(40px) saturate(180%)",
    border: "1px solid var(--glass-border)",
    boxShadow:
      "inset 0 1px 0 0 var(--glass-highlight), 0 40px 100px -24px rgba(0,0,0,0.5)",
  };

  const handleGoogle = () => {
    setError("");
    signIn("google", { callbackUrl: DOWNLOAD_CALLBACK });
  };

  const handleMagicLink = async () => {
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setError("Enter a valid email");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await signIn("email", {
        email: trimmed,
        callbackUrl: DOWNLOAD_CALLBACK,
        redirect: false,
      });
      if (res?.error) {
        setError("Could not send the link. Try again.");
        setSubmitting(false);
      } else {
        setSent(true);
      }
    } catch {
      setError("Could not send the link. Try again.");
      setSubmitting(false);
    }
  };

  const canSubmit = email.trim().length > 0 && !submitting;

  const labelStyle = {
    fontFamily: "var(--font-sans)",
    fontSize: 12,
    color: "var(--fg-tertiary)",
    display: "block",
    marginBottom: 7,
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "color-mix(in srgb, var(--bg-base) 55%, transparent)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={glass}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 22,
          }}
        >
          <Logo size={24} />
        </div>

        {sent ? (
          <>
            <h3
              className="ds-display-lg"
              style={{
                textAlign: "center",
                margin: "0 0 6px",
                fontSize: "clamp(22px, 6vw, 28px)",
              }}
            >
              Check your email
            </h3>
            <p
              className="ds-body-sm"
              style={{ textAlign: "center", margin: "0 0 6px" }}
            >
              We sent a sign-in link to <strong>{email.trim()}</strong>.
            </p>
            <p
              className="ds-caption"
              style={{
                textAlign: "center",
                margin: "0 0 4px",
                color: "var(--fg-tertiary)",
              }}
            >
              Open it on this Mac and your download starts automatically.
            </p>
          </>
        ) : (
          <>
            <h3
              className="ds-display-lg"
              style={{
                textAlign: "center",
                margin: "0 0 6px",
                fontSize: "clamp(22px, 6vw, 28px)",
              }}
            >
              Download justenvs
            </h3>
            <p
              className="ds-body-sm"
              style={{ textAlign: "center", margin: "0 0 22px" }}
            >
              Sign in to download — free, no card, no setup call.
            </p>

            <Button
              variant="glass"
              size="lg"
              onClick={handleGoogle}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <Brand
                name="google"
                size={18}
                style={{ marginRight: 3, marginTop: -2 }}
              />
              Continue with Google
            </Button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                margin: "18px 0",
              }}
            >
              <span
                style={{ flex: 1, height: 1, background: "var(--border-default)" }}
              />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  color: "var(--fg-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                or
              </span>
              <span
                style={{ flex: 1, height: 1, background: "var(--border-default)" }}
              />
            </div>

            <label style={labelStyle}>Work email</label>
            <input
              autoFocus
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              onBlur={() => {
                const trimmed = email.trim();
                if (trimmed && !EMAIL_RE.test(trimmed)) {
                  setError("Enter a valid email");
                }
              }}
              placeholder="you@company.com"
              onKeyDown={(e) => {
                if (e.key === "Enter" && canSubmit) handleMagicLink();
              }}
              disabled={submitting}
              style={{
                width: "100%",
                boxSizing: "border-box",
                background: "var(--bg-inset)",
                border: `1px solid ${
                  error ? "var(--danger, #ff4d4f)" : "var(--border-default)"
                }`,
                borderRadius: "var(--radius-md)",
                padding: "12px 14px",
                color: "var(--fg-primary)",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                outline: "none",
                marginBottom: error ? 6 : 16,
              }}
            />
            {error && (
              <p
                className="ds-caption"
                style={{
                  color: "var(--danger, #ff4d4f)",
                  margin: "0 0 12px",
                  fontSize: 12,
                }}
              >
                {error}
              </p>
            )}
            <Button
              variant="accent"
              size="lg"
              onClick={handleMagicLink}
              disabled={!canSubmit}
              style={{
                width: "100%",
                justifyContent: "center",
                opacity: canSubmit ? 1 : 0.5,
                cursor: canSubmit ? "pointer" : "not-allowed",
              }}
            >
              {submitting ? "Sending link…" : "Email me a magic link"}
            </Button>
            <p
              className="ds-caption"
              style={{
                textAlign: "center",
                margin: "14px 0 0",
                color: "var(--fg-tertiary)",
              }}
            >
              Universal · Apple silicon & Intel · macOS 13 or later
            </p>
          </>
        )}
      </div>
    </div>
  );
}
