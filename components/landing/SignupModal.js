"use client";

import { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import config from "@/config";
import { Logo, Button, Brand } from "./lib";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setEmail("");
      setError("");
      setSubmitting(false);
    }
  }, [open]);

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

  const handleSubmit = async () => {
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setError("Enter a valid email");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await apiClient.post("/lead", { email: trimmed });
      window.location.href = config.download.dmgUrl;
      onClose();
    } catch {
      setSubmitting(false);
    }
  };

  const canSubmit = email.trim().length > 0 && !submitting;

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

        <h3
          className="ds-display-lg"
          style={{
            textAlign: "center",
            margin: "0 0 6px",
            fontSize: "clamp(22px, 6vw, 28px)",
          }}
        >
          Download justenv
        </h3>
        <p
          className="ds-body-sm"
          style={{ textAlign: "center", margin: "0 0 22px" }}
        >
          Drop your email and download the Mac app. No card, no setup call.
        </p>
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
            if (e.key === "Enter" && canSubmit) handleSubmit();
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
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            width: "100%",
            justifyContent: "center",
            opacity: canSubmit ? 1 : 0.5,
            cursor: canSubmit ? "pointer" : "not-allowed",
          }}
        >
          <Brand
            name="apple"
            size={18}
            style={{ marginRight: 3, marginTop: -2 }}
          />
          {submitting ? "Preparing download…" : "Download for Mac"}
        </Button>
        <p
          className="ds-caption"
          style={{ textAlign: "center", margin: "14px 0 0" }}
        >
          Universal · Apple silicon & Intel · macOS 13 or later
        </p>
      </div>
    </div>
  );
}
