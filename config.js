const config = {
  // REQUIRED
  appName: "justenvs",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "JustEnvs is a Mac app to store, manage and share environment variables securely. Keep your .env files encrypted in one place, share with self-destructing links.",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "justenvs.app",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (resend.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Single one-time "Pro" plan. The webhook (app/api/webhook/stripe/route.js)
    // matches the priceId from Stripe against this list to grant hasAccess, so
    // the priceId MUST match the live/test price exactly. We read it from an env
    // var (STRIPE_PRICE_PRO) so the same code works in test (.env.local) and
    // live (Vercel) — set the matching price id in each environment.
    plans: [
      {
        // REQUIRED — used by the webhook to find the plan and grant access.
        priceId: "prod_UfBs3DCzsiImgc",
        // One-time payment (not a subscription).
        mode: "payment",
        name: "JustEnvs Pro",
        description: "Lifetime access — unlimited projects",
        // Display price (USD). The real charge is whatever the Stripe price is.
        price: 50,
        isFeatured: true,
        features: [
          { name: "Unlimited projects" },
          { name: "Everything in Free" },
          { name: "One-time payment, no subscription" },
          { name: "All future Pro features" },
        ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  resend: {
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `justenvs <noreply@justenvs.app>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Fora at justenvs <fora@justenvs.app>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "elfora.dev@gmail.com",
  },
  colors: {
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). HEX only.
    main: "#38E08A",
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/api/auth/signin",
    callbackUrl: "/dashboard",
  },
  download: {
    dmgUrl:
      "https://github.com/Foralitos/justenv-releases/releases/latest/download/JustEnv.dmg",
  },
};

export default config;
