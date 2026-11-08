import { AUDIENCE_PAGES } from "@/data/audiences";
import { AUDIENCES, type AudienceKey } from "@/data/navigation";
import { AudienceHero } from "./AudienceHero";
import { CrossAudience } from "./CrossAudience";
import { HelpBand } from "./HelpBand";
import { JumpNav } from "./JumpNav";
import { ServiceGroups } from "./ServiceGroups";

/** The shared layout behind /members, /pensioners and /employers. */
export function AudiencePage({ audience: key }: { audience: AudienceKey }) {
  const audience = AUDIENCES[key];
  const page = AUDIENCE_PAGES[key];
  return (
    <>
      <AudienceHero audience={audience} page={page} />
      <JumpNav groups={page.groups} prefix={key} />
      <ServiceGroups groups={page.groups} prefix={key} />
      <CrossAudience current={key} />
      <HelpBand audience={audience} />
    </>
  );
}
