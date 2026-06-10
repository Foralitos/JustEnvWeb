import { getSEOTags, breadcrumbJsonLd } from "@/libs/seo";
import { ALTERNATIVES } from "@/libs/alternatives";
import AlternativesIndex from "./AlternativesIndex";

// Hub page for the comparison cluster (see vault note justenvs-seo).
export const metadata = getSEOTags({
  title: "JustEnvs Alternatives & Comparisons — Doppler, Infisical, 1Password & More",
  description:
    "Honest comparisons between JustEnvs and Doppler, Infisical, dotenv-vault, OneTimeSecret, and 1Password — including where each tool beats us. Find the right way to manage your .env files.",
  canonicalUrlRelative: "/alternatives",
  openGraph: {
    title: "JustEnvs Alternatives & Comparisons",
    description:
      "Side-by-side comparisons with Doppler, Infisical, dotenv-vault, OneTimeSecret, and 1Password.",
    url: "https://justenvs.app/alternatives",
  },
});

function itemListJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: ALTERNATIVES.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.title,
      url: `https://justenvs.app/alternatives/${a.slug}`,
    })),
  });
}

export default function AlternativesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: itemListJsonLd() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", urlRelative: "/" },
            { name: "Alternatives", urlRelative: "/alternatives" },
          ]),
        }}
      />
      <AlternativesIndex
        alternatives={ALTERNATIVES.map(({ slug, name, segment, tagline }) => ({
          slug,
          name,
          segment,
          tagline,
        }))}
      />
    </>
  );
}
