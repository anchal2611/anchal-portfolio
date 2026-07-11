import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../../content/navigation";
import { personalInfo } from "../../content/profile";

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const sectionIds = navLinks.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

export default function Navbar() {
  const scrolled = useScrolled();
  const activeSection = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  function handleNavClick(href: string) {
    setMobileOpen(false);
    if (!isHome) return;
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "py-2.5 bg-[#02040a]/80 backdrop-blur-xl border-b border-border shadow-[0_0_40px_rgba(59,130,246,0.05)]"
            : "py-4 bg-transparent",
        ].join(" ")}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-display font-bold text-xl tracking-tight group flex items-center gap-1.5 rounded-lg py-2"
          >
            <span className="font-mono text-sm text-primary">{"<"}</span>
            <span className="text-foreground">Anchal</span>
            <span className="font-mono text-sm text-primary">{"/>"}</span>
            <motion.span
              className="ml-1 w-1.5 h-1.5 rounded-full bg-primary opacity-60 group-hover:opacity-100"
              transition={{ duration: 0.2 }}
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-0.5 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            {navLinks.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={[
                      "relative px-3.5 py-2 text-sm font-medium rounded-xl transition-colors duration-200",
                      "hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20 shadow-[0_0_16px_rgba(59,130,246,0.08)]"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 text-sm font-medium rounded-xl border border-border bg-white/[0.02] text-muted-foreground hover:text-foreground hover:border-white/20 transition-all duration-200"
            >
              Resume
            </a>
            <a
              href={`#contact`}
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-[60px] z-40 bg-[#02040a]/95 backdrop-blur-xl border-b border-border md:hidden"
          >
            <ul className="flex flex-col px-6 py-6 gap-1">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="w-full text-left px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors font-medium"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 text-center rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  Resume
                </a>
                <a
                  href="#contact"
                  onClick={() => handleNavClick("#contact")}
                  className="px-4 py-3 text-center rounded-lg bg-primary text-white font-semibold"
                >
                  Let's Talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
