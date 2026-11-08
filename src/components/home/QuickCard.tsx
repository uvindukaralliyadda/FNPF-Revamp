"use client";

import Image from "next/image";
import { ArrowChip } from "@/components/ui/ArrowChip";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";
import { cn } from "@/lib/cn";

type Props = {
  index: number;
  icon: IconName;
  title: string;
  text: string;
  href: string;
  image: { src: string; position: string };
};

/**
 * Quick-access photo card: background photo under a dark red wash, text on a frosted-glass panel.
 * 70% FNPF red (--c), 30% yellow (--y). 4px lift, accent bar, slight photo zoom, sliding arrow.
 */
export function QuickCard({ index, icon, title, text, href, image }: Props) {
  const n = String(index + 1).padStart(2, "0");
  return (
    <SmartLink
      href={href}
      data-reveal={String(index * 70)}
      className={cn(
        "[--c:var(--color-red-brand)] [--y:var(--color-sun)]",
        "group/card relative isolate flex min-h-50 flex-col overflow-hidden rounded-card border border-white/20 bg-[#3a0505] p-3 text-white sm:min-h-59",
        "shadow-[0_10px_28px_-16px_rgba(60,0,0,0.55)]",
        "transition-[transform,box-shadow,border-color] duration-500 ease-soft",
        "hover:border-[rgba(255,230,0,0.55)] hover:shadow-[0_28px_52px_-24px_rgba(120,5,5,0.7)] hover:-translate-y-1",
        "focus-visible:border-(--y) active:scale-[0.98] active:duration-150",
        // red-into-yellow bar along the top, runs full width on hover
        "before:absolute before:top-0 before:left-5 before:z-2 before:h-[3px] before:w-11 before:rounded-b-[3px] before:bg-[linear-gradient(90deg,var(--c)_0_70%,var(--y)_70%_100%)] before:transition-[left,width,border-radius] before:duration-500 before:ease-soft hover:before:left-0 hover:before:w-full hover:before:rounded-none",
      )}
    >
      {/* photo + wash */}
      <span aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src={image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          style={{ objectPosition: image.position }}
          className="scale-[1.02] object-cover transition-transform duration-500 ease-soft group-hover/card:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,0,0,0.28)_0%,rgba(40,0,0,0.22)_38%,rgba(120,5,5,0.62)_100%)] transition-colors duration-300 group-hover/card:bg-[rgba(179,7,7,0.18)]" />
      </span>
      <span className="flex items-start justify-between px-1.5 pt-1.5">
        <span className="grid size-11 place-items-center rounded-xl border border-white/35 bg-(--c) text-(--y) shadow-[0_8px_18px_-8px_rgba(0,0,0,0.6)] transition-shadow duration-150 ease-out group-hover/card:shadow-[0_0_0_3px_var(--y),0_12px_22px_-8px_rgba(0,0,0,0.6)]">
          <Icon name={icon} className="size-5" strokeWidth={1.8} />
        </span>
        <span aria-hidden="true" className="text-label text-white/75 tabular-nums transition-colors duration-150 [text-shadow:0_1px_4px_rgba(0,0,0,0.4)] group-hover/card:text-(--y)">
          {n}
        </span>
      </span>
      {/* frosted glass panel, height equalised across cards by QuickAccess */}
      <span data-eq className="mt-auto grid min-h-(--eq-h) content-start gap-0.75 [@media(hover:hover)]:gap-0 group-hover/card:gap-0.75! group-focus-visible/card:gap-0.75! rounded-[14px] border border-white/28 bg-white/14 py-3.5 pr-14.5 pl-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-[14px] backdrop-saturate-160 transition-colors duration-300 group-hover/card:border-white/40 group-hover/card:bg-white/20">
        <span className="justify-self-start bg-[linear-gradient(90deg,var(--c)_0_70%,var(--y)_70%_100%)] bg-[length:0_2px] bg-left-bottom bg-no-repeat pb-0.5 font-heading text-h4 [text-shadow:0_1px_6px_rgba(0,0,0,0.35)] transition-[background-size,color] duration-500 ease-soft group-hover/card:bg-[length:100%_2px] group-hover/card:text-(--y)">
          {title}
        </span>
        {/* heading only at rest; subtext slides in on hover or keyboard focus (always shown on touch screens) */}
        <span className="block overflow-hidden text-meta text-white/86 transition-[max-height,opacity,translate] duration-450 ease-soft [@media(hover:hover)]:max-h-0 [@media(hover:hover)]:translate-y-1.5 [@media(hover:hover)]:opacity-0 group-hover/card:max-h-[3.2em]! group-hover/card:translate-y-0! group-hover/card:opacity-100! group-focus-visible/card:max-h-[3.2em]! group-focus-visible/card:translate-y-0! group-focus-visible/card:opacity-100!">
          {text}
        </span>
      </span>
      <ArrowChip
        icon="arrow-ne"
        group="card"
        className="absolute right-5.5 bottom-5.5 size-9 border border-white/45 bg-white/14 text-white backdrop-blur-sm group-hover/card:border-(--c) group-hover/card:bg-(--c) group-hover/card:text-(--y)"
      />
    </SmartLink>
  );
}
