import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Trophy, Star, Palette, Zap, Users, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { achievements } from "../../content/achievements";

const ICON_MAP: Record<string, React.ElementType> = {
  "🥈": Trophy,
  "🏆": Trophy,
  "🎨": Palette,
  "⚡": Zap,
  "👥": Users,
};

const CARD_COLORS = [
  {
    orb: "bg-yellow-500/15",
    border: "hover:border-yellow-500/25",
    icon: "text-yellow-400",
    iconBg: "bg-yellow-500/10 border-yellow-500/20",
    num: "text-yellow-500/20",
    glow: "hover:shadow-[0_8px_40px_rgba(234,179,8,0.08)]",
  },
  {
    orb: "bg-blue-500/15",
    border: "hover:border-blue-500/25",
    icon: "text-blue-400",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    num: "text-blue-500/20",
    glow: "hover:shadow-[0_8px_40px_rgba(59,130,246,0.08)]",
  },
  {
    orb: "bg-pink-500/15",
    border: "hover:border-pink-500/25",
    icon: "text-pink-400",
    iconBg: "bg-pink-500/10 border-pink-500/20",
    num: "text-pink-500/20",
    glow: "hover:shadow-[0_8px_40px_rgba(236,72,153,0.08)]",
  },
  {
    orb: "bg-cyan-500/15",
    border: "hover:border-cyan-500/25",
    icon: "text-cyan-400",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
    num: "text-cyan-500/20",
    glow: "hover:shadow-[0_8px_40px_rgba(6,182,212,0.08)]",
  },
  {
    orb: "bg-violet-500/15",
    border: "hover:border-violet-500/25",
    icon: "text-violet-400",
    iconBg: "bg-violet-500/10 border-violet-500/20",
    num: "text-violet-500/20",
    glow: "hover:shadow-[0_8px_40px_rgba(139,92,246,0.08)]",
  },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

export function AchievementCard({ achievement, index }: { achievement: (typeof achievements)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const c = CARD_COLORS[index % CARD_COLORS.length];
  const Icon = ICON_MAP[achievement.icon] ?? Star;
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-2xl border border-border bg-card p-6 overflow-hidden transition-all duration-300 ${c.border} ${c.glow}`}
    >
      {/* Background orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.09 + 0.2 }}
        className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-2xl pointer-events-none ${c.orb} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Large background number */}
      <span
        className={`absolute top-4 right-5 font-display font-extrabold text-7xl leading-none select-none pointer-events-none ${c.num} transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1`}
      >
        {num}
      </span>

      <div className="relative z-10">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${c.iconBg} mb-5`}>
          <Icon size={18} className={c.icon} />
        </div>

        {/* Content */}
        <div className="pr-10">
          <h3 className="font-display text-lg font-bold text-foreground leading-tight mb-1">
            {achievement.title}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-primary text-xs font-medium">{achievement.org}</span>
            <span className="text-border">·</span>
            <span className="font-mono text-xs text-muted-foreground">{achievement.year}</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {achievement.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Marquee strip of logos / labels ── */
const MARQUEE_ITEMS = [
  "UI/UX Hackathons", "Trinity TechFest", "VesDes Designathon",
  "Delhi Tech Circuit", "IGDTUW", "Top 20 National", "2nd Place",
  "AI & Fintech", "Community Leader", "Open Source",
];

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative overflow-hidden py-4 border-y border-border">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 whitespace-nowrap w-max"
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-8 text-xs font-mono text-muted-foreground tracking-widest uppercase">
            <span className="text-primary/40">✦</span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Achievements() {
  const featuredAchievements = achievements.slice(0, 3);

  return (
    <section id="achievements" className="relative py-20 md:py-28 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-yellow-500/4 blur-[160px] pointer-events-none" />

      {/* Marquee strip */}
      <Reveal>
        <Marquee />
      </Reveal>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 md:mt-20">
        <Reveal className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-xs text-primary shrink-0">05 — Achievements</span>
            <div className="h-px w-16 bg-gradient-to-r from-border to-transparent shrink-0" />
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mb-4">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Recognition & wins.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mb-10 md:mb-14">
          <p className="text-muted-foreground text-base md:text-lg max-w-xl">
            A record built one competition, one community, one shipped product at a time.
          </p>
        </Reveal>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredAchievements.map((a, i) => (
            <AchievementCard key={a.title} achievement={a} index={i} />
          ))}
        </div>

        {achievements.length > 3 && (
          <div className="mt-8 flex justify-center">
            <Link
              to="/achievements"
              className="group flex items-center gap-2 rounded-xl border border-border bg-white/[0.02] px-5 py-3 text-sm font-mono text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
            >
              View all achievements ({achievements.length})
              <ChevronRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
