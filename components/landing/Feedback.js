"use client";

import { useState } from "react";
import apiClient from "@/libs/api";
import config from "@/config";
import { Button, Overline, GridBG, Icon } from "./lib";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE = 2000;

export default function Feedback() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const recipient = config.resend.supportEmail;

  const handleSubmit = async () => {
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setError("Tell us what's on your mind");
      return;
    }
    if (!EMAIL_RE.test(trimmedEmail)) {
      setError("Enter a valid email so we can reply");
      return;
    }
    if (trimmedMessage.length > MAX_MESSAGE) {
      setError(`Keep it under ${MAX_MESSAGE} characters`);
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await apiClient.post("/feedback", {
        email: trimmedEmail,
        message: trimmedMessage,
      });
      setSent(true);
      setMessage("");
      setEmail("");
    } catch {
      // apiClient already surfaces the error via sileo
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit =
    message.trim().length > 0 && email.trim().length > 0 && !submitting;

  const fieldBase = {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--bg-inset)",
    border: `1px solid ${
      error ? "var(--danger, #ff4d4f)" : "var(--border-default)"
    }`,
    borderRadius: "var(--radius-md)",
    color: "var(--fg-primary)",
    outline: "none",
    transition: "border-color var(--dur-fast) var(--ease-out)",
  };

  const labelStyle = {
    fontFamily: "var(--font-sans)",
    fontSize: 12,
    color: "var(--fg-tertiary)",
    display: "block",
    marginBottom: 7,
    letterSpacing: "-0.005em",
  };

  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(64px, 12vw, 104px) 0",
        overflow: "hidden",
        background: "var(--bg-base)",
      }}
    >
      <GridBG
        fade="radial-gradient(ellipse 70% 60% at 80% 20%, #000 30%, transparent 100%)"
        size={56}
        opacity={0.55}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-10%",
          right: "-10%",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56, 224, 138, 0.18) 0%, transparent 65%)",
          pointerEvents: "none",
          filter: "blur(20px)",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 32px)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 5fr) minmax(0, 6fr)",
          gap: "clamp(32px, 6vw, 72px)",
          alignItems: "center",
        }}
        className="feedback-grid"
      >
        {/* Left column: intro */}
        <div>
          <Overline>FEEDBACK · DIRECT LINE</Overline>
          <h2
            className="ds-display-lg"
            style={{
              margin: "14px 0 18px",
              fontSize: "clamp(34px, 5.5vw, 52px)",
              letterSpacing: "-0.018em",
            }}
          >
            What should we{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--accent)",
                fontFamily: "var(--font-display)",
              }}
            >
              build
            </em>{" "}
            next?
          </h2>
          <p
            className="ds-body"
            style={{
              color: "var(--fg-secondary)",
              maxWidth: 440,
              margin: "0 0 22px",
            }}
          >
            Bugs, missing tools, an integration you wish existed — it lands
            directly in Fora&rsquo;s inbox. No tickets, no triage.
          </p>
          {recipient && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                background: "var(--accent-soft)",
                border: "1px solid var(--border-accent)",
                borderRadius: "var(--radius-full)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--accent)",
                letterSpacing: "-0.005em",
              }}
            >
              <Icon name="arrow-right" size={13} />
              {recipient}
            </div>
          )}
        </div>

        {/* Right column: form card */}
        <div
          className="ds-glass"
          style={{
            borderRadius: "var(--radius-xl)",
            padding: "clamp(22px, 3.5vw, 32px)",
          }}
        >
          {sent ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 14,
                padding: "8px 0",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "var(--accent-soft)",
                  border: "1px solid var(--border-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent)",
                }}
              >
                <Icon name="check" size={22} strokeWidth={2} />
              </div>
              <h3
                className="ds-h2"
                style={{ margin: 0, color: "var(--fg-primary)" }}
              >
                Got it. Fora reads every one.
              </h3>
              <p
                className="ds-body-sm"
                style={{ margin: 0, color: "var(--fg-secondary)" }}
              >
                You&rsquo;ll hear back at the email you left, usually within a
                day or two.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  marginTop: 4,
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--accent)",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Send another →
              </button>
            </div>
          ) : (
            <>
              <label htmlFor="feedback-message" style={labelStyle}>
                Your feedback
              </label>
              <textarea
                id="feedback-message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (error) setError("");
                }}
                placeholder="// what's on your mind?"
                rows={5}
                maxLength={MAX_MESSAGE}
                disabled={submitting}
                style={{
                  ...fieldBase,
                  padding: "14px 16px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  resize: "vertical",
                  minHeight: 120,
                  marginBottom: 16,
                }}
              />

              <label htmlFor="feedback-email" style={labelStyle}>
                Reply to
              </label>
              <input
                id="feedback-email"
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
                    setError("Enter a valid email so we can reply");
                  }
                }}
                placeholder="you@company.com"
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    canSubmit &&
                    e.target.tagName !== "TEXTAREA"
                  ) {
                    handleSubmit();
                  }
                }}
                disabled={submitting}
                style={{
                  ...fieldBase,
                  padding: "12px 14px",
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  marginBottom: error ? 8 : 18,
                }}
              />

              {error && (
                <p
                  className="ds-caption"
                  style={{
                    color: "var(--danger, #ff4d4f)",
                    margin: "0 0 14px",
                    fontSize: 12,
                  }}
                >
                  {error}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 14,
                  flexWrap: "wrap",
                }}
              >
                <span
                  className="ds-caption"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--fg-tertiary)",
                    fontSize: 11,
                  }}
                >
                  {message.length}/{MAX_MESSAGE}
                </span>
                <Button
                  variant="accent"
                  size="lg"
                  onClick={handleSubmit}
                  iconRight="send"
                  style={{
                    opacity: canSubmit ? 1 : 0.5,
                    cursor: canSubmit ? "pointer" : "not-allowed",
                  }}
                >
                  {submitting ? "Sending…" : "Send feedback"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .feedback-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
