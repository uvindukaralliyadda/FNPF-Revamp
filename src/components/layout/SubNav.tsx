"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Audience } from "@/data/navigation";
import { Dropdown } from "./Dropdown";
import { cn } from "@/lib/cn";

/** Layer 3: the selected audience's own menu. Hidden on the homepage. */
export function SubNav({ audience, openMenu, onToggle, onHoverOpen }: { audience: Audience | null; openMenu: string | null; onToggle: (id: string) => void; onHoverOpen: (id: string) => void }) {
  return (
    <nav
      aria-label="Audience sections"
      className={cn(
        "relative z-[2] hidden border-b bg-surface-2 transition-[height,border-color] duration-300 ease-soft lg:block",
        audience ? "h-[53px] border-line" : "h-0 overflow-hidden border-transparent",
      )}
    >
      {audience && (
        <div key={audience.key} className="mx-auto flex h-[52px] w-full max-w-[1240px] items-stretch gap-6 px-4 md:px-6">
          <div className="flex items-center border-r border-line-strong pr-6 text-label uppercase">
            <Link href={audience.href} className="text-pacific transition-colors hover:text-red-brand">
              {audience.label}
            </Link>
          </div>
          <ul className="flex items-stretch gap-1">
            {audience.menus.map((m, i) => {
              const id = `sub-${audience.key}-${i}`;
              const open = openMenu === id;
              const line =
                "after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:origin-left after:bg-red-brand after:transition-transform after:duration-300 after:ease-soft";
              return (
                <li key={m.label} className="relative flex animate-rise" style={{ animationDelay: `${i * 40}ms` }}>
                  {m.links ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={id}
                        onClick={() => onToggle(id)}
                        onPointerEnter={(e) => e.pointerType === "mouse" && onHoverOpen(id)}
                        className={cn(
                          "relative inline-flex items-center gap-1.5 px-3 text-small font-semibold whitespace-nowrap transition-colors",
                          line,
                          open ? "text-red-brand after:scale-x-100" : "text-ink after:scale-x-0 hover:text-red-brand hover:after:scale-x-100",
                        )}
                      >
                        {m.label}
                        <Icon name="chevron" className={cn("size-3 transition-transform duration-300 ease-soft", open && "rotate-180")} />
                      </button>
                      <Dropdown id={id} open={open} links={m.links} />
                    </>
                  ) : (
                    <a
                      href={m.href}
                      className={cn("relative inline-flex items-center px-3 text-small font-semibold whitespace-nowrap text-ink transition-colors after:scale-x-0 hover:text-red-brand hover:after:scale-x-100", line)}
                    >
                      {m.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
