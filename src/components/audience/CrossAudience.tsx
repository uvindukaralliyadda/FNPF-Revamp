import Image from "next/image";
import Link from "next/link";
import { ArrowChip } from "@/components/ui/ArrowChip";
import { Container } from "@/components/ui/Container";
import { AUDIENCE_PAGES } from "@/data/audiences";
import { AUDIENCE_LIST, type AudienceKey } from "@/data/navigation";

/** "Looking for something else?" – photo cards for the other two audiences. */
export function CrossAudience({ current }: { current: AudienceKey }) {
  const others = AUDIENCE_LIST.filter((a) => a.key !== current);
  return (
    <section aria-labelledby="otherTitle" className="pb-12">
      <Container>
        <div data-reveal className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-t border-line pt-12">
          <h2 id="otherTitle" className="font-heading text-h2">
            Looking for something else?
          </h2>
          <p className="text-small text-ink-muted">Explore services for other FNPF customers.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {others.map((a, i) => {
            const page = AUDIENCE_PAGES[a.key];
            return (
              <Link
                key={a.key}
                href={a.href}
                data-reveal={String(i * 100)}
                className="group/card relative isolate block min-h-[200px] overflow-hidden rounded-[22px] text-white transition-shadow duration-500 ease-soft hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] md:min-h-60"
              >
                <Image
                  src={page.photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 600px, 100vw"
                  className="-z-20 object-cover transition-transform duration-[1200ms] ease-soft group-hover/card:scale-[1.12]"
                  style={{ objectPosition: page.photo.position }}
                />
                <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.25)_55%,rgba(0,0,0,0.05)_100%)]" />
                <span className="absolute right-6 bottom-[22px] left-6 grid gap-1.5 pr-14">
                  <span className="text-label text-sun uppercase">For {a.label.toLowerCase()}</span>
                  <span className="font-heading text-h3 text-white">{page.title}</span>
                </span>
                <ArrowChip
                  group="card"
                  className="absolute right-6 bottom-6 size-11 bg-white/18 text-white backdrop-blur-[6px] group-hover/card:bg-white group-hover/card:text-red-brand"
                />
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
