import type { Metadata } from "next";
import { AudiencePage } from "@/components/audience/AudiencePage";
import { AUDIENCE_PAGES } from "@/data/audiences";
import { pageMetadata } from "@/lib/metadata";

const { meta } = AUDIENCE_PAGES.members;

export const metadata: Metadata = pageMetadata({ title: meta.title, description: meta.description, path: "/members" });

/** Members landing page: opened by the "Members" tab in the top bar. */
export default function MembersPage() {
  return <AudiencePage audience="members" />;
}
