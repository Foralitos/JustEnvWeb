import SignOutForm from "./SignOutForm";

export const metadata = {
  title: "Sign out — justenvs",
  robots: { index: false, follow: false },
};

// Custom NextAuth sign-out confirmation (wired via pages.signOut in libs/auth.js).
export default async function SignOutPage({ searchParams }) {
  const sp = await searchParams;
  const callbackUrl =
    typeof sp?.callbackUrl === "string" ? sp.callbackUrl : "/";

  return <SignOutForm callbackUrl={callbackUrl} />;
}
