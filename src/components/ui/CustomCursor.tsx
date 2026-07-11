import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "motion/react";

const INTERACTIVE = "a, button, [role=button], input, textarea, select, label[for]";

export default function CustomCursor() {
  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });
  const ringX = useSpring(0, { stiffness: 120, damping: 20 });
  const ringY = useSpring(0, { stiffness: 120, damping: 20 });
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      setHidden(false);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      const target = e.target as Element;
      setHovered(!!target.closest(INTERACTIVE));
    };

    const hide = () => setHidden(true);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", hide);
    };
  }, [mouseX, mouseY, ringX, ringY]);

  if (hidden) return null;

  return (
    <>
      {/* Dot / bracket icon */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.span
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          className="font-mono text-[10px] text-primary font-bold leading-none select-none"
        >
          {"<>"}
        </motion.span>
        <motion.span
          animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 0 : 1 }}
          transition={{ duration: 0.15 }}
          className="absolute w-2 h-2 rounded-full bg-primary"
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width: hovered ? 40 : 32,
            height: hovered ? 40 : 32,
            borderColor: hovered ? "rgba(59,130,246,0.6)" : "rgba(59,130,246,0.3)",
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full border"
        />
      </motion.div>
    </>
  );
}
