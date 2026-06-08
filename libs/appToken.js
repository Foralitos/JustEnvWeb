import { SignJWT, jwtVerify } from "jose";

// Signs/verifies the token the native macOS app receives via the justenv://
// deeplink and later presents (Bearer) to /api/app/entitlement. It only
// IDENTIFIES the user (sub = Mongo user id); entitlement (hasAccess) is always
// read live from the DB, so it stays correct across purchases/refunds.
// Signed with a dedicated APP_TOKEN_SECRET (HS256), decoupled from NextAuth.

const ISSUER = "justenvs.app";
const AUDIENCE = "justenv-app";

function getSecret() {
  const secret = process.env.APP_TOKEN_SECRET;
  if (!secret) throw new Error("APP_TOKEN_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function signAppToken({ userId, email }) {
  return await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime("180d")
    .sign(getSecret());
}

export async function verifyAppToken(token) {
  const { payload } = await jwtVerify(token, getSecret(), {
    issuer: ISSUER,
    audience: AUDIENCE,
  });
  return payload; // { sub, email, iat, exp, ... }
}
