import type { Experience } from "./types";

export const experiences: Experience[] = [
  {
    role: "Technical Club Lead",
    org: "IGDTUW", orgFull: "Indira Gandhi Delhi Technical University for Women",
    period: "2023 – Present",
    type: "Leadership",
    icon: "users",
    color: "blue",
    highlights: [
      "Lead workshops on React, Tailwind CSS, and UI/UX design for 50+ junior students.",
      "Organised inter-college design challenges that drew participation from 8 institutions.",
      "Built a structured learning curriculum bridging theory to real project delivery."
    ],
    tags: ["React", "Tailwind CSS", "UI/UX", "Mentorship"]
  },
  {
    role: "Hackathon Core Organiser & Mentor",
    org: "Delhi Tech Circuit",
    orgFull: "Delhi-wide Hackathon Series",
    period: "2024",
    type: "Community",
    icon: "briefcase", color: "violet",
    highlights: [
      "Part of the organising and mentoring core team for a Delhi-wide hackathon series.",
      "Mentored participating teams in AI integration, product thinking, and rapid prototyping.",
      "Tracks covered: AI, fintech, women's safety, and social impact domains."
    ],
    tags: ["AI", "Fintech", "Mentorship", "Product Design"]
  },
  {
    role: "Active Hackathon Competitor",
    org: "Various — Delhi & National",
    orgFull: "Multiple institutions and platforms",
    period: "2023 – Present", type: "Competition",
    icon: "briefcase",
    color: "cyan",
    highlights: [
      "Consistent placements in UI/UX and full-stack tracks across Delhi and national events.",
      "2nd Place at Trinity Institute TechFest's Aakriti UI/UX competition.",
      "Top 20 finalist in VesDes Designathon out of hundreds of national submissions."
    ],
    tags: ["UI/UX", "Full-Stack", "Competitive", "Design"]
  },
];
