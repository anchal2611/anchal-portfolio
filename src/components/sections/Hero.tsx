import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Github, Linkedin, Mail, Sparkles, Terminal } from "lucide-react";
import { personalInfo } from "../../content/profile";

/* ── Mouse parallax ── */
function useMouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) =>
      setPos({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 });
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

/* ── Orb ── */
function Orb({ className, delay = 0, parallaxFactor = 1, mouseX, mouseY }: {
  className: string; delay?: number; parallaxFactor?: number; mouseX: number; mouseY: number;
}) {
  const x = useSpring(mouseX * parallaxFactor * 40, { stiffness: 60, damping: 20 });
  const y = useSpring(mouseY * parallaxFactor * 40, { stiffness: 60, damping: 20 });
  useEffect(() => { x.set(mouseX * parallaxFactor * 40); y.set(mouseY * parallaxFactor * 40); }, [mouseX, mouseY, parallaxFactor, x, y]);
  return (
    <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, delay, ease: "easeOut" }} style={{ x, y }}
      className={`absolute rounded-full blur-[120px] pointer-events-none ${className}`} />
  );
}

/* ── Word reveal ── */
function WordReveal({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span key={i}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mr-[0.25em]">{word}</motion.span>
      ))}
    </span>
  );
}

/* ── Terminal ── */
type TermLine = { type: "input" | "output" | "error"; text: string };

const COMMANDS: Record<string, { output: string[]; action?: () => void }> = {
  help: {
    output: [
      "  whoami    → about me",
      "  skills    → tech stack",
      "  projects  → my work",
      "  contact   → get in touch",
      "  clear     → reset",
    ],
  },
  whoami: {
    output: [
      `  ${personalInfo.name}`,
      `  ${personalInfo.degree} @ ${personalInfo.university}`,
      `  ${personalInfo.title}`,
      "  Status: open to opportunities ✓",
    ],
  },
  skills: {
    output: [
      "  Languages  → C++, JS, Python",
      "  Frontend   → React, Tailwind",
      "  Backend    → Node.js, Firebase",
      "  AI         → Gemini, TF Lite",
      "  ↓ Scrolling to skills...",
    ],

  },
  projects: {
    output: [
      "  [1] FinalRound  — AI interview prep",
      "  [2] CryCompass  — cry classifier",
      "  [3] SafeHaven   — cyber safety",
      "  [4] KautiliyaPay — fintech AI",
      "  ↓ Scrolling to projects...",
    ],

  },
  contact: {
    output: ["  ↓ Scrolling to contact..."],

  },
};

const PRESET_CMDS = ["help", "whoami", "skills", "projects", "contact", "clear"] as const;

