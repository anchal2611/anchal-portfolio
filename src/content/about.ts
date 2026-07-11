import type { AboutStat, GithubStat, Trait } from "./types";

export const aboutStats: AboutStat[] = [
  { value: "4+", label: "projects_shipped" },
  { value: "3+", label: "hackathon_wins" },
  { value: "Top 20", label: "designathon" },
];

export const traits: Trait[] = [
  { emoji: "⚙️", label: "Engineer first", desc: "Code that works, then makes it elegant." },
  { emoji: "🎨", label: "Design-minded", desc: "UI/UX is baked in, not layered on top." },
  { emoji: "🤖", label: "AI-native", desc: "Reaches for Gemini & TensorFlow first." },
  { emoji: "⚡", label: "Hackathon-hardened", desc: "Shipping under pressure, winning some." },
];

export const githubStats: GithubStat[] = [
  { icon: "star", label: "stars", value: "47" },
  { icon: "fork", label: "forks", value: "12" },
  { icon: "eye", label: "followers", value: "38" },
];
