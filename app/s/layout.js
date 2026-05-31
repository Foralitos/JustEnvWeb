import { getSEOTags } from "@/libs/seo";

// Minimal layout for the share viewer: no nav, no chat widget, no toasts.
// Inherits the root <html>/<body> and font setup; only suppresses the heavier
// ClientLayout chrome that wraps the rest of the site.

export const metadata = getSEOTags({
  title: "Self-destructing share — JustEnv",
  description:
    "Encrypted environment variables shared via a single-use link. Decrypted in your browser; the server never sees the contents.",
  robots: { index: false, follow: false },
});

export default function ShareLayout({ children }) {
  return <div className="min-h-screen bg-base-100">{children}</div>;
}
