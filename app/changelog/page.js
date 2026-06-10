import { getSEOTags } from "@/libs/seo";
import DocLayout from "@/components/landing/DocLayout";
import { RoadmapPill } from "@/components/landing/DocSection";

export const metadata = getSEOTags({
  title: "Changelog · justenvs",
  canonicalUrlRelative: "/changelog",
});

const RELEASES = [
  {
    version: "2.4.0",
    date: "Jun 9, 2026",
    tagline: "Bulletproof .env sync, and JustEnv lives in your menu bar.",
    status: "shipped",
    notes: [
      {
        kind: "Added",
        text: "Live sync: JustEnv now watches your linked folder, so edits to the .env from your editor or terminal show up instantly — no need to refocus the app. Pro only.",
      },
      {
        kind: "Added",
        text: "Leak guard: when you link or export to a folder, JustEnv makes sure .env* is in that folder's .gitignore — automatically, so secrets never end up in a commit. Pro only.",
      },
      {
        kind: "Improved",
        text: "Links survive renames: rename an environment, or rename the file itself (.env → .env.local), and the folder link follows along instead of silently breaking. Pro only.",
      },
      {
        kind: "Improved",
        text: "If a linked folder or file goes missing, you now get a recovery banner with one-click options to re-link — no more silent failures. Pro only.",
      },
      {
        kind: "Improved",
        text: "JustEnv now behaves like a true menu bar app: closing the window or pressing Cmd+Q tucks it into the menu bar instead of quitting. Really quit with Cmd+Opt+Q or the power button in the popup.",
      },
      {
        kind: "Fixed",
        text: "\"Open app\" from the menu bar popup now correctly restores a minimized window.",
      },
    ],
  },
  {
    version: "2.3.0",
    date: "Jun 9, 2026",
    tagline: "Check for updates anytime, and a share-link fix.",
    status: "shipped",
    notes: [
      {
        kind: "Added",
        text: "Check for Updates on demand — a new button in Settings and in the sidebar pulls the latest version without waiting for the automatic background check.",
      },
      {
        kind: "Fixed",
        text: "Creating a share link could fail with \"Could not parse server response\" on some macOS versions. Sharing now works everywhere.",
      },
    ],
  },
  {
    version: "2.2.0",
    date: "Jun 8, 2026",
    tagline: "Two-way .env file sync, for JustEnv Pro.",
    status: "shipped",
    notes: [
      {
        kind: "Added",
        text: "Link a project to a folder and sync its .env both ways — import what's on disk into your vault, or export your vault back out to the file. Pro only.",
      },
      {
        kind: "Added",
        text: "JustEnv now notices when a linked .env changes outside the app and shows you a per-variable diff before you pull anything in.",
      },
      {
        kind: "Improved",
        text: "Add variables faster: paste a whole .env and it expands into editable key/value rows.",
      },
    ],
  },
  {
    version: "2.1.0",
    date: "Jun 7, 2026",
    tagline: "Accounts, JustEnv Pro, and project renaming.",
    status: "shipped",
    notes: [
      {
        kind: "Added",
        text: "Sign in to a JustEnv account from Settings or the sidebar — with Google or a magic link — to unlock JustEnv Pro.",
      },
      {
        kind: "Added",
        text: "JustEnv Pro: unlimited projects. The free plan stays at 5 projects per vault.",
      },
      {
        kind: "Added",
        text: "Rename projects: right-click a project in the sidebar or grid, or use the toolbar in the project view.",
      },
    ],
  },
  {
    version: "2.0.0",
    date: "Jun 4, 2026",
    tagline: "Menu bar app, Touch ID rework, new foundation.",
    status: "shipped",
    notes: [
      {
        kind: "Added",
        text: "Menu bar app: open the popup from any app, search projects and copy values without bringing the main window to the front. Re-authenticates on every popup open.",
      },
      {
        kind: "Added",
        text: "Welcome screen on first launch with \"import existing vault\" or \"start fresh\" — older beta installs are detected and migrated automatically.",
      },
      {
        kind: "Improved",
        text: "Touch ID is now the primary unlock when available; master password stays one tap away.",
      },
      {
        kind: "Fixed",
        text: "Touch ID no longer forgets the saved key after a failed attempt — you can retry without re-entering your master password.",
      },
      {
        kind: "Fixed",
        text: "Removed duplicate Touch ID prompts when the menu bar popup and the main window unlock together.",
      },
      {
        kind: "Security",
        text: "Migrated to the Data Protection Keychain with a signed provisioning profile so the vault key is wrapped with a stronger access policy.",
      },
    ],
  },
  {
    version: "1.0.2",
    date: "Jun 1, 2026",
    tagline: "Beta limit, faster project delete, polish.",
    status: "shipped",
    notes: [
      {
        kind: "Added",
        text: "Beta limit: up to 5 projects per vault, with an in-app counter in the sidebar.",
      },
      {
        kind: "Added",
        text: "Right-click on any project (sidebar or grid) to delete it — confirmation + Touch ID required.",
      },
      {
        kind: "Fixed",
        text: "Sidebar brand header no longer wraps on narrow widths.",
      },
    ],
  },
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
      title="What's new in justenvs."
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
