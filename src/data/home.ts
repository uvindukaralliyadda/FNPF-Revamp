import type { IconName } from "@/components/ui/Icon";
import { LEGACY, LOGINS } from "./site";

export type HeroSlide = {
  key: string;
  image: { src: string; alt: string; position: string };
  title: string;
  text: string;
  feature: { label: string; meta: string; value: string };
  stats: Array<{ icon: IconName; value: string; meta: string }>;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    key: "members",
    image: { src: "/images/hero/family.webp", alt: "Young couple smiling at sunset over the water", position: "50% 30%" },
    title: "Securing Fiji’s future since 1966",
    text: "Trusted by more than 440,000 members to grow their savings for a better retirement.",
    feature: { label: "Interest declared for 2026", meta: "Credited to member accounts", value: "9.5%" },
    stats: [
      { icon: "people", value: "440k+", meta: "Members across Fiji" },
      { icon: "trend", value: "$1.2b+", meta: "Investment income, 2026" },
    ],
  },
  {
    key: "pensioners",
    image: { src: "/images/hero/old.webp", alt: "Smiling older man in a green shirt", position: "68% 30%" },
    title: "A steady income for the years ahead",
    text: "Turn your savings into a regular monthly income with a Life Pension, Term Annuity or DrawDown Account.",
    feature: { label: "Retirement income options", meta: "Life Pension, Term Annuity, DrawDown", value: "3" },
    stats: [
      { icon: "clock", value: "Monthly", meta: "Pension payments" },
      { icon: "sun", value: "5–15 yrs", meta: "Term Annuity terms" },
    ],
  },
  {
    key: "employers",
    image: { src: "/images/hero/couple.webp", alt: "Business owner working on a laptop", position: "28% 25%" },
    title: "Supporting the businesses that power Fiji",
    text: "Register your business, add employees and manage FNPF contributions online.",
    feature: { label: "Member contribution from wages", meta: "Mandated by law", value: "8%" },
    stats: [
      { icon: "briefcase", value: "Online", meta: "Employer portal" },
      { icon: "trend", value: "+2–5%", meta: "Optional additional contributions" },
    ],
  },
];

/** Each card has a background photo; position sets the crop focus. */
export const QUICK_LINKS: Array<{ icon: IconName; title: string; text: string; href: string; image: { src: string; position: string } }> = [
  { icon: "wallet", title: "Check my balance", text: "App, portal or *567#", href: LEGACY("digital-services/"), image: { src: "/images/quick/check-balance.jpg", position: "68% 50%" } },
  { icon: "cash", title: "Apply for a withdrawal", text: "Education, medical, housing and more", href: LEGACY("early-partial-withdrawal/"), image: { src: "/images/quick/withdrawal.jpg", position: "55% 45%" } },
  { icon: "user-plus", title: "Join FNPF", text: "Compulsory or voluntary membership", href: LEGACY("savings-for-children/"), image: { src: "/images/quick/join.jpg", position: "72% 40%" } },
  { icon: "heart", title: "Update my nominee", text: "Choose who receives your savings", href: LEGACY("nomination/"), image: { src: "/images/quick/nominee.jpg", position: "50% 55%" } },
  { icon: "card", title: "Pay contributions", text: "Schedules, invoices and payment", href: LOGINS.employer.href, image: { src: "/images/quick/contributions.jpg", position: "40% 50%" } },
  { icon: "file", title: "Find a form", text: "Every FNPF form in one place", href: "#" /* forms library page to be created */, image: { src: "/images/quick/forms.jpg", position: "45% 40%" } },
  { icon: "pin", title: "Find an office", text: "Branches across Fiji", href: LEGACY("location/"), image: { src: "/images/quick/office.jpg", position: "45% 35%" } },
  { icon: "chart", title: "Plan my retirement", text: "Options and calculator", href: LEGACY("plan-your-retirement/"), image: { src: "/images/quick/retirement.jpg", position: "35% 40%" } },
];

/** Confirm figures and add an "as at" date with FNPF before launch. */
export const FUND_STATS: Array<{ icon: IconName; value: string; label: string }> = [
  { icon: "bank", value: "$12.1b", label: "Total fund assets" },
  { icon: "percent", value: "9.5%", label: "Interest credited to members" },
  { icon: "people", value: "436,860", label: "Members" },
  { icon: "wallet", value: "$9.5b", label: "Members’ funds" },
];

