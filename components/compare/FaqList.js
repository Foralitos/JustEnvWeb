"use client";

import { useState } from "react";
import { Icon } from "@/components/landing/lib";

// Accordion FAQ list. Markup mirrors the FAQPage JSON-LD emitted by the page,
// so visible content and structured data stay in sync.
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="ds-glass"
      style={{ borderRadius: "var(--radius-lg)", overflow: "hidden" }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "18px 20px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <h3
          className="ds-body-lg"
          style={{ margin: 0, fontWeight: 600, color: "var(--fg-primary)" }}
        >
          {q}
        </h3>
        <Icon
          name="plus"
          size={17}
          color="var(--fg-tertiary)"
          style={{
            flexShrink: 0,
            transform: open ? "rotate(45deg)" : "none",
            transition: "transform var(--dur-fast) var(--ease-out)",
          }}
        />
      </button>
      {open && (
        <p
          className="ds-body"
          style={{
            margin: 0,
            padding: "0 20px 20px",
            color: "var(--fg-secondary)",
            maxWidth: 720,
          }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

export default function FaqList({ faqs }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {faqs.map((f) => (
        <FaqItem key={f.q} q={f.q} a={f.a} />
      ))}
    </div>
  );
}
