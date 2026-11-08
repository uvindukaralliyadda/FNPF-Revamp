import { cn } from "@/lib/cn";

/** The site's 1240px content column with 16px (phone) / 24px gutters. */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-4 md:px-6", className)}>{children}</div>;
}
