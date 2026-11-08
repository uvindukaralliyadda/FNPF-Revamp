import type { Metadata } from "next";
import { PeopleHero } from "@/components/people/PeopleHero";
import { TeamShowcase } from "@/components/people/TeamShowcase";
import { TEAMS } from "@/data/people";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Our People – Board & Executive Team",
  description: "Meet the FNPF Board of Directors and Executive Management team who oversee and run Fiji’s national superannuation fund.",
  path: "/about-us/our-people",
});

/** About Us → Our People: photo hero, then the Board and the Executive team. */
export default function OurPeoplePage() {
  return (
    <>
      <PeopleHero />
      {TEAMS.map((team) => (
        <TeamShowcase key={team.id} team={team} />
      ))}
    </>
  );
}
