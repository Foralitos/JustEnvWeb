"use client";

import { Icon, Overline, Brand } from "./lib";

function ToolCard({ tool, accent, file, vars, glyph, brand }) {
  return (
    <div
      className="ds-glass"
      style={{
        width: 320,
        flexShrink: 0,
        borderRadius: "var(--radius-lg)",
        padding: 18,
        background: "var(--glass-fill)",
        whiteSpace: "normal",
      }}
    >
      <div
        style={{
          background: "var(--bg-inset)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-md)",
          padding: "12px 14px",
          fontFamily: "var(--font-mono)",
          fontSize: 12.5,
          lineHeight: 1.7,
          minHeight: 70,
        }}
      >
        <div style={{ color: "var(--fg-tertiary)" }}># {file}</div>
        {vars.map((k) => (
          <div
            key={k}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ color: "var(--accent)" }}>{k}</span>
            <span style={{ color: "var(--fg-quaternary)" }}>=</span>
            <span style={{ color: "var(--fg-tertiary)", letterSpacing: "1px" }}>
              ••••••••
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          marginTop: 14,
        }}
      >
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: "var(--radius-sm)",
            background: "var(--bg-overlay)",
            border: "1px solid var(--border-default)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: accent || "var(--fg-secondary)",
          }}
        >
          {brand ? <Brand name={brand} size={14} /> : <Icon name={glyph} size={15} />}
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            fontWeight: 500,
            color: "var(--fg-primary)",
          }}
        >
          {tool}
        </span>
      </div>
    </div>
  );
}

export default function ToolsCarousel() {
  const rowA = [
    { tool: "Next.js", glyph: "triangle", file: "next.js / .env", vars: ["DATABASE_URL", "NEXTAUTH_SECRET"] },
    { tool: "Vercel", brand: "vercel", accent: "var(--fg-primary)", file: "vercel / .env", vars: ["BLOB_READ_TOKEN", "EDGE_CONFIG"] },
    { tool: "Docker", glyph: "box", file: "docker / .env", vars: ["POSTGRES_PASSWORD", "REDIS_URL"] },
    { tool: "GitHub Actions", brand: "github", file: "ci / .env", vars: ["NPM_TOKEN", "DEPLOY_KEY"] },
    { tool: "Node.js", glyph: "hexagon", file: "node / .env", vars: ["PORT", "JWT_SECRET"] },
  ];
  const rowB = [
    { tool: "Python", brand: "python", accent: "var(--info)", file: "django / .env", vars: ["SECRET_KEY", "DATABASE_URL"] },
    { tool: "Kubernetes", glyph: "anchor", file: "k8s / .env", vars: ["TLS_CERT", "API_TOKEN"] },
    { tool: "Fly.io", glyph: "rocket", file: "fly / .env", vars: ["FLY_API_TOKEN", "DATABASE_URL"] },
    { tool: "Supabase", glyph: "database", file: "supabase / .env", vars: ["SUPABASE_URL", "SERVICE_ROLE_KEY"] },
    { tool: "Stripe", glyph: "credit-card", file: "payments / .env", vars: ["STRIPE_SECRET_KEY", "WEBHOOK_SECRET"] },
  ];
  const Row = ({ items, dir }) => (
    <div
      style={{
        display: "flex",
        overflow: "hidden",
        maskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 16,
          paddingRight: 16,
          width: "max-content",
          animation: `${dir} 38s linear infinite`,
        }}
      >
        {[...items, ...items].map((it, i) => (
          <ToolCard key={i} {...it} />
        ))}
      </div>
    </div>
  );
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(64px, 12vw, 104px) 0",
        overflow: "hidden",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <style>{`
        @media (max-width: 720px) {
          .tools-headline { font-size: clamp(28px, 7vw, 44px) !important; }
        }
      `}</style>
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 800,
          height: 320,
          background:
            "radial-gradient(ellipse at center, rgba(56,224,138,0.08), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 32px)",
          textAlign: "center",
          marginBottom: "clamp(32px, 5vw, 48px)",
        }}
      >
        <Overline>THE .ENV FORMAT YOU ALREADY USE</Overline>
        <h2
          className="ds-display-lg tools-headline"
          style={{ margin: "14px auto 14px", maxWidth: 640 }}
        >
          Every .env you already write.
        </h2>
        <p className="ds-body-lg" style={{ margin: "0 auto", maxWidth: 520 }}>
          If your stack reads a{" "}
          <code
            style={{ fontFamily: "var(--font-mono)", color: "var(--fg-primary)" }}
          >
            .env
          </code>
          , justenv works with it. Store them locally in the app, share them
          with encrypted links when you need to hand off.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Row items={rowA} dir="marquee-l" />
        <Row items={rowB} dir="marquee-r" />
      </div>
    </section>
  );
}
