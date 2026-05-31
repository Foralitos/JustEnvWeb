"use client";

import { useState } from "react";
import * as LucideIcons from "lucide-react";

function toPascal(name) {
  return name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

export function Icon({ name, size = 20, color, strokeWidth = 1.75, style }) {
  const Cmp = LucideIcons[toPascal(name)];
  if (!Cmp) return null;
  return (
    <Cmp
      size={size}
      strokeWidth={strokeWidth}
      style={{ color: color || "currentColor", display: "inline-block", ...style }}
    />
  );
}

export function Logo({ size = 30, showWord = true }) {
  const tile = size * 1.46;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
      <span
        style={{
          width: tile,
          height: tile,
          borderRadius: tile * 0.27,
          background: "var(--bg-raised)",
          border: "1px solid var(--border-accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            fontSize: size * 0.62,
            color: "var(--accent)",
            lineHeight: 1,
          }}
        >
          {"›_"}
        </span>
      </span>
      {showWord && (
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: size,
            letterSpacing: "-0.025em",
            color: "var(--fg-primary)",
          }}
        >
          justenv
        </span>
      )}
    </span>
  );
}

export function Button({
  variant = "accent",
  size = "md",
  children,
  iconLeft,
  iconRight,
  onClick,
  style,
  href,
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const pad = size === "lg" ? "13px 22px" : size === "sm" ? "7px 13px" : "10px 18px";
  const fs = size === "lg" ? 15 : size === "sm" ? 13 : 14;
  const base = {
    fontFamily: "var(--font-sans)",
    fontSize: fs,
    fontWeight: 500,
    letterSpacing: "-0.01em",
    borderRadius: "var(--radius-md)",
    padding: pad,
    border: "1px solid transparent",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    transition: "all var(--dur-fast) var(--ease-out)",
    textDecoration: "none",
    transform: press ? "translateY(1px)" : "none",
    whiteSpace: "nowrap",
  };
  const variants = {
    accent: {
      background: press
        ? "var(--accent-press)"
        : hover
        ? "var(--accent-hover)"
        : "var(--accent)",
      color: "var(--accent-fg)",
      boxShadow: "0 6px 24px -10px var(--accent-glow)",
    },
    glass: {
      background: press
        ? "var(--glass-fill-press)"
        : hover
        ? "var(--glass-fill-hover)"
        : "var(--glass-fill)",
      backdropFilter: "blur(22px) saturate(170%)",
      WebkitBackdropFilter: "blur(22px) saturate(170%)",
      borderColor: "var(--glass-border)",
      color: "var(--fg-primary)",
      boxShadow: "inset 0 1px 0 0 var(--glass-highlight)",
    },
    ghost: {
      background: hover ? "var(--bg-overlay)" : "transparent",
      color: hover ? "var(--fg-primary)" : "var(--fg-secondary)",
    },
  };
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPress(false);
      }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {iconLeft && <Icon name={iconLeft} size={fs + 2} />}
      {children}
      {iconRight && <Icon name={iconRight} size={fs + 2} />}
    </Tag>
  );
}

export function Overline({ children, style }) {
  return (
    <span className="ds-overline" style={{ color: "var(--accent)", ...style }}>
      {children}
    </span>
  );
}

export function GridBG({
  fade = "radial-gradient(ellipse 80% 70% at 50% 0%, #000 35%, transparent 100%)",
  size = 56,
  opacity = 1,
}) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
        backgroundImage:
          "linear-gradient(to right, var(--grid-line) 1px, transparent 1px)," +
          "linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
        backgroundSize: `${size}px ${size}px`,
        WebkitMaskImage: fade,
        maskImage: fade,
      }}
    />
  );
}

const WEB_BRAND_PATHS = {
  github:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  vercel: "M12 1.608l12 20.784H0z",
  apple:
    "M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z",
  python:
    "M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z",
};

export function Brand({ name, size = 18, color = "currentColor", style }) {
  const d = WEB_BRAND_PATHS[name];
  if (!d) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={{ display: "inline-block", ...style }}
    >
      <path d={d} />
    </svg>
  );
}
