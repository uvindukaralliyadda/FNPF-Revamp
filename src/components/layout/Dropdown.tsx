import { Icon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";
import type { Link } from "@/data/navigation";
import { cn } from "@/lib/cn";

/** Small floating menu used by Login and the sub navbar. */
export function Dropdown({ id, open, links, align = "left", wide, icons }: { id: string; open: boolean; links: Array<Link & { note?: string }>; align?: "left" | "right"; wide?: boolean; icons?: boolean }) {
  return (
    <ul
      id={id}
      className={cn(
        "absolute top-[calc(100%+8px)] z-[60] rounded-[10px] border border-line bg-white p-2 shadow-menu transition-[opacity,transform,visibility] duration-150 ease-out",
        align === "right" ? "right-0 origin-top-right" : "left-0 origin-top-left",
        wide ? "min-w-80" : "min-w-64",
        open ? "visible scale-100 opacity-100" : "invisible -translate-y-1.5 scale-[0.98] opacity-0",
      )}
    >
      {links.map((l, i) => (
        <li key={l.label}>
          <SmartLink
            href={l.href}
            className="group/dd flex items-center gap-3 rounded-md px-3 py-2.5 text-small font-medium text-ink transition-colors hover:bg-surface-2 hover:text-red-brand"
          >
            {icons && (
              <span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-pacific-tint text-pacific transition-colors duration-150 ease-out group-hover/dd:bg-red-brand group-hover/dd:text-white">
                <Icon name={i === 0 ? "user" : "briefcase"} className="size-[18px]" />
              </span>
            )}
            <span className="flex-1">
              {l.label}
              {l.note && <small className="mt-0.5 block text-[0.75rem] font-normal text-ink-muted">{l.note}</small>}
            </span>
            <Icon name="arrow" className="size-3.5 shrink-0 -translate-x-1.5 opacity-0 transition-[opacity,translate] duration-300 ease-soft group-hover/dd:translate-x-0 group-hover/dd:opacity-100" />
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}
