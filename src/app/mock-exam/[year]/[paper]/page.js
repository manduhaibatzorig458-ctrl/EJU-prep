import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ClipboardList } from "lucide-react";
import OnboardingSidebar from "../../../onboarding/onboarding-sidebar";
import {
  biologyExamYears,
  courseOneExamYears,
  courseTwoExamYears,
  chemistryExamYears,
  physicsExamYears,
  science2011QuestionPdfPages,
} from "../../mock-exam-year-data";
import MockExamPaperExperience from "../../mock-exam-paper-experience";
import { science2011FirstSessionAnswerKeys } from "../../science-2011-answer-key";

async function MockExamPaperContent({ params, searchParams }) {
  const { year, paper: paperId } = await params;
  const { course, subject } = await searchParams;
  const subjectId = ["physics", "chemistry", "biology"].includes(subject)
    ? subject
    : "mathematics";
  const courseId = course === "course1" ? "course1" : "course2";
  const subjectLabels = {
    physics: "PHYSICS",
    chemistry: "CHEMISTRY",
    biology: "BIOLOGY",
    mathematics: "MATHEMATICS",
  };
  const subjectLabel = subjectLabels[subjectId];
  const courseLabel = courseId === "course1" ? "Course 1" : "Course 2";
  const examYearsBySubject = {
    physics: physicsExamYears,
    chemistry: chemistryExamYears,
    biology: biologyExamYears,
  };
  const examYears =
    examYearsBySubject[subjectId] ||
    (courseId === "course1" ? courseOneExamYears : courseTwoExamYears);
  const examYear = examYears.find((item) => String(item.year) === year);
  const paper = examYear?.papers.find((item) => item.id === paperId);

  if (!examYear || !paper) {
    notFound();
  }

  if (paper.sourceUrl && subjectId !== "mathematics") {
    const scienceSubjectLabels = {
      physics: "Физик",
      chemistry: "Хими",
      biology: "Биологи",
    };

    return (
      <MockExamPaperExperience
        key={`${subjectId}-${examYear.year}-${paper.id}`}
        paper={paper}
        questionCount={paper.questionCount ?? examYear.questionCount}
        questionPdfPages={science2011QuestionPdfPages[subjectId]}
        subjectId={subjectId}
        subjectLabel={scienceSubjectLabels[subjectId]}
        year={examYear.year}
      />
    );
  }

  const answerKey =
    examYear.year === 2011 && paper.id === "session-1"
      ? science2011FirstSessionAnswerKeys[subjectId]
      : null;

  return (
    <div className="mx-auto max-w-[920px] px-4 pb-8 pt-5 sm:px-6 sm:pb-10 lg:px-8 lg:pt-7">
      <Link
        className="inline-flex min-h-9 items-center gap-2 rounded-lg text-xs font-medium text-[#536476] hover:text-[#355b90] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b91c9] sm:text-sm"
        href={
          subjectId !== "mathematics"
            ? `/mock-exam?subject=${subjectId}`
            : courseId === "course1"
              ? "/mock-exam?course=course1"
              : "/mock-exam"
        }
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Шалгалтын жагсаалт руу буцах
      </Link>

      <header className="mt-7">
        <p className="m-0 text-[10px] font-semibold tracking-[0.17em] text-[#6d7887] sm:text-xs">
          MOCK EXAM / {subjectLabel}
          {subjectId === "mathematics" ? ` ${courseLabel.toUpperCase()}` : ""}
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
              {paper.questionCount ?? examYear.questionCount} асуулт
            </p>
          </div>
        </div>
        {paper.sourceUrl ? (
          <div className="mt-6 rounded-xl bg-[#f7f7f5] px-4 py-4">
            <p className="mb-3 mt-0 text-xs leading-5 text-[#6d7887] sm:text-sm">
              2011 оны 1-р ээлжийн эх асуултыг JASSO-ийн PDF-ээс үзнэ үү.
            </p>
            <a
              className="inline-flex min-h-9 items-center rounded-full bg-[#e9eef6] px-4 text-xs font-semibold text-[#355b90] transition-colors hover:bg-[#dfe8f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b91c9] sm:text-sm"
              href={paper.sourceUrl}
              rel="noreferrer"
              target="_blank"
            >
              JASSO-ийн PDF нээх ↗
            </a>
          </div>
        ) : (
          <p className="mb-0 mt-6 rounded-xl bg-[#f7f7f5] px-4 py-3 text-xs leading-5 text-[#6d7887] sm:text-sm">
            Энэ шалгалтын асуултууд хараахан системд нэмэгдээгүй байна.
          </p>
        )}
        {answerKey && (
          <details className="mt-5 rounded-xl border border-[#e9e6de] px-4 py-3">
            <summary className="cursor-pointer text-xs font-semibold text-[#355b90] sm:text-sm">
              Хариултын түлхүүр харах
            </summary>
            <ol
              aria-label="Хариултын түлхүүр"
              className="mb-0 mt-3 grid list-none grid-cols-3 gap-2 p-0 sm:grid-cols-5"
            >
              {answerKey.map((answer, index) => (
                <li
                  className="flex items-center justify-between rounded-lg bg-[#f7f7f5] px-3 py-2 text-xs text-[#606a78]"
                  key={`${index + 1}-${answer}`}
                >
                  <span>{index + 1}</span>
                  <strong className="text-[#171b2b]">{answer}</strong>
                </li>
              ))}
            </ol>
          </details>
        )}
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
