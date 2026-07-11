import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MapPin, GraduationCap, GitCommit, Star, GitFork, Eye, LucideIcon } from "lucide-react";
import { personalInfo } from "../../content/profile";
import { aboutStats, traits, githubStats } from "../../content/about";

const GITHUB_ICON_MAP: Record<string, LucideIcon> = {
  star: Star,
  fork: GitFork,
  eye: Eye,
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="text-center">
      <motion.p initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-2xl sm:text-3xl font-bold text-foreground">{value}</motion.p>
      <p className="text-muted-foreground text-[10px] sm:text-xs font-mono mt-1 tracking-wide">{label}</p>
    </div>
  );
}

/* ── Stylized GitHub contribution graph ── */
const WEEK_COUNT = 26;
const DAY_COUNT = 7;

function generateContributions() {
  const weeks: number[][] = [];
  for (let w = 0; w < WEEK_COUNT; w++) {
    const days: number[] = [];
    for (let d = 0; d < DAY_COUNT; d++) {
      const base = Math.random();
      days.push(base < 0.35 ? 0 : base < 0.6 ? 1 : base < 0.8 ? 2 : base < 0.93 ? 3 : 4);
    }
    weeks.push(days);
  }
  return weeks;
}

const CONTRIB_DATA = generateContributions();
const LEVEL_COLORS = [
  "bg-white/[0.04] border-white/[0.06]",
  "bg-blue-900/60 border-blue-800/40",
  "bg-blue-700/70 border-blue-600/50",
  "bg-blue-500/80 border-blue-400/60",
  "bg-blue-400 border-blue-300/60",
];

function ContributionGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GitCommit size={13} className="text-primary" />
          <span className="font-mono text-xs text-muted-foreground">github contributions</span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground/50">last 6 months</span>
      </div>

      {/* overflow-x-auto so it scrolls on narrow screens instead of clipping */}
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-[3px]" style={{ minWidth: "max-content" }}>
          {CONTRIB_DATA.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((level, di) => (
                <motion.div
                  key={di}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: wi * 0.015 + di * 0.008, ease: "backOut" }}
                  className={`w-[9px] h-[9px] rounded-[2px] border ${LEVEL_COLORS[level]}`}
                  title={`${level} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="font-mono text-[10px] text-muted-foreground/40">Less</span>
        <div className="flex gap-1">
          {LEVEL_COLORS.map((c, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-[2px] border ${c}`} />
          ))}
        </div>
        <span className="font-mono text-[10px] text-muted-foreground/40">More</span>
      </div>
    </div>
  );
}



export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="about" ref={sectionRef} className="relative py-20 md:py-28 lg:py-28 px-4 sm:px-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <Reveal className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-xs text-primary shrink-0">01_about.tsx</span>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent max-w-[80px]" />
            <span className="font-mono text-xs text-muted-foreground/40 hidden sm:inline">{"// who is she?"}</span>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-start">
          {/* Left: copy */}
          <div className="space-y-7">
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                Building things that{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  actually matter.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I'm a second-year B.Tech Computer Science student at{" "}
                <span className="text-foreground font-medium">IGDTUW, Delhi</span>, one of India's
                top women-in-tech institutions. My work lives at the intersection of software
                engineering, AI integration, cloud infrastructure, and UX design.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I got into coding because I wanted to solve real problems. That drive took me from
                writing my first C++ program to building full-stack AI platforms, Android apps with
                on-device ML, fintech tools, and safety products each one shipped, each one real.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Outside of building: I mentor peers in web development, lead technical communities at
                IGDTUW, compete in hackathons, and think obsessively about the gap between{" "}
                <em className="text-foreground/80 not-italic font-mono text-base">"technically correct"</em>{" "}
                and <em className="text-foreground/80 not-italic font-mono text-base">"actually good"</em>.
              </p>
            </Reveal>

            {/* Meta */}
            <Reveal delay={0.25}>
              <div className="flex flex-wrap gap-3 pt-1">
                {[
                  { icon: MapPin, text: "Delhi, India" },
                  { icon: GraduationCap, text: "IGDTUW · B.Tech CSE · 2nd Year" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground bg-white/[0.03] border border-border rounded-lg px-3 py-1.5">
                    <Icon size={13} className="text-primary shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Traits */}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {traits.map((t, i) => (
                  <motion.div key={t.label}
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.35 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-xl border border-border bg-card p-4 hover:border-primary/20 hover:bg-primary/[0.03] transition-all duration-200 cursor-default">
                    <span className="text-xl mb-2 block">{t.emoji}</span>
                    <p className="text-foreground text-sm font-semibold mb-1">{t.label}</p>
                    <p className="text-muted-foreground text-xs leading-snug">{t.desc}</p>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delay={0.35}>
              <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-border">
                {aboutStats.map((s) => (
                  <Stat key={s.label} value={s.value} label={s.label} />
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: portrait + github */}
          <div className="space-y-5">
            {/* Portrait */}
            <Reveal delay={0.1}>
              <div className="relative group">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-blue-500/30 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative rounded-2xl overflow-hidden border border-border bg-card aspect-[4/5]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-[#0a0d1a] to-indigo-950/60 flex flex-col items-center justify-center gap-3">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.4)]">
                      <span className="font-display text-4xl font-bold text-white">AG</span>
                    </div>
                    <span className="font-mono text-muted-foreground text-xs">{"// photo coming soon"}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="font-mono text-xs text-blue-300 mb-1">const developer = {"{"}</p>
                    <p className="font-mono text-xs text-muted-foreground pl-4">name: <span className="text-green-300">"{personalInfo.name}"</span>,</p>
                    <p className="font-mono text-xs text-muted-foreground pl-4">role: <span className="text-green-300">"{personalInfo.title}"</span></p>
                    <p className="font-mono text-xs text-blue-300">{"}"}</p>
                  </div>
                </div>
              </div>
            </Reveal>


            {/* View source link */}
            <Reveal delay={0.26}>
              <a href={`${personalInfo.github}/anchal-portfolio`} target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:border-white/15 transition-all duration-200 text-xs font-mono">
                {"<"} view source code {"/>"}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
