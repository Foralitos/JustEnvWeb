import { randomBytes, createHash } from "node:crypto";
import { TOKEN_BYTES } from "@/libs/share/constants";

// 24 random bytes → ~32 base64url chars, ~192 bits of entropy. Collisions are
// negligible at any volume we will ever see.
export function generateToken() {
  return randomBytes(TOKEN_BYTES).toString("base64url");
}

// Hashes the caller IP with a server-side salt so we never store raw IPs in
// the rate-limit keyspace.
export function hashIp(ip) {
  const salt = process.env.SHARE_IP_SALT;
  if (!salt) {
    throw new Error("Add SHARE_IP_SALT to .env.local (generate with `openssl rand -hex 32`)");
  }
  return createHash("sha256").update(salt + ":" + ip).digest("hex");
}

// Vercel/proxies put the originating IP in x-forwarded-for as a comma-separated
// list; the leftmost entry is the real client. Falls back to x-real-ip and
// finally a sentinel to keep the limiter functional in local dev.
export function extractIp(req) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "0.0.0.0";
}
