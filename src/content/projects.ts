import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "finalround", title: "FinalRound", subtitle: "AI-Powered Interview Prep Platform", emoji: "🎯", color: "#3b82f6",
    description: "A full-stack platform that helps job seekers prepare smarter — not harder. FinalRound analyzes your resume against real job descriptions, scores it for ATS compatibility, runs AI mock interviews with voice, and gives you confidence scores based on speech analysis.",
    problem: "Most interview prep tools are static. Candidates practice in a vacuum with no feedback on how their resume performs against ATS systems, and no way to assess their verbal communication quality.",
    solution: "FinalRound closes that loop: upload a resume → get an ATS score and gap analysis → enter an AI mock interview → receive a post-interview report with speech confidence metrics and tailored improvement tips.",
    tech: ["React", "Node.js", "Express.js", "Google Gemini API", "AWS S3", "Firebase", "Web Speech API", "Tailwind CSS"],
    features: ["Resume parsing and ATS keyword scoring", "AI-generated interview questions tailored to the job description", "Real-time voice recording with speech confidence analysis", "Post-interview feedback report with actionable tips", "Secure resume storage on AWS S3"],
    challenges: "Integrating browser-native speech recognition with server-side confidence analysis required careful latency management. Solved by streaming audio chunks and processing them asynchronously, keeping the UI responsive during interviews.",
    github: "https://github.com/anchal2611/finalround", live: "https://finalround.vercel.app", featured: true,
  },
  {
    id: "crycompass", title: "CryCompass", subtitle: "Infant Cry Classifier App", emoji: "👶", color: "#8b5cf6",
    description: "An Android app that listens to an infant's cry and classifies it into categories — hunger, pain, discomfort, tiredness — using a TensorFlow Lite model running entirely on-device.",
    problem: "New parents, especially first-timers, struggle to interpret different infant cries. There was no accessible, offline-capable tool to help decode what a baby needs in real time.",
    solution: "CryCompass records a short audio clip, runs it through a trained TensorFlow Lite model locally, and returns a classification with confidence score — no internet required. Firebase backs the user history and analytics.",
    tech: ["Android (Java/Kotlin)", "TensorFlow Lite", "Firebase", "ML Kit", "Audio processing"],
    features: ["On-device audio classification (no server round-trips)", "Five cry categories: hunger, pain, discomfort, tiredness, burping", "Cry history log with timestamps stored in Firebase", "Works fully offline after first install"],
    challenges: "Training a lightweight model that could run on low-end Android hardware with acceptable accuracy. Solved through quantization and careful feature engineering on the mel-spectrogram inputs.",
    github: "https://github.com/anchal2611/crycompass", live: null, featured: true,
  },
  {
    id: "safehaven", title: "SafeHaven", subtitle: "Women's Cyber Safety Platform", emoji: "🛡️", color: "#ec4899",
    description: "A platform designed to protect and empower women in digital spaces — providing resources on identifying cyberstalking, doxxing, and harassment, along with a one-click emergency report tool.",
    problem: "Women disproportionately face online harassment, but most platforms make reporting cumbersome and resources hard to find. Victims often don't know what constitutes a cybercrime or how to document it.",
    solution: "SafeHaven centralizes legal resources, builds a guided incident documentation flow, and provides a quick-report mechanism that auto-formats the evidence trail for law enforcement.",
    tech: ["React", "Node.js", "Firebase", "Tailwind CSS", "Gemini API"],
    features: ["Cybercrime awareness hub with categorized resources", "Guided incident documentation wizard", "One-click report package generation", "AI chatbot for anonymous first-response support", "Community forum with moderation"],
    challenges: "Balancing user anonymity with evidence integrity. Users needed to feel safe logging incidents without fear of data exposure, while the evidence needed to be verifiable. Solved with client-side encryption before Firebase storage.",
    github: "https://github.com/anchal2611/safehaven", live: "https://safehaven.vercel.app", featured: true,
  },
  {
    id: "kautilya-pay", title: "Kautilya Pay", subtitle: "AI-Powered Fintech Budgeting App", emoji: "💰", color: "#f59e0b",
    description: "A personal finance app with an AI financial assistant that tracks spending, forecasts budget shortfalls, and gives personalized savings advice — named after the ancient Indian economist Kautilya.",
    problem: "Generic budgeting apps show you where your money went. They don't tell you why that's a problem or what to do next. Young professionals need contextual, conversational financial guidance.",
    solution: "Kautilya Pay pairs a standard expense tracker with a Gemini-powered assistant that understands your spending patterns, asks clarifying questions, and gives genuinely personalized recommendations — not generic tips.",
    tech: ["React", "Node.js", "Firebase", "Google Gemini API", "Recharts", "Tailwind CSS"],
    features: ["Expense categorization and monthly budget dashboard", "AI assistant with natural language financial Q&A", "Spending trend charts with predictive alerts", "Savings goal tracker with milestone celebrations", "Export reports as PDF"],
    challenges: "Making the AI assistant feel genuinely contextual rather than generic. Required feeding it structured spending summaries as context in each prompt, with careful prompt engineering to avoid hallucinated financial advice.",
    github: "https://github.com/anchal2611/kautilyapay", live: "https://kautilyapay.vercel.app", featured: false,
  },
];
