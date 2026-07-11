import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Github, Globe, Lightbulb, Wrench, Star, Zap } from "lucide-react";
import { projects } from "../content/projects";

const COLOR_MAP: Record<string, { badge: string; border: string; tag: string; glow: string }> = {
  "#3b82f6": {
    badge: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    border: "border-blue-500/30",
    tag: "bg-blue-500/[0.07] border-blue-500/15 text-blue-300/80",
    glow: "rgba(59,130,246,0.15)",
  },
  "#8b5cf6": {
    badge: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    border: "border-violet-500/30",
    tag: "bg-violet-500/[0.07] border-violet-500/15 text-violet-300/80",
    glow: "rgba(139,92,246,0.15)",
  },
  "#ec4899": {
    badge: "bg-pink-500/10 text-pink-300 border-pink-500/20",
    border: "border-pink-500/30",
    tag: "bg-pink-500/[0.07] border-pink-500/15 text-pink-300/80",
    glow: "rgba(236,72,153,0.15)",
  },
  "#f59e0b": {
    badge: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    border: "border-amber-500/30",
    tag: "bg-amber-500/[0.07] border-amber-500/15 text-amber-300/80",
    glow: "rgba(245,158,11,0.15)",
  },
};

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-border bg-card p-6 md:p-8"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <Icon size={16} className="text-primary" />
        <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="font-mono text-primary text-sm">404</p>
          <p className="text-muted-foreground">Project not found.</p>
          <Link to="/" className="text-sm text-primary underline underline-offset-4">
            Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  const c = COLOR_MAP[project.color] ?? COLOR_MAP["#3b82f6"];

  return (
    <div className="min-h-screen">
      {/* Hero band */}
      <div className="relative pt-28 pb-16 px-6 overflow-hidden border-b border-border">
        {/* Background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-60"
          style={{ background: `radial-gradient(ellipse, ${c.glow}, transparent)` }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px opacity-40"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}50, transparent)` }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10 text-sm font-mono group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
              Back to portfolio
            </Link>
          </motion.div>

          {/* Title block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{project.emoji}</span>
              {project.featured && (
                <span className={`px-3 py-1 rounded-full border text-xs font-mono font-medium ${c.badge}`}>
                  Featured Project
                </span>
              )}
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-3">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">{project.subtitle}</p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((t) => (
                <span key={t} className={`px-2.5 py-1 rounded-lg border text-xs font-mono ${c.tag}`}>
                  {t}
                </span>
              ))}
            </div>

            {/* CTA links */}
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-white/[0.03] text-muted-foreground hover:text-foreground hover:border-white/20 transition-all duration-200 text-sm font-medium"
                >
                  <Github size={15} />
                  View on GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all duration-200 text-sm font-medium shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  <Globe size={15} />
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid gap-5">
          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-border bg-card p-6 md:p-8"
          >
            <p className="text-foreground/80 text-lg leading-relaxed">{project.description}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Problem */}
            <Section icon={Lightbulb} title="The Problem">
              <p className="text-muted-foreground text-sm leading-relaxed">{project.problem}</p>
            </Section>

            {/* Solution */}
            <Section icon={Zap} title="My Solution">
              <p className="text-muted-foreground text-sm leading-relaxed">{project.solution}</p>
            </Section>
          </div>

          {/* Features */}
          <Section icon={Star} title="Key Features">
            <ul className="space-y-3">
              {project.features.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.06, ease: "easeOut" }}
                  className="flex items-start gap-3 text-muted-foreground text-sm"
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: project.color }}
                  />
                  {f}
                </motion.li>
              ))}
            </ul>
          </Section>

          {/* Challenges */}
          <Section icon={Wrench} title="Challenges Overcome">
            <p className="text-muted-foreground text-sm leading-relaxed">{project.challenges}</p>
          </Section>
        </div>

        {/* Navigation — other projects */}
        <div className="mt-16 pt-10 border-t border-border">
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-6">
            Other projects
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {projects
              .filter((p) => p.id !== project.id)
              .slice(0, 2)
              .map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${p.id}`}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-border hover:border-white/15 bg-card hover:bg-white/[0.03] transition-all duration-200"
                >
                  <span className="text-2xl">{p.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-foreground text-sm truncate">{p.title}</p>
                    <p className="text-muted-foreground text-xs truncate mt-0.5">{p.subtitle}</p>
                  </div>
                  <ArrowLeft size={14} className="text-muted-foreground rotate-180 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
