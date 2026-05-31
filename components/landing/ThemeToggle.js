"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Icon } from "./lib";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => setMounted(true), []);

  const size = 34;

  if (!mounted) {
    return <span style={{ width: size, height: size, display: "inline-block" }} aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    if (typeof document !== "undefined" && document.startViewTransition) {
      document.startViewTransition(() => setTheme(next));
    } else {
      setTheme(next);
    }
  };

  return (
    <button
      onClick={toggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: hover ? "var(--glass-fill-hover)" : "var(--glass-fill)",
        border: "1px solid var(--glass-border)",
        borderRadius: "var(--radius-full)",
        color: hover ? "var(--fg-primary)" : "var(--fg-secondary)",
        cursor: "pointer",
        padding: 0,
        backdropFilter: "blur(16px) saturate(170%)",
        WebkitBackdropFilter: "blur(16px) saturate(170%)",
        transition: "all var(--dur-fast) var(--ease-out)",
      }}
    >
      <Icon name={isDark ? "sun" : "moon"} size={15} strokeWidth={1.75} />
    </button>
  );
}
