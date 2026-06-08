"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Logo, Button, Icon } from "@/components/landing/lib";

export default function SignOutForm({ callbackUrl = "/" }) {
  const [busy, setBusy] = useState(false);

  const glass = {
    width: "min(420px, calc(100vw - 32px))",
    borderRadius: 22,
    padding: "clamp(28px, 5vw, 36px)",
    background: "color-mix(in srgb, var(--bg-surface) 60%, transparent)",
    backdropFilter: "blur(40px) saturate(180%)",
    WebkitBackdropFilter: "blur(40px) saturate(180%)",
    border: "1px solid var(--glass-border)",
    boxShadow:
      "inset 0 1px 0 0 var(--glass-highlight), 0 40px 100px -24px rgba(0,0,0,0.5)",
    textAlign: "center",
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
            "radial-gradient(ellipse at center, rgba(56,224,138,0.10), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={glass}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          <span
            style={{
              width: 52,
              height: 52,
              borderRadius: "var(--radius-full)",
              background: "var(--bg-inset)",
              border: "1px solid var(--border-default)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--fg-secondary)",
            }}
          >
            <Icon name="log-out" size={24} />
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          <Logo size={22} />
        </div>

        <h1
          className="ds-display-lg"
          style={{ margin: "0 0 8px", fontSize: "clamp(22px, 6vw, 28px)" }}
        >
          Sign out?
        </h1>
        <p
          className="ds-body-sm"
          style={{ margin: "0 0 26px", color: "var(--fg-secondary)" }}
        >
          You&rsquo;ll need to sign in again to get back into your account.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Button
            variant="accent"
            size="lg"
            onClick={() => {
              setBusy(true);
              signOut({ callbackUrl });
            }}
            disabled={busy}
            style={{
              width: "100%",
              justifyContent: "center",
              opacity: busy ? 0.6 : 1,
              cursor: busy ? "not-allowed" : "pointer",
            }}
          >
            {busy ? "Signing out…" : "Sign out"}
          </Button>
          <Button
            variant="glass"
            size="lg"
            href="/"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </main>
  );
}
