import type { IconName } from "@/components/ui/Icon";
import type { AudienceKey } from "./navigation";
import { LEGACY, LOGINS } from "./site";

export type Service = { icon: IconName; title: string; description: string; href: string };
export type ServiceGroup = { id: string; title: string; intro: string; items: Service[] };
export type AudiencePageContent = {
  meta: { title: string; description: string };
  photo: { src: string; alt: string; position: string };
  title: string;
  intro: string;
  facts: Array<{ value: string; label: string }>;
  groups: ServiceGroup[];
};

const lifePension: Service = { icon: "sun", title: "Life Pension", description: "A regular monthly payment for life after you retire.", href: LEGACY("life-pension/") };
const termAnnuity: Service = { icon: "clock", title: "Term Annuity", description: "Monthly payments for a fixed term of 5, 10 or 15 years.", href: LEGACY("term-annuity/") };
const drawDown: Service = { icon: "bank", title: "DrawDown Account", description: "A monthly income while funds remain in your account.", href: LEGACY("drawdown-account/") };
const planRetirement: Service = { icon: "chart", title: "Plan Your Retirement", description: "The earlier you start planning, the better prepared you will be.", href: LEGACY("plan-your-retirement/") };

export const AUDIENCE_PAGES: Record<AudienceKey, AudiencePageContent> = {
  members: {
    meta: {
      title: "Members – Savings, Withdrawals & Accounts",
      description: "Join FNPF, grow your savings, apply for early or full withdrawals, update your nominee and manage your member account online.",
    },
    photo: { src: "/images/audiences/members.jpg", alt: "FNPF member checking his account on a laptop", position: "50% 35%" },
    title: "Your savings, your future",
    intro: "Everything you need as an FNPF member, from growing your savings to withdrawals, nominations and managing your account online.",
    facts: [
      { value: "9.5%", label: "Interest declared for 2026" },
      { value: "8%", label: "Minimum contribution from your wages" },
      { value: "Online", label: "Check your account any time" },
    ],
    groups: [
      {
        id: "join",
        title: "Join & Save",
        intro: "Start saving with FNPF and grow your retirement balance.",
        items: [
          { icon: "user-plus", title: "Voluntary Membership", description: "Anyone from age 6 can join and start saving for the future.", href: LEGACY("savings-for-children/") },
          { icon: "trend", title: "Grow Your Savings", description: "Contribute more than the mandated 8% to boost your savings.", href: LEGACY("grow-your-savings/") },
        ],
      },
      {
        id: "withdrawals",
        title: "Withdrawals",
        intro: "Use your savings when you need them most.",
        items: [
          { icon: "cash", title: "Early Withdrawal", description: "Partial withdrawals for education, medical, unemployment, funeral and housing.", href: LEGACY("early-partial-withdrawal/") },
          { icon: "wallet", title: "Full Withdrawal", description: "For retirement, migration, small accounts or medical incapacitation.", href: LEGACY("full-withdrawal/") },
        ],
      },
      {
        id: "account",
        title: "Manage Your Account",
        intro: "Keep your details, beneficiaries and balance up to date.",
        items: [
          { icon: "device", title: "Digital Services", description: "View your balance and track transactions anywhere, any time.", href: LEGACY("digital-services/") },
          { icon: "heart", title: "Nominations", description: "Choose who receives your savings if you pass away.", href: LEGACY("nomination/") },
          { icon: "login", title: LOGINS.member.label, description: "Sign in to view your account and latest transactions.", href: LOGINS.member.href },
        ],
      },
      { id: "retirement", title: "Plan for Retirement", intro: "Prepare early for a comfortable life after work.", items: [planRetirement, lifePension, termAnnuity, drawDown] },
      {
        id: "forum",
        title: "Member Forum",
        intro: "Have your say on how the Fund serves you.",
        items: [{ icon: "chat", title: "Annual Member Forum", description: "Hear about the Fund’s performance and share your suggestions.", href: LEGACY("annual-member-forum/") }],
      },
    ],
  },
  pensioners: {
    meta: {
      title: "Pensioners – Retirement Income Options",
      description: "Turn your FNPF savings into a regular retirement income with a Life Pension, Term Annuity or DrawDown Account, and manage your pension online.",
    },
    photo: { src: "/images/audiences/pensioners.jpg", alt: "Retiree resting his hands on a walking stick", position: "50% 45%" },
    title: "Income for every stage of retirement",
    intro: "Turn your savings into a regular income, choose the option that suits you and manage your pension with confidence.",
    facts: [
      { value: "3", label: "Retirement income options" },
      { value: "5–15 yrs", label: "Term Annuity terms" },
      { value: "Monthly", label: "Pension payments" },
    ],
    groups: [
      { id: "options", title: "Retirement Options", intro: "Three ways to turn your savings into an income.", items: [lifePension, termAnnuity, drawDown] },
      {
        id: "planning",
        title: "Planning Your Retirement",
        intro: "Decide when and how to access your savings.",
        items: [planRetirement, { icon: "wallet", title: "Full Withdrawal", description: "Withdraw your savings in full when you retire.", href: LEGACY("full-withdrawal/") }],
      },
      {
        id: "manage",
        title: "Manage Your Pension",
        intro: "Stay on top of your payments and details.",
        items: [
          { icon: "login", title: LOGINS.member.label, description: "Sign in to check your pension and recent payments.", href: LOGINS.member.href },
          { icon: "device", title: "Digital Services", description: "Access your account anywhere, any time.", href: LEGACY("digital-services/") },
          { icon: "heart", title: "Nominations", description: "Keep your nominated beneficiaries up to date.", href: LEGACY("nomination/") },
        ],
      },
    ],
  },
  employers: {
    meta: {
      title: "Employers – Registration & Contributions",
      description: "Register your business with FNPF, add employees, make additional contributions and manage your employer account online.",
    },
    photo: { src: "/images/audiences/employers.jpg", alt: "Business owner standing with his team in an office", position: "30% 30%" },
    title: "Supporting employers across Fiji",
    intro: "Register your business, add employees and manage FNPF contributions online, so your staff can build a secure future.",
    facts: [
      { value: "8%", label: "Member contribution from wages" },
      { value: "+2–5%", label: "Optional additional contributions" },
      { value: "Online", label: "Employer portal" },
    ],
    groups: [
      {
        id: "start",
        title: "Getting Started",
        intro: "Register your business and your staff with FNPF.",
        items: [
          { icon: "file", title: "Registration Requirements", description: "The documents you need depend on your business type.", href: LEGACY("registration-requirements/") },
          { icon: "user-plus", title: "Register An Employee", description: "Register new staff so their savings start straight away.", href: LEGACY("registered-an-employee/") },
        ],
      },
      {
        id: "account",
        title: "Manage Your Account",
        intro: "Keep your business details and contributions current.",
        items: [
          { icon: "briefcase", title: "Managing Your Account", description: "Tell us about changes to your address, contacts or business.", href: LEGACY("managing-your-account/") },
          { icon: "login", title: LOGINS.employer.label, description: "Manage FNPF contributions online for your employees.", href: LOGINS.employer.href },
        ],
      },
      {
        id: "contributions",
        title: "Contributions",
        intro: "Go beyond the minimum for your team.",
        items: [{ icon: "gift", title: "Employer Additional Contribution", description: "Reward staff by contributing an extra 2%, 5% or $50 per pay.", href: LEGACY("employer-additional-contribution/") }],
      },
      {
        id: "news",
        title: "Employer News",
        intro: "Notices and updates for employers.",
        items: [{ icon: "news", title: "Employer News", description: "The latest media releases and notices for employers.", href: LEGACY("media-releases-employer-news/") }],
      },
    ],
  },
};
