"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Logo, Button, Brand } from "@/components/landing/lib";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ERROR_MESSAGES = {
  OAuthAccountNotLinked:
    "That email is already linked to a different sign-in method.",
  Verification: "That sign-in link is invalid or has expired.",
  default: "Something went wrong. Please try again.",
};

export default function SignInForm({ callbackUrl = "/dashboard", error }) {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleGoogle = () => {
    setFieldError("");
    signIn("google", { callbackUrl });
  };

  const handleMagicLink = async () => {
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setFieldError("Enter a valid email");
      return;
    }
    setFieldError("");
    setSubmitting(true);
    try {
      const res = await signIn("email", { email: trimmed, callbackUrl, redirect: false });
      if (res?.error) {
        setFieldError("Could not send the link. Try again.");
        setSubmitting(false);
      } else {
        setSent(true);
      }
    } catch {
      setFieldError("Could not send the link. Try again.");
      setSubmitting(false);
    }
  };

  const canSubmit = email.trim().length > 0 && !submitting;
  const topError = error ? ERROR_MESSAGES[error] || ERROR_MESSAGES.default : "";

  const glass = {
    width: "min(420px, calc(100vw - 32px))",
    borderRadius: 22,
    padding: "clamp(26px, 5vw, 34px)",
    background: "color-mix(in srgb, var(--bg-surface) 60%, transparent)",
    backdropFilter: "blur(40px) saturate(180%)",
    WebkitBackdropFilter: "blur(40px) saturate(180%)",
    border: "1px solid var(--glass-border)",
    boxShadow:
      "inset 0 1px 0 0 var(--glass-highlight), 0 40px 100px -24px rgba(0,0,0,0.5)",
  };

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 720,
          height: 320,
          background:
            "radial-gradient(ellipse at center, rgba(56,224,138,0.12), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={glass}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
          <Logo size={24} />
        </div>

        {sent ? (
          <>
            <h1
              className="ds-display-lg"
              style={{ textAlign: "center", margin: "0 0 6px", fontSize: "clamp(22px, 6vw, 28px)" }}
            >
              Check your email
            </h1>
            <p className="ds-body-sm" style={{ textAlign: "center", margin: "0 0 6px" }}>
              We sent a sign-in link to <strong>{email.trim()}</strong>.
            </p>
            <p
              className="ds-caption"
              style={{ textAlign: "center", margin: 0, color: "var(--fg-tertiary)" }}
            >
              It expires shortly and can only be used once.
            </p>
          </>
        ) : (
          <>
            <h1
              className="ds-display-lg"
              style={{ textAlign: "center", margin: "0 0 6px", fontSize: "clamp(22px, 6vw, 28px)" }}
            >
              Sign in to JustEnvs
            </h1>
            <p
              className="ds-body-sm"
              style={{ textAlign: "center", margin: "0 0 22px" }}
            >
              Access your account and unlock Pro.
            </p>

            {topError && (
              <p
                className="ds-caption"
                style={{
                  textAlign: "center",
                  margin: "0 0 16px",
                  color: "var(--danger, #ff4d4f)",
                }}
              >
                {topError}
              </p>
            )}

            <Button
              variant="glass"
              size="lg"
              onClick={handleGoogle}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <Brand name="google" size={18} style={{ marginRight: 3, marginTop: -2 }} />
              Continue with Google
            </Button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0" }}>
              <span style={{ flex: 1, height: 1, background: "var(--border-default)" }} />
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
              <span style={{ flex: 1, height: 1, background: "var(--border-default)" }} />
            </div>

            <label
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 12,
                color: "var(--fg-tertiary)",
                display: "block",
                marginBottom: 7,
              }}
            >
              Work email
            </label>
            <input
              autoFocus
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldError) setFieldError("");
              }}
              onBlur={() => {
                const trimmed = email.trim();
                if (trimmed && !EMAIL_RE.test(trimmed)) setFieldError("Enter a valid email");
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
                  fieldError ? "var(--danger, #ff4d4f)" : "var(--border-default)"
                }`,
                borderRadius: "var(--radius-md)",
                padding: "12px 14px",
                color: "var(--fg-primary)",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                outline: "none",
                marginBottom: fieldError ? 6 : 16,
              }}
            />
            {fieldError && (
              <p
                className="ds-caption"
                style={{ color: "var(--danger, #ff4d4f)", margin: "0 0 12px", fontSize: 12 }}
              >
                {fieldError}
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
          </>
        )}

        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
          <Button variant="ghost" size="sm" href="/">
            ← Back to justenvs.app
          </Button>
        </div>
      </div>
    </main>
  );
}
