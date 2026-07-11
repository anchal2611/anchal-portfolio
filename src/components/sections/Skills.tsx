import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { CheckCircle, Play, RotateCcw } from "lucide-react";
import { skillsData as SKILL_CATEGORIES } from "../../content/skills";


function getProficiencyLabel(n: number) {
  if (n >= 90) return "Expert";
  if (n >= 80) return "Advanced";
  return "Proficient";
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function SkillBar({ proficiency, delay }: { proficiency: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div initial={{ width: 0 }} animate={inView ? { width: `${proficiency}%` } : {}}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 relative">
        <motion.span animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.6, delay: delay + 0.8, ease: "easeInOut" }}
          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </motion.div>
    </div>
  );
}

function SkillCard({ skill, index, categoryDelay }: { skill: { name: string; icon: string; proficiency: number; years: string }; index: number; categoryDelay: number }) {
  const [hovered, setHovered] = useState(false);
  const delay = categoryDelay + index * 0.06;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="group relative rounded-xl border border-border bg-card p-4 cursor-default overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/[0.04] hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]">
      <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
        className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />
      <div className="relative z-10 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="text-xl leading-none">{skill.icon}</span>
            <span className="font-medium text-foreground text-sm">{skill.name}</span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground bg-white/[0.04] border border-border rounded-md px-1.5 py-0.5 shrink-0">{skill.years}</span>
        </div>
        <SkillBar proficiency={skill.proficiency} delay={delay} />
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-muted-foreground">{getProficiencyLabel(skill.proficiency)}</span>
          <motion.span animate={{ opacity: hovered ? 1 : 0.4 }} className="font-mono text-[10px] text-primary">
            {skill.proficiency}%
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Package.json style code block ── */
function PackageJsonCard({ category }: { category: typeof SKILL_CATEGORIES[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl border border-border bg-[#0a0d14] overflow-hidden">
      {/* Editor title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.02] border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="font-mono text-[11px] text-muted-foreground ml-2">package.json</span>
      </div>
      {/* Code */}
      <div className="p-4 font-mono text-xs leading-relaxed">
        <div className="text-muted-foreground/60">{"{"}</div>
        <div className="pl-4">
          <span className="text-blue-300">"skills"</span>
          <span className="text-muted-foreground/60">: {"{"}</span>
        </div>
        <div className="pl-8">
          <span className="text-green-300">"{category.jsonKey}"</span>
          <span className="text-muted-foreground/60">: [</span>
        </div>
        {category.skills.map((s, i) => (
          <div key={s.name} className="pl-12">
            <span className="text-amber-300">"{s.name}"</span>
            {i < category.skills.length - 1 && <span className="text-muted-foreground/60">,</span>}
          </div>
        ))}
        <div className="pl-8 text-muted-foreground/60">]</div>
        <div className="pl-4 text-muted-foreground/60">{"}"}</div>
        <div className="text-muted-foreground/60">{"}"}</div>
      </div>
    </motion.div>
  );
}

/* ── Run Verification ── */
type VerifyState = "idle" | "running" | "done";

function RunVerification({ category }: { category: typeof SKILL_CATEGORIES[0] }) {
  const [state, setState] = useState<VerifyState>("idle");
  const [checked, setChecked] = useState<string[]>([]);

  async function run() {
    if (state === "running") return;
    setState("running");
    setChecked([]);
    for (const skill of category.skills) {
      await new Promise((r) => setTimeout(r, 400 + Math.random() * 200));
      setChecked((prev) => [...prev, skill.name]);
    }
    setState("done");
  }

  function reset() { setState("idle"); setChecked([]); }

  return (
    <div className="rounded-xl border border-border bg-[#0a0d14] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.02] border-b border-border">
        <span className="font-mono text-[11px] text-muted-foreground">$ run verification</span>
        <div className="flex gap-2">
          {state === "done" && (
            <button onClick={reset} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
              <RotateCcw size={12} />
            </button>
          )}
          <button onClick={run} disabled={state === "running"}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono font-medium transition-all duration-200 ${state === "running" ? "bg-blue-500/20 text-blue-300 cursor-wait" : state === "done" ? "bg-green-500/20 text-green-300" : "bg-primary/20 text-primary hover:bg-primary/30"}`}>
            <Play size={9} />
            {state === "idle" ? "run" : state === "running" ? "verifying..." : "✓ done"}
          </button>
        </div>
      </div>

      <div className="p-4 space-y-2 min-h-[100px]">
        {state === "idle" && (
          <p className="font-mono text-xs text-muted-foreground/50">{"// Click 'run' to verify skill stack"}</p>
        )}
        {category.skills.map((skill) => {
          const isDone = checked.includes(skill.name);
          const isActive = state === "running" && checked.length < category.skills.length && category.skills[checked.length]?.name === skill.name;
          return (
            <motion.div key={skill.name} initial={false}
              animate={{ opacity: isDone || isActive ? 1 : state === "idle" ? 0 : 0.3 }}
              className="flex items-center gap-2 font-mono text-xs">
              {isDone ? (
                <CheckCircle size={12} className="text-green-400 shrink-0" />
              ) : (
                <motion.span animate={isActive ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.2 }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-3 h-3 rounded-full border border-muted-foreground/30 shrink-0 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                </motion.span>
              )}
              <span className={isDone ? "text-green-300" : "text-muted-foreground"}>
                {skill.name}
              </span>
              {isDone && <span className="text-muted-foreground/40 ml-auto">verified ✓</span>}
              {isActive && <span className="text-blue-400 ml-auto animate-pulse">checking...</span>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function CategoryTab({ cat, active, onClick }: { cat: typeof SKILL_CATEGORIES[0]; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`relative px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200 text-left whitespace-nowrap ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"}`}>
      {active && (
        <motion.span layoutId="skill-tab-pill"
          className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-lg"
          transition={{ type: "spring", stiffness: 400, damping: 35 }} />
      )}
      <span className="relative z-10 flex items-center gap-2">
        <span className="text-[10px] text-primary opacity-60">{cat.number}</span>
        {cat.label}
      </span>
    </button>
  );
}

export default function Skills() {
  const [activeId, setActiveId] = useState("languages");
  const activeCategory = SKILL_CATEGORIES.find((c) => c.id === activeId)!;

  return (
    <section id="skills" className="relative py-20 md:py-28 lg:py-28 px-4 sm:px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-blue-600/4 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-xs text-primary shrink-0">{"<Skills />"}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent max-w-[80px]" />
            <span className="font-mono text-xs text-muted-foreground/40 hidden sm:inline">{"// the full stack"}</span>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mb-3">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Tools I build with.</h2>
        </Reveal>
        <Reveal delay={0.1} className="mb-10">
          <p className="text-muted-foreground text-base md:text-lg max-w-xl">
            Cross-stack toolkit — from systems programming to AI integration, pixel-perfect UIs to cloud.
          </p>
        </Reveal>

        {/* Tab nav — horizontal scroll on mobile, no wrapping */}
        <Reveal delay={0.15} className="mb-8">
          <div className="overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-1 p-1 bg-white/[0.02] border border-border rounded-xl w-max min-w-full sm:w-fit">
              {SKILL_CATEGORIES.map((cat) => (
                <CategoryTab key={cat.id} cat={cat} active={activeId === cat.id} onClick={() => setActiveId(cat.id)} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Main grid: cards + side panel (side panel below on mobile) */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-5">
          {/* Skill cards */}
          <motion.div key={activeId} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {activeCategory.skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} categoryDelay={0} />
            ))}
          </motion.div>

          {/* Side panel */}
          <motion.div key={`panel-${activeId}`} initial={{ opacity: 0, x: 0 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }} className="space-y-4">
            <PackageJsonCard category={activeCategory} />
            <RunVerification category={activeCategory} />
          </motion.div>
        </div>

        {/* All skills cloud */}
        <Reveal delay={0.2} className="mt-12 md:mt-16 pt-10 md:pt-12 border-t border-border">
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-6">
            {"// full_stack_at_a_glance"}
          </p>
          <div className="flex flex-wrap gap-2">
            {SKILL_CATEGORIES.flatMap((cat) =>
              cat.skills.map((s) => (
                <motion.span key={s.name} whileHover={{ scale: 1.05 }}
                  className="px-3 py-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground text-xs font-mono transition-colors duration-200 cursor-default hover:border-primary/30">
                  {s.icon} {s.name}
                </motion.span>
              ))
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
