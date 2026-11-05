import { SITE } from "~/data/site";

/**
 * Head tags for a route, in the shape TanStack Router's `head`
 * option expects. Keeping this in one place means no page can
 * quietly ship without a description or a social card.
 */
export function seo({
  title,
  description = SITE.description,
  image = "/images/hero-cape-town.jpg",
  path = "/",
}: {
  title: string;
  description?: string;
  image?: string;
  path?: string;
}) {
  const fullTitle = title === SITE.name ? title : `${title} — ${SITE.name}`;
  const url = `${SITE.url}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE.url}${image}`;

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: imageUrl },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
