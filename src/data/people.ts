/**
 * About Us → Our People. Names, titles and photos as published on myfnpf.com.fj/our-people/.
 * Confirm with FNPF before launch; replace the hero photo with an FNPF staff photo.
 */
export type Person = { name: string; role: string; photo: string };
export type Team = { id: string; title: string; intro: string; people: Person[] };

const photo = (slug: string) => `/images/people/team/${slug}.jpg`;

export const PEOPLE_HERO = {
  src: "/images/people/our-people-hero.jpg",
  alt: "FNPF staff at work",
  position: "70% 40%",
};

export const TEAMS: Team[] = [
  {
    id: "board",
    title: "Board of Directors",
    intro: "The Board sets FNPF’s direction and oversees how members’ savings are managed and invested.",
    people: [
      { name: "Daksesh Patel", role: "Board Chairman", photo: photo("daksesh-patel") },
      { name: "Susie Waqanibaravi", role: "Board Member", photo: photo("susie-waqanibaravi") },
      { name: "Attar Singh", role: "Board Member", photo: photo("attar-singh") },
      { name: "Shiri Gounder", role: "Board Member", photo: photo("shiri-gounder") },
      { name: "Sikeli Tuinamuana", role: "Board Member", photo: photo("sikeli-tuinamuana") },
      { name: "Aruna Prasad", role: "Board Member", photo: photo("aruna-prasad") },
    ],
  },
  {
    id: "executive",
    title: "Executive Management",
    intro: "The Executive team runs the Fund day to day, from member services to investments, finance and risk.",
    people: [
      { name: "Viliame Vodonaivalu", role: "Chief Executive Officer", photo: photo("viliame-vodonaivalu") },
      { name: "Naibuka Saune", role: "Chief Investment Officer", photo: photo("naibuka-saune") },
      { name: "Tevita Lomalagi", role: "Chief Financial Officer", photo: photo("tevita-lomalagi") },
      { name: "Alipate Waqairawai", role: "General Manager Member Services", photo: photo("alipate-waqairawai") },
      { name: "Laisa Saumaki", role: "General Manager Corporate Governance & Risk", photo: photo("laisa-saumaki") },
      { name: "Emily King", role: "General Counsel", photo: photo("emily-king") },
    ],
  },
];
