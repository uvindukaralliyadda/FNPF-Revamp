import { cn } from "@/lib/cn";

/** Section title + one line of context on the left, an optional link on the right. */
export function SectionHeading({ id, title, text, action, tone = "light", className }: { id: string; title: React.ReactNode; text?: string; action?: React.ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <div className={cn("mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 max-md:mb-5", className)}>
      <div data-reveal>
        <h2 id={id} className={cn("font-heading text-h2", tone === "dark" ? "text-white" : "text-ink")}>
          {title}
        </h2>
        {text && <p className={cn("mt-3 max-w-[46ch] text-lead", tone === "dark" ? "text-white/80" : "text-ink-muted")}>{text}</p>}
      </div>
      {action && <div data-reveal="120">{action}</div>}
    </div>
  );
}
