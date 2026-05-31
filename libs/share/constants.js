// Shared limits for the self-destructing share-link feature.
// IMPORTANT: keep in sync with Sources/Core/Sharing/ShareConfig.swift on the macOS app.

export const MAX_CIPHERTEXT_BYTES = 65536;

export const TTL_OPTIONS_SEC = {
  oneHour: 3600,
  oneDay: 86400,
  sevenDays: 604800,
};

export const VALID_TTL_VALUES = Object.values(TTL_OPTIONS_SEC);

// null = unlimited views (lifetime bounded only by TTL).
export const MAX_VIEWS_OPTIONS = [1, 5, null];

export const TOKEN_BYTES = 24;

export const RL_POST_PER_DAY = 20;
export const RL_GET_PER_MIN = 120;

export const SHARE_KEY_PREFIX = "share:";

// Sentinel value stored in Redis when maxViews is "unlimited" (Redis hash fields
// are strings; -1 sidesteps null/undefined ambiguity in the Lua script).
export const UNLIMITED_VIEWS_SENTINEL = -1;
