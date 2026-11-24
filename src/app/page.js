import LandingHeader from "../components/landing/landing-header";
import LandingHero from "../components/landing/landing-hero";
import LearningHighlights from "../components/landing/learning-highlights";
import StudyPanel from "../components/landing/study-panel";

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
