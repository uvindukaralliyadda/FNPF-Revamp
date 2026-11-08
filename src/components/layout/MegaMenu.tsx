import { ArrowButton } from "@/components/ui/ArrowButton";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import type { MegaMenu as MegaMenuData } from "@/data/navigation";
import { cn } from "@/lib/cn";

/** Full-width panel under the navbar: intro + overview link, then grouped links. */
export function MegaMenu({ menu, open }: { menu: MegaMenuData; open: boolean }) {
  return (
    <div
      id={`mega-${menu.id}`}
      className={cn(
        "absolute inset-x-0 top-full border-b border-line bg-white shadow-menu transition-[opacity,transform,visibility] duration-150 ease-out",
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1.5 opacity-0",
      )}
    >
      <Container className="grid gap-12 pt-8 pb-12 md:grid-cols-[300px_1fr]">
        <div className="border-line md:border-r md:pr-8">
          <h3 className="mb-3 font-heading text-h4">{menu.label}</h3>
          <p className="mb-5 text-small text-ink-muted">{menu.intro}</p>
          <ArrowButton href={menu.href} variant="secondary" size="sm">
            Overview
          </ArrowButton>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8">
          {menu.groups.map((g) => (
            <div key={g.title}>
              <p className="mb-3 border-b border-line pb-2 text-label text-ink-muted uppercase">{g.title}</p>
              <ul>
                {g.links.map((l) => (
                  <li key={l.label}>
                    <ArrowLink href={l.href} className="text-[0.9375rem] font-medium text-ink hover:text-red-brand" arrowClassName="text-red-brand">
                      {l.label}
                    </ArrowLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
