import { redirect } from "next/navigation";
import { auth } from "@/libs/auth";
import { signAppToken } from "@/libs/appToken";
import AppAuthRedirect from "./AppAuthRedirect";

export const metadata = {
  title: "Connect JustEnv — justenvs",
  robots: { index: false, follow: false },
};

// Entry point for the native macOS app sign-in. The app opens this URL in the
// browser. If not logged in, we bounce through the existing NextAuth sign-in
// (Google / magic link). Once authenticated, we mint a signed app token and
// hand it back to the app via the justenv:// deeplink (done client-side).
export default async function AppAuthPage({ searchParams }) {
  const session = await auth();
  const sp = await searchParams;
  const state = typeof sp?.state === "string" ? sp.state : "";

  if (!session?.user?.id) {
    // Preserve `state` through the NextAuth login round-trip so it survives
    // back to the deeplink (the app validates it best-effort).
    const cb = state ? `/app-auth?state=${encodeURIComponent(state)}` : "/app-auth";
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(cb)}`);
  }

  const token = await signAppToken({
    userId: session.user.id,
    email: session.user.email,
  });

  return <AppAuthRedirect token={token} state={state} />;
}
