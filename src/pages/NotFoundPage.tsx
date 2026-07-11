import { Link } from "react-router";
import { motion } from "motion/react";
import { Terminal, ArrowLeft } from "lucide-react";

const LINES = [
  { text: "$ git log --oneline HEAD", type: "input" },
  { text: "fatal: ambiguous argument 'HEAD'", type: "error" },
  { text: "$ git status", type: "input" },
  { text: "On branch main", type: "output" },
  { text: "nothing to commit, nothing to show here.", type: "output" },
  { text: "$ curl https://anchalgupta.dev/this-page", type: "input" },
  { text: '{"status": 404, "error": "commit not found"}', type: "error" },
  { text: "$ echo 'looks like this route doesn\\'t exist'", type: "input" },
  { text: "looks like this route doesn't exist", type: "output" },
];

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <Terminal size={18} className="text-red-400" />
          </div>
          <div>
            <p className="font-mono text-red-400 text-sm font-bold">500: Internal Server Error</p>
            <p className="font-mono text-muted-foreground text-xs">git: fatal — commit not found</p>
          </div>
        </div>

        {/* Terminal window */}
        <div className="rounded-xl border border-border bg-[#0a0d14] overflow-hidden shadow-[0_0_60px_rgba(239,68,68,0.08)]">
          <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-border">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="font-mono text-[11px] text-muted-foreground ml-2">anchal@portfolio — bash — 404</span>
          </div>

          <div className="p-4 font-mono text-xs leading-relaxed space-y-1">
            {LINES.map((line, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.12, ease: "easeOut" }}
                className={line.type === "input" ? "text-blue-400" : line.type === "error" ? "text-red-400" : "text-green-300/80"}>
                {line.text}
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: LINES.length * 0.12 + 0.2 }}
              className="flex items-center gap-1 mt-2">
              <span className="text-primary">$</span>
              <span className="w-2 h-4 bg-primary/80 animate-pulse ml-1" />
            </motion.div>
          </div>
        </div>

        {/* Actions */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-3 mt-8">
          <Link to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <ArrowLeft size={14} /> Back to portfolio
          </Link>
          <Link to="/projects/finalround"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-white/20 transition-all duration-200 text-sm font-mono">
            view latest commits →
          </Link>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="text-center font-mono text-xs text-muted-foreground/40 mt-6">
          {"// this page was not found in the git history"}
        </motion.p>
      </motion.div>
    </div>
  );
}
