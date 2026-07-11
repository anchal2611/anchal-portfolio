import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { achievements } from "../content/achievements";
import { AchievementCard } from "../components/sections/Achievements";

export default function AchievementsPage() {
  return (
    <section className="relative px-4 pb-20 pt-32 sm:px-6 md:pb-28 md:pt-36">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft size={15} /> Back home
        </Link>
        <div className="mt-10 mb-12">
          <p className="font-mono text-xs text-primary mb-3">// recognition</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">All achievements.</h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-muted-foreground">Competitions, community work, and milestones from the journey so far.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((achievement, index) => <AchievementCard key={achievement.title} achievement={achievement} index={index} />)}
        </div>
      </div>
    </section>
  );
}
