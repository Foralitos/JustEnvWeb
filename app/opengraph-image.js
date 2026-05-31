import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "justenv — Your environment variables, finally in one safe place.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(family, weight, style = "normal") {
  const ital = style === "italic" ? 1 : 0;
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(
    / /g,
    "+"
  )}:ital,wght@${ital},${weight}&display=swap`;
  // Satori cannot decode WOFF2 — use an old UA so Google Fonts serves TTF.
  const css = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
    },
  }).then((r) => r.text());
  const match =
    css.match(/url\((https:\/\/[^)]+\.ttf)\)/) ||
    css.match(/url\((https:\/\/[^)]+\.otf)\)/) ||
    css.match(/url\((https:\/\/[^)]+)\)/);
  if (!match) {
    throw new Error(
      `Could not resolve font URL for ${family} ${weight} ${style}. CSS head: ${css.slice(
        0,
        300
      )}`
    );
  }
  return fetch(match[1]).then((r) => r.arrayBuffer());
}

export default async function OpenGraphImage() {
  const [newsreader, newsreaderItalic, geist, geistMono] = await Promise.all([
    loadGoogleFont("Newsreader", 500),
    loadGoogleFont("Newsreader", 500, "italic"),
    loadGoogleFont("Geist", 500),
    loadGoogleFont("Geist Mono", 500),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#08090B",
          color: "#F3F5F6",
          display: "flex",
          flexDirection: "column",
          padding: "60px 72px",
          position: "relative",
          fontFamily: "Geist",
        }}
      >
        {/* ambient green glow upper-left */}
        <div
          style={{
            position: "absolute",
            top: -140,
            left: -80,
            width: 700,
            height: 480,
            background:
              "radial-gradient(ellipse at center, rgba(56,224,138,0.16), transparent 70%)",
            display: "flex",
          }}
        />

        {/* brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#0E1013",
              border: "1px solid rgba(56,224,138,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#38E08A",
              fontFamily: "Geist Mono",
              fontWeight: 600,
              fontSize: 38,
              letterSpacing: "-2px",
            }}
          >
            ›_
          </div>
          <div
            style={{
              fontFamily: "Geist",
              fontSize: 42,
              fontWeight: 600,
              letterSpacing: "-1.2px",
            }}
          >
            justenv
          </div>
          <div
            style={{
              marginLeft: 4,
              padding: "5px 12px",
              borderRadius: 999,
              background: "rgba(56,224,138,0.10)",
              border: "1px solid rgba(56,224,138,0.40)",
              color: "#38E08A",
              fontFamily: "Geist Mono",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "1.4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            BETA
          </div>
        </div>

        {/* headline */}
        <div
          style={{
            marginTop: 64,
            display: "flex",
            flexDirection: "column",
            fontFamily: "Newsreader",
            fontWeight: 500,
            fontSize: 92,
            lineHeight: 1.04,
            letterSpacing: "-3px",
          }}
        >
          <div style={{ display: "flex" }}>Your environment variables,</div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <span>finally in&nbsp;</span>
            <span
              style={{
                color: "#38E08A",
                fontStyle: "italic",
                fontFamily: "Newsreader Italic",
              }}
            >
              one safe place.
            </span>
          </div>
        </div>

        {/* tagline */}
        <div
          style={{
            marginTop: "auto",
            fontFamily: "Geist Mono",
            fontSize: 22,
            color: "#9CA3AD",
            display: "flex",
          }}
        >
          Stop pasting .env files into Slack. Encrypted end-to-end, never in a
          DM.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: newsreader, weight: 500, style: "normal" },
        {
          name: "Newsreader Italic",
          data: newsreaderItalic,
          weight: 500,
          style: "italic",
        },
        { name: "Geist", data: geist, weight: 600, style: "normal" },
        { name: "Geist Mono", data: geistMono, weight: 600, style: "normal" },
      ],
    }
  );
}
