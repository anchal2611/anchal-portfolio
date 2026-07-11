import type { SkillCategory } from "./types";

export const skillsData: SkillCategory[] = [
  { id: "languages", label: "Languages", jsonKey: "languages", number: "01", skills: [
    { name: "C++", icon: "⚙️", proficiency: 90, years: "2y" },
    { name: "JavaScript", icon: "🟨", proficiency: 92, years: "2y" },
    { name: "Python", icon: "🐍", proficiency: 85, years: "1.5y" },
  ] },
  { id: "frontend", label: "Frontend", jsonKey: "frontend", number: "02", skills: [
    { name: "React", icon: "⚛️", proficiency: 90, years: "2y" },
    { name: "Tailwind CSS", icon: "🎨", proficiency: 92, years: "1.5y" },
    { name: "Framer Motion", icon: "✨", proficiency: 80, years: "1y" },
    { name: "Vite", icon: "⚡", proficiency: 85, years: "1.5y" },
    { name: "Figma", icon: "🖼️", proficiency: 88, years: "2y" },
  ] },
  { id: "backend", label: "Backend", jsonKey: "backend", number: "03", skills: [
    { name: "Node.js", icon: "🟢", proficiency: 82, years: "1.5y" },
    { name: "Express.js", icon: "🚂", proficiency: 80, years: "1.5y" },
    { name: "Firebase", icon: "🔥", proficiency: 85, years: "1.5y" },
    { name: "MySQL", icon: "🗄️", proficiency: 78, years: "1y" },
  ] },
  { id: "cloud", label: "Cloud", jsonKey: "cloud", number: "04", skills: [
    { name: "AWS S3", icon: "☁️", proficiency: 75, years: "1y" },
    { name: "Git & GitHub", icon: "🐙", proficiency: 90, years: "2y" },
  ] },
  { id: "ai", label: "AI / ML", jsonKey: "ai", number: "05", skills: [
    { name: "Google Gemini API", icon: "🤖", proficiency: 82, years: "1y" },
    { name: "TensorFlow Lite", icon: "🧠", proficiency: 75, years: "1y" },
    { name: "Web Speech API", icon: "🎙️", proficiency: 72, years: "0.5y" },
  ] },
];
