import ThankYou from "@/components/landing/ThankYou";

export const metadata = {
  title: "Thank you — justenvs",
  robots: { index: false, follow: false },
};

// Public Stripe-checkout success page (success_url). The buyer may be a guest,
// so this page does NOT require a session — the webhook grants access async.
export default function ThankYouPage() {
  return <ThankYou />;
}
