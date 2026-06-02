import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Img,
  Heading,
  Text,
  Button,
  Link,
  Hr,
  Preview,
} from "@react-email/components";

const colors = {
  bg: "#0A1410",
  card: "#0E1A14",
  accent: "#38E08A",
  accentSoft: "rgba(56, 224, 138, 0.14)",
  fgPrimary: "#F2F4F3",
  fgSecondary: "#9BA8A1",
  fgTertiary: "#6B7872",
  border: "rgba(255, 255, 255, 0.08)",
};

const fonts = {
  serif: "'Newsreader', Georgia, 'Times New Roman', serif",
  sans:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  mono: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
};

export default function WelcomeBeta({
  heroUrl = "https://justenvs.app/email/welcome-hero.png",
  dmgUrl = "https://justenvs.app",
  siteUrl = "https://justenvs.app",
}) {
  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="dark" />
        <meta name="supported-color-schemes" content="dark" />
      </Head>
      <Preview>
        Thanks for downloading. Here&rsquo;s what comes next.
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
          {/* Hero — full-bleed poster, continuous dark bg */}
          <Section
            style={{
              padding: 0,
              margin: 0,
              backgroundColor: colors.bg,
              lineHeight: 0,
            }}
          >
            <Img
              src={heroUrl}
              width="600"
              alt="JustEnv — welcome to the beta"
              style={{
                display: "block",
                width: "100%",
                maxWidth: 600,
                height: "auto",
                border: 0,
                outline: "none",
                textDecoration: "none",
              }}
            />
          </Section>

          {/* Welcome content — same dark bg flows from image */}
          <Section
            style={{
              backgroundColor: colors.bg,
              padding: "0 32px 8px",
            }}
          >
            <Text
              style={{
                fontFamily: fonts.mono,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: colors.accent,
                margin: "0 0 16px",
              }}
            >
              Welcome to the beta
            </Text>

            <Heading
              as="h1"
              style={{
                fontFamily: fonts.serif,
                fontSize: 42,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                fontWeight: 500,
                color: colors.fgPrimary,
                margin: "0 0 24px",
              }}
            >
              You&rsquo;re in.
            </Heading>

            <Text
              style={{
                fontFamily: fonts.sans,
                fontSize: 15,
                lineHeight: 1.65,
                color: colors.fgSecondary,
                margin: "0 0 18px",
              }}
            >
              Thanks for downloading JustEnv. You&rsquo;re now part of a small
              group helping shape the simplest way teams handle environment
              variables &mdash; secure, in one place, never in a DM.
            </Text>

            <Text
              style={{
                fontFamily: fonts.sans,
                fontSize: 15,
                lineHeight: 1.65,
                color: colors.fgSecondary,
                margin: "0 0 32px",
              }}
            >
              We&rsquo;re early, so things move fast. If something breaks, or
              you can think of a tool you wish JustEnv talked to, just hit
              reply. The email goes straight to me.
            </Text>

            {/* Primary CTA */}
            <Section style={{ margin: "0 0 18px" }}>
              <Button
                href={dmgUrl}
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
                }}
              >
                Re-download the Mac app
              </Button>
            </Section>

            <Text
              style={{
                fontFamily: fonts.sans,
                fontSize: 13,
                color: colors.fgTertiary,
                margin: "0 0 32px",
              }}
            >
              or{" "}
              <Link
                href={siteUrl}
                style={{
                  color: colors.accent,
                  textDecoration: "none",
                  borderBottom: `1px solid ${colors.accentSoft}`,
                }}
              >
                visit justenvs.app
              </Link>
            </Text>

            <Hr
              style={{
                border: "none",
                borderTop: `1px solid ${colors.border}`,
                margin: "8px 0 20px",
              }}
            />

            <Text
              style={{
                fontFamily: fonts.mono,
                fontSize: 12,
                color: colors.fgSecondary,
                margin: "0 0 4px",
                letterSpacing: "-0.005em",
              }}
            >
              &mdash; Fora, building JustEnv
            </Text>
          </Section>

          {/* Footer */}
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
              justenv &middot; macOS &middot; beta &middot; justenvs.app
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
              You&rsquo;re receiving this because you downloaded JustEnv from
              justenvs.app.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
