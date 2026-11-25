import OnboardingSidebar from "./onboarding-sidebar";
import OnboardingQuestionnaire from "./onboarding-questionnaire";

export default function OnboardingPage() {
  return (
    <div className="min-h-svh bg-[var(--japanese-paper)] text-[#171b2b] lg:grid lg:grid-cols-[272px_minmax(0,1fr)]">
      <OnboardingSidebar />
      <main
        className="min-h-svh min-w-0 overflow-x-hidden bg-[var(--japanese-paper)] lg:h-svh lg:min-h-0 lg:overflow-y-auto lg:overscroll-y-contain"
        id="onboarding-scroll-container"
      >
        <OnboardingQuestionnaire />
      </main>
    </div>
  );
}
