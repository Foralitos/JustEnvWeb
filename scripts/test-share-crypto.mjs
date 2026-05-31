// Dev-only fixture: encrypts a sample env payload in the exact CryptoKit
// AES.GCM.SealedBox.combined layout (nonce(12) || ciphertext || tag(16)),
// posts it to /api/share, and prints the resulting viewer URL.
//
// Use this to validate the WebCrypto interop before the macOS app ships.
//
// Usage:
//   node scripts/test-share-crypto.mjs                 # POSTs to http://localhost:3000
//   BASE_URL=https://justenvs.app node scripts/test-share-crypto.mjs

import { randomBytes, createCipheriv } from "node:crypto";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const PAYLOAD = {
  project: "demo",
  env: "prod",
  vars: {
    DATABASE_URL: "postgres://user:pass@localhost:5432/demo",
    API_KEY: "sk_live_fakekey_only_for_testing",
    DEBUG: "false",
    "FEATURE_X_ENABLED": "1",
  },
  createdAt: new Date().toISOString(),
  appVersion: "test/0.0.1",
};

function b64url(buf) {
  return Buffer.from(buf).toString("base64url");
}

function sealCryptoKitGcm(plaintext, key) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  // CryptoKit layout: nonce(12) || ct || tag(16)
  return Buffer.concat([iv, ct, tag]);
}

const dek = randomBytes(32); // AES-256
const plaintext = Buffer.from(JSON.stringify(PAYLOAD), "utf8");
const combined = sealCryptoKitGcm(plaintext, dek);

const res = await fetch(`${BASE_URL}/api/share`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    ciphertext: combined.toString("base64"),
    ttlSec: 3600,
    maxViews: 5,
    burn: false,
  }),
});

if (!res.ok) {
  console.error("POST failed:", res.status, await res.text());
  process.exit(1);
}

const { token, url, expiresAt } = await res.json();

// The server always returns the production URL (justenvs.app). For local dev
// we want to open the share on the dev server, so build the viewer URL from
// BASE_URL instead of trusting the server's `url` field.
const viewerUrl = `${BASE_URL}/s/${token}#k=${b64url(dek)}&v=1`;

console.log("Share created:");
console.log("  token         ", token);
console.log("  expiresAt     ", expiresAt);
console.log("  server URL    ", url, "(production, ignore in local dev)");
console.log("  open this URL ", viewerUrl);
