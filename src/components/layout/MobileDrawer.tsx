"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Icon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";
import { AUDIENCE_LIST, GLOBAL_MENUS, type Audience, type Link as NavLink } from "@/data/navigation";
import { LOGINS } from "@/data/site";
import { useFindYourPath } from "./FindYourPath";
import { cn } from "@/lib/cn";

type Props = { open: boolean; onClose: () => void; audience: Audience | null; cta: NavLink };

/** Phone and tablet menu: audience switch, that audience's menu, the global menus and logins. */
export function MobileDrawer({ open, onClose, audience, cta }: Props) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const { openPath } = useFindYourPath();
  const index = audience ? AUDIENCE_LIST.findIndex((a) => a.key === audience.key) : -1;

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        onClick={onClose}
        className={cn("fixed inset-0 z-[70] bg-pacific-deep/40 transition-[opacity,visibility] duration-300", open ? "visible opacity-100" : "invisible opacity-0")}
      />
      <aside
        id="mobile-drawer"
        aria-label="Menu"
        inert={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-[80] flex w-[min(420px,100%)] flex-col bg-white shadow-menu transition-transform duration-150 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <Image src="/images/logo.png" alt="FNPF" width={298} height={272} className="h-11 w-auto" />
          <button ref={closeBtn} type="button" aria-label="Close menu" onClick={onClose} className="grid size-11 place-items-center rounded-full hover:bg-surface-3 hover:text-red-brand active:scale-90">
            <Icon name="close" className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div role="group" aria-label="Choose your audience" className="relative mb-4 grid grid-cols-3 rounded-full bg-surface-3 p-1">
            <span
              aria-hidden="true"
              className={cn("absolute inset-y-1 left-1 w-[calc((100%-8px)/3)] rounded-full bg-white shadow-card transition-[transform,opacity] duration-300 ease-soft", index < 0 && "opacity-0")}
              style={{ transform: `translateX(${Math.max(index, 0) * 100}%)` }}
            />
            {AUDIENCE_LIST.map((a) => (
              <Link
                key={a.key}
                href={a.href}
                onClick={onClose}
                aria-current={audience?.key === a.key ? "page" : undefined}
                className={cn("relative z-[1] grid min-h-10 place-items-center rounded-full text-label uppercase transition-colors", audience?.key === a.key ? "text-red-brand" : "text-ink-muted")}
              >
                {a.label}
              </Link>
            ))}
          </div>

          {audience ? (
            audience.menus.map((m) => <Accordion key={m.label} title={m.label} href={m.href} links={m.links} onNavigate={onClose} />)
          ) : (
            <>
              <p className="mb-2 text-small text-ink-muted">Choose Members, Pensioners or Employers to see their services.</p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openPath();
                }}
                className="text-small font-semibold text-pacific underline underline-offset-[3px] hover:text-red-brand"
              >
                Not sure? Find your path
              </button>
            </>
          )}

          <p className="mt-6 mb-2 text-label text-ink-muted uppercase">FNPF</p>
          {GLOBAL_MENUS.map((m) => (
            <Accordion key={m.id} title={m.label} links={[{ label: `${m.label} overview`, href: m.href }, ...m.groups.flatMap((g) => g.links)]} onNavigate={onClose} />
          ))}
        </div>

        <div className="grid gap-3 border-t border-line p-4">
          <ArrowButton href={cta.href} block>
            {cta.label}
          </ArrowButton>
          <ArrowButton href={LOGINS.member.href} variant="secondary" chip={false} icon="user">
            {LOGINS.member.label}
          </ArrowButton>
          <ArrowButton href={LOGINS.employer.href} variant="secondary" chip={false} icon="user">
            {LOGINS.employer.label}
          </ArrowButton>
        </div>
      </aside>
    </>
  );
}

function Accordion({ title, href, links, onNavigate }: { title: string; href?: string; links?: NavLink[]; onNavigate: () => void }) {
  if (!links) {
    return (
      <div className="border-b border-line">
        <SmartLink href={href ?? "#"} onClick={onNavigate} className="flex min-h-[52px] items-center font-semibold">
          {title}
        </SmartLink>
      </div>
    );
  }
  return (
    <details className="group/acc border-b border-line">
      <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between font-semibold">
        {title}
        <Icon name="chevron" className="size-4 transition-transform duration-300 ease-soft group-open/acc:rotate-180 group-open/acc:text-red-brand" />
      </summary>
      <ul className="mb-3 border-l-2 border-line pl-3">
        {links.map((l) => (
          <li key={l.label}>
            <SmartLink href={l.href} onClick={onNavigate} className="block px-3 py-2 text-small font-medium hover:text-red-brand">
              {l.label}
            </SmartLink>
          </li>
        ))}
      </ul>
    </details>
  );
}
