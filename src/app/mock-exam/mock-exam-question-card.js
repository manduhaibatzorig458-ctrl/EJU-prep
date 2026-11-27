"use client";

const answerChoices = Array.from({ length: 9 }, (_, index) => index + 1);

export default function MockExamQuestionCard({
  answer,
  isAnswerLocked,
  mode,
  onSelectAnswer,
  questionIndex,
  pdfPage,
  result,
  sourceUrl,
  subjectLabel,
  year,
}) {
  const questionNumber = questionIndex + 1;
  const questionResult = result?.results[questionIndex];

  return (
    <article className="overflow-hidden rounded-2xl border border-[#e9e6de] bg-white">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e9e6de] px-4 py-4 sm:px-6">
        <h2 className="m-0 text-base font-semibold text-[#171b2b] sm:text-lg">
          Асуулт {questionNumber}
        </h2>
        <span className="rounded-full bg-[#f5f6f7] px-3 py-1 text-xs text-[#6d7887]">
          PDF · {pdfPage}-р хуудас
        </span>
      </header>

      <iframe
        className="h-[68svh] min-h-[440px] w-full bg-[#f7f7f5] sm:min-h-[560px]"
        loading="lazy"
        src={`${sourceUrl}#page=${pdfPage}&zoom=page-fit`}
        title={`${year} оны ${subjectLabel}, асуулт ${questionNumber} — PDF-ийн ${pdfPage}-р хуудас`}
      />

      {mode === "practice" && (
        <fieldset className="border-t border-[#e9e6de] px-4 py-4 sm:px-6 sm:py-5">
          <legend className="px-1 text-sm font-semibold text-[#273243]">
            Хариултаа сонгоно уу
          </legend>
          <div className="flex flex-wrap gap-2" role="group" aria-label={`Асуулт ${questionNumber}-ийн хариулт`}>
            {answerChoices.map((choice) => (
              <button
                aria-pressed={answer === choice}
                className={`grid size-10 place-items-center rounded-full border text-sm font-semibold transition ${
                  answer === choice
                    ? "border-[#426ca7] bg-[#e5f0fa] text-[#355b90]"
                    : "border-[#d9e0e5] bg-white text-[#606a78] hover:border-[#9fb5ca]"
                }`}
                disabled={isAnswerLocked}
                key={choice}
                onClick={() => onSelectAnswer(questionIndex, choice)}
                type="button"
              >
                {choice}
              </button>
            ))}
          </div>
          {questionResult && (
            <p className={`mb-0 mt-3 text-sm font-medium ${questionResult.isCorrect ? "text-[#3f7c5a]" : "text-[#a44a40]"}`}>
              {questionResult.isCorrect ? "Зөв хариулт" : `Зөв хариулт: ${questionResult.correctAnswer}`}
            </p>
          )}
        </fieldset>
      )}
    </article>
  );
}
