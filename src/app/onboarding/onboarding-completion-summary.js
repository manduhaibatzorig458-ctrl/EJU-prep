import { Sparkles } from "lucide-react";

const subjectNames = {
  physics: "Физик",
  chemistry: "Хими",
  biology: "Биологи",
};

const mathCourseNames = {
  course1: "Математик I",
  course2: "Математик II",
  none: "Математикийн шалгалтгүй",
};

const targetScoreNames = {
  foundation: "Суурь оноогоо баталгаажуулах",
  medium: "Дундаж оноо зорих",
  topUniversities: "Өндөр оноо, шилдэг сургууль зорих",
};

function getSubjectsSummary(answers) {
  const subjectChoices =
    answers.ejuTrack === "science"
      ? answers.scienceUndecided
        ? ["Хичээлээ дараа сонгоно"]
        : answers.scienceSubjects.map((subject) => subjectNames[subject])
      : [
          answers.humanitiesSubject === "undecided"
            ? "Хичээлээ дараа сонгоно"
            : answers.humanitiesSubject === "japanAndWorld"
              ? "Япон ба дэлхий"
              : "",
        ];

  if (answers.japaneseSelected) {
    subjectChoices.push("Япон хэл");
  }

  const mathCourse = mathCourseNames[answers.mathCourse];
  return [mathCourse, ...subjectChoices].filter(Boolean).join(", ") || "Сонгоогүй";
}

function getExamDateSummary(answers) {
  const sessionLabel = answers.examSession === "session1" ? "1-р ээлж" : "2-р ээлж";
  const month = answers.examSession === "session1" ? "6" : "11";

  if (!answers.examYear || !answers.examDay) {
    return "Сонгоогүй";
  }

  return `${sessionLabel} · ${answers.examYear} оны ${month}-р сарын ${answers.examDay}`;
}

export default function OnboardingCompletionSummary({
  answers,
  onReviewAnswers,
  onRetrySave,
  saveError,
  saveStatus,
}) {
  const summaryItems = [
    { label: "Сонгосон хичээлүүд", value: getSubjectsSummary(answers) },
    { label: "Шалгалтын огноо", value: getExamDateSummary(answers) },
    {
      label: "Зорилтот оноо",
      value: targetScoreNames[answers.targetScore] || "Сонгоогүй",
    },
    { label: "Өдөр бүр", value: answers.dailyStudyTime || "Сонгоогүй" },
  ];

  return (
    <div>
      <span className="mb-5 grid size-12 place-items-center rounded-full bg-[#e8f2fb] text-[var(--brand-blue)]">
        <Sparkles className="size-5" aria-hidden="true" />
      </span>
      <h2 className="m-0 text-2xl font-[760] tracking-[-0.05em] sm:text-3xl">
        Тохиргоо дууслаа. Эхэлцгээе!
      </h2>
      <p className="mb-0 mt-3 max-w-[680px] text-sm leading-6 text-[#687383]">
        Сонгосон хичээл, шалгалтын хугацаа болон зорилтот оноог энд нэгтгэлээ. Хариултаа шалгаж, хүсвэл өөрчилж болно.
      </p>

      <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {summaryItems.map((item) => (
          <div className="min-h-[104px] rounded-2xl bg-[#f5f6f7] p-4" key={item.label}>
            <dt className="text-xs text-[#77818d]">{item.label}</dt>
            <dd className="mb-0 mt-2 text-sm font-medium leading-5 text-[#202a36]">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      {saveStatus === "saving" && (
        <p className="mb-0 mt-5 text-sm text-[#687383]" role="status">
          Тохиргоог хадгалж байна…
        </p>
      )}
      {saveStatus === "saved" && (
        <p className="mb-0 mt-5 text-sm text-[#3b6d4a]" role="status">
          Тохиргоо амжилттай хадгалагдлаа.
        </p>
      )}
      {saveStatus === "error" && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <p className="mb-0 text-sm text-[#b33a32]" role="alert">
            {saveError}
          </p>
          <button
            className="inline-flex min-h-9 items-center justify-center rounded-full border border-[#dfe3e8] px-4 text-sm font-semibold text-[#293444] transition hover:border-[var(--brand-blue)] disabled:opacity-50"
            disabled={saveStatus === "saving"}
            onClick={onRetrySave}
            type="button"
          >
            Дахин хадгалах
          </button>
        </div>
      )}

      <button
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-[#dfe3e8] px-5 text-sm font-semibold text-[#293444] transition hover:border-[var(--brand-blue)] hover:bg-[#f2f0ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)] disabled:opacity-50"
        disabled={saveStatus === "saving"}
        onClick={onReviewAnswers}
        type="button"
      >
        Хариултаа шалгах
      </button>
    </div>
  );
}
