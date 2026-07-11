import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";

const SECTIONS = [
  { id: "about", label: "About", num: "01" },
  { id: "skills", label: "Skills", num: "02" },
  { id: "experience", label: "Experience", num: "03" },
  { id: "projects", label: "Projects", num: "04" },
  { id: "achievements", label: "Achievements", num: "05" },
  { id: "contact", label: "Contact", num: "06" },
];

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState({ label: "Home", num: "00" });

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? scrolled / total : 0);

      // detect active section
      let active = { label: "Home", num: "00" };
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 120) active = s;
      }
      setCurrentSection(active);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-border/30">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 origin-left"
          style={{ scaleX: progress }}
        />
      </div>

      {/* Chapter indicator — right edge, desktop only */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-1.5">
        {SECTIONS.map((s) => {
          const isActive = currentSection.id === s.id;
          return (
            <button
              key={s.id}
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-2"
            >
              <motion.span
                animate={{ opacity: isActive ? 1 : 0 }}
                className="font-mono text-[10px] text-primary tracking-wider"
              >
                {s.num} — {s.label}
              </motion.span>
              <motion.span
                animate={{
                  width: isActive ? 20 : 6,
                  backgroundColor: isActive ? "#3b82f6" : "rgba(255,255,255,0.15)",
                }}
                transition={{ duration: 0.3 }}
                className="h-[2px] rounded-full block"
              />
            </button>
          );
        })}
      </div>
    </>
  );
}
