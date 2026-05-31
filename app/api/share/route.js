import { NextResponse } from "next/server";
import { redis } from "@/libs/share/redis";
import { rlPost, checkLimit } from "@/libs/share/ratelimit";
import { generateToken, hashIp, extractIp } from "@/libs/share/token";
import {
  MAX_CIPHERTEXT_BYTES,
  VALID_TTL_VALUES,
  MAX_VIEWS_OPTIONS,
  SHARE_KEY_PREFIX,
  UNLIMITED_VIEWS_SENTINEL,
} from "@/libs/share/constants";
import config from "@/config";

export const runtime = "nodejs";

// POST /api/share
// Creates a self-destructing share. Body is opaque ciphertext + lifetime
// parameters; the server never sees the plaintext or the encryption key.
//
// Anonymous endpoint, gated only by per-IP rate limit. Not loud-promoted: the
// macOS app is the only documented caller.
export async function POST(req) {
  const ip = extractIp(req);
  const ipHash = hashIp(ip);

  const limit = await checkLimit(rlPost, ipHash);
  if (!limit.success) {
    const retryAfter = Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000));
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { ciphertext, ttlSec, maxViews, burn } = body || {};

  if (typeof ciphertext !== "string" || ciphertext.length === 0) {
    return NextResponse.json({ error: "ciphertext_required" }, { status: 400 });
  }
  // base64 expansion of MAX_CIPHERTEXT_BYTES bytes = ceil(N/3)*4.
  const ciphertextBudget = Math.ceil(MAX_CIPHERTEXT_BYTES / 3) * 4;
  if (ciphertext.length > ciphertextBudget) {
    return NextResponse.json({ error: "ciphertext_too_large" }, { status: 413 });
  }
  if (!VALID_TTL_VALUES.includes(ttlSec)) {
    return NextResponse.json({ error: "invalid_ttl" }, { status: 400 });
  }
  const normalizedMaxViews = maxViews === undefined ? null : maxViews;
  if (!MAX_VIEWS_OPTIONS.includes(normalizedMaxViews)) {
    return NextResponse.json({ error: "invalid_max_views" }, { status: 400 });
  }
  if (typeof burn !== "boolean") {
    return NextResponse.json({ error: "burn_required" }, { status: 400 });
  }

  const token = generateToken();
  const key = SHARE_KEY_PREFIX + token;
  const expiresAt = new Date(Date.now() + ttlSec * 1000).toISOString();

  try {
    const pipe = redis.pipeline();
    pipe.hset(key, {
      ciphertext,
      maxViews: normalizedMaxViews ?? UNLIMITED_VIEWS_SENTINEL,
      burn: burn ? 1 : 0,
    });
    pipe.expire(key, ttlSec);
    await pipe.exec();
  } catch (e) {
    return NextResponse.json({ error: "storage_failed" }, { status: 500 });
  }

  const url = `https://${config.domainName}/s/${token}`;
  return NextResponse.json(
    { token, url, expiresAt },
    { status: 201, headers: { "Cache-Control": "no-store" } }
  );
}
