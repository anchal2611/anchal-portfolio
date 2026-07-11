import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import Achievements from "../components/sections/Achievements";
import Contact from "../components/sections/Contact";
import ResumeCTA from "../components/sections/ResumeCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <ResumeCTA />
      <Contact />
    </>
  );
}
