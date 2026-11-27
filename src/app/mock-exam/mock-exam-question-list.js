"use client";

import { Check, RotateCcw } from "lucide-react";
import MockExamQuestionCard from "./mock-exam-question-card";

export default function MockExamQuestionList({
  answers,
  errorMessage,
  isSubmitting,
  mode,
  onReset,
  onSelectAnswer,
  onSubmit,
  questionPdfPages,
  result,
  sourceUrl,
  subjectLabel,
  year,
}) {
  const answeredCount = answers.filter((answer) => answer !== null).length;

  return (
    <>
      <section aria-label="Шалгалтын асуултууд" className="mt-6 grid gap-5">
        {answers.map((answer, questionIndex) => (
          <MockExamQuestionCard
            answer={answer}
            isAnswerLocked={Boolean(result)}
            key={questionIndex}
            mode={mode}
            onSelectAnswer={onSelectAnswer}
            pdfPage={questionPdfPages?.[questionIndex] ?? questionIndex + 1}
            questionIndex={questionIndex}
            result={result}
            sourceUrl={sourceUrl}
            subjectLabel={subjectLabel}
            year={year}
          />
        ))}
      </section>

      {mode === "practice" && (
        <section className="mt-6 rounded-2xl border border-[#e9e6de] bg-white p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <button
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#dcebf7] px-5 text-sm font-semibold text-[#355b90] transition-colors hover:bg-[#cfe2f2] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={answeredCount !== answers.length || isSubmitting || Boolean(result)}
              onClick={onSubmit}
              type="button"
            >
              <Check className="size-4" aria-hidden="true" />
              {isSubmitting ? "Шалгаж байна…" : "Хариулт илгээх"}
            </button>
            {result && (
              <>
                <p className="m-0 text-sm font-semibold text-[#273243]">
                  Үр дүн: {result.score} / {result.total}
                </p>
                <button
                  className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#e1e4e7] px-3 text-xs font-semibold text-[#536476] hover:bg-[#f7f7f5]"
                  onClick={onReset}
                  type="button"
                >
                  <RotateCcw className="size-3.5" aria-hidden="true" />
                  Дахин эхлэх
                </button>
              </>
            )}
            {errorMessage && <p className="m-0 text-xs text-[#a44a40]">{errorMessage}</p>}
          </div>
          {answeredCount !== answers.length && !result && (
            <p className="mb-0 mt-3 text-xs text-[#6d7887]">
              Илгээхийн өмнө бүх асуултад хариулна уу · {answeredCount}/{answers.length}
            </p>
          )}
        </section>
      )}
    </>
  );
}
