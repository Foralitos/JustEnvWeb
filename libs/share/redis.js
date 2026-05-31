import { Redis } from "@upstash/redis";

let cachedRedis;

// Lazy-init so importing this module doesn't crash other API routes when the
// share feature env vars aren't configured yet (local dev, preview deploys, etc.).
function getRedis() {
  if (cachedRedis) return cachedRedis;
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error(
      "Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to your environment"
    );
  }
  cachedRedis = Redis.fromEnv();
  return cachedRedis;
}

export const redis = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getRedis();
      const value = client[prop];
      return typeof value === "function" ? value.bind(client) : value;
    },
  }
);

// Atomic GET: reads the share, decrements maxViews when bounded, deletes the
// key if exhausted or burn-after-read. Returns nil for "not found / expired /
// already consumed" so the API layer just maps nil → 410.
//
// Returns [ciphertext, viewsRemaining, ttlSec] where viewsRemaining is -1
// (UNLIMITED_VIEWS_SENTINEL) for unbounded shares.
export const LUA_CONSUME_SHARE = `
local key = KEYS[1]
local data = redis.call('HGETALL', key)
if #data == 0 then return nil end

local map = {}
for i = 1, #data, 2 do map[data[i]] = data[i+1] end

local maxViews = tonumber(map['maxViews'])
local burn = map['burn'] == '1'

if maxViews ~= -1 then
  if maxViews < 1 then return nil end
  maxViews = redis.call('HINCRBY', key, 'maxViews', -1)
end

local ttl = redis.call('TTL', key)

if burn or (maxViews ~= -1 and maxViews < 1) then
  redis.call('DEL', key)
end

return {map['ciphertext'], maxViews, ttl}
`;
