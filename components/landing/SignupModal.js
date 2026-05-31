"use client";

import { useState, useEffect } from "react";
import { Icon, Logo, Button, Brand } from "./lib";

export default function SignupModal({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (open) {
      setStep(0);
      setEmail("");
    }
  }, [open]);
  if (!open) return null;

  const glass = {
    width: 420,
    borderRadius: 22,
    padding: 30,
    background: "color-mix(in srgb, var(--bg-surface) 55%, transparent)",
    backdropFilter: "blur(40px) saturate(180%)",
    WebkitBackdropFilter: "blur(40px) saturate(180%)",
    border: "1px solid var(--glass-border)",
    boxShadow:
      "inset 0 1px 0 0 var(--glass-highlight), 0 40px 100px -24px rgba(0,0,0,0.5)",
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

        {step === 0 && (
          <>
            <h3
              className="ds-display-lg"
              style={{ textAlign: "center", margin: "0 0 6px", fontSize: 28 }}
            >
              Download justenv
            </h3>
            <p
              className="ds-body-sm"
              style={{ textAlign: "center", margin: "0 0 22px" }}
            >
              Drop your email and we&apos;ll send a confirmation link, then the Mac
              app. No card, no setup call.
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              onKeyDown={(e) => {
                if (e.key === "Enter" && email) setStep(1);
              }}
              style={{
                width: "100%",
                boxSizing: "border-box",
                background: "var(--bg-inset)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-md)",
                padding: "12px 14px",
                color: "var(--fg-primary)",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                outline: "none",
                marginBottom: 16,
              }}
            />
            <Button
              variant="accent"
              size="lg"
              onClick={() => email && setStep(1)}
              iconRight="arrow-right"
              style={{
                width: "100%",
                justifyContent: "center",
                opacity: email ? 1 : 0.5,
              }}
            >
              Send confirmation link
            </Button>
            <p
              className="ds-caption"
              style={{ textAlign: "center", margin: "16px 0 0" }}
            >
              By continuing you agree to our Terms & Privacy.
            </p>
          </>
        )}

        {step === 1 && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                background: "var(--accent-soft)",
                border: "1px solid var(--border-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 18px",
                color: "var(--accent)",
              }}
            >
              <Icon name="mail-check" size={27} />
            </div>
            <h3
              className="ds-display-lg"
              style={{ margin: "0 0 8px", fontSize: 26 }}
            >
              Check your inbox
            </h3>
            <p className="ds-body-sm" style={{ margin: "0 0 8px" }}>
              We sent a confirmation link to{" "}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent)",
                }}
              >
                {email || "you@company.com"}
              </span>
              .
            </p>
            <p
              className="ds-body-sm"
              style={{ margin: "0 0 24px", color: "var(--fg-tertiary)" }}
            >
              Confirm it and your free workspace is ready.
            </p>
            <Button
              variant="accent"
              size="lg"
              onClick={() => setStep(2)}
              iconLeft="check"
              style={{ width: "100%", justifyContent: "center" }}
            >
              I&apos;ve confirmed my email
            </Button>
            <p
              className="ds-caption"
              style={{ textAlign: "center", margin: "14px 0 0" }}
            >
              Didn&apos;t get it?{" "}
              <span style={{ color: "var(--accent)", cursor: "pointer" }}>
                Resend link
              </span>
            </p>
          </div>
        )}

        {step === 2 && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 18px",
                color: "var(--accent-fg)",
                boxShadow: "0 8px 32px -6px var(--accent-glow)",
              }}
            >
              <Icon name="check" size={28} strokeWidth={3} />
            </div>
            <h3
              className="ds-display-lg"
              style={{ margin: "0 0 8px", fontSize: 26 }}
            >
              You&apos;re in
            </h3>
            <p className="ds-body-sm" style={{ margin: "0 0 24px" }}>
              Your workspace is ready. Download the Mac app and start storing
              and sharing secrets — free, forever, for solo developers.
            </p>
            <Button
              variant="accent"
              size="lg"
              onClick={onClose}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <Brand
                name="apple"
                size={18}
                style={{ marginRight: 3, marginTop: -2 }}
              />
              Download for Mac
            </Button>
            <p
              className="ds-caption"
              style={{ textAlign: "center", margin: "14px 0 0" }}
            >
              Universal · Apple silicon & Intel · macOS 13 or later
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