function InteractiveTerminal() {
  const INITIAL_LINES: TermLine[] = [
    { type: "output", text: "$ npm run introduce-yourself" },
    { type: "output", text: "" },
    { type: "output", text: "  > const dev = new AnchalGupta();" },
    { type: "output", text: '  > dev.status = "building cool things ✦"' },
    { type: "output", text: "" },
    { type: "output", text: "  Type 'help' or tap a command below." },
    { type: "output", text: "" },
  ];

  const [lines, setLines] = useState<TermLine[]>(INITIAL_LINES);
  const [input, setInput] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === "clear") {
      setLines([
        { type: "output", text: "  Terminal cleared." },
        { type: "output", text: "  Type 'help' for commands." },
        { type: "output", text: "" },
      ]);
      setInput("");
      return;
    }
    const newLines: TermLine[] = [{ type: "input", text: `$ ${trimmed}` }];
    const found = COMMANDS[trimmed];
    if (found) {
      found.output.forEach((l) => newLines.push({ type: "output", text: l }));
      newLines.push({ type: "output", text: "" });
      if (found.action) setTimeout(found.action, 700);
    } else if (trimmed) {
      newLines.push({ type: "error", text: `  not found: ${trimmed}` });
      newLines.push({ type: "output", text: "" });
    }
    setLines((prev) => [...prev, ...newLines]);
    setInput("");
  }, []);

  return (
    <div className="rounded-xl border border-border bg-[#0a0d14] overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.1)] w-full">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 shrink-0" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shrink-0" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 shrink-0" />
        <div className="flex-1 flex items-center justify-center gap-1.5 min-w-0">
          <Terminal size={12} className="text-muted-foreground shrink-0" />
          <span className="font-mono text-xs text-muted-foreground truncate">anchal@portfolio — zsh</span>
        </div>
      </div>

      {/* Output — overflow-x-hidden prevents line overflow */}
      <div className="p-4 font-mono text-xs md:text-sm leading-relaxed h-52 md:h-60 overflow-y-auto overflow-x-hidden">
        {lines.map((line, i) => (
          <div key={i}
            className={`break-words whitespace-pre-wrap ${line.type === "input" ? "text-blue-400 font-semibold" : line.type === "error" ? "text-red-400" : "text-green-300/80"}`}>
            {line.text || " "}
          </div>
        ))}

        {/* Desktop: free-form input */}
        {!isMobile && (
          <div className="flex items-center gap-1 mt-1" onClick={() => inputRef.current?.focus()}>
            <span className="text-primary shrink-0">$</span>
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runCommand(input)}
              className="flex-1 min-w-0 bg-transparent outline-none text-blue-300 font-mono text-xs md:text-sm caret-primary"
              spellCheck={false} autoComplete="off" placeholder="type a command..." />
            <span className="w-1.5 h-4 bg-primary/80 animate-pulse shrink-0" />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Mobile: preset command buttons */}
      {isMobile && (
        <div className="px-4 pb-4 border-t border-border pt-3">
          <p className="font-mono text-[10px] text-muted-foreground/50 mb-2">tap a command:</p>
          <div className="flex flex-wrap gap-2">
            {PRESET_CMDS.map((cmd) => (
              <button key={cmd} onClick={() => runCommand(cmd)}
                className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-border text-xs font-mono text-blue-300 hover:text-white hover:bg-primary/10 active:bg-primary/20 active:border-primary/40 transition-colors cursor-pointer min-h-[36px] flex items-center justify-center">
                {cmd}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Scroll indicator ── */
function ScrollIndicator() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 0.8 }}
      className="flex flex-col items-center gap-2">
      <span className="text-muted-foreground text-[10px] font-mono tracking-widest uppercase">scroll</span>
      <div className="w-px h-10 bg-gradient-to-b from-border to-transparent relative overflow-hidden">
        <motion.div animate={{ y: ["-100%", "200%"] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary/0 to-primary" />
      </div>
    </motion.div>
  );
}

/* ── Hero ── */
export default function Hero() {
  const { x: mouseX, y: mouseY } = useMouseParallax();
  const sectionRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia("(min-width: 1024px)").matches);
  const rawScrollY = useMotionValue(0);
  const smoothScrollY = useSpring(rawScrollY, { stiffness: 80, damping: 20 });
  const contentY = useTransform(smoothScrollY, [0, 600], [0, 80]);
  const contentOpacity = useTransform(smoothScrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const handler = () => rawScrollY.set(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [rawScrollY]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = () => setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <section ref={sectionRef} style={{ position: "relative" }}
      className="min-h-screen lg:min-h-[720px] flex flex-col items-center justify-center overflow-visible lg:overflow-hidden" aria-label="Hero">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_100%,rgba(99,102,241,0.06),transparent)]" />
      </div>

      <Orb className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-blue-600/20 top-[-10%] left-[-10%]" delay={0.2} parallaxFactor={0.6} mouseX={mouseX} mouseY={mouseY} />
      <Orb className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-indigo-500/15 bottom-[-5%] right-[-10%]" delay={0.5} parallaxFactor={0.4} mouseX={mouseX} mouseY={mouseY} />
      <Orb className="w-[200px] h-[200px] bg-cyan-400/10 top-[40%] right-[10%]" delay={0.8} parallaxFactor={0.9} mouseX={mouseX} mouseY={mouseY} />

      {/* Content */}
      <motion.div style={isDesktop ? { y: contentY, opacity: contentOpacity } : undefined}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">

        {/* Left: text */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:max-w-2xl">

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-[11px] font-mono mb-7">
            <Sparkles size={11} className="text-blue-400 shrink-0" />
            <span className="truncate">// CSE @ IGDTUW Delhi · 2nd Year</span>
          </motion.div>

          {/* Name */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight mb-4">
            <WordReveal text="Hi, I'm" className="text-muted-foreground/70" />
            <br />
            <WordReveal text="Anchal Gupta" className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent" />
          </h1>

          {/* Role tag */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.5 }}
            className="font-mono text-xs sm:text-sm text-muted-foreground mb-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-1">
            <span className="text-primary/60">{"<"}</span>
            <span className="text-blue-300">SoftwareEngineer</span>
            <span className="text-primary/60">{"/>"}</span>
            <span className="text-muted-foreground/40 hidden sm:inline">{"// AI · Cloud · UX"}</span>
          </motion.div>

          {/* Tagline */}
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-lg leading-relaxed mb-8">
            Building impactful products at the intersection of{" "}
            <span className="text-foreground/80">software engineering</span>,{" "}
            <span className="text-foreground/80">AI</span>, and{" "}
            <span className="text-foreground/80">design</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8 w-full">
            <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative px-6 sm:px-8 py-3 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-[1.03]">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500" />
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                View My Work
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
              </span>
            </button>
            <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 sm:px-8 py-3 rounded-xl font-semibold text-sm border border-border text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-white/[0.03]">
              About Me
            </button>
          </motion.div>

          {/* Socials — split into two sub-rows to avoid overflow */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.6 }}
            className="flex flex-col items-center lg:items-start gap-3 mb-8 w-full">
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: personalInfo.github, label: "GitHub" },
                { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="p-2.5 rounded-xl border border-border hover:border-primary/40 text-muted-foreground hover:text-primary transition-all duration-200 hover:bg-primary/5">
                  <Icon size={17} />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-muted-foreground text-xs font-mono">Open to opportunities</span>
            </div>
          </motion.div>

          <ScrollIndicator />
        </div>

        {/* Right: terminal */}
        <motion.div initial={{ opacity: 0, x: 20, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[440px] xl:w-[500px] shrink-0">
          <InteractiveTerminal />
          <p className="text-center text-muted-foreground/40 font-mono text-[10px] mt-2.5 tracking-widest hidden md:block">
            // interactive — try typing 'help'
          </p>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
