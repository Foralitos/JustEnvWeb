"use client";

import { Icon } from "@/components/landing/lib";

// Feature comparison table: JustEnvs vs a competitor (or a generic column).
// rows: [{ feature, justenvs, competitor }]
export default function CompareTable({ competitorName, rows }) {
  return (
    <div
      className="ds-glass compare-table"
      style={{ borderRadius: "var(--radius-xl)", overflow: "hidden" }}
    >
      <style>{`
        .compare-table .ct-row { display: grid; grid-template-columns: 1.1fr 1fr 1fr; }
        @media (max-width: 720px) {
          .compare-table .ct-row { grid-template-columns: 1fr; }
          .compare-table .ct-feature { padding-bottom: 4px !important; }
          .compare-table .ct-cell { padding-top: 4px !important; }
          .compare-table .ct-head { display: none !important; }
          .compare-table .ct-cell::before {
            content: attr(data-label);
            display: block;
            font-family: var(--font-mono);
            font-size: 10px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--fg-quaternary);
            margin-bottom: 2px;
          }
        }
      `}</style>
      <div
        className="ct-row ct-head"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        <div style={{ padding: "14px 18px" }} />
        <div
          style={{
            padding: "14px 18px",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            fontWeight: 600,
            color: "var(--accent)",
          }}
        >
          JustEnvs
        </div>
        <div
          style={{
            padding: "14px 18px",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            fontWeight: 600,
            color: "var(--fg-secondary)",
          }}
        >
          {competitorName}
        </div>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.feature}
          className="ct-row"
          style={{
            borderBottom:
              i < rows.length - 1 ? "1px solid var(--border-subtle)" : "none",
          }}
        >
          <div
            className="ct-feature"
            style={{
              padding: "14px 18px",
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--fg-primary)",
            }}
          >
            {row.feature}
          </div>
          <div
            className="ct-cell"
            data-label="JustEnvs"
            style={{
              padding: "14px 18px",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--fg-primary)",
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
            }}
          >
            <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: 1 }}>
              <Icon name="check" size={14} />
            </span>
            {row.justenvs}
          </div>
          <div
            className="ct-cell"
            data-label={competitorName}
            style={{
              padding: "14px 18px",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--fg-secondary)",
            }}
          >
            {row.competitor}
          </div>
        </div>
      ))}
    </div>
  );
}
