export const SITE = {
  name: "Fiji National Provident Fund",
  shortName: "FNPF",
  url: "https://myfnpf.com.fj",
  tagline: "Securing your future",
  description:
    "Fiji's national superannuation fund. Grow your retirement savings, check your balance and find services for members, pensioners and employers.",
  themeColor: "#0a3a78",
} as const;

/** FNPF head office details (from myfnpf.com.fj/location). Confirm with FNPF before launch. */
export const CONTACT = {
  phone: "330 7811",
  phoneHref: "tel:+6793307811",
  sms: "5857",
  email: "information@fnpf.com.fj",
  emailHref: "mailto:information@fnpf.com.fj",
  branchesHref: "https://myfnpf.com.fj/location/",
  contactHref: "https://myfnpf.com.fj/contact-us-2/",
  address: ["Provident Plaza Two, 33 Ellery Street, Suva", "Private Mail Bag, Suva, Fiji"],
  hours: ["Mon–Thu 8:30am–4:30pm", "Fri 8:30am–4:00pm", "Closed on public holidays"],
} as const;

export const LOGINS = {
  member: { label: "Member & Pension Login", href: "https://myaccount.myfnpf.com.fj/ProMISMSS/wfmLoginExternal.aspx", note: "View your balance and transactions" },
  employer: { label: "Employer Login", href: "https://myaccount.myfnpf.com.fj/FnpfEmpPortal/", note: "Manage contributions online" },
} as const;

/** Current site pages the new site links to until each page is rebuilt. */
export const LEGACY = (path: string) => `https://myfnpf.com.fj/${path}`;
