import { motion } from "motion/react";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

import { personalInfo } from "../../content/profile";

const socials = [
  { icon: Github, href: personalInfo.github, label: "GitHub" },
  { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10">
      <div className="container-custom flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
        <p className="mono text-xs text-muted">
          © {year} <span className="text-white">Anchal Gupta</span> — made with ☕
        </p>

        <div className="flex items-center gap-5">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted transition-colors duration-300 hover:text-blue-400"
            >
              <Icon size={16} />
            </a>
          ))}

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="text-muted transition-colors duration-300 hover:text-blue-400"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}