import Image from "next/image";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { NEWS } from "@/data/home";
import { LEGACY } from "@/data/site";

/** Four latest articles: image, date, headline, 10-word summary, Read more. */
export function LatestNews() {
  return (
    <section aria-labelledby="newsTitle" className="bg-white py-12 md:py-16">
      <Container>
        <SectionHeading id="newsTitle" title="Latest news & media" text="Updates, media releases and stories from the Fund." action={<TextLink href={LEGACY("latest-news/")}>View all news</TextLink>} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {NEWS.map((n, i) => (
            <article
              key={n.href}
              data-reveal={String(150 + i * 100)}
              className="group/news flex flex-col overflow-hidden rounded-card border border-line bg-white transition-[transform,box-shadow,border-color] duration-500 ease-soft hover:-translate-y-1.5 hover:border-red-brand/15 hover:shadow-[0_28px_56px_-28px_rgba(26,29,32,0.35)]"
            >
              <a href={n.href} tabIndex={-1} aria-hidden="true" className="relative block aspect-[16/10] overflow-hidden bg-surface-3">
                <Image
                  src={n.image.src}
                  alt={n.image.alt}
                  fill
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-soft group-hover/news:scale-[1.07]"
                  style={{ objectPosition: n.image.position ?? "50% 50%" }}
                />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(0,0,0,0.35))] opacity-0 transition-opacity duration-300 group-hover/news:opacity-100" />
                <span className="absolute bottom-3 left-3 z-[1] rounded-lg bg-white/95 px-2.5 py-1 text-label tracking-[0.04em] text-ink uppercase shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-colors group-hover/news:bg-red-brand group-hover/news:text-white">
                  {n.tag}
                </span>
              </a>
              <div className="flex flex-1 flex-col px-5 pt-5 pb-[22px]">
                <time dateTime={n.iso} className="text-meta font-medium text-ink-muted tabular-nums">
                  {n.date}
                </time>
                <h3 className="mt-2 mb-2.5 font-heading text-h4">
                  <a href={n.href} className="line-clamp-3 transition-colors hover:text-red-brand">
                    {n.title}
                  </a>
                </h3>
                <p className="mb-6 text-small text-ink-muted">{n.description}</p>
                <span className="mt-auto">
                  <ArrowButton href={n.href} variant="secondary" size="sm" aria-label={`Read more: ${n.title}`}>
                    Read more
                  </ArrowButton>
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
