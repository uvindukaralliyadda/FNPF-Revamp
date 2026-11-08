import { Icon, type IconName } from "./Icon";
import { cn } from "@/lib/cn";

/**
 * Round chip with an arrow that slides out and back in when the parent `group/btn` is hovered.
 * Used by buttons and cards.
 */
export function ArrowChip({ className, icon = "arrow", group = "btn" }: { className?: string; icon?: IconName; group?: "btn" | "card" }) {
  const hover = group === "btn" ? "group-hover/btn" : "group-hover/card";
  const outArrow: Record<string, string> = {
    "group-hover/btn": "group-hover/btn:translate-x-[180%]",
    "group-hover/card": "group-hover/card:translate-x-[180%]",
  };
  const inArrow: Record<string, string> = {
    "group-hover/btn": "group-hover/btn:translate-x-0",
    "group-hover/card": "group-hover/card:translate-x-0",
  };
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-8 shrink-0 place-items-center overflow-hidden rounded-full transition-[background-color,border-color,color] duration-150 ease-out",
        className,
      )}
    >
      <Icon name={icon} className={cn("col-start-1 row-start-1 size-4 transition-transform duration-300 ease-soft", outArrow[hover])} strokeWidth={2.2} />
      <Icon name={icon} className={cn("col-start-1 row-start-1 size-4 -translate-x-[180%] transition-transform duration-300 ease-soft", inArrow[hover])} strokeWidth={2.2} />
    </span>
  );
}
