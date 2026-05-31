import { Icon } from "./lib";

export function DocSection({ id, number, eyebrow, title, children }) {
  return (
    <section
      id={id}
      style={{
        scrollMarginTop: 120,
        padding: "56px 0 0",
        borderTop: "1px solid var(--border-subtle)",
        marginTop: 48,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--accent)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: 14,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ fontWeight: 600 }}>§ {number}</span>
        {eyebrow && (
          <span
            style={{
              color: "var(--fg-tertiary)",
              fontWeight: 500,
            }}
          >
            · {eyebrow}
          </span>
        )}
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontStyle: "italic",
          fontSize: "clamp(26px, 4.5vw, 36px)",
          lineHeight: 1.15,
          letterSpacing: "-0.014em",
          color: "var(--fg-primary)",
          margin: "0 0 24px",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 16,
          lineHeight: 1.7,
          color: "var(--fg-secondary)",
        }}
      >
        {children}
      </div>
    </section>
  );
}

export function TLDR({ children }) {
  return (
    <div
      className="ds-glass"
      style={{
        borderRadius: "var(--radius-xl)",
        padding: "clamp(20px, 4vw, 26px) clamp(20px, 4vw, 28px)",
        marginTop: 24,
        background: "var(--accent-soft)",
        border: "1px solid var(--border-accent)",
        boxShadow: "inset 0 1px 0 0 var(--glass-highlight)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--accent)",
          fontWeight: 600,
          marginBottom: 10,
        }}
      >
        TL;DR
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontStyle: "italic",
          fontSize: "clamp(18px, 3.5vw, 22px)",
          lineHeight: 1.4,
          letterSpacing: "-0.008em",
          color: "var(--fg-primary)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function RoadmapPill() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--accent)",
        background: "var(--accent-soft)",
        border: "1px solid var(--border-accent)",
        padding: "2px 7px",
        borderRadius: "var(--radius-full)",
        verticalAlign: "middle",
        marginLeft: 8,
      }}
    >
      <Icon name="sparkles" size={10} />
      Roadmap
    </span>
  );
}

export function MetaRow({ label, value, mono = true }) {
  return (
    <div
      className="meta-row"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(140px, 200px) 1fr",
        gap: 16,
        padding: "10px 0",
        borderBottom: "1px dashed var(--border-subtle)",
        alignItems: "baseline",
      }}
    >
      <style>{`
        @media (max-width: 520px) {
          .meta-row { grid-template-columns: 1fr !important; gap: 4px !important; }
        }
      `}</style>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--fg-tertiary)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
          fontSize: mono ? 13.5 : 15,
          color: "var(--fg-primary)",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export function DocList({ children }) {
  return (
    <ul
      style={{
        margin: "16px 0 0",
        paddingLeft: 22,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {children}
    </ul>
  );
}

export function DocP({ children, style }) {
  return (
    <p style={{ margin: "16px 0 0", ...style }}>{children}</p>
  );
}

export function Code({ children }) {
  return (
    <code
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        background: "var(--bg-inset)",
        border: "1px solid var(--border-subtle)",
        padding: "1px 6px",
        borderRadius: 4,
        color: "var(--fg-primary)",
      }}
    >
      {children}
    </code>
  );
}
