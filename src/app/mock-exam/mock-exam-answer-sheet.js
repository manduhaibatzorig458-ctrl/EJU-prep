"use client";

import { Check, RotateCcw } from "lucide-react";

const answerChoices = Array.from({ length: 9 }, (_, index) => index + 1);

export default function MockExamAnswerSheet({
  answers,
  errorMessage,
  isSubmitting,
  onReset,
  onSelectAnswer,
  onSubmit,
  result,
}) {
  const answeredCount = answers.filter((answer) => answer !== null).length;

  return (
    <section className="mt-6 rounded-2xl border border-[#e9e6de] bg-white p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#e9e6de] pb-4">
        <div>
          <p className="m-0 text-xs font-medium text-[#6d7887]">Хариултын хуудас</p>
          <h2 className="mb-0 mt-1 text-lg font-semibold text-[#171b2b]">
            Асуулт бүрийн хариултыг сонгоно уу
          </h2>
        </div>
        {result && (
          <button
            className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#e1e4e7] px-3 text-xs font-semibold text-[#536476] hover:bg-[#f7f7f5]"
            onClick={onReset}
            type="button"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Дахин эхлэх
          </button>
        )}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {answers.map((answer, questionIndex) => {
          const questionResult = result?.results[questionIndex];
          const cardState = questionResult
            ? questionResult.isCorrect
              ? "border-[#b8d8c8] bg-[#f5faf7]"
              : "border-[#e9c8c3] bg-[#fdf8f7]"
            : "border-[#e9e6de] bg-white";

          return (
            <fieldset className={`min-w-0 rounded-xl border p-3 ${cardState}`} key={questionIndex}>
              <legend className="px-1 text-xs font-semibold text-[#273243]">
                Асуулт {questionIndex + 1}
                {questionResult && (
                  <span className={questionResult.isCorrect ? "ml-2 text-[#3f7c5a]" : "ml-2 text-[#a44a40]"}>
                    {questionResult.isCorrect ? "Зөв" : `Зөв хариулт: ${questionResult.correctAnswer}`}
                  </span>
                )}
              </legend>
              <div
                aria-label={`Асуулт ${questionIndex + 1}-ийн сонголт`}
                className="mt-2 flex flex-wrap gap-1.5"
                role="group"
              >
                {answerChoices.map((choice) => (
                  <button
                    aria-pressed={answer === choice}
                    className={`grid size-8 place-items-center rounded-full border text-xs font-semibold transition sm:size-9 ${answer === choice ? "border-[#426ca7] bg-[#e5f0fa] text-[#355b90]" : "border-[#d9e0e5] bg-white text-[#606a78] hover:border-[#9fb5ca]"}`}
                    disabled={Boolean(result)}
                    key={choice}
                    onClick={() => onSelectAnswer(questionIndex, choice)}
                    type="button"
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </fieldset>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#dcebf7] px-5 text-sm font-semibold text-[#355b90] transition-colors hover:bg-[#cfe2f2] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={answeredCount !== answers.length || isSubmitting || Boolean(result)}
          onClick={onSubmit}
          type="button"
        >
          <Check className="size-4" aria-hidden="true" />
          {isSubmitting ? "Шалгаж байна…" : "Хариулт илгээх"}
        </button>
        {errorMessage && <p className="m-0 text-xs text-[#a44a40]">{errorMessage}</p>}
        {result && (
          <p className="m-0 text-sm font-semibold text-[#273243]">
            Үр дүн: {result.score} / {result.total}
          </p>
        )}
      </div>
    </section>
  );
}
