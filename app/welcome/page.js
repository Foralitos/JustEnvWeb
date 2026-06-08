import { redirect } from "next/navigation";
import { auth } from "@/libs/auth";
import WelcomeDownload from "@/components/landing/WelcomeDownload";

export const metadata = {
  title: "Welcome — justenvs",
  robots: { index: false, follow: false },
};

// Post-auth landing for the Download flow. Both Google (OAuth round-trip) and
// magic link converge here as their callbackUrl. Server-guards on session so an
// un-authed visitor can't see it, then hands off to the client downloader.
export default async function WelcomePage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return <WelcomeDownload />;
}
