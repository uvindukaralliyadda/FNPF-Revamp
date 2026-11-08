"use client";

import { ArrowChip } from "@/components/ui/ArrowChip";
import { Icon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";
import type { Service } from "@/data/audiences";

/** Service card: 4px lift, icon turns red, arrow slides through. */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <SmartLink
      href={service.href}
      data-reveal={String(index * 80)}
      className="group/card relative isolate flex min-h-[172px] flex-col gap-1.5 overflow-hidden rounded-[18px] border border-line bg-white px-5 pt-5 pb-[22px] transition-[transform,box-shadow,border-color] duration-500 ease-soft hover:-translate-y-1 hover:border-red-brand/20 hover:shadow-lift active:scale-[0.98] active:duration-150"
    >
      <span className="mb-3.5 grid size-11 place-items-center rounded-xl bg-pacific-tint text-pacific transition-colors duration-150 ease-out group-hover/card:bg-red-brand group-hover/card:text-white">
        <Icon name={service.icon} className="size-5" strokeWidth={1.8} />
      </span>
      <span className="pr-11 font-heading text-h4">{service.title}</span>
      <span className="text-small text-ink-muted">{service.description}</span>
      <ArrowChip
        icon="arrow-ne"
        group="card"
        className="absolute top-5 right-5 size-[34px] border border-line-strong text-ink group-hover/card:border-red-brand group-hover/card:bg-red-brand group-hover/card:text-white"
      />
    </SmartLink>
  );
}
