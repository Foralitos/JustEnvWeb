import { getSEOTags } from "@/libs/seo";
import DocLayout from "@/components/landing/DocLayout";
import { RoadmapPill } from "@/components/landing/DocSection";

export const metadata = getSEOTags({
  title: "Changelog · justenv",
  canonicalUrlRelative: "/changelog",
});

const RELEASES = [
  {
    version: "0.1.0",
    date: "May 31, 2026",
    tagline: "Initial public beta.",
    status: "shipped",
    notes: [
      {
        kind: "Added",
        text: "Mac vault encrypted with AES-256-GCM (key derived via PBKDF2-HMAC-SHA256, 210,000 iters).",
      },
      {
        kind: "Added",
        text: "Touch ID unlock and auto-lock on system sleep or screen lock.",
      },
      {
        kind: "Added",
        text: "Projects and environments with per-environment value sets.",
      },
      {
        kind: "Added",
        text: "envsvault CLI commands: init, new, set, get, list, rm, import, pull.",
      },
    ],
  },
];

const COMING = [
  {
    version: "0.2.0",
    date: "Coming soon",
    tagline: "Team sync, share links, workspace invites.",
    status: "roadmap",
    notes: [
      {
        kind: "Planned",
        text: "Self-destructing share links with configurable TTL and view counter.",
      },
      {
        kind: "Planned",
        text: "Workspace invites with per-environment access (read-only or full).",
      },
      {
        kind: "Planned",
        text: "Encrypted team sync — only ciphertext and minimal metadata reach the server.",
      },
      {
        kind: "Planned",
        text: "Audit log: who touched what, when.",
      },
    ],
  },
];

const KIND_COLOR = {
  Added: "var(--accent)",
  Improved: "var(--fg-secondary)",
  Fixed: "var(--info)",
  Security: "var(--warning)",
  Planned: "var(--fg-tertiary)",
};

function Dot({ filled }) {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        right: -7,
        top: 14,
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: filled ? "var(--accent)" : "var(--bg-base)",
        border: `2px solid ${filled ? "var(--accent)" : "var(--border-accent)"}`,
        boxShadow: filled ? "0 0 0 4px var(--accent-soft)" : "none",
        zIndex: 1,
      }}
    />
  );
}

function Release({ version, date, tagline, status, notes }) {
  const isRoadmap = status === "roadmap";
  return (
    <article
      className="release"
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        gap: 48,
        padding: "56px 0",
        alignItems: "start",
      }}
    >
      <div style={{ position: "relative", paddingRight: 20 }}>
        <Dot filled={!isRoadmap} />
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: 52,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: isRoadmap ? "var(--accent)" : "var(--fg-primary)",
            whiteSpace: "nowrap",
          }}
        >
          v{version}
        </div>
        <div
          style={{
            marginTop: 14,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--fg-tertiary)",
            lineHeight: 1.4,
          }}
        >
          {date}
        </div>
      </div>

      <div style={{ minWidth: 0 }}>
        <h2
          className="release-tagline"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.012em",
            color: "var(--fg-primary)",
            lineHeight: 1.3,
            margin: "8px 0 0",
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {tagline}
          {isRoadmap && <RoadmapPill />}
        </h2>

        <div style={{ marginTop: 26 }}>
          {notes.map((n, i) => (
            <div
              key={i}
              style={{
                padding: "14px 0",
                borderTop:
                  i === 0
                    ? "1px solid var(--border-subtle)"
                    : "1px dashed var(--border-subtle)",
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                lineHeight: 1.65,
                color: "var(--fg-secondary)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: KIND_COLOR[n.kind] || "var(--fg-tertiary)",
                  marginRight: 12,
                  verticalAlign: "1px",
                }}
              >
                {n.kind}
              </span>
              {n.text}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function ComingDivider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "40px 0 24px",
      }}
    >
      <span
        style={{
          height: 1,
          flex: "0 0 80px",
          background: "var(--border-default)",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--fg-tertiary)",
          fontWeight: 600,
        }}
      >
        Coming soon
      </span>
      <span
        style={{
          height: 1,
          flex: 1,
          background: "var(--border-default)",
        }}
      />
    </div>
  );
}

export default function ChangelogPage() {
  return (
    <DocLayout
      eyebrow="Changelog"
      title="What's new in justenv."
      version={RELEASES[0].version}
      effectiveDate={`Latest · ${RELEASES[0].date}`}
    >
      <div
        className="track"
        style={{
          position: "relative",
          marginTop: 24,
        }}
      >
        {/* the vertical track line — sits at the right edge of the version column */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 24,
            bottom: 24,
            left: 133,
            width: 1,
            background: "var(--border-default)",
            zIndex: 0,
          }}
          className="track-line"
        />

        {RELEASES.map((r) => (
          <Release key={r.version} {...r} />
        ))}

        <ComingDivider />

        {COMING.map((r) => (
          <Release key={r.version} {...r} />
        ))}
      </div>

      <style>{`
        @media (max-width: 720px) {
          .track-line { display: none; }
          .release {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
            padding: 36px 0 !important;
          }
        }
      `}</style>
    </DocLayout>
  );
}
