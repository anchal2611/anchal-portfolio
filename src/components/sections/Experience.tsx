import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Briefcase, Users, Calendar, LucideIcon } from "lucide-react";
import { experiences } from "../../content/experience";

const ICON_MAP: Record<string, LucideIcon> = {
  users: Users,
  briefcase: Briefcase,
};

type ExperienceItem = {
  role: string;
  org: string;
  orgFull: string;
  period: string;
  type: string;
  icon: string;
  color: string;
  highlights: string[];
  tags: string[];
};

const COLOR_MAP: Record<string, { dot: string; line: string; badge: string; border: string; glow: string }> = {
  blue: {
    dot: "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]",
    line: "bg-blue-500/30",
    badge: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    border: "hover:border-blue-500/25",
    glow: "group-hover:bg-blue-500/5",
  },
  violet: {
    dot: "bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.8)]",
    line: "bg-violet-500/30",
    badge: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    border: "hover:border-violet-500/25",
    glow: "group-hover:bg-violet-500/5",
  },
  cyan: {
    dot: "bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.8)]",
    line: "bg-cyan-500/30",
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    border: "hover:border-cyan-500/25",
    glow: "group-hover:bg-cyan-500/5",
  },
};

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TimelineItem({
  exp,
  index,
  isLast,
}: {
  exp: ExperienceItem;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const c = COLOR_MAP[exp.color];
  const Icon = ICON_MAP[exp.icon] ?? Briefcase;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-6 md:gap-10"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center shrink-0 w-6">
        {/* Animated dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.12 + 0.15, type: "spring", stiffness: 300 }}
          className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${c.dot}`}
        />
        {/* Connector line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.12 + 0.3, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className={`w-px flex-1 mt-2 ${c.line}`}
          />
        )}
      </div>

      {/* Card */}
      <div className={`group flex-1 pb-12 ${isLast ? "pb-0" : ""}`}>
        <div
          className={`relative rounded-2xl border border-border bg-card p-4 sm:p-6 md:p-8 transition-all duration-300 ${c.border} hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] overflow-hidden`}
        >
          {/* Background fill on hover */}
          <div className={`absolute inset-0 rounded-2xl transition-colors duration-300 ${c.glow}`} />

          <div className="relative z-10">
            {/* Header row */}
            <div className="mb-5">
              <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-mono font-medium shrink-0 ${c.badge}`}>
                  <Icon size={11} />
                  {exp.type}
                </span>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono bg-white/[0.03] border border-border rounded-lg px-2.5 py-1.5 shrink-0">
                  <Calendar size={11} />
                  {exp.period}
                </div>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mt-2 leading-tight">
                {exp.role}
              </h3>
              <p className="text-primary text-sm font-medium mt-0.5">{exp.org}</p>
              <p className="text-muted-foreground text-xs mt-0.5 hidden sm:block">{exp.orgFull}</p>
            </div>

            {/* Highlights */}
            <ul className="space-y-2.5 mb-6">
              {exp.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed">
                  <span className="mt-2 w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md border border-border bg-white/[0.02] text-muted-foreground text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 md:py-28 lg:py-28 px-4 sm:px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <Reveal className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-xs text-primary shrink-0">03 — Experience</span>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent max-w-[80px]" />
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mb-4">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Where I've shown up.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mb-12 md:mb-16">
          <p className="text-muted-foreground text-base md:text-lg max-w-xl">
            Leadership, community building, and competition — the three threads that have shaped how I think about product and people.
          </p>
        </Reveal>

        {/* Timeline */}
        <div>
          {experiences.map((exp, i) => (
            <TimelineItem
              key={exp.role}
              exp={exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
