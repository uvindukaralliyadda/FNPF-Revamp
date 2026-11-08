"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QUICK_LINKS } from "@/data/home";
import { useEqualHeights } from "@/hooks/useEqualHeights";
import { QuickCard } from "./QuickCard";

/** Eight most-used tasks. Pale Pacific-blue band. Glass text panels share one height. */
export function QuickAccess() {
  const gridRef = useEqualHeights<HTMLDivElement>();
  return (
    <section aria-labelledby="quickTitle" className="bg-[linear-gradient(180deg,var(--color-pacific-tint)_0%,var(--color-pacific-mist)_100%)] py-12 md:py-16">
      <Container>
        <SectionHeading id="quickTitle" title="Quick access" text="The things members, pensioners and employers do most, one click away." />
        <div ref={gridRef} className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
          {QUICK_LINKS.map((q, i) => (
            <QuickCard key={q.title} index={i} {...q} />
          ))}
        </div>
      </Container>
    </section>
  );
}
