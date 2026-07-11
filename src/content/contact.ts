import { personalInfo } from "./profile";
import type { SocialLink } from "./types";

export const socialLinks: SocialLink[] = [
  { label: "GitHub", handle: "@anchalgupta", href: personalInfo.github, desc: "See my code", icon: "github" },
  { label: "LinkedIn", handle: "Anchal Gupta", href: personalInfo.linkedin, desc: "Connect professionally", icon: "linkedin" },
  { label: "Twitter / X", handle: "@anchalgupta", href: personalInfo.twitter, desc: "Thoughts & updates", icon: "twitter" },
  { label: "Email", handle: personalInfo.email, href: `mailto:${personalInfo.email}`, desc: "For serious inquiries", icon: "mail" },
];
