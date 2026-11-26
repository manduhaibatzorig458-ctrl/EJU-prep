import OnboardingSidebar from "../onboarding/onboarding-sidebar";

export default function ProfilePage() {
  return (
    <div className="min-h-svh bg-[var(--japanese-paper)] text-[#171b2b] lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
      <OnboardingSidebar />
      <main className="min-h-svh min-w-0 bg-[var(--japanese-paper)] lg:h-svh lg:overflow-y-auto lg:overscroll-y-contain" />
    </div>
  );
}
