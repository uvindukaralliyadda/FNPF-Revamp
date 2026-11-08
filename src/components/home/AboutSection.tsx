import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";
import { TextLink } from "@/components/ui/TextLink";
import { FUND_STATS } from "@/data/home";
import { LEGACY } from "@/data/site";
import { ValuesFilm } from "./ValuesFilm";

/** Who FNPF is, its values, its vision on the photo, and the fund at a glance. */
export function AboutSection() {
  return (
    <section aria-labelledby="aboutTitle" className="overflow-hidden bg-white py-12 md:py-16">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <h2 id="aboutTitle" data-reveal className="mb-5 max-w-[16ch] font-heading text-h2">
              Fiji’s national superannuation fund
            </h2>
            <p data-reveal="80" className="mb-[18px] max-w-[62ch] text-lead text-ink">
              The Fiji National Provident Fund is Fiji’s only superannuation fund and its largest financial institution. As a defined contribution fund governed by the FNPF Act 2011, we collect contributions from employees and employers and grow them into savings for retirement.
            </p>
            <p data-reveal="160" className="mb-8 max-w-[62ch] text-lead text-ink">
              Members can also use their savings before retirement for housing, medical and education needs. We invest across Fiji and beyond, from property and hotels to major holdings in Amalgamated Telecom Holdings, Vodafone Fiji and HFC Bank, so that every member’s savings keep growing.
            </p>

            <TextLink href={LEGACY("about-us/")}>More about FNPF</TextLink>
          </div>

          <figure data-reveal="scale 100" className="relative m-0 max-lg:max-w-[400px] lg:pb-11">
            <ValuesFilm />
            {/* Sits on the film's bottom edge so it never covers the film's captions */}
            <figcaption className="relative z-[1] mx-4 -mt-9 rounded-[18px] bg-white/95 p-6 shadow-[0_20px_44px_-16px_rgba(0,0,0,0.28)] backdrop-blur-[8px] transition-transform duration-500 ease-soft hover:-translate-y-1 lg:absolute lg:right-[calc(min(100%,400px)-64px)] lg:bottom-0 lg:mx-0 lg:mt-0 lg:w-[300px]">
              <span className="mb-1.5 block text-label text-red-brand uppercase">Our vision</span>
              <span className="block font-heading text-h4 font-medium">To secure our members’ future by growing their retirement savings.</span>
            </figcaption>
          </figure>
        </div>

        <ul aria-label="FNPF at a glance" className="mt-9 grid grid-cols-2 gap-3 lg:mt-12 lg:grid-cols-4">
          {FUND_STATS.map((s, i) => (
            <li
              key={s.label}
              data-reveal={String(i * 90)}
              className="group/stat relative flex flex-col gap-1.5 overflow-hidden rounded-card border border-line bg-surface-2 p-[18px] transition-[transform,box-shadow,background-color,border-color] duration-500 ease-soft after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:origin-left after:scale-x-0 after:bg-sun after:transition-transform after:duration-500 after:ease-soft hover:-translate-y-1 hover:border-red-brand/15 hover:bg-white hover:shadow-lift hover:after:scale-x-100 sm:p-6"
            >
              <span className="mb-4 grid size-11 place-items-center rounded-xl border border-line bg-white text-pacific transition-colors duration-150 ease-out group-hover/stat:border-red-brand group-hover/stat:bg-red-brand group-hover/stat:text-white sm:mb-5">
                <Icon name={s.icon} className="size-5" strokeWidth={1.8} />
              </span>
              <CountUp value={s.value} delay={i * 90} duration={1600} className="font-heading text-stat tabular-nums" />
              <span className="text-small text-ink-muted">{s.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
