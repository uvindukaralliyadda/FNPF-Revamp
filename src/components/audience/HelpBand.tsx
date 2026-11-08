import { ArrowButton } from "@/components/ui/ArrowButton";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { Audience } from "@/data/navigation";
import { CONTACT } from "@/data/site";

const ACTIONS: Array<{ icon: IconName; label: string; href: string }> = [
  { icon: "phone", label: CONTACT.phone, href: CONTACT.phoneHref },
  { icon: "mail", label: "Email us", href: CONTACT.emailHref },
  { icon: "pin", label: "Find a branch", href: CONTACT.branchesHref },
];

/** Blue help card with opening hours, contact pills and the audience's login. */
export function HelpBand({ audience }: { audience: Audience }) {
  return (
    <section aria-labelledby="helpTitle" className="pb-12 md:pb-16">
      <Container>
        <div
          data-reveal="scale"
          className="flex flex-wrap items-center justify-between gap-6 rounded-panel bg-[radial-gradient(600px_280px_at_10%_0%,rgba(255,255,255,0.12),transparent_70%),var(--color-pacific)] px-[22px] py-7 text-white md:px-10 md:py-9"
        >
          <div>
            <h2 id="helpTitle" className="mb-1.5 font-heading text-h3 text-white">
              Need help, {audience.label.toLowerCase()}?
            </h2>
            <p className="text-small text-white/80">Our team is here Mon–Thu 8:30am–4:30pm and Fri 8:30am–4:00pm.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 max-md:w-full">
            {ACTIONS.map((a) => (
              <a
                key={a.label}
                href={a.href}
                className="group/help inline-flex h-11 items-center gap-2 rounded-full border border-white/30 px-4 text-small font-semibold transition-[background-color,border-color,color,transform] duration-150 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-pacific active:scale-[0.96]"
              >
                <Icon name={a.icon} className="size-4 text-sun transition-colors group-hover/help:text-pacific" />
                {a.label}
              </a>
            ))}
            <ArrowButton href={audience.login.href} variant="onBrand" className="max-md:w-full max-md:justify-between">
              {audience.login.label}
            </ArrowButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
