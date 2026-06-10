import { notFound } from "next/navigation";
import { getSEOTags, faqJsonLd, breadcrumbJsonLd } from "@/libs/seo";
import { ALTERNATIVES, getAlternative, otherAlternatives } from "@/libs/alternatives";
import AlternativeLanding from "../AlternativeLanding";

// SEO target: "<competitor> alternative" cluster (see vault note justenvs-seo).
// Pages are fully static; unknown slugs 404 instead of rendering thin pages.
export const dynamicParams = false;

export function generateStaticParams() {
  return ALTERNATIVES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = getAlternative(slug);
  if (!entry) return {};
  return getSEOTags({
    title: entry.title,
    description: entry.metaDescription,
    canonicalUrlRelative: `/alternatives/${entry.slug}`,
    openGraph: {
      title: entry.title,
      description: entry.metaDescription,
      url: `https://justenvs.app/alternatives/${entry.slug}`,
    },
  });
}

export default async function AlternativePage({ params }) {
  const { slug } = await params;
  const entry = getAlternative(slug);
  if (!entry) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd(entry.faqs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", urlRelative: "/" },
            { name: "Alternatives", urlRelative: "/alternatives" },
            { name: entry.name, urlRelative: `/alternatives/${entry.slug}` },
          ]),
        }}
      />
      <AlternativeLanding entry={entry} others={otherAlternatives(slug)} />
    </>
  );
}
