import { Suspense } from "react";
import OnboardingSidebar from "../onboarding/onboarding-sidebar";
import MockExamIndex from "./mock-exam-index";

async function MockExamPageContent({ searchParams }) {
  const { course, subject } = await searchParams;
  const initialCourseId = course === "course1" ? "course1" : "course2";
  const initialSubjectId = ["physics", "chemistry", "biology"].includes(subject)
    ? subject
    : "mathematics";

  return (
    <MockExamIndex initialCourseId={initialCourseId} initialSubjectId={initialSubjectId} />
  );
}

function MockExamPageFallback() {
  return (
    <div
      aria-busy="true"
      aria-label="Mock exam жагсаалт ачаалж байна"
      className="mx-auto max-w-[1280px] px-4 pb-8 pt-5 sm:px-6 sm:pb-10 lg:px-8 lg:pt-7"
    >
      <div className="h-3 w-44 rounded-full bg-[#e9e6de]" />
      <div className="mt-5 h-8 w-64 max-w-full rounded-lg bg-[#e9e6de]" />
      <div className="mt-5 h-10 w-48 rounded-full bg-[#f0f1ef]" />
    </div>
  );
}

export default function MockExamPage({ searchParams }) {
  return (
    <div className="min-h-svh bg-[var(--japanese-paper)] text-[#171b2b] lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
      <OnboardingSidebar />
      <main className="min-h-svh min-w-0 overflow-x-hidden bg-[var(--japanese-paper)] lg:h-svh lg:min-h-0 lg:overflow-y-auto lg:overscroll-y-contain">
        <Suspense fallback={<MockExamPageFallback />}>
          <MockExamPageContent searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}
