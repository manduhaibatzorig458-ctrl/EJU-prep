"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, FileText } from "lucide-react";
import MockExamAnswerSheet from "./mock-exam-answer-sheet";
import MockExamPaperToolbar from "./mock-exam-paper-toolbar";

export default function MockExamPaperExperience({
  subjectId,
  subjectLabel,
  year,
  paper,
  questionCount,
}) {
  const [mode, setMode] = useState("practice");
  const [answers, setAnswers] = useState(() => Array(questionCount).fill(null));
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const answeredCount = answers.filter((answer) => answer !== null).length;
  const timerLabel = formatElapsedTime(elapsedSeconds);

  useEffect(() => {
    if (!isTimerRunning) return undefined;

    const timerId = window.setInterval(() => {
      setElapsedSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isTimerRunning]);

  function selectAnswer(questionIndex, answer) {
    setAnswers((currentAnswers) =>
      currentAnswers.map((currentAnswer, index) =>
        index === questionIndex ? answer : currentAnswer,
      ),
    );
    setResult(null);
    setErrorMessage("");
  }

  async function submitAnswers() {
    if (answeredCount !== questionCount || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/mock-exam/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year,
          paperId: paper.id,
          subject: subjectId,
          answers,
          elapsedSeconds,
        }),
      });
      const responseBody = await response.json();

      if (!response.ok) {
        setErrorMessage(responseBody.error || "Хариултыг шалгаж чадсангүй.");
        return;
      }

      setResult(responseBody);
    } catch {
      setErrorMessage("Сүлжээний алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetExam() {
    setAnswers(Array(questionCount).fill(null));
    setResult(null);
    setErrorMessage("");
    setElapsedSeconds(0);
    setIsTimerRunning(false);
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-10 pt-5 sm:px-6 lg:px-8 lg:pt-7">
      <p className="m-0 text-xs font-medium text-[#6d7887]">{subjectLabel} · Шалгалтын жагсаалт</p>

      <header className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="m-0 text-[10px] font-semibold tracking-[0.17em] text-[#6d7887] sm:text-xs">
              PAST EXAM / {year} · {paper.label}
            </p>
            <h1 className="mb-0 mt-3 text-3xl font-bold tracking-[-0.04em] text-[#171b2b] sm:text-4xl">
              {year} оны {paper.label} · {subjectLabel}
            </h1>
            <p className="mb-0 mt-2 text-sm text-[#6d7887] sm:text-base">
              Албан ёсны PDF-ээс асуултаа үзээд хариултаа энд сонгоорой.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#6d7887]">
            <FileText className="size-5" aria-hidden="true" />
            <strong className="text-xl text-[#171b2b]">{questionCount}</strong>
            асуулт
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#e1e4e7] bg-white px-4 text-sm font-semibold text-[#3f4b59] hover:bg-[#f7f7f5]"
            href={`/mock-exam?subject=${subjectId}`}
          >
            <BookOpen className="size-4" aria-hidden="true" />
            Бүх шалгалт
          </Link>
          <Link
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#e1e4e7] bg-white px-4 text-sm font-semibold text-[#3f4b59] hover:bg-[#f7f7f5]"
            href="#source-document"
          >
            <FileText className="size-4" aria-hidden="true" />
            Эх PDF рүү очих
          </Link>
        </div>
      </header>

      <MockExamPaperToolbar
        answeredCount={answeredCount}
        correctCount={result?.score ?? 0}
        isTimerRunning={isTimerRunning}
        mode={mode}
        onModeChange={setMode}
        onToggleTimer={() => setIsTimerRunning((isRunning) => !isRunning)}
        questionCount={questionCount}
        timerLabel={timerLabel}
      />

      <p className="mb-0 mt-5 text-xs leading-5 text-[#6d7887] sm:text-sm">
        Шалгалтын эх материал © JASSO. Сургалтын зориулалтаар ашиглана. PDF доторх хуудсуудыг гүйлгэж үзнэ үү.
      </p>

      <section className="mt-5 overflow-hidden rounded-2xl border border-[#e9e6de] bg-white" id="source-document">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e9e6de] px-4 py-3 sm:px-5">
          <h2 className="m-0 text-sm font-semibold text-[#273243]">Эх шалгалтын PDF</h2>
          <a
            className="text-xs font-semibold text-[#426ca7] underline-offset-2 hover:underline sm:text-sm"
            href={paper.sourceUrl}
            rel="noreferrer"
            target="_blank"
          >
            Шинэ цонхонд нээх ↗
          </a>
        </div>
        <iframe
          className="h-[72svh] min-h-[520px] w-full bg-[#f7f7f5]"
          loading="lazy"
          src={paper.sourceUrl}
          title={`${year} оны ${subjectLabel} шалгалтын албан ёсны PDF`}
        />
      </section>

      {mode === "practice" && (
        <MockExamAnswerSheet
          answers={answers}
          errorMessage={errorMessage}
          isSubmitting={isSubmitting}
          onReset={resetExam}
          onSelectAnswer={selectAnswer}
          onSubmit={submitAnswers}
          result={result}
        />
      )}
    </div>
  );
}

function formatElapsedTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
}
