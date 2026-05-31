import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/libs/share/redis";
import { RL_POST_PER_DAY, RL_GET_PER_MIN } from "@/libs/share/constants";

export const rlPost = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(RL_POST_PER_DAY, "24 h"),
  prefix: "rl:share:post",
  analytics: false,
});

export const rlGet = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(RL_GET_PER_MIN, "1 m"),
  prefix: "rl:share:get",
  analytics: false,
});

// Fail-open wrapper: if Upstash takes longer than 2s, let the request through.
// Better to allow brief abuse than to take the API down with the limiter.
export async function checkLimit(limiter, identifier) {
  try {
    const result = await Promise.race([
      limiter.limit(identifier),
      new Promise((resolve) =>
        setTimeout(() => resolve({ success: true, reset: 0, remaining: -1, failOpen: true }), 2000)
      ),
    ]);
    return result;
  } catch {
    return { success: true, reset: 0, remaining: -1, failOpen: true };
  }
}
