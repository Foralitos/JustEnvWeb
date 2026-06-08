"use client";

import { useEffect, useState } from "react";
import { Logo, Button, Icon } from "@/components/landing/lib";

// Hands the signed token back to the native app via the custom URL scheme.
// We do this client-side (not a server redirect) because next/navigation's
// redirect() targets HTTP and the justenv:// scheme handoff is more reliable
// from window.location. A manual fallback button is always shown.
export default function AppAuthRedirect({ token, state }) {
  const [opened, setOpened] = useState(false);

  const deeplink = `justenv://auth?token=${encodeURIComponent(token)}${
    state ? `&state=${encodeURIComponent(state)}` : ""
  }`;

  useEffect(() => {
    const t = setTimeout(() => {
      window.location.href = deeplink;
      setOpened(true);
    }, 400);
    return () => clearTimeout(t);
  }, [deeplink]);

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
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "38%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 680,
          height: 300,
          background:
            "radial-gradient(ellipse at center, rgba(56,224,138,0.14), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 440 }}>
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
            marginBottom: 18,
          }}
        >
          <Icon name="check" size={26} strokeWidth={2.5} />
        </span>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <Logo size={24} />
        </div>

        <h1
          className="ds-display-lg"
          style={{ margin: "0 0 10px", fontSize: "clamp(26px, 6vw, 36px)" }}
        >
          You&apos;re signed in.
        </h1>
        <p
          className="ds-body-lg"
          style={{ margin: "0 auto 24px", maxWidth: 380, color: "var(--fg-secondary)" }}
        >
          {opened
            ? "Returning you to the JustEnv app — you can close this tab."
            : "Opening the JustEnv app…"}
        </p>

        <Button
          variant="accent"
          size="lg"
          href={deeplink}
          style={{ justifyContent: "center" }}
        >
          Open JustEnv
        </Button>
      </div>
    </main>
  );
}
