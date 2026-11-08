"use client";

import { Icon } from "@/components/ui/Icon";

export function BackToTop() {
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group/top grid size-11 place-items-center rounded-full border-[1.5px] border-white/35 text-white transition-[border-color,background-color,color,transform] duration-300 ease-soft hover:-translate-y-[3px] hover:border-sun hover:bg-sun hover:text-pacific-deep active:scale-90"
    >
      <Icon name="up" className="size-[18px] group-hover/top:animate-bounce" strokeWidth={2.2} />
    </button>
  );
}
