import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  LucideIcon,
} from "lucide-react";
import { personalInfo } from "../../content/profile";
import { socialLinks } from "../../content/contact";

// Point this at your deployed backend (see /backend/server.js)
const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL ?? "/api/discussions";

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

const ICON_MAP: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
};

const STYLE_MAP: Record<string, { color: string; hoverBg: string }> = {
  github: { color: "hover:border-white/20 hover:text-white", hoverBg: "hover:bg-white/[0.04]" },
  linkedin: { color: "hover:border-blue-500/30 hover:text-blue-300", hoverBg: "hover:bg-blue-500/[0.04]" },
  twitter: { color: "hover:border-sky-500/30 hover:text-sky-300", hoverBg: "hover:bg-sky-500/[0.04]" },
  mail: { color: "hover:border-primary/30 hover:text-primary", hoverBg: "hover:bg-primary/[0.04]" },
};

type FormState = "idle" | "sending" | "success" | "error";

function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof fields>>({});

  function validate() {
    const e: Partial<typeof fields> = {};
    if (!fields.name.trim()) e.name = "required";
    if (!fields.email.trim()) e.email = "required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "invalid email";
    if (!fields.message.trim()) e.message = "required";
    return e;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof typeof fields]) setErrors((err) => ({ ...err, [name]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setState("sending");
    try {
      const res = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error("Request failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  const inputBase = "w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 focus:border-primary/50 focus:bg-primary/[0.03] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] font-mono";

  if (state === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-12 gap-4">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-2">
          <CheckCircle size={26} className="text-emerald-400" />
        </div>
        <p className="font-mono text-green-300 text-sm">{"// 201 Created"}</p>
        <h3 className="font-display text-xl font-bold">Discussion started!</h3>
        <p className="text-muted-foreground text-sm max-w-xs">Your message has been received. Anchal will jump into the thread and respond shortly.</p>
        <button onClick={() => { setState("idle"); setFields({ name: "", email: "", subject: "", message: "" }); }}
          className="mt-2 text-xs font-mono text-primary underline underline-offset-4">
          Start another discussion
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Request header */}
      <div className="rounded-xl bg-white/[0.02] border border-border p-3 font-mono text-xs space-y-1">
        <div className="flex gap-3">
          <span className="text-primary/60">POST</span>
          <span className="text-green-300">/api/discussions</span>
          <span className="text-muted-foreground/40 ml-auto">HTTP/1.1</span>
        </div>
        <div className="text-muted-foreground/40">Content-Type: application/json</div>
        <div className="text-muted-foreground/40">Authorization: Bearer {"<your-curiosity>"}</div>
      </div>

      <p className="font-mono text-[11px] text-muted-foreground/50">{"// new discussion"}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-muted-foreground/60">name <span className="text-red-400">*</span></label>
          <input name="name" value={fields.name} onChange={handleChange} placeholder='"Your Name"'
            className={`${inputBase} ${errors.name ? "border-red-500/50" : "border-border"}`} />
          {errors.name && <p className="text-red-400 text-[10px] font-mono flex items-center gap-1"><AlertCircle size={10} />{errors.name}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-muted-foreground/60">email <span className="text-red-400">*</span></label>
          <input name="email" type="email" value={fields.email} onChange={handleChange} placeholder='"your@email.com"'
            className={`${inputBase} ${errors.email ? "border-red-500/50" : "border-border"}`} />
          {errors.email && <p className="text-red-400 text-[10px] font-mono flex items-center gap-1"><AlertCircle size={10} />{errors.email}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-mono text-muted-foreground/60">topic</label>
        <input name="subject" value={fields.subject} onChange={handleChange} placeholder='"What are you building?"'
          className={`${inputBase} border-border`} />
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-mono text-muted-foreground/60">message <span className="text-red-400">*</span></label>
        <textarea name="message" value={fields.message} onChange={handleChange}
          placeholder='"Tell me about your project, idea, or just say hi..."'
          rows={5} className={`${inputBase} resize-none ${errors.message ? "border-red-500/50" : "border-border"}`} />
        {errors.message && <p className="text-red-400 text-[10px] font-mono flex items-center gap-1"><AlertCircle size={10} />{errors.message}</p>}
      </div>

      {state === "error" && (
        <p className="text-red-400 text-xs font-mono flex items-center gap-1.5">
          <AlertCircle size={12} /> 500: Internal error. Try emailing directly.
        </p>
      )}

      <button type="submit" disabled={state === "sending"}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm transition-all duration-200 hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_24px_rgba(59,130,246,0.3)] hover:shadow-[0_0_36px_rgba(59,130,246,0.5)]">
        {state === "sending" ? (
          <>
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
            <span className="font-mono">Opening discussion...</span>
          </>
        ) : (
          <>
            <MessageSquare size={15} />
            <span className="font-mono">Start Discussion</span>
          </>
        )}
      </button>

      <p className="text-center text-muted-foreground text-xs font-mono">
        {"// or email directly: "}
        <a href={`mailto:${personalInfo.email}`} className="text-primary underline underline-offset-4">{personalInfo.email}</a>
      </p>
    </form>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-28 lg:py-28 px-4 sm:px-6 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-blue-600/6 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-xs text-primary shrink-0">{"POST /contact"}</span>
            <div className="h-px w-12 bg-gradient-to-r from-border to-transparent shrink-0" />
            <span className="font-mono text-xs text-muted-foreground/40 hidden sm:inline">{"// open for discussion"}</span>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-start">
          {/* Left */}
          <div>
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                Let's start a{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">conversation.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-lg">
                Open to internships, collaborative projects, hackathon teams, and conversations about AI, product design, or anything interesting you're building. Based in Delhi — available remotely worldwide.
              </p>
            </Reveal>

            <div className="space-y-3">
              {socialLinks.map((link, i) => {
                const Icon = ICON_MAP[link.icon] ?? Mail;
                const style = STYLE_MAP[link.icon] ?? STYLE_MAP.mail;
                return (
                  <Reveal key={link.label} delay={0.15 + i * 0.07}>
                    <a href={link.href} target="_blank" rel="noreferrer"
                      className={`group flex items-center gap-4 p-4 rounded-xl border border-border bg-card transition-all duration-200 ${style.color} ${style.hoverBg}`}>
                      <div className="w-9 h-9 rounded-lg border border-border bg-white/[0.03] flex items-center justify-center shrink-0">
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{link.label}</p>
                        <p className="text-xs text-muted-foreground font-mono truncate">{link.handle}</p>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs shrink-0">
                        <span className="hidden sm:block font-mono">{link.desc}</span>
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </a>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.45} className="mt-8">
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-emerald-300 text-sm font-mono">status: open_to_opportunities = true</span>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              {/* Discussion header */}
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-border">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <MessageSquare size={14} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Start a new discussion</p>
                  <p className="text-muted-foreground text-xs font-mono mt-0.5">{"anchalgupta/discussions → new"}</p>
                </div>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}