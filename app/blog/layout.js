import { Suspense } from "react";
import HeaderBlog from "./_assets/components/HeaderBlog";
import Footer from "@/components/Footer";

// Blog is disabled (decision 2026-06-05): code stays, but nothing under /blog
// gets indexed. Also blocked via robots.txt Disallow and unlinked from the UI.
export const metadata = {
  robots: { index: false, follow: false },
};

export default async function LayoutBlog({ children }) {
  return (
    <div>
      <Suspense>
        <HeaderBlog />
      </Suspense>

      <main className="min-h-screen max-w-6xl mx-auto p-8">{children}</main>

      <div className="h-24" />

      <Footer />
    </div>
  );
}
