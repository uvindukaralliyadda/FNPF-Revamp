"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import type { Team } from "@/data/people";
import { cn } from "@/lib/cn";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Team showcase (after cargokite.com/about): a list of names beside one large portrait.
 * Hover, focus or tap a name → its portrait wipes up over the last one, the caption slides in,
 * the row fills from the bottom and the red-into-yellow line runs along it.
 * Below 900px the list turns into photo cards and the portrait stage is hidden.
 */
export function TeamShowcase({ team }: { team: Team }) {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const current = team.people[active];

  function show(i: number) {
    if (i === active) return;
    setPrev(active);
    setActive(i);
  }

  return (
    <section id={`team-${team.id}`} aria-labelledby={`teamTitle-${team.id}`} className="scroll-mt-30 py-12 md:py-16 [&+&]:pt-0">
      <Container>
        <div data-reveal className="mb-9 grid gap-x-12 gap-y-2.5 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] min-[900px]:items-end">
          <h2 id={`teamTitle-${team.id}`} className="font-heading text-h2 text-ink">
            {team.title}
          </h2>
          <p className="max-w-[56ch] text-ink-muted">{team.intro}</p>
        </div>

        <div className="grid items-start gap-12 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] min-[900px]:gap-14">
          {/* portrait stage */}
          <div
            data-reveal
            aria-hidden="true"
            className="sticky top-35 hidden aspect-[4/5] max-h-[calc(100vh-170px)] w-full overflow-hidden rounded-[20px] bg-surface-3 shadow-[0_30px_60px_-34px_rgba(26,29,32,0.45)] min-[900px]:block"
          >
            {team.people.map((p, i) => (
              <span
                key={p.name}
                className={cn(
                  "absolute inset-0",
                  i === active
                    ? "z-2 scale-100 transition-[clip-path,scale] duration-700 ease-wipe [clip-path:inset(0_0_0_0)] motion-reduce:transition-none"
                    : i === prev
                      ? "z-1 scale-100 [clip-path:inset(0_0_0_0)]"
                      : "scale-108 [clip-path:inset(100%_0_0_0)]",
                )}
              >
                <Image src={p.photo} alt="" fill sizes="(min-width: 900px) 40vw, 1px" className="object-cover object-[center_22%]" />
              </span>
            ))}
            <div className="absolute inset-x-4 bottom-4 z-3 grid gap-1 rounded-[14px] bg-red-brand/92 px-4.5 pt-4 pb-4.5 text-white backdrop-blur-sm">
              <span key={`n${active}`} className="block overflow-hidden">
                <span className="block animate-cap font-heading text-[1.25rem] leading-tight font-semibold tracking-[-0.01em]">{current.name}</span>
              </span>
              <span key={`r${active}`} className="block overflow-hidden">
                <span className="block animate-cap text-small text-white/88 [animation-delay:60ms]">{current.role}</span>
              </span>
            </div>
          </div>

          {/* names */}
          <ul className="grid grid-cols-1 gap-3.5 min-[380px]:grid-cols-2 min-[900px]:block min-[900px]:border-t min-[900px]:border-line">
            {team.people.map((p, i) => (
              <li key={p.name} data-reveal={String(i * 60)} className="grid">
                <button
                  type="button"
                  aria-pressed={i === active}
                  onPointerEnter={(e) => e.pointerType === "mouse" && show(i)}
                  onFocus={() => show(i)}
                  onClick={() => show(i)}
                  className={cn(
                    "group/row relative isolate grid h-full w-full content-start overflow-hidden text-left",
                    // phones: photo card
                    "rounded-2xl bg-white shadow-[0_1px_2px_rgba(26,29,32,0.06),0_10px_26px_-18px_rgba(26,29,32,0.4)]",
                    // desktop: list row
                    "min-[900px]:cursor-pointer min-[900px]:grid-cols-[44px_minmax(0,1fr)_auto] min-[900px]:content-center min-[900px]:items-center min-[900px]:gap-4 min-[900px]:rounded-none min-[900px]:border-b min-[900px]:border-line min-[900px]:bg-transparent min-[900px]:px-3 min-[900px]:py-5.5 min-[900px]:shadow-none",
                    // row fill from the bottom + red-into-yellow line
                    "min-[900px]:before:absolute min-[900px]:before:inset-0 min-[900px]:before:-z-10 min-[900px]:before:origin-bottom min-[900px]:before:scale-y-0 min-[900px]:before:bg-surface-2 min-[900px]:before:transition-transform min-[900px]:before:duration-500 min-[900px]:before:ease-soft min-[900px]:aria-pressed:before:scale-y-100",
                    "min-[900px]:after:absolute min-[900px]:after:inset-x-0 min-[900px]:after:-bottom-px min-[900px]:after:h-0.5 min-[900px]:after:origin-left min-[900px]:after:scale-x-0 min-[900px]:after:bg-[linear-gradient(90deg,var(--color-red-brand)_0_70%,var(--color-sun)_70%_100%)] min-[900px]:after:transition-transform min-[900px]:after:duration-500 min-[900px]:after:ease-soft min-[900px]:aria-pressed:after:scale-x-100",
                    "focus-visible:outline-offset-[-3px]",
                  )}
                >
                  <span className="relative block aspect-[4/5] min-[900px]:hidden">
                    <Image src={p.photo} alt={`Portrait of ${p.name}`} fill sizes="(min-width: 380px) 50vw, 100vw" className="object-cover object-[center_22%]" />
                  </span>
                  <span aria-hidden="true" className="hidden text-label text-ink-muted tabular-nums transition-colors duration-150 group-aria-pressed/row:text-red-brand min-[900px]:block">
                    {pad(i + 1)}
                  </span>
                  <span className="grid gap-0.5 px-3.5 pt-3 pb-3.5 transition-transform duration-500 ease-soft min-[900px]:p-0 min-[900px]:group-aria-pressed/row:translate-x-2.5">
                    <span className="font-heading text-[1.0625rem] leading-tight font-semibold tracking-[-0.015em] text-ink transition-colors duration-150 min-[900px]:text-[clamp(1.25rem,1.1rem+0.6vw,1.75rem)] min-[900px]:group-aria-pressed/row:text-red-brand">
                      {p.name}
                    </span>
                    <span className="text-[0.8125rem] leading-snug text-ink-muted min-[900px]:text-small">{p.role}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden size-10.5 place-items-center rounded-full border border-line-strong text-ink transition-[background-color,border-color,color,rotate] duration-500 ease-soft group-aria-pressed/row:rotate-45 group-aria-pressed/row:border-red-brand group-aria-pressed/row:bg-red-brand group-aria-pressed/row:text-sun min-[900px]:grid"
                  >
                    <Icon name="arrow-ne" className="size-4" strokeWidth={2.2} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
