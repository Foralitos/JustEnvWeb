import { NextResponse } from "next/server";
import { redis, LUA_CONSUME_SHARE } from "@/libs/share/redis";
import { rlGet, checkLimit } from "@/libs/share/ratelimit";
import { hashIp, extractIp } from "@/libs/share/token";
import { SHARE_KEY_PREFIX, UNLIMITED_VIEWS_SENTINEL } from "@/libs/share/constants";

export const runtime = "nodejs";

const NO_STORE = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
  Pragma: "no-cache",
  "X-Content-Type-Options": "nosniff",
};

// GET /api/share/[token]
// Atomically reads a share, decrements remaining views, and deletes the record
// if it was the final view or the share is burn-after-read. Returns 410 for
// shares that have expired or already been consumed.
export async function GET(req, { params }) {
  const { token } = await params;

  if (typeof token !== "string" || !/^[A-Za-z0-9_-]{1,64}$/.test(token)) {
    return NextResponse.json({ error: "not_found" }, { status: 404, headers: NO_STORE });
  }

  const ip = extractIp(req);
  const ipHash = hashIp(ip);

  const limit = await checkLimit(rlGet, ipHash);
  if (!limit.success) {
    const retryAfter = Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000));
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { ...NO_STORE, "Retry-After": String(retryAfter) } }
    );
  }

  let result;
  try {
    result = await redis.eval(LUA_CONSUME_SHARE, [SHARE_KEY_PREFIX + token], []);
  } catch {
    return NextResponse.json({ error: "storage_failed" }, { status: 500, headers: NO_STORE });
  }

  if (!result) {
    return NextResponse.json({ error: "gone" }, { status: 410, headers: NO_STORE });
  }

  const [ciphertext, viewsRemainingRaw, ttl] = result;
  const viewsRemaining =
    Number(viewsRemainingRaw) === UNLIMITED_VIEWS_SENTINEL
      ? null
      : Number(viewsRemainingRaw);

  return NextResponse.json(
    { ciphertext, viewsRemaining, ttl: Number(ttl) },
    { status: 200, headers: NO_STORE }
  );
}
