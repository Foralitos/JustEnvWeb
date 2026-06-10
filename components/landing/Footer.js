"use client";

import { useState } from "react";
import { Button, Brand, Logo } from "./lib";

const STAGE_BG = "#1C3A2C";
const BAR_FG_DIM = "rgba(255,255,255,0.55)";
const BAR_FG_BRIGHT = "rgba(255,255,255,0.92)";
const BAR_BORDER = "rgba(255,255,255,0.10)";

function FooterDevice({ onDownload }) {
  return (
    <div
      className="footer-device"
      style={{
        position: "relative",
        zIndex: 1,
        width: "min(520px, calc(100% - 32px))",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
        background: "rgba(0,0,0,0.28)",
        backdropFilter: "blur(28px) saturate(170%)",
        WebkitBackdropFilter: "blur(28px) saturate(170%)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 24,
        padding: 14,
        gap: 14,
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.55), inset 0 1px 0 0 rgba(255,255,255,0.14)",
      }}
    >
      {/* Left: app-icon-as-texture (the justenvs mark centered, soft halo) */}
      <div
        style={{
          position: "relative",
          background: "rgba(0,0,0,0.45)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 14,
          padding: 16,
          minHeight: 152,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* soft green halo behind the icon */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 50%, rgba(56,224,138,0.22), transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", transform: "scale(1.05)" }}>
          <Logo size={44} showWord={false} />
        </div>
      </div>

      {/* Right: screen with CTA */}
      <div
        style={{
          background: "rgba(0,0,0,0.55)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 14,
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: 152,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
          }}
        >
          Ready
        </div>
        <Button
          variant="accent"
          size="md"
          onClick={onDownload}
          style={{
            width: "100%",
            justifyContent: "center",
            padding: "11px 14px",
            fontSize: 14,
          }}
        >
          <Brand
            name="apple"
            size={16}
            style={{ marginRight: 3, marginTop: -2 }}
          />
          Download
        </Button>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "rgba(255,255,255,0.40)",
            textAlign: "center",
          }}
        >
          macOS 13+
        </div>
      </div>
    </div>
  );
}

function BigSignature({ children }) {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        left: "50%",
        bottom: "-9%",
        transform: "translateX(-50%)",
        fontFamily: "var(--font-display)",
        fontWeight: 500,
        fontSize: "min(440px, 38vw)",
        lineHeight: 1,
        letterSpacing: "-0.04em",
        whiteSpace: "nowrap",
        userSelect: "none",
        pointerEvents: "none",
        zIndex: 0,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.06) 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </span>
  );
}

function BarLink({ href = "#", children }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: hover ? BAR_FG_BRIGHT : BAR_FG_DIM,
        textDecoration: "none",
        transition: "color var(--dur-fast)",
      }}
    >
      {children}
    </a>
  );
}

function SocialIcon({ name, href = "#", size = 15 }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        color: hover ? BAR_FG_BRIGHT : BAR_FG_DIM,
        transition: "color var(--dur-fast)",
      }}
    >
      <Brand name={name} size={size} />
    </a>
  );
}

export default function Footer({ onSignup }) {
  return (
    <footer style={{ background: STAGE_BG, color: "#FFFFFF" }}>
      <style>{`
        @media (max-width: 480px) {
          .footer-device { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .footer-bar { padding: 20px 16px !important; gap: 14px !important; }
        }
      `}</style>
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "clamp(420px, 60vw, 540px)",
          padding: "clamp(64px, 12vw, 96px) 0 clamp(20px, 8vw, 60px)",
        }}
      >
        {/* ambient glow behind the device */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "18%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 300,
            background:
              "radial-gradient(ellipse at center, rgba(56,224,138,0.12), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {/* faint grid for texture (very low opacity) */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.4,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px)," +
              "linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 80% at 50% 30%, #000 30%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 70% 80% at 50% 30%, #000 30%, transparent 100%)",
          }}
        />

        <FooterDevice onDownload={onSignup} />
        <BigSignature>justenvs</BigSignature>
      </section>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          borderTop: `1px solid ${BAR_BORDER}`,
        }}
      >
        <div
          className="footer-bar"
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "22px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: BAR_FG_DIM,
            }}
          >
            © 2026 justenvs, Inc. All rights reserved.
          </span>
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              flexWrap: "wrap",
            }}
          >
            <BarLink href="/one-time-secret">One-Time Secret</BarLink>
            <BarLink href="/secrets-management-tool">Secrets Manager</BarLink>
            <BarLink href="/alternatives">Compare</BarLink>
            <BarLink href="/tos">Terms</BarLink>
            <BarLink href="/privacy-policy">Privacy</BarLink>
            <BarLink href="/security">Security</BarLink>
            <BarLink href="/changelog">Changelog</BarLink>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <SocialIcon
              name="github"
              href="https://github.com/Foralitos"
              size={16}
            />
            <SocialIcon
              name="x"
              href="https://x.com/ElforaDev"
              size={14}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
