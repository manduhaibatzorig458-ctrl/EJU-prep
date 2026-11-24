import LandingHeader from "../../components/layout/landing-header";
import LandingHero from "../../components/layout/landing-hero";
import LearningHighlights from "../../components/layout/learning-highlights";
import StudyPanel from "../../components/layout/study-panel";

export default function Home() {
  return (
    <main className="landing-home" id="home">
      <LandingHeader />
      <div className="landing-layout">
        <div className="landing-copy-column">
          <LandingHero />
          <LearningHighlights />
        </div>
        <StudyPanel />
      </div>
    </main>
  );
}
