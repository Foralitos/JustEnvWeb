import { NextResponse } from "next/server"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Edge-compatible configuration for middleware (without EmailProvider and MongoDB adapter)
// When using NextAuth.js in middleware, you need to use the edge-compatible configuration
// This is because the middleware runs in an edge environment, and the EmailProvider is not compatible with edge environments
// The MongoDB adapter is also not compatible with edge environments, so we need to use the edge-compatible configuration
const { auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
})

// Security headers applied per-request via middleware. Previously defined in
// next.config.js `headers()` with a wildcard source, which corrupted Vercel's
// prerendered-HTML + RSC `.body` serving and leaked the multipart payload
// into the visible page body. Middleware injection runs after the response
// stream is composed and avoids that interaction.
const SECURITY_HEADERS = {
  "X-Frame-Options": "SAMEORIGIN",
  "Content-Security-Policy": "frame-ancestors 'self'",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security":
    "max-age=63072000; includeSubDomains; preload",
}

export default auth(async function middleware(req) {
  const res = NextResponse.next()
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    res.headers.set(key, value)
  }
  return res
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
