// WebCrypto helpers for the share viewer.
//
// CryptoKit's AES.GCM.SealedBox.combined layout is nonce(12) || ciphertext || tag(16).
// WebCrypto expects iv separate from (ciphertext || tag) concatenated. These helpers
// translate between the two so payloads sealed in the macOS app open in the browser.

export function b64decode(s) {
  const bin = atob(s);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

export function b64urlDecode(s) {
  let normalized = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = normalized.length % 4;
  if (pad) normalized += "=".repeat(4 - pad);
  return b64decode(normalized);
}

export async function importAesGcmKey(keyBytes) {
  return crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );
}

// Opens a CryptoKit-formatted AES-GCM combined blob.
// Returns the decrypted bytes; throws OperationError if auth tag fails (wrong key).
export async function aesGcmOpen(combinedB64, key) {
  const bytes = b64decode(combinedB64);
  if (bytes.length < 12 + 16) {
    throw new Error("ciphertext_too_short");
  }
  const iv = bytes.slice(0, 12);
  const ctWithTag = bytes.slice(12);
  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ctWithTag
  );
  return new Uint8Array(plain);
}

export function bytesToUtf8(bytes) {
  return new TextDecoder("utf-8").decode(bytes);
}
