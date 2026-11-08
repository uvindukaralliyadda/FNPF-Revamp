import type { Metadata } from "next";
import { SITE } from "@/data/site";

/** Page metadata with matching Open Graph and Twitter tags and a canonical URL. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${SITE.shortName}`, description, url: path, type: "website", siteName: SITE.name, locale: "en_FJ" },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE.shortName}`, description },
  };
}
