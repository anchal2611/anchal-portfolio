import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowUpRight, Github, Globe, ChevronRight, Play, CheckCircle } from "lucide-react";
import { Link } from "react-router";
import { projects } from "../../content/projects";

const COLOR_MAP: Record<string, { orb: string; badge: string; border: string; tag: string; btn: string }> = {
  "#3b82f6": { orb: "bg-blue-500/20", badge: "bg-blue-500/10 text-blue-300 border-blue-500/20", border: "hover:border-blue-500/30", tag: "bg-blue-500/[0.07] border-blue-500/15 text-blue-300/80", btn: "hover:text-blue-400 hover:border-blue-500/40" },
  "#8b5cf6": { orb: "bg-violet-500/20", badge: "bg-violet-500/10 text-violet-300 border-violet-500/20", border: "hover:border-violet-500/30", tag: "bg-violet-500/[0.07] border-violet-500/15 text-violet-300/80", btn: "hover:text-violet-400 hover:border-violet-500/40" },
  "#ec4899": { orb: "bg-pink-500/20", badge: "bg-pink-500/10 text-pink-300 border-pink-500/20", border: "hover:border-pink-500/30", tag: "bg-pink-500/[0.07] border-pink-500/15 text-pink-300/80", btn: "hover:text-pink-400 hover:border-pink-500/40" },
  "#f59e0b": { orb: "bg-amber-500/20", badge: "bg-amber-500/10 text-amber-300 border-amber-500/20", border: "hover:border-amber-500/30", tag: "bg-amber-500/[0.07] border-amber-500/15 text-amber-300/80", btn: "hover:text-amber-400 hover:border-amber-500/40" },
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── FinalRound ATS Demo ── */
type DemoState = "idle" | "uploading" | "scanning" | "done";
const ATS_RESULTS = [
  { label: "Keywords matched", value: "18 / 22", score: 82 },
  { label: "Format score", value: "91 / 100", score: 91 },
  { label: "ATS compatibility", value: "87%", score: 87 },
  { label: "Overall ATS score", value: "87 / 100", score: 87 },
];

function FinalRoundDemo() {
  const [state, setState] = useState<DemoState>("idle");
  const [progress, setProgress] = useState(0);
  const [visibleResults, setVisibleResults] = useState<number>(0);

  async function runDemo() {
    if (state !== "idle") { setState("idle"); setProgress(0); setVisibleResults(0); return; }
    setState("uploading");
    for (let i = 0; i <= 100; i += 4) { await new Promise((r) => setTimeout(r, 20)); setProgress(i); }
    setState("scanning");
    await new Promise((r) => setTimeout(r, 800));
    setState("done");
    for (let i = 0; i < ATS_RESULTS.length; i++) {
      await new Promise((r) => setTimeout(r, 300));
      setVisibleResults(i + 1);
    }
  }

  return (
    <div className="mt-5 rounded-xl border border-blue-500/20 bg-blue-500/[0.04] p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[11px] text-blue-300">{"// mock ATS scorer"}</span>
        <button onClick={runDemo}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono font-medium transition-all duration-200 ${state === "idle" ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30" : "bg-white/[0.04] text-muted-foreground"}`}>
          <Play size={9} />
          {state === "idle" ? "Run ATS Score" : state === "done" ? "Reset" : "Running..."}
        </button>
      </div>

      {state !== "idle" && (
        <div className="space-y-3">
          {(state === "uploading" || state === "scanning" || state === "done") && (
            <div>
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1">
                <span>{state === "uploading" ? "Uploading resume..." : state === "scanning" ? "Scanning against JD..." : "Analysis complete ✓"}</span>
                <span>{state === "uploading" ? `${progress}%` : "100%"}</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div animate={{ width: state === "uploading" ? `${progress}%` : "100%" }}
                  className={`h-full rounded-full ${state === "done" ? "bg-green-400" : "bg-blue-500"}`} />
              </div>
            </div>
          )}

          {state === "done" && (
            <div className="space-y-2 pt-1">
              {ATS_RESULTS.slice(0, visibleResults).map((r, i) => (
                <motion.div key={r.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={11} className="text-green-400 shrink-0" />
                    <span className="font-mono text-[11px] text-muted-foreground">{r.label}</span>
                  </div>
                  <span className="font-mono text-[11px] text-green-300 font-medium">{r.value}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {state === "idle" && (
        <p className="font-mono text-[10px] text-muted-foreground/50">
          {"// Simulates FinalRound's ATS analysis engine"}
        </p>
      )}
    </div>
  );
}

/* ── Project card ── */
export function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const c = COLOR_MAP[project.color] ?? COLOR_MAP["#3b82f6"];

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className={`group relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 ${c.border} hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col`}>

      <motion.div animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }} transition={{ duration: 0.4 }}
        className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none ${c.orb}`} />

      <div className="h-px w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)` }} />

      <div className="relative z-10 p-4 sm:p-6 md:p-7 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl leading-none">{project.emoji}</span>
            <div>
              {project.featured && (
                <span className={`inline-block text-[10px] font-mono font-medium px-2 py-0.5 rounded border mb-1 ${c.badge}`}>Featured</span>
              )}
              <h3 className="font-display text-xl font-bold text-foreground leading-tight">{project.title}</h3>
            </div>
          </div>
          <motion.div animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0 }} transition={{ duration: 0.2 }}
            className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors">
            <ArrowUpRight size={18} />
          </motion.div>
        </div>

        <p className="text-muted-foreground text-xs font-mono mb-3">{project.subtitle}</p>
        <p className="text-muted-foreground/80 text-sm leading-relaxed mb-5 flex-1 line-clamp-2">{project.description}</p>

        {/* Tech tags — GitHub topics style */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 5).map((t) => (
            <span key={t} className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-medium ${c.tag}`}>{t}</span>
          ))}
          {project.tech.length > 5 && (
            <span className="px-2.5 py-0.5 rounded-full border border-border text-[11px] font-mono text-muted-foreground">+{project.tech.length - 5}</span>
          )}
        </div>

        {/* FinalRound interactive demo */}
        {project.id === "finalround" && <FinalRoundDemo />}

        {/* Expandable technical details */}
        <div className="mt-4 border-t border-border pt-4">
          <button onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors w-full text-left group/exp">
            <motion.span animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronRight size={12} />
            </motion.span>
            <span className="text-primary/60">{">"}</span> view technical details
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden">
                <div className="pt-3 space-y-2">
                  <p className="font-mono text-[10px] text-muted-foreground/50">{"// challenges_overcome"}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{project.challenges}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 mt-2">
          <div className="flex items-center gap-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                className={`p-2 rounded-lg border border-border text-muted-foreground transition-all duration-200 ${c.btn}`} aria-label="GitHub">
                <Github size={14} />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                className={`p-2 rounded-lg border border-border text-muted-foreground transition-all duration-200 ${c.btn}`} aria-label="Live demo">
                <Globe size={14} />
              </a>
            )}
          </div>
          <Link to={`/projects/${project.id}`}
            className="flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group/link">
            Case study
            <ChevronRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-20 md:py-28 lg:py-28 px-4 sm:px-6 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/4 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-xs text-primary shrink-0">{"const projects = [...]"}</span>
            <div className="h-px w-12 bg-gradient-to-r from-border to-transparent shrink-0" />
          </div>
        </Reveal>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">Things I've built.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl">
                Real products, real problems — each one a different domain, the same obsession with quality.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <a href="https://github.com/anchalgupta" target="_blank" rel="noreferrer"
              className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-white/20 transition-all duration-200 text-sm font-mono">
              <Github size={15} /> view all on GitHub
            </a>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {featured.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>

        {rest.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Link
              to="/projects"
              className="group flex items-center gap-2 rounded-xl border border-border bg-white/[0.02] px-5 py-3 text-sm font-mono text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
            >
              View all projects ({projects.length})
              <ChevronRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
