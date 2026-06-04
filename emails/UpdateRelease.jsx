import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Link,
  Hr,
  Preview,
} from "@react-email/components";

const colors = {
  bg: "#0A1410",
  surface: "#0F1B16",
  accent: "#38E08A",
  accentSoft: "rgba(56, 224, 138, 0.14)",
  fgPrimary: "#F2F4F3",
  fgSecondary: "#C2CCC7",
  fgTertiary: "#6B7872",
  border: "rgba(255, 255, 255, 0.08)",
};

const fonts = {
  serif: "'Newsreader', Georgia, 'Times New Roman', serif",
  sans:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  mono: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
};

const sectionLabelStyle = {
  fontFamily: fonts.mono,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: colors.accent,
  margin: "0 0 14px",
};

const itemStyle = {
  fontFamily: fonts.sans,
  fontSize: 15,
  lineHeight: 1.6,
  color: colors.fgSecondary,
  margin: "0 0 10px",
  paddingLeft: 18,
  position: "relative",
};

function ChangeList({ label, items }) {
  if (!items || items.length === 0) return null;
  return (
    <Section style={{ margin: "0 0 28px" }}>
      <Text style={sectionLabelStyle}>{label}</Text>
      {items.map((item, i) => (
        <Text key={i} style={itemStyle}>
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              color: colors.accent,
            }}
          >
            &mdash;
          </span>
          {item}
        </Text>
      ))}
    </Section>
  );
}

export default function UpdateRelease({
  version = "1.0.2",
  releaseDate = "December 2026",
  intro = "A small update with a few improvements and fixes. Nothing breaking — just better.",
  highlights = [],
  improvements = [],
  fixes = [],
  downloadUrl = "https://justenvs.app",
  changelogUrl = "https://justenvs.app/changelog",
  siteUrl = "https://justenvs.app",
}) {
  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="dark" />
        <meta name="supported-color-schemes" content="dark" />
      </Head>
      <Preview>
        JustEnvs {version} is out &mdash; here&rsquo;s what changed.
      </Preview>
      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: colors.bg,
          fontFamily: fonts.sans,
          color: colors.fgPrimary,
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <Container
          style={{
            width: "100%",
            maxWidth: 600,
            margin: "0 auto",
            backgroundColor: colors.bg,
          }}
        >
          <Section style={{ padding: "48px 32px 8px" }}>
            <Text
              style={{
                fontFamily: fonts.mono,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: colors.accent,
                margin: "0 0 20px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  backgroundColor: colors.accentSoft,
                  borderRadius: 6,
                  border: `1px solid ${colors.accentSoft}`,
                }}
              >
                v{version}
              </span>
              <span
                style={{
                  marginLeft: 12,
                  color: colors.fgTertiary,
                  letterSpacing: "0.08em",
                }}
              >
                {releaseDate}
              </span>
            </Text>

            <Heading
              as="h1"
              style={{
                fontFamily: fonts.serif,
                fontSize: 36,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                fontWeight: 500,
                color: colors.fgPrimary,
                margin: "0 0 18px",
              }}
            >
              What&rsquo;s new in JustEnvs.
            </Heading>

            <Text
              style={{
                fontFamily: fonts.sans,
                fontSize: 15,
                lineHeight: 1.65,
                color: colors.fgSecondary,
                margin: "0 0 36px",
              }}
            >
              {intro}
            </Text>
          </Section>

          <Section style={{ padding: "0 32px" }}>
            <ChangeList label="Highlights" items={highlights} />
            <ChangeList label="Improvements" items={improvements} />
            <ChangeList label="Fixes" items={fixes} />
          </Section>

          <Section style={{ padding: "8px 32px 12px" }}>
            <Button
              href={downloadUrl}
              style={{
                display: "inline-block",
                backgroundColor: colors.accent,
                color: "#062012",
                fontFamily: fonts.sans,
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                padding: "14px 22px",
                borderRadius: 10,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "0 8px 24px -10px rgba(56, 224, 138, 0.55)",
              }}
            >
              Update to v{version}
            </Button>

            <Text
              style={{
                fontFamily: fonts.sans,
                fontSize: 13,
                color: colors.fgTertiary,
                margin: "16px 0 0",
              }}
            >
              The app updates itself in the background, but you can grab it
              manually anytime. See the full{" "}
              <Link
                href={changelogUrl}
                style={{
                  color: colors.accent,
                  textDecoration: "none",
                  borderBottom: `1px solid ${colors.accentSoft}`,
                }}
              >
                changelog
              </Link>
              .
            </Text>
          </Section>

          <Section style={{ padding: "32px 32px 8px" }}>
            <Hr
              style={{
                border: "none",
                borderTop: `1px solid ${colors.border}`,
                margin: "0 0 20px",
              }}
            />

            <Text
              style={{
                fontFamily: fonts.sans,
                fontSize: 14,
                lineHeight: 1.6,
                color: colors.fgSecondary,
                margin: "0 0 8px",
              }}
            >
              Found a bug or have an idea? Just hit reply &mdash; the email
              goes straight to me.
            </Text>

            <Text
              style={{
                fontFamily: fonts.mono,
                fontSize: 12,
                color: colors.fgSecondary,
                margin: "16px 0 0",
                letterSpacing: "-0.005em",
              }}
            >
              &mdash; Fora, building JustEnvs
            </Text>
          </Section>

          <Section
            style={{
              backgroundColor: colors.bg,
              padding: "28px 32px 36px",
            }}
          >
            <Text
              style={{
                fontFamily: fonts.mono,
                fontSize: 10.5,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: colors.fgTertiary,
                margin: 0,
              }}
            >
              justenvs &middot; macOS &middot; v{version} &middot;{" "}
              <Link
                href={siteUrl}
                style={{ color: colors.fgTertiary, textDecoration: "none" }}
              >
                justenvs.app
              </Link>
            </Text>
            <Text
              style={{
                fontFamily: fonts.sans,
                fontSize: 11,
                color: colors.fgTertiary,
                margin: "10px 0 0",
                lineHeight: 1.5,
              }}
            >
              You&rsquo;re receiving this because you downloaded JustEnvs from
              justenvs.app.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
