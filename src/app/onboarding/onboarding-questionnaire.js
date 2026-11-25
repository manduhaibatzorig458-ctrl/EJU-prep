"use client";

import { useEffect, useState } from "react";
import { FlaskConical, LibraryBig, Target } from "lucide-react";
import ExamScheduleSelection from "./exam-schedule-selection";
import EjuSubjectSelection from "./eju-subject-selection";
import OnboardingCompletionSummary from "./onboarding-completion-summary";
import OnboardingStepper from "./onboarding-stepper";

const questions = [
  {
    id: "previousExam",
    title: "Та өмнө нь EJU шалгалт өгч байсан уу?",
    options: ["Тийм", "Үгүй"],
  },
  {
    id: "studyStatus",
    title: "Та одоо ямар түвшинд суралцаж байна вэ?",
    options: ["Ахлах ангийн сурагч", "Их сургуулийн оюутан", "Gap year авсан", "Бусад"],
  },
  {
    id: "ejuTrack",
    title: "Та EJU шалгалтыг ямар чиглэлээр өгөхөөр төлөвлөж байна вэ?",
    options: [
      {
        value: "science",
        title: "Байгалийн ухаан (理系)",
        description:
          "Япон хэл + Математик II + Физик, Хими, Биологиос 2 хичээл. Инженер, анагаах ухаан, эм зүй, хөдөө аж ахуй.",
        Icon: FlaskConical,
      },
      {
        value: "humanities",
        title: "Хүмүүнлэгийн ухаан (文系)",
        description:
          "Япон хэл + Математик I + Нэгдсэн хичээл (Япон ба дэлхий). Эдийн засаг, бизнес, хууль, хүмүүнлэг, нийгмийн ухаан.",
        Icon: LibraryBig,
      },
    ],
  },
  {
    id: "dailyStudyTime",
    title: "Та өдөрт хэр удаан хичээллэх боломжтой вэ?",
    description:
      "Амралтын өдрийн нэмэлт цагийг тооцохгүйгээр нэг өдрийн дундаж цагаа сонгоно уу. Ингэснээр одоогийн хуваарь тань хангалттай эсэхийг тодорхойлно.",
    options: ["30 минут", "1 цаг", "2 цаг", "3 ба түүнээс дээш цаг"],
  },
];

const optionBaseClasses =
  "flex min-h-[58px] w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)] focus-visible:ring-offset-2";

const initialSubjectAnswers = {
  scienceSubjects: [],
  scienceUndecided: false,
  humanitiesSubject: "",
  mathCourse: "",
  japaneseSelected: false,
};

const targetScoreQuestion = {
  id: "targetScore",
  title: "Та ямар оноо зорьж байна вэ?",
  description:
    "Онооны шаардлага нь их сургууль, мэргэжлээс хамаарч өөр байдаг. Сонгосон сургуулийнхаа шаардлагыг шалгаж, зорилгодоо тохирсон түвшнээ сонгоорой.",
  options: [
    {
      value: "foundation",
      title: "Суурь оноогоо баталгаажуулах",
      description:
        "Суурь асуултуудаас хангалттай оноо авахад төвлөрнө. Түгээмэл, суурь мэдлэг шалгасан сэдвээ бататгаарай.",
      Icon: Target,
    },
    {
      value: "medium",
      title: "Дундаж оноо зорих",
      description:
        "Суурь асуултаа алдалгүй, дунд түвшний асуултаас оноогоо ахиулна. Түгээмэл сэдвүүдийн мэдлэгээ нөхөж бататгаарай.",
      Icon: Target,
    },
    {
      value: "topUniversities",
      title: "Өндөр оноо, шилдэг их сургууль зорих",
      description:
        "Ахисан болон хүнд асуултад бэлдэж, сэдвүүдээ бүрэн давтаарай. Бүтэн хэмжээний сорил тогтмол өгөөрэй.",
      Icon: Target,
    },
  ],
};

function getSubjectQuestion(track) {
  if (track === "science") {
    return {
      id: "ejuSubjects",
      title: "Байгалийн ухааны чиглэл: 2 хичээл сонгоно уу",
      description:
        "EJU шалгалтад Физик, Хими, Биологиос хоёр хичээл сонгоно. Сонгохдоо суралцахыг хүссэн их сургуулийнхаа шаардлагыг харгалзаарай.",
    };
  }

  return {
    id: "ejuSubjects",
    title: "Хүмүүнлэгийн ухааны чиглэл: хичээлээ сонгоно уу",
    description:
      "Сонирхож буй их сургуулийнхаа шаардлагад нийцүүлэн хичээлээ сонгоорой. Энэ чиглэлийн олон хөтөлбөрт “Япон ба дэлхий” хичээл шаарддаг.",
  };
}