export type Partner = { name: string; href: string; logo: string | null };
export const PARTNERS: Partner[] = [
  { name: "Fiji Yellow Pages", href: "https://www.yellowpages.com.fj/", logo: "/images/partners/fiji-yellow-pages.webp" },
  { name: "Amalgamated Telecom Holdings", href: "http://www.ath.com.fj/", logo: "/images/partners/ath.webp" },
  { name: "Holiday Inn Suva", href: "https://www.ihg.com/holidayinn/hotels/us/en/suva/suvvp/hoteldetail", logo: "/images/partners/holiday-inn-suva.webp" },
  { name: "Fiji Marriott Resort Momi Bay", href: "https://www.marriott.com/hotels/travel/nanmc-fiji-marriott-resort-momi-bay/", logo: "/images/partners/marriott-momi-bay.webp" },
  { name: "Vodafone Fiji", href: "https://www.vodafone.com.fj/", logo: "/images/partners/vodafone-fiji.webp" },
  { name: "The Westin Denarau Island Resort & Spa", href: "https://www.marriott.com/hotels/travel/nanwi-the-westin-denarau-island-resort-and-spa-fiji/", logo: "/images/partners/westin-denarau.webp" },
  { name: "Sheraton Fiji Resort", href: "https://www.marriott.com/hotels/travel/nansi-sheraton-fiji-golf-and-beach-resort/", logo: "/images/partners/sheraton-fiji.webp" },
  { name: "Telecom Fiji", href: "https://www.telecom.com.fj/", logo: null /* logo file not supplied yet */ },
  { name: "Fintel", href: "http://www.fintel.com.fj/", logo: "/images/partners/fintel.webp" },
  { name: "Grand Pacific Hotel", href: "https://grandpacifichotel.com.fj/", logo: "/images/partners/grand-pacific-hotel.webp" },
  { name: "HFC Bank", href: "https://www.hfc.com.fj/", logo: "/images/partners/hfc-bank.webp" },
  { name: "InterContinental Fiji Golf Resort & Spa", href: "https://www.fiji.intercontinental.com/", logo: "/images/partners/intercontinental-fiji.webp" },
];

export type NewsItem = { date: string; iso: string; tag: string; title: string; description: string; href: string; image: { src: string; alt: string; position?: string } };
export const NEWS: NewsItem[] = [
  {
    date: "30 Oct 2026",
    iso: "2026-10-30",
    tag: "Media release",
    title: "FNPF Strengthens Long-Term Member Value Through Landmark JW Marriott Fiji Resort & Spa Development",
    description: "Westin Denarau becomes a 282-room JW Marriott resort in 2027.",
    href: LEGACY("2026/10/30/fnpf-strengthens-long-term-member-value-through-landmark-jw-marriott-fiji-resort-spa-development/"),
    image: { src: "/images/news/jw-marriott.jpg", alt: "Smiling FNPF member" },
  },
  {
    date: "10 Oct 2026",
    iso: "2026-10-10",
    tag: "Media release",
    title: "Protecting Members’ Retirement Savings Requires Full Information",
    description: "Legacy pension decisions need complete and accurate information, FNPF says.",
    href: LEGACY("2026/10/10/protecting-members-retirement-savings-requires-full-information/"),
    image: { src: "/images/news/retirement-savings.jpg", alt: "FNPF pensioner giving a thumbs up" },
  },
  {
    date: "4 Sep 2026",
    iso: "2026-09-04",
    tag: "Media conference",
    title: "Media Conference – Legacy Contribution Debt Amnesty Campaign Speaking Notes",
    description: "Speaking notes from FNPF’s 3 September debt amnesty media conference.",
    href: LEGACY("2026/09/04/media-conference-legacy-contribution-debt-amnesty-campaign-speaking-notes/"),
    image: { src: "/images/news/debt-amnesty.jpg", alt: "FNPF representative speaking at a media conference", position: "50% 0%" },
  },
  {
    date: "4 Aug 2026",
    iso: "2026-08-04",
    tag: "News",
    title: "FNPF Reaches 60-Year Milestone",
    description: "Serving Fiji since 1966, now with 447,000+ members and $12.1b.",
    href: LEGACY("2026/08/04/fnpf-reaches-60-year-milestone/"),
    image: { src: "/images/news/60-years.jpg", alt: "Family in red FNPF 60th anniversary shirts" },
  },
];

export const PATHS = [
  { key: "members", icon: "user", title: "I’m a member", text: "Save, withdraw, nominate a beneficiary and manage your account." },
  { key: "pensioners", icon: "sun", title: "I’m a pensioner", text: "Explore Life Pension, Term Annuity and DrawDown Account options." },
  { key: "employers", icon: "briefcase", title: "I’m an employer", text: "Register your business, add employees and manage contributions." },
] as const satisfies ReadonlyArray<{ key: string; icon: IconName; title: string; text: string }>;
