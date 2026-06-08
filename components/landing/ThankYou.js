"use client";

import config from "@/config";
import { Logo, Button, Brand, GridBG, Icon } from "./lib";

// Public success page shown after a completed Stripe checkout (guest checkout —
// the buyer may not be logged in). The webhook flips hasAccess in the
// background; this page just confirms the purchase and routes to the download.
export default function ThankYou() {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 24,
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <GridBG fade="radial-gradient(ellipse 70% 80% at 50% 40%, #000 30%, transparent 100%)" />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "38%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 700,
          height: 320,
          background:
            "radial-gradient(ellipse at center, rgba(56,224,138,0.16), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 460 }}>
        <span
          style={{
            width: 56,
            height: 56,
            borderRadius: "var(--radius-full)",
            background: "var(--accent-soft)",
            border: "1px solid var(--border-accent)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--accent)",
            marginBottom: 20,
          }}
        >
          <Icon name="check" size={28} strokeWidth={2.5} />
        </span>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <Logo size={24} />
        </div>

        <h1
          className="ds-display-lg"
          style={{ margin: "0 0 10px", fontSize: "clamp(28px, 7vw, 40px)" }}
        >
          You&apos;re Pro now.
        </h1>
        <p
          className="ds-body-lg"
          style={{ margin: "0 auto 6px", maxWidth: 400, color: "var(--fg-secondary)" }}
        >
          Payment confirmed — thank you for backing JustEnvs. Your unlimited
          access is activating on your account.
        </p>
        <p
          className="ds-caption"
          style={{ margin: "0 0 26px", color: "var(--fg-tertiary)" }}
        >
          A receipt is on its way to your email.
        </p>

        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button variant="accent" size="lg" href={config.download.dmgUrl}>
            <Brand name="apple" size={17} style={{ marginRight: 3, marginTop: -2 }} />
            Download for Mac
          </Button>
          <Button variant="ghost" size="lg" href="/">
            ← Back to justenvs.app
          </Button>
        </div>
      </div>
    </main>
  );
}
