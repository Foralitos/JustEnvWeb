/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // SEO: /share moved to /one-time-secret (2026-06-10). permanent:true
      // emits a 308, which Google treats the same as a 301.
      {
        source: "/share",
        destination: "/one-time-secret",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      // NextJS <Image> component needs to whitelist domains for src={}
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https", 
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "logos-world.net",
      },
    ],
  },
  webpack: (config, { webpack, isServer }) => {
    // Ignore MongoDB's optional dependencies to prevent build warnings
    if (isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^(kerberos|@mongodb-js\/zstd|@aws-sdk\/credential-providers|gcp-metadata|snappy|socks|aws4|mongodb-client-encryption)$/,
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;
