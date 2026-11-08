"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PARTNERS, type Partner } from "@/data/home";
import { LEGACY } from "@/data/site";
import { cn } from "@/lib/cn";

/** Two rows of investment logos scrolling in opposite directions on the deep-blue band. */
export function InvestmentsMarquee() {
  const [paused, setPaused] = useState(false);
  const second = [...PARTNERS.slice(6), ...PARTNERS.slice(0, 6)].reverse();

  return (
    <section aria-labelledby="partnersTitle" className="relative overflow-hidden bg-pacific pt-12 pb-[68px] text-white md:pt-16 md:pb-[84px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_15%_0%,rgba(255,255,255,0.1),transparent_70%)]" />
      <Container className="relative">
        <SectionHeading
          id="partnersTitle"
          tone="dark"
          title="Investing in Fiji, for our members."
          text="Hotels, telecommunications, banking and property across the country."
          action={
            <a href={LEGACY("subsidiaries/")} className="group/tl inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-sun">
              View our subsidiaries
              <Icon name="arrow" className="size-4 transition-transform duration-500 ease-soft group-hover/tl:translate-x-1" />
            </a>
          }
        />
      </Container>
      <div className="relative grid gap-3.5" data-reveal="fade 200">
        <Row partners={PARTNERS} paused={paused} />
        <Row partners={second} paused={paused} reverse />
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play logo animation" : "Pause logo animation"}
        className="absolute right-[max(1.5rem,calc((100%-1240px)/2+1.5rem))] bottom-6 grid size-9 place-items-center rounded-full border border-white/40 text-white transition-[background-color,color,border-color,transform] duration-300 hover:border-sun hover:bg-sun hover:text-pacific-deep active:scale-90 md:bottom-10"
      >
        <Icon name={paused ? "play" : "pause"} className="size-3.5" />
      </button>
    </section>
  );
}

function Row({ partners, paused, reverse }: { partners: Partner[]; paused: boolean; reverse?: boolean }) {
  return (
    <div className="group/row flex gap-3.5 overflow-hidden select-none [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className={cn(
            "flex min-w-full shrink-0 gap-3.5 py-2.5 group-focus-within/row:[animation-play-state:paused] group-hover/row:[animation-play-state:paused]",
            reverse ? "animate-marquee-reverse" : "animate-marquee",
            paused && "[animation-play-state:paused]",
            copy === 1 && "motion-reduce:hidden",
          )}
        >
          {partners.map((p) => (
            <li key={p.name}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener"
                tabIndex={copy === 1 ? -1 : undefined}
                title={p.name}
                className="group/logo relative grid h-[92px] w-40 place-items-center overflow-hidden rounded-[18px] bg-white px-[18px] py-3.5 shadow-[0_8px_24px_-14px_rgba(0,0,0,0.45)] transition-[transform,box-shadow,opacity] duration-500 ease-soft hover:-translate-y-1 hover:shadow-[0_22px_44px_-18px_rgba(0,0,0,0.55)] active:scale-[0.98] md:h-28 md:w-52 md:px-[22px]"
              >
                {p.logo ? (
                  <Image src={p.logo} alt={copy === 1 ? "" : p.name} width={240} height={120} className="h-auto max-h-11 w-auto max-w-[150px] object-contain transition-transform duration-500 ease-soft md:max-h-[66px]" />
                ) : (
                  <span className="text-center text-small leading-snug font-semibold text-ink group-hover/logo:text-red-brand">{p.name}</span>
                )}
                {p.logo && (
                  <span className="absolute inset-x-0 bottom-0 translate-y-full truncate bg-[linear-gradient(0deg,#fff_60%,transparent)] px-2.5 py-1.5 text-center text-label text-ink-muted transition-transform duration-500 ease-soft group-hover/logo:translate-y-0">
                    {p.name}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