export default function OnboardingQuestionnaire() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({
    ...initialSubjectAnswers,
    examSession: "",
    examYear: "",
    examDay: "",
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const subjectQuestion = answers.ejuTrack
    ? getSubjectQuestion(answers.ejuTrack)
    : {
        id: "ejuSubjects",
        title: "EJU шалгалтын хичээлээ сонгоно уу",
        description: "Эхлээд шалгалтын чиглэлээ сонгоод, дараа нь хичээлээ сонгоно уу.",
      };
  const examDateQuestion = {
    id: "examDate",
    title: "EJU шалгалтаа хэзээ өгөхөөр төлөвлөж байна вэ?",
  };
  const ejuTrackIndex = questions.findIndex((question) => question.id === "ejuTrack");
  const activeQuestions = [
    ...questions.slice(0, ejuTrackIndex + 1),
    subjectQuestion,
    examDateQuestion,
    targetScoreQuestion,
    ...questions.slice(ejuTrackIndex + 1),
  ];
  const currentQuestion = activeQuestions[currentIndex];
  const completedSteps = isComplete
    ? activeQuestions.length
    : currentIndex;
  useEffect(() => {
    document
      .getElementById("onboarding-scroll-container")
      ?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isComplete]);

  function advanceToNextQuestion() {
    setIsTransitioning(true);
    window.setTimeout(() => {
      setCurrentIndex((index) => index + 1);
      setIsTransitioning(false);
    }, 180);
  }

  function selectAnswer(answer) {
    setAnswers((currentAnswers) => {
      const nextAnswers = { ...currentAnswers, [currentQuestion.id]: answer };
      if (currentQuestion.id === "ejuTrack" && currentAnswers.ejuTrack !== answer) {
        return { ...nextAnswers, ...initialSubjectAnswers };
      }
      return nextAnswers;
    });

    if (currentIndex === activeQuestions.length - 1) {
      setIsComplete(true);
      return;
    }

    advanceToNextQuestion();
  }

  function toggleScienceSubject(subjectValue) {
    const selectedSubjects = answers.scienceSubjects;

    if (selectedSubjects.includes(subjectValue)) {
      const nextAnswers = {
        ...answers,
        scienceSubjects: selectedSubjects.filter((subject) => subject !== subjectValue),
      };
      setAnswers(nextAnswers);
      return;
    }

    if (selectedSubjects.length >= 2) {
      return;
    }

    const nextAnswers = {
      ...answers,
      scienceSubjects: [...selectedSubjects, subjectValue],
      scienceUndecided: false,
    };
    setAnswers(nextAnswers);
    advanceIfSubjectsComplete(nextAnswers);
  }

  function setScienceUndecided(isUndecided) {
    const nextAnswers = {
      ...answers,
      scienceSubjects: [],
      scienceUndecided: isUndecided,
    };
    setAnswers(nextAnswers);
    advanceIfSubjectsComplete(nextAnswers);
  }

  function canContinueFromSubjects(subjectAnswers = answers) {
    const hasSubjectChoice =
      subjectAnswers.ejuTrack === "science"
        ? subjectAnswers.scienceUndecided || subjectAnswers.scienceSubjects.length === 2
        : Boolean(subjectAnswers.humanitiesSubject);

    return hasSubjectChoice && Boolean(subjectAnswers.mathCourse);
  }

  function advanceIfSubjectsComplete(subjectAnswers) {
    if (currentQuestion.id !== "ejuSubjects" || !canContinueFromSubjects(subjectAnswers)) {
      return;
    }

    setCurrentIndex((index) => index + 1);
  }

  function updateSubjectAnswer(subjectKey, value) {
    const nextAnswers = { ...answers, [subjectKey]: value };
    setAnswers(nextAnswers);
    advanceIfSubjectsComplete(nextAnswers);
  }

  function updateExamDate(field, value) {
    const nextAnswers = { ...answers, [field]: value };
    setAnswers(nextAnswers);

    if (
      field === "examDay" &&
      nextAnswers.examSession &&
      nextAnswers.examYear &&
      nextAnswers.examDay
    ) {
      setCurrentIndex((index) => index + 1);
    }
  }

  function resetExamDate(field, value) {
    if (field === "examSession") {
      setAnswers((currentAnswers) => ({
        ...currentAnswers,
        examSession: value,
        examYear: "",
        examDay: "",
      }));
      return;
    }

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      examYear: value,
      examDay: "",
    }));
  }

  function goBack() {
    if (isComplete) {
      setIsComplete(false);
      setCurrentIndex(activeQuestions.length - 1);
      return;
    }

    setCurrentIndex((index) => Math.max(index - 1, 0));
  }

  function reviewAnswers() {
    setIsComplete(false);
    setCurrentIndex(0);
  }

  return (
    <section
      className="mx-auto flex min-h-svh w-[min(calc(100%_-_48px),760px)] flex-col justify-start pt-8 pb-8 max-[560px]:w-[calc(100%_-_40px)] sm:pt-12 sm:pb-14"
      aria-live="polite"
    >
      {!isComplete && (
        <header className="mb-6 text-center">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6d7888]">
            Эхлэхээс өмнө
          </p>
          <h1 className="mx-auto my-0 whitespace-nowrap text-[clamp(22px,3vw,30px)] font-[680] leading-tight tracking-[-0.04em] text-[#171b2b] max-[560px]:whitespace-normal">
          Шалгалтад бэлдэх чиглэлээ тодорхойлцгооё.
          </h1>
        </header>
      )}
      <div className="rounded-2xl border border-[#e4e7eb] bg-white p-5 sm:p-7">
        {!isComplete && (
          <OnboardingStepper completedSteps={completedSteps} totalSteps={activeQuestions.length} />
        )}

        {isComplete ? (
          <OnboardingCompletionSummary answers={answers} onReviewAnswers={reviewAnswers} />
        ) : (
          <>
          <h2 className="mb-7 mt-0 text-[clamp(26px,3.5vw,34px)] font-[650] tracking-[-0.04em]">
            {currentQuestion.title}
          </h2>

          {currentQuestion.description && (
            <p className="-mt-4 mb-6 text-sm leading-6 text-[#687383]">
              {currentQuestion.description}
            </p>
          )}

          {currentQuestion.id === "examDate" ? (
            <ExamScheduleSelection
              session={answers.examSession}
              year={answers.examYear}
              day={answers.examDay}
              onSelectSession={(value) => resetExamDate("examSession", value)}
              onSelectYear={(value) => resetExamDate("examYear", value)}
              onSelectDay={(value) => updateExamDate("examDay", value)}
            />
          ) : currentQuestion.id === "ejuSubjects" ? (
            <EjuSubjectSelection
              track={answers.ejuTrack}
              answers={answers}
              onToggleScienceSubject={toggleScienceSubject}
              onSetScienceUndecided={setScienceUndecided}
              onSelectHumanitiesSubject={(value) => updateSubjectAnswer("humanitiesSubject", value)}
              onSelectMathCourse={(value) => updateSubjectAnswer("mathCourse", value)}
              onToggleJapanese={() => updateSubjectAnswer("japaneseSelected", !answers.japaneseSelected)}
            />
          ) : (
            <div
              className={`grid gap-3 ${
                currentQuestion.id === "ejuTrack"
                  ? "sm:grid-cols-2"
                  : currentQuestion.id === "dailyStudyTime"
                    ? "sm:grid-cols-2 md:grid-cols-4"
                    : ""
              }`}
              role="group"
              aria-label={currentQuestion.title}
            >
              {currentQuestion.options.map((option) => {
                const isStructuredOption = typeof option !== "string";
                const optionValue = isStructuredOption ? option.value : option;
                const isSelected = answers[currentQuestion.id] === optionValue;
                const OptionIcon = isStructuredOption ? option.Icon : null;

                return (
                  <button
                    aria-pressed={isSelected}
                    className={`${
                      isStructuredOption
                        ? "flex min-h-[128px] w-full items-center justify-between gap-3 rounded-2xl border px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)] focus-visible:ring-offset-2"
                        : optionBaseClasses
                    } ${
                      isSelected
                        ? "border-[var(--brand-blue)] bg-[#f2f6fb] text-[#171b2b]"
                        : "border-[#e9e6de] bg-white text-[#273242] hover:border-[#9aacc5] hover:bg-[#fbfaf7]"
                    }`}
                    disabled={isTransitioning}
                    key={optionValue}
                    onClick={() => selectAnswer(optionValue)}
                    type="button"
                  >
                    {isStructuredOption ? (
                      <>
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f1f2f3] text-[#566171]">
                          <OptionIcon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold">{option.title}</span>
                          <span className="mt-1 block text-xs font-normal leading-5 text-[#687383]">
                            {option.description}
                          </span>
                        </span>
                        <span
                          className={`grid size-5 shrink-0 place-items-center rounded-full border ${
                            isSelected
                              ? "border-[var(--brand-blue)] bg-[var(--brand-blue)] text-white"
                              : "border-[#c9cdd3] bg-white text-transparent"
                          }`}
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                      </>
                    ) : (
                      <>
                        <span>{option}</span>
                        <span
                          className={`grid size-5 place-items-center rounded-full border ${
                            isSelected
                              ? "border-[var(--brand-blue)] bg-[var(--brand-blue)] text-white"
                              : "border-[#c9cdd3] text-transparent"
                          }`}
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-7 flex items-center justify-start border-t border-[#e9e6de] pt-5">
            <button
              className="inline-flex min-h-10 items-center rounded-full border border-[#e2e5e8] px-4 text-sm font-medium text-[#293444] transition hover:border-[var(--brand-blue)] disabled:cursor-not-allowed disabled:opacity-45"
              disabled={currentIndex === 0}
              onClick={goBack}
              type="button"
            >
              Өмнөх алхам
            </button>
          </div>
          </>
        )}
      </div>
    </section>
  );
}
