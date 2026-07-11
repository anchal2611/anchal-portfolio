import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Download, FileText } from "lucide-react";
import { personalInfo } from "../../content/profile";

export default function ResumeCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="px-4 sm:px-6 py-10 md:py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl border border-border bg-card overflow-hidden px-6 sm:px-10 md:px-14 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,rgba(59,130,246,0.08),transparent)] pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 relative z-10 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl border border-primary/20 bg-primary/10 flex items-center justify-center shrink-0">
              <FileText size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-foreground">
                Want the full picture?
              </h3>
              <p className="text-muted-foreground text-sm mt-0.5">
                Download my resume for a concise overview of my skills, projects, and education.
              </p>
            </div>
          </div>

          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="relative z-10 shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all duration-200 shadow-[0_0_24px_rgba(59,130,246,0.3)] hover:shadow-[0_0_36px_rgba(59,130,246,0.5)] group"
          >
            <Download size={15} className="group-hover:animate-bounce" />
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
