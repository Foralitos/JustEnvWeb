module.exports = {
  siteUrl: process.env.SITE_URL || "https://justenvs.app",
  generateRobotsTxt: true,
  // Exclude metadata files, private/disabled routes. Blog is disabled
  // (2026-06-05): code stays but it's unlisted, noindexed and disallowed.
  // /s/* are one-time share links — crawling them would consume views.
  exclude: [
    "/twitter-image.*",
    "/opengraph-image.*",
    "/icon.*",
    "/blog",
    "/blog/*",
    "/s/*",
    "/dashboard",
    "/dashboard/*",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/s/", "/blog", "/dashboard"],
      },
    ],
  },
};
