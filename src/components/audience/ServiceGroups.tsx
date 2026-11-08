import { Container } from "@/components/ui/Container";
import type { ServiceGroup } from "@/data/audiences";
import { ServiceCard } from "./ServiceCard";

/** Numbered groups that mirror the sub navbar. The heading stays in view while its cards scroll. */
export function ServiceGroups({ groups, prefix }: { groups: ServiceGroup[]; prefix: string }) {
  return (
    <div id={`${prefix}-groups`} className="pt-4 pb-12 md:pb-16">
      <Container>
        {groups.map((g, gi) => (
          <section
            key={g.id}
            id={`${prefix}-${g.id}`}
            aria-labelledby={`${prefix}-${g.id}-title`}
            className="grid scroll-mt-[calc(var(--header-h,169px)+70px)] gap-x-12 gap-y-5 border-b border-line py-10 last:border-b-0 lg:grid-cols-[300px_1fr]"
          >
            <div data-reveal="left" className="self-start lg:sticky lg:top-[calc(var(--header-h,169px)+84px)]">
              <span className="mb-2.5 flex items-center gap-2.5 text-label text-red-brand tabular-nums">
                {String(gi + 1).padStart(2, "0")}
                <span aria-hidden="true" className="h-0.5 w-7 bg-red-brand" />
              </span>
              <h2 id={`${prefix}-${g.id}-title`} className="mb-2 font-heading text-h3">
                {g.title}
              </h2>
              <p className="max-w-[34ch] text-small text-ink-muted">{g.intro}</p>
            </div>
            <div className="group/cards grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
              {g.items.map((s, i) => (
                <ServiceCard key={s.title} service={s} index={i} />
              ))}
            </div>
          </section>
        ))}
      </Container>
    </div>
  );
}
