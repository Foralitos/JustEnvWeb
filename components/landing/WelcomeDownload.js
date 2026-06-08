"use client";

import { useEffect } from "react";
import config from "@/config";
import { Logo, Button } from "./lib";

// Renders on /welcome after a successful sign-in (Google or magic link).
// Auto-kicks the .dmg download once, and offers a manual fallback link.
export default function WelcomeDownload() {
  useEffect(() => {
    const t = setTimeout(() => {
      window.location.href = config.download.dmgUrl;
    }, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        padding: 24,
        textAlign: "center",
      }}
    >
      <Logo size={28} />
      <h1
        className="ds-display-lg"
        style={{ margin: "8px 0 0", fontSize: "clamp(24px, 6vw, 34px)" }}
      >
        Your download is starting…
      </h1>
      <p
        className="ds-body-sm"
        style={{ margin: 0, maxWidth: 420, color: "var(--fg-secondary)" }}
      >
        You&apos;re signed in. If the download didn&apos;t begin automatically,
        use the button below.
      </p>
      <Button
        variant="accent"
        size="lg"
        href={config.download.dmgUrl}
        style={{ marginTop: 6 }}
      >
        Download for Mac
      </Button>
      <p
        className="ds-caption"
        style={{ margin: "4px 0 0", color: "var(--fg-tertiary)" }}
      >
        Universal · Apple silicon &amp; Intel · macOS 13 or later
      </p>
      <Button variant="ghost" size="md" href="/" style={{ marginTop: 10 }}>
        ← Back to justenvs.app
      </Button>
    </main>
  );
}
