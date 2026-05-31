import Link from "next/link";
import { Icon, GridBG } from "./lib";

export default function DocLayout({
  eyebrow,
  title,
  effectiveDate,
  version,
  toc = [],
  wide = false,
  children,
}) {
  const hasToc = toc.length > 0;
  const contentMaxWidth = wide || !hasToc ? 880 : 640;
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingBottom: 96,
        overflow: "hidden",
      }}
    >
      {/* faint grid at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 480,
          pointerEvents: "none",
        }}
      >
        <GridBG fade="radial-gradient(ellipse 80% 70% at 50% 0%, #000 35%, transparent 100%)" />
      </div>

      <div
        style={{
          position: "relative",
          maxWidth: 1120,
          margin: "0 auto",
          padding: "28px 32px 0",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--fg-secondary)",
            textDecoration: "none",
            padding: "7px 13px",
            borderRadius: "var(--radius-full)",
            background: "var(--glass-fill)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(16px) saturate(170%)",
            WebkitBackdropFilter: "blur(16px) saturate(170%)",
            letterSpacing: "0.02em",
          }}
        >
          <Icon name="arrow-left" size={13} />
          Back to home
        </Link>

        <header style={{ margin: "72px 0 0", maxWidth: 880 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
              fontWeight: 600,
              marginBottom: 18,
            }}
          >
            § {eyebrow}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(48px, 7vw, 80px)",
              lineHeight: 1.04,
              letterSpacing: "-0.018em",
              color: "var(--fg-primary)",
              margin: 0,
            }}
          >
            {title}
          </h1>
          {(effectiveDate || version) && (
            <div
              style={{
                marginTop: 24,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--fg-tertiary)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {effectiveDate && <>Effective {effectiveDate}</>}
              {effectiveDate && version && <span style={{ opacity: 0.6 }}>  ·  </span>}
              {version && <>v{version}</>}
            </div>
          )}
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: hasToc ? "220px 1fr" : "1fr",
            gap: hasToc ? 56 : 0,
            marginTop: 72,
            alignItems: "start",
          }}
          className="doc-grid"
        >
          {/* TOC */}
          {toc.length > 0 && (
            <aside
              style={{
                position: "sticky",
                top: 96,
                alignSelf: "start",
              }}
              className="doc-toc"
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--fg-tertiary)",
                  marginBottom: 16,
                }}
              >
                Contents
              </div>
              <nav
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                }}
              >
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    style={{
                      color: "var(--fg-tertiary)",
                      textDecoration: "none",
                      padding: "6px 0",
                      display: "grid",
                      gridTemplateColumns: "28px 1fr",
                      gap: 6,
                      lineHeight: 1.45,
                    }}
                  >
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                      §{item.number}
                    </span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </aside>
          )}

          {/* content column */}
          <div style={{ maxWidth: contentMaxWidth, minWidth: 0 }}>{children}</div>
        </div>

        {/* mini footer */}
        <footer
          style={{
            marginTop: 120,
            paddingTop: 28,
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--fg-tertiary)",
          }}
        >
          <span>© 2026 justenv, Inc.</span>
          <Link
            href="/"
            style={{
              color: "var(--fg-tertiary)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Icon name="arrow-left" size={12} />
            justenv.app
          </Link>
        </footer>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .doc-toc { display: none; }
          .doc-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
        }
      `}</style>
    </main>
  );
}
