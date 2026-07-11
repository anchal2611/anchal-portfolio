import { personalInfo } from "./profile";
import type { FooterNavGroup, FooterSocial } from "./types";

export const footerNavGroups: FooterNavGroup[] = [
  { label: "Navigate", links: [{ label: "about", href: "#about" }, { label: "skills", href: "#skills" }, { label: "projects", href: "#projects" }, { label: "achievements", href: "#achievements" }, { label: "contact", href: "#contact" }] },
  { label: "Projects", links: [{ label: "FinalRound", href: "/projects/finalround" }, { label: "CryCompass", href: "/projects/crycompass" }, { label: "SafeHaven", href: "/projects/safehaven" }, { label: "Kautilya Pay", href: "/projects/kautilya-pay" }] },
  { label: "Connect", links: [{ label: "github", href: personalInfo.github }, { label: "linkedin", href: personalInfo.linkedin }, { label: "twitter", href: personalInfo.twitter }, { label: "email", href: `mailto:${personalInfo.email}` }] },
];

export const footerSocials: FooterSocial[] = [
  { icon: "github", href: personalInfo.github, label: "GitHub" },
  { icon: "linkedin", href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: "twitter", href: personalInfo.twitter, label: "Twitter" },
  { icon: "mail", href: `mailto:${personalInfo.email}`, label: "Email" },
];
