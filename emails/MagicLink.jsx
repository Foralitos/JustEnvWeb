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
  surface: "#0E1A14",
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

export default function MagicLink({
  url = "https://justenvs.app",
  host = "justenvs.app",
}) {
  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="dark" />
        <meta name="supported-color-schemes" content="dark" />
      </Head>
      <Preview>Your secure sign-in link for JustEnvs.</Preview>
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
          <Section style={{ padding: "48px 32px 16px" }}>
            {/* Wordmark */}
            <Text
              style={{
                fontFamily: fonts.mono,
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: colors.fgPrimary,
                margin: "0 0 32px",
              }}
            >
              <span style={{ color: colors.accent }}>&rsaquo;_</span>&nbsp;justenvs
            </Text>

            <Text
              style={{
                fontFamily: fonts.mono,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: colors.accent,
                margin: "0 0 14px",
              }}
            >
              Sign in
            </Text>

            <Heading
              as="h1"
              style={{
                fontFamily: fonts.serif,
                fontSize: 34,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                fontWeight: 500,
                color: colors.fgPrimary,
                margin: "0 0 18px",
              }}
            >
              Sign in to JustEnvs
            </Heading>

            <Text
              style={{
                fontFamily: fonts.sans,
                fontSize: 15,
                lineHeight: 1.65,
                color: colors.fgSecondary,
                margin: "0 0 28px",
              }}
            >
              Click the button below to sign in to your account. This link
              expires shortly and can only be used once.
            </Text>

            <Section style={{ margin: "0 0 24px" }}>
              <Button
                href={url}
                style={{
                  display: "inline-block",
                  backgroundColor: colors.accent,
                  color: "#062012",
                  fontFamily: fonts.sans,
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  padding: "14px 28px",
                  borderRadius: 10,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.05)",
                  boxShadow: "0 8px 24px -10px rgba(56, 224, 138, 0.55)",
                }}
              >
                Sign in
              </Button>
            </Section>

            <Text
              style={{
                fontFamily: fonts.sans,
                fontSize: 13,
                lineHeight: 1.6,
                color: colors.fgTertiary,
                margin: "0 0 6px",
              }}
            >
              or paste this link into your browser:
            </Text>
            <Link
              href={url}
              style={{
                fontFamily: fonts.mono,
                fontSize: 12,
                lineHeight: 1.5,
                color: colors.accent,
                textDecoration: "none",
                wordBreak: "break-all",
              }}
            >
              {url}
            </Link>

            <Hr
              style={{
                border: "none",
                borderTop: `1px solid ${colors.border}`,
                margin: "28px 0 18px",
              }}
            />

            <Text
              style={{
                fontFamily: fonts.sans,
                fontSize: 13,
                lineHeight: 1.6,
                color: colors.fgTertiary,
                margin: 0,
              }}
            >
              If you didn&rsquo;t request this, you can safely ignore this email
              &mdash; no one can sign in without this link.
            </Text>
          </Section>

          <Section
            style={{
              backgroundColor: colors.bg,
              padding: "20px 32px 36px",
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
              justenvs &middot; macOS &middot; {host}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
