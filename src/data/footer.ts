import type { Link } from "./navigation";
import { LEGACY, LOGINS } from "./site";

export const FOOTER_COLUMNS: Array<{ title: string; links: Link[] }> = [
  {
    title: "Members",
    links: [
      LOGINS.member,
      { label: "Voluntary Membership", href: LEGACY("savings-for-children/") },
      { label: "Early Withdrawal", href: LEGACY("early-partial-withdrawal/") },
      { label: "Full Withdrawal", href: LEGACY("full-withdrawal/") },
      { label: "Grow Your Savings", href: LEGACY("grow-your-savings/") },
      { label: "Nominations", href: LEGACY("nomination/") },
      { label: "Digital Services", href: LEGACY("digital-services/") },
    ],
  },
  {
    title: "Pensioners",
    links: [
      { label: "Plan Your Retirement", href: LEGACY("plan-your-retirement/") },
      { label: "Life Pension", href: LEGACY("life-pension/") },
      { label: "Term Annuity", href: LEGACY("term-annuity/") },
      { label: "DrawDown Account", href: LEGACY("drawdown-account/") },
    ],
  },
  {
    title: "Employers",
    links: [
      LOGINS.employer,
      { label: "Registration Requirements", href: LEGACY("registration-requirements/") },
      { label: "Register An Employee", href: LEGACY("registered-an-employee/") },
      { label: "Managing Your Account", href: LEGACY("managing-your-account/") },
      { label: "Employer Additional Contribution", href: LEGACY("employer-additional-contribution/") },
      { label: "Employer News", href: LEGACY("media-releases-employer-news/") },
    ],
  },
  {
    title: "About FNPF",
    links: [
      { label: "Our History", href: LEGACY("our-history/") },
      { label: "Governance", href: LEGACY("governance/") },
      { label: "Annual Reports", href: LEGACY("annual_reports/") },
      { label: "Investments", href: LEGACY("investments/") },
      { label: "Careers", href: LEGACY("careers/") },
      { label: "Whistleblower Policy", href: LEGACY("become-a-whistleblower/") },
    ],
  },
];

/** Privacy, Terms and Cookie pages do not exist yet. */
export const LEGAL_LINKS: Link[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Governance & Policies", href: LEGACY("governance/") },
];
