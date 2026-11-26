import {
  biologyExamYears,
  chemistryExamYears,
  courseOneExamYears,
  courseTwoExamYears,
  physicsExamYears,
} from "./mock-exam-year-data";
import Link from "next/link";

export default function MockExamYearIndex({ subjectId, courseId }) {
  const examYearsBySubject = {
    physics: physicsExamYears,
    chemistry: chemistryExamYears,
    biology: biologyExamYears,
  };
  const examYears =
    examYearsBySubject[subjectId] ||
    (courseId === "course1" ? courseOneExamYears : courseTwoExamYears);
  const subjectLabels = {
    physics: "Физикийн",
    chemistry: "Химийн",
    biology: "Биологийн",
    mathematics: "Математикийн",
  };
  const sectionLabel = `${subjectLabels[subjectId]} жилийн шалгалтын жагсаалт`;

  return (
    <section aria-label={sectionLabel} className="mt-6">
      <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 xl:grid-cols-3">
        {examYears.map((examYear) => {
          return (
            <li key={examYear.year}>
              <article className="flex min-h-[8.5rem] flex-col justify-between rounded-2xl border border-[#e9e6de] bg-white p-3 shadow-[0_3px_12px_rgba(45,63,82,0.035)] transition-colors hover:border-[#c8d3df] sm:p-3.5">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <span className="grid size-9 place-items-center rounded-xl bg-[#e9eef6] text-xs font-semibold text-[#355b90]">
                    {String(examYear.year).slice(-2)}
                  </span>
                  <h3 className="m-0 justify-self-center whitespace-nowrap text-center text-sm font-semibold tracking-[-0.02em] text-[#171b2b]">
                    {examYear.year} он
                  </h3>
                  <span className="justify-self-end whitespace-nowrap rounded-full bg-[#f8f9fb] px-2.5 py-1 text-[10px] font-medium text-[#606a78]">
                    {examYear.questionCount} асуулт
                  </span>
                </div>
                <div className="mt-5 flex w-full flex-wrap justify-between gap-2 text-xs leading-5 text-[#426ca7]">
                  {examYear.papers.map((paper) => (
                    <Link
                      className="inline-flex min-h-7 items-center whitespace-nowrap rounded-full bg-[#f8f9fb] px-3 py-1 text-[11px] font-medium text-[#426ca7] transition-colors hover:bg-[#e9eef6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b91c9]"
                      href={getPaperHref(subjectId, courseId, examYear.year, paper.id)}
                      key={paper.id}
                    >
                      {paper.label}
                    </Link>
                  ))}
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function getPaperHref(subjectId, courseId, year, paperId) {
  const query = new URLSearchParams();

  if (subjectId !== "mathematics") {
    query.set("subject", subjectId);
  } else if (courseId === "course1") {
    query.set("course", courseId);
  }

  const queryString = query.toString();
  const baseHref = `/mock-exam/${year}/${paperId}`;

  return queryString ? `${baseHref}?${queryString}` : baseHref;
}
