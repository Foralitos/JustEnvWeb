import SignInForm from "./SignInForm";

export const metadata = {
  title: "Sign in — justenvs",
  robots: { index: false, follow: false },
};

// Custom NextAuth sign-in page (wired via pages.signIn in libs/auth.js).
// Server reads callbackUrl/error from the query and hands them to the client
// form, which drives Google + magic-link sign-in.
export default async function SignInPage({ searchParams }) {
  const sp = await searchParams;
  const callbackUrl =
    typeof sp?.callbackUrl === "string" ? sp.callbackUrl : "/dashboard";
  const error = typeof sp?.error === "string" ? sp.error : "";

  return <SignInForm callbackUrl={callbackUrl} error={error} />;
}
