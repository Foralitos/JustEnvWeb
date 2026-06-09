"use client";

import { useState } from "react";
import apiClient from "@/libs/api";
import config from "@/config";
import { Overline, Button, Brand, GridBG, Icon } from "./lib";

const FREE_FEATURES = [
  "Up to 5 projects",
  "AES-256 encryption, on your device",
  "Self-destructing share links",
  "Touch ID unlock",
];

const PRO_FEATURES = [
  "Unlimited projects",
  "Everything in Free",
  "Two-way .env file sync",
  "One-time payment — no subscription",
  "All future Pro features included",
];

export default function Pricing({ onSignup }) {
  const [loading, setLoading] = useState(false);

  const pro = config.stripe.plans?.[0];
  const priceId = pro?.priceId;

  const handleCheckout = async () => {
    if (!priceId) {
      // STRIPE_PRICE_PRO env var not set — don't open a broken checkout.
      console.warn("Pricing: missing Stripe priceId (STRIPE_PRICE_PRO).");
      return;
    }
    setLoading(true);
    try {
      const res = await apiClient.post("/stripe/create-checkout", {
        priceId,
        mode: "payment",
        successUrl: `${window.location.origin}/thank-you`,
        cancelUrl: `${window.location.origin}/#pricing`,
      });
      window.location.href = res.url;
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <section
      id="pricing"
      style={{
        position: "relative",
        padding: "clamp(64px, 12vw, 104px) 0",
        overflow: "hidden",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <style>{`
        @media (max-width: 760px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
          .pricing-headline { font-size: clamp(28px, 8vw, 44px) !important; }
        }
      `}</style>

      <GridBG fade="radial-gradient(ellipse 70% 90% at 50% 40%, #000 30%, transparent 100%)" />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "44%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 760,
          height: 320,
          background:
            "radial-gradient(ellipse at center, rgba(56,224,138,0.12), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 940,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 32px)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "clamp(36px, 6vw, 56px)",
          }}
        >
          <Overline>PRICING</Overline>
          <h2
            className="ds-display-lg pricing-headline"
            style={{ margin: "14px 0 0" }}
          >
            One price. Yours for good.
          </h2>
          <p
            className="ds-body-lg"
            style={{
              margin: "16px auto 0",
              maxWidth: 520,
              color: "var(--fg-secondary)",
            }}
          >
            Start free. Go unlimited with a single payment — no subscriptions,
            no seats, no renewals.
          </p>
        </div>

        <div
          className="pricing-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          {/* FREE */}
          <PlanCard
            name="Free"
            blurb="For trying it out and small setups."
            price="$0"
            cadence="forever"
            features={FREE_FEATURES}
            cta={
              <Button
                variant="glass"
                size="lg"
                onClick={onSignup}
                style={{ width: "100%", justifyContent: "center" }}
              >
                <Brand
                  name="apple"
                  size={17}
                  style={{ marginRight: 3, marginTop: -2 }}
                />
                Download for Mac
              </Button>
            }
          />

          {/* PRO */}
          <PlanCard
            featured
            name="Pro"
            badge="LIFETIME"
            blurb="For developers who live in their .env files."
            price="$50"
            unit="USD"
            cadence="one-time · pay once, keep forever"
            features={PRO_FEATURES}
            cta={
              <Button
                variant="accent"
                size="lg"
                onClick={handleCheckout}
                disabled={loading || !priceId}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  opacity: loading || !priceId ? 0.6 : 1,
                  cursor: loading || !priceId ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Opening checkout…" : "Get JustEnvs Pro"}
              </Button>
            }
            footnote="Secure one-time checkout via Stripe."
          />
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  featured,
  name,
  badge,
  blurb,
  price,
  unit,
  cadence,
  features,
  cta,
  footnote,
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="ds-glass"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        borderRadius: "var(--radius-xl)",
        padding: "clamp(26px, 4vw, 34px)",
        display: "flex",
        flexDirection: "column",
        background: featured
          ? "linear-gradient(180deg, var(--accent-soft), var(--glass-fill))"
          : "var(--glass-fill)",
        border: featured
          ? "1px solid var(--border-accent)"
          : "1px solid var(--glass-border)",
        boxShadow: featured
          ? "var(--elev-glow), inset 0 1px 0 0 var(--glass-highlight)"
          : "inset 0 1px 0 0 var(--glass-highlight)",
        transform: hover ? "translateY(-3px)" : "none",
        transition: "transform var(--dur-base) var(--ease-out)",
      }}
    >
      {badge && (
        <span
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: "var(--accent)",
            background: "var(--accent-soft)",
            border: "1px solid var(--border-accent)",
            padding: "4px 9px",
            borderRadius: "var(--radius-full)",
          }}
        >
          {badge}
        </span>
      )}

      <h3
        className="ds-h3"
        style={{ margin: 0, fontWeight: 600, color: "var(--fg-primary)" }}
      >
        {name}
      </h3>
      <p
        className="ds-body-sm"
        style={{ margin: "6px 0 22px", height: 40 }}
      >
        {blurb}
      </p>

      {/* Fixed-height price zone, baseline-aligned, so the divider + rows below
          line up across both cards regardless of price length. */}
      <div
        style={{
          height: 58,
          display: "flex",
          alignItems: "flex-end",
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 52,
            fontWeight: 500,
            color: "var(--fg-primary)",
            lineHeight: 1,
          }}
        >
          {price}
        </span>
        {unit && (
          <span
            className="ds-mono"
            style={{ color: "var(--fg-tertiary)", margin: 0, marginBottom: 6 }}
          >
            {unit}
          </span>
        )}
      </div>
      <p
        className="ds-caption"
        style={{ margin: "10px 0 24px", height: 16, color: "var(--fg-tertiary)" }}
      >
        {cadence}
      </p>

      <div
        aria-hidden
        style={{
          height: 1,
          background: "var(--border-subtle)",
          margin: "0 0 22px",
        }}
      />

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 28px",
          display: "flex",
          flexDirection: "column",
          gap: 13,
          flex: 1,
        }}
      >
        {features.map((f) => (
          <li
            key={f}
            style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
          >
            <span
              style={{
                flexShrink: 0,
                marginTop: 1,
                color: featured ? "var(--accent)" : "var(--fg-secondary)",
                display: "inline-flex",
              }}
            >
              <Icon name="check" size={17} strokeWidth={2.25} />
            </span>
            <span
              className="ds-body-sm"
              style={{ color: "var(--fg-primary)", margin: 0 }}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      {cta}

      {/* Reserved in both cards (even when empty) so the CTAs bottom-align. */}
      <div style={{ height: 16, marginTop: 12 }}>
        {footnote && (
          <p
            className="ds-caption"
            style={{
              textAlign: "center",
              margin: 0,
              color: "var(--fg-tertiary)",
            }}
          >
            {footnote}
          </p>
        )}
      </div>
    </div>
  );
}
