export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  location: string;
  university: string;
  degree: string;
  year: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  resumeUrl: string;
}

export interface NavigationLink {
  label: string;
  href: string;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface Trait {
  emoji: string;
  label: string;
  desc: string;
}

export interface GithubStat {
  icon: string;
  label: string;
  value: string;
}

export interface Skill {
  name: string;
  icon: string;
  proficiency: number;
  years: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  jsonKey: string;
  number: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  description: string;
  problem: string;
  solution: string;
  tech: string[];
  features: string[];
  challenges: string;
  github: string;
  live: string | null;
  featured: boolean;
}

export interface Achievement {
  title: string;
  org: string;
  description: string;
  year: string;
  icon: string;
}

export interface Experience {
  role: string;
  org: string;
  orgFull: string;
  period: string;
  type: string;
  icon: string;
  color: string;
  highlights: string[];
  tags: string[];
}

export interface SocialLink {
  label: string;
  handle: string;
  href: string;
  desc: string;
  icon: string;
}

export interface FooterNavGroup {
  label: string;
  links: NavigationLink[];
}

export interface FooterSocial {
  icon: string;
  href: string;
  label: string;
}
