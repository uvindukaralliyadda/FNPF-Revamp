import Link from "next/link";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import type { AudiencePageContent } from "@/data/audiences";
import type { Audience } from "@/data/navigation";
import { ParallaxPhoto } from "./ParallaxPhoto";

/** Breadcrumb, title, intro, main button + login, three counting facts and the audience photo. */
export function AudienceHero({ audience, page }: { audience: Audience; page: AudiencePageContent }) {
  return (
    <section aria-labelledby="pageTitle" className="bg-[linear-gradient(180deg,var(--color-pacific-tint)_0%,#f6f9fd_100%)] pt-7 pb-12 md:pt-12 md:pb-16">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-meta text-ink-muted animate-rise">
            <Link href="/" className="font-medium text-pacific hover:underline hover:underline-offset-[3px]">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-semibold text-ink">
              {audience.label}
            </span>
          </nav>
          <h1 className="mb-4 max-w-[14ch] font-heading text-h1 animate-rise [animation-delay:60ms]">{page.title}</h1>
          <p className="mb-7 max-w-[62ch] text-lead text-ink-soft animate-rise [animation-delay:120ms]">{page.intro}</p>
          <div className="mb-8 flex flex-wrap gap-2.5 animate-rise [animation-delay:180ms] max-[479px]:[&>*]:w-full">
            <ArrowButton href={audience.cta.href} className="max-[479px]:justify-between">
              {audience.cta.label}
            </ArrowButton>
            <ArrowButton href={audience.login.href} variant="secondary" chip={false} icon="login">
              {audience.login.label}
            </ArrowButton>
          </div>
          <ul className="grid max-w-[560px] gap-2.5 min-[480px]:grid-cols-3">
            {page.facts.map((f, i) => (
              <li
                key={f.label}
                className="animate-rise rounded-[14px] border border-pacific/8 bg-white/75 px-4 py-3.5 transition-[translate,background-color] duration-300 ease-soft hover:-translate-y-0.5 hover:bg-white"
                style={{ animationDelay: `${240 + i * 80}ms` }}
              >
                <CountUp value={f.value} play delay={400 + i * 140} className="block font-heading text-stat-sm text-pacific tabular-nums" />
                <span className="mt-0.5 block text-[0.75rem] leading-snug text-ink-muted">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <ParallaxPhoto src={page.photo.src} alt={page.photo.alt} position={page.photo.position} />
      </Container>
    </section>
  );
}
