import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ClipboardList } from "lucide-react";
import OnboardingSidebar from "../../../onboarding/onboarding-sidebar";
import { courseOneExamYears, courseTwoExamYears } from "../../mock-exam-year-data";

async function MockExamPaperContent({ params, searchParams }) {
  const { year, paper: paperId } = await params;
  const { course } = await searchParams;
  const courseId = course === "course1" ? "course1" : "course2";
  const courseLabel = courseId === "course1" ? "Course 1" : "Course 2";
  const examYears = courseId === "course1" ? courseOneExamYears : courseTwoExamYears;
  const examYear = examYears.find((item) => String(item.year) === year);
  const paper = examYear?.papers.find((item) => item.id === paperId);

  if (!examYear || !paper) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[920px] px-4 pb-8 pt-5 sm:px-6 sm:pb-10 lg:px-8 lg:pt-7">
      <Link
        className="inline-flex min-h-9 items-center gap-2 rounded-lg text-xs font-medium text-[#536476] hover:text-[#355b90] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b91c9] sm:text-sm"
        href={courseId === "course1" ? "/mock-exam?course=course1" : "/mock-exam"}
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Шалгалтын жагсаалт руу буцах
      </Link>

      <header className="mt-7">
        <p className="m-0 text-[10px] font-semibold tracking-[0.17em] text-[#6d7887] sm:text-xs">
          MOCK EXAM / MATHEMATICS {courseLabel.toUpperCase()}
        </p>
        <h1 className="mb-0 mt-3 text-2xl font-bold tracking-[-0.04em] text-[#171b2b] sm:text-3xl">
          {examYear.year} оны шалгалт
        </h1>
        <p className="mb-0 mt-2 text-sm text-[#6d7887] sm:text-base">{paper.label}</p>
      </header>

      <section className="mt-7 rounded-2xl border border-[#e9e6de] bg-white p-5 sm:p-7">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e9eef6] text-[#355b90]">
            <ClipboardList className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="m-0 text-base font-semibold text-[#273243] sm:text-lg">
              Шалгалтын материал
            </h2>
            <p className="mb-0 mt-1 text-xs leading-5 text-[#6d7887] sm:text-sm">
              {examYear.questionCount} асуулт
            </p>
          </div>
        </div>
        <p className="mb-0 mt-6 rounded-xl bg-[#f7f7f5] px-4 py-3 text-xs leading-5 text-[#6d7887] sm:text-sm">
          Энэ шалгалтын асуултууд хараахан системд нэмэгдээгүй байна.
        </p>
      </section>
    </div>
  );
}

function MockExamPaperFallback() {
  return (
    <div aria-busy="true" className="mx-auto max-w-[920px] px-4 pb-8 pt-5 sm:px-6 sm:pb-10 lg:px-8 lg:pt-7">
      <div className="h-3 w-44 rounded-full bg-[#e9e6de]" />
      <div className="mt-7 h-8 w-64 max-w-full rounded-lg bg-[#e9e6de]" />
      <div className="mt-7 h-36 rounded-2xl border border-[#e9e6de] bg-white" />
    </div>
  );
}

export default function MockExamPaperPage({ params, searchParams }) {
  return (
    <div className="min-h-svh bg-[var(--japanese-paper)] text-[#171b2b] lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
      <OnboardingSidebar />
      <main className="min-h-svh min-w-0 overflow-x-hidden bg-[var(--japanese-paper)] lg:h-svh lg:min-h-0 lg:overflow-y-auto lg:overscroll-y-contain">
        <Suspense fallback={<MockExamPaperFallback />}>
          <MockExamPaperContent params={params} searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}
