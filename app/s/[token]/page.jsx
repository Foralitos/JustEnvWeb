"use client";

import { useEffect, useMemo, useState } from "react";
import {
  b64urlDecode,
  aesGcmOpen,
  importAesGcmKey,
  bytesToUtf8,
} from "@/libs/share/webcrypto";

const STATE = {
  LOADING: "loading",
  ERROR: "error",
  READY: "ready",
};

function formatCountdown(secondsLeft) {
  if (secondsLeft <= 0) return "expired";
  const s = secondsLeft % 60;
  const m = Math.floor(secondsLeft / 60) % 60;
  const h = Math.floor(secondsLeft / 3600) % 24;
  const d = Math.floor(secondsLeft / 86400);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function envBlock(vars) {
  return Object.entries(vars)
    .map(([k, v]) => `${k}=${needsQuoting(v) ? JSON.stringify(v) : v}`)
    .join("\n");
}

function needsQuoting(v) {
  return /[\s"'#\\]/.test(v) || v === "" || v.startsWith(" ") || v.endsWith(" ");
}

export default function SharePage({ params }) {
  const [token, setToken] = useState(null);
  const [state, setState] = useState(STATE.LOADING);
  const [error, setError] = useState(null);
  const [payload, setPayload] = useState(null); // { project, env, vars }
  const [meta, setMeta] = useState(null); // { viewsRemaining, ttl, openedAt }
  const [secondsLeft, setSecondsLeft] = useState(null);
  const [reveal, setReveal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Next 15: params is a promise (or a Proxy when not awaited).
  useEffect(() => {
    Promise.resolve(params).then((p) => setToken(p.token));
  }, [params]);

  useEffect(() => {
    if (!token) return;

    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    const hashParams = new URLSearchParams(hash);
    const keyParam = hashParams.get("k");

    if (!keyParam) {
      setError({ kind: "no_key", message: "This link is missing its decryption key." });
      setState(STATE.ERROR);
      return;
    }

    let cancelled = false;

    (async () => {
      let res;
      try {
        res = await fetch(`/api/share/${token}`, { cache: "no-store" });
      } catch {
        if (!cancelled) {
          setError({ kind: "network", message: "Could not reach the share server." });
          setState(STATE.ERROR);
        }
        return;
      }

      if (res.status === 410) {
        if (!cancelled) {
          setError({
            kind: "gone",
            message: "This link has expired or was already consumed.",
          });
          setState(STATE.ERROR);
        }
        return;
      }
      if (res.status === 404) {
        if (!cancelled) {
          setError({ kind: "not_found", message: "Share not found." });
          setState(STATE.ERROR);
        }
        return;
      }
      if (res.status === 429) {
        if (!cancelled) {
          setError({ kind: "rate_limited", message: "Too many requests. Try again later." });
          setState(STATE.ERROR);
        }
        return;
      }
      if (!res.ok) {
        if (!cancelled) {
          setError({ kind: "server", message: "Server error. Try again later." });
          setState(STATE.ERROR);
        }
        return;
      }

      const data = await res.json();

      try {
        const keyBytes = b64urlDecode(keyParam);
        const key = await importAesGcmKey(keyBytes);
        const plainBytes = await aesGcmOpen(data.ciphertext, key);
        const json = JSON.parse(bytesToUtf8(plainBytes));
        if (cancelled) return;
        setPayload(json);
        setMeta({
          viewsRemaining: data.viewsRemaining,
          ttl: data.ttl,
          openedAt: Date.now(),
        });
        setSecondsLeft(Number(data.ttl));
        setState(STATE.READY);
      } catch {
        if (!cancelled) {
          setError({
            kind: "decrypt",
            message: "Could not decrypt. The key is wrong or the payload is corrupted.",
          });
          setState(STATE.ERROR);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  // Live countdown driven by openedAt + original ttl, so the displayed value
  // matches reality even if the user leaves the tab open for hours.
  useEffect(() => {
    if (state !== STATE.READY || !meta) return;
    const tick = () => {
      const elapsed = Math.floor((Date.now() - meta.openedAt) / 1000);
      setSecondsLeft(Math.max(0, meta.ttl - elapsed));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [state, meta]);

  const dotenv = useMemo(() => (payload ? envBlock(payload.vars) : ""), [payload]);

  const deeplink = useMemo(() => {
    if (!token || typeof window === "undefined") return null;
    const hash = window.location.hash;
    return `justenv://share?token=${encodeURIComponent(token)}${hash}`;
  }, [token]);

  const copyDotenv = async () => {
    try {
      await navigator.clipboard.writeText(dotenv);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API can fail without document focus or permission; best-effort.
    }
  };

  if (state === STATE.LOADING) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16">
        <p className="font-mono text-sm opacity-60">Decrypting…</p>
      </main>
    );
  }

  if (state === STATE.ERROR) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="font-display text-2xl mb-2">Unavailable</h1>
        <p className="font-mono text-sm opacity-80">{error?.message}</p>
      </main>
    );
  }

  const expired = secondsLeft !== null && secondsLeft <= 0;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <header className="mb-6">
        <p className="font-mono text-xs uppercase tracking-wider opacity-60">
          Self-destructing share
        </p>
        <h1 className="font-display text-2xl mt-1">
          <span className="opacity-50">#</span>
          {payload.project}
          <span className="opacity-50 mx-2">/</span>
          {payload.env}
        </h1>
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-mono">
          <span className={`badge ${expired ? "badge-error" : "badge-neutral"}`}>
            {expired ? "expired" : `expires in ${formatCountdown(secondsLeft)}`}
          </span>
          {meta?.viewsRemaining !== null && meta?.viewsRemaining !== undefined && (
            <span className="badge badge-neutral">
              {meta.viewsRemaining} {meta.viewsRemaining === 1 ? "view" : "views"} left
            </span>
          )}
          <span className="badge badge-ghost">
            {Object.keys(payload.vars).length} variables
          </span>
        </div>
      </header>

      <section className="rounded-lg border border-base-300 bg-base-200 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-base-300">
          <span className="font-mono text-xs opacity-60">.env</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setReveal((v) => !v)}
              className="btn btn-xs btn-ghost font-mono"
            >
              {reveal ? "Hide values" : "Show values"}
            </button>
            <button
              type="button"
              onClick={copyDotenv}
              className="btn btn-xs btn-primary font-mono"
            >
              {copied ? "Copied" : "Copy .env"}
            </button>
          </div>
        </div>
        <pre className="px-3 py-3 text-sm font-mono overflow-x-auto whitespace-pre-wrap break-all">
          {Object.entries(payload.vars)
            .map(([k, v]) => {
              const display = reveal
                ? needsQuoting(v)
                  ? JSON.stringify(v)
                  : v
                : "•".repeat(Math.min(12, Math.max(4, v.length)));
              return `${k}=${display}`;
            })
            .join("\n")}
        </pre>
      </section>

      {deeplink && (
        <section className="mt-6 text-center">
          <a href={deeplink} className="btn btn-sm btn-outline font-mono">
            Open in JustEnv
          </a>
          <p className="mt-2 text-xs font-mono opacity-50">
            Opening this link consumes 1 view.
          </p>
        </section>
      )}

      <footer className="mt-10 text-center text-xs font-mono opacity-50">
        End-to-end encrypted · server cannot read this payload
      </footer>
    </main>
  );
}
