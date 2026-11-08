import { LEGACY, LOGINS } from "./site";

export type Link = { label: string; href: string };
export type MenuGroup = { title: string; links: Link[] };
export type MegaMenu = { id: string; label: string; href: string; intro: string; groups: MenuGroup[] };

export type AudienceKey = "members" | "pensioners" | "employers";
export type SubMenu = { label: string; href?: string; links?: Link[] };
export type Audience = {
  key: AudienceKey;
  label: string;
  href: `/${AudienceKey}`;
  cta: Link;
  login: Link;
  menus: SubMenu[];
};

/** Navbar mega menus, the same for every audience. */
export const GLOBAL_MENUS: MegaMenu[] = [
  {
    id: "about",
    label: "About Us",
    href: LEGACY("about-us/"),
    intro: "Fiji’s national superannuation fund, serving members, pensioners and employers.",
    groups: [
      { title: "Who we are", links: [{ label: "Our History", href: LEGACY("our-history/") }, { label: "Our People", href: "/about-us/our-people" }, { label: "Governance", href: LEGACY("governance/") }] },
      { title: "Reporting", links: [{ label: "Annual Reports", href: LEGACY("annual_reports/") }] },
      { title: "Work with us", links: [{ label: "Careers", href: LEGACY("careers/") }] },
    ],
  },
  {
    id: "investments",
    label: "Investments",
    href: LEGACY("investments/"),
    intro: "How we invest members’ savings across equities, property, hotels and lending to grow long-term returns.",
    groups: [
      { title: "Performance", links: [{ label: "Annual Performance", href: LEGACY("annual-performance/") }] },
      {
        title: "Portfolio",
        links: [
          { label: "Growth Assets", href: LEGACY("growth-assets/") },
          { label: "Hotel Properties", href: LEGACY("hotel-properties/") },
          { label: "Subsidiaries", href: LEGACY("subsidiaries/") },
          { label: "Commercial Lending", href: LEGACY("commercial-lending/") },
        ],
      },
      { title: "Projects", links: [{ label: "Current Projects", href: LEGACY("current-projects/") }] },
    ],
  },
  {
    id: "news",
    label: "News & Media",
    href: LEGACY("latest-news/"),
    intro: "Timely updates, articles and publications for members and stakeholders.",
    groups: [
      { title: "Media", links: [{ label: "Media Release", href: LEGACY("media-articles/") }, { label: "Videos", href: LEGACY("videos/") }] },
      {
        title: "Publications",
        links: [
          { label: "Fortnightly Articles", href: LEGACY("fortnightly-articles/") },
          { label: "Members Quarterly Newsletter", href: LEGACY("member-quarterly-newsletter/") },
          { label: "Reports", href: LEGACY("reports/") },
        ],
      },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    href: LEGACY("contact-us-2/"),
    intro: "Call 330 7811, email information@fnpf.com.fj or visit a branch. Open Mon–Thu 8:30am–4:30pm, Fri 8:30am–4:00pm.",
    groups: [
      { title: "Get in touch", links: [{ label: "Contact Us", href: LEGACY("contact-us-2/") }, { label: "Branches & Agencies", href: LEGACY("location/") }] },
      { title: "Speak up", links: [{ label: "Whistleblower Policy", href: LEGACY("become-a-whistleblower/") }] },
    ],
  },
];

/** The three audiences in the top bar. Each opens its own page and sub navbar. */
export const AUDIENCES: Record<AudienceKey, Audience> = {
  members: {
    key: "members",
    label: "Members",
    href: "/members",
    cta: { label: "Join FNPF", href: LEGACY("savings-for-children/") },
    login: LOGINS.member,
    menus: [
      { label: "Join & Save", links: [{ label: "Voluntary Membership", href: LEGACY("savings-for-children/") }, { label: "Grow Your Savings", href: LEGACY("grow-your-savings/") }] },
      { label: "Withdrawals", links: [{ label: "Early Withdrawal", href: LEGACY("early-partial-withdrawal/") }, { label: "Full Withdrawal", href: LEGACY("full-withdrawal/") }] },
      {
        label: "Manage Your Account",
        links: [{ label: "Digital Services", href: LEGACY("digital-services/") }, { label: "Nominations", href: LEGACY("nomination/") }, LOGINS.member],
      },
      {
        label: "Plan for Retirement",
        links: [
          { label: "Plan Your Retirement", href: LEGACY("plan-your-retirement/") },
          { label: "Life Pension", href: LEGACY("life-pension/") },
          { label: "Term Annuity", href: LEGACY("term-annuity/") },
          { label: "DrawDown Account", href: LEGACY("drawdown-account/") },
        ],
      },
      { label: "Member Forum", href: LEGACY("annual-member-forum/") },
    ],
  },
  pensioners: {
    key: "pensioners",
    label: "Pensioners",
    href: "/pensioners",
    cta: { label: "Plan Your Retirement", href: LEGACY("plan-your-retirement/") },
    login: LOGINS.member,
    menus: [
      {
        label: "Retirement Options",
        links: [{ label: "Life Pension", href: LEGACY("life-pension/") }, { label: "Term Annuity", href: LEGACY("term-annuity/") }, { label: "DrawDown Account", href: LEGACY("drawdown-account/") }],
      },
      { label: "Planning Your Retirement", links: [{ label: "Plan Your Retirement", href: LEGACY("plan-your-retirement/") }, { label: "Full Withdrawal", href: LEGACY("full-withdrawal/") }] },
      { label: "Manage Your Pension", links: [LOGINS.member, { label: "Digital Services", href: LEGACY("digital-services/") }, { label: "Nominations", href: LEGACY("nomination/") }] },
    ],
  },
  employers: {
    key: "employers",
    label: "Employers",
    href: "/employers",
    cta: { label: "Register Your Business", href: LEGACY("registration-requirements/") },
    login: LOGINS.employer,
    menus: [
      { label: "Getting Started", links: [{ label: "Registration Requirements", href: LEGACY("registration-requirements/") }, { label: "Register An Employee", href: LEGACY("registered-an-employee/") }] },
      { label: "Manage Your Account", links: [{ label: "Managing Your Account", href: LEGACY("managing-your-account/") }, LOGINS.employer] },
      { label: "Contributions", href: LEGACY("employer-additional-contribution/") },
      { label: "Employer News", href: LEGACY("media-releases-employer-news/") },
    ],
  },
};

export const AUDIENCE_LIST = Object.values(AUDIENCES);

/** Homepage call to action when no audience is selected. */
export const HOME_CTA: Link = { label: "Join FNPF", href: LEGACY("savings-for-children/") };

export const SEARCH_SHORTCUTS: Link[] = [
  { label: "Check my balance", href: LOGINS.member.href },
  { label: "Early withdrawal", href: LEGACY("early-partial-withdrawal/") },
  { label: "Nominate a beneficiary", href: LEGACY("nomination/") },
  { label: "Retirement options", href: LEGACY("plan-your-retirement/") },
  { label: "Register a business", href: LEGACY("registration-requirements/") },
  { label: "Find a branch", href: LEGACY("location/") },
];

export function audienceFromPath(pathname: string): Audience | null {
  const key = pathname.split("/")[1] as AudienceKey;
  return AUDIENCES[key] ?? null;
}
