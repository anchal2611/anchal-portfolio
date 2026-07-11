import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { projects } from "../content/projects";
import { ProjectCard } from "../components/sections/Projects";

export default function ProjectsPage() {
  return (
    <section className="relative px-4 pb-20 pt-32 sm:px-6 md:pb-28 md:pt-36">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft size={15} /> Back home
        </Link>
        <div className="mt-10 mb-12">
          <p className="font-mono text-xs text-primary mb-3">// selected work</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">All projects.</h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-muted-foreground">A closer look at the products, experiments, and ideas I have built.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </div>
      </div>
    </section>
  );
}
