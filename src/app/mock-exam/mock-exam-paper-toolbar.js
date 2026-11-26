"use client";

import { BookOpen, Clock3, Pencil } from "lucide-react";

export default function MockExamPaperToolbar({
  answeredCount,
  correctCount,
  isTimerRunning,
  mode,
  onModeChange,
  onToggleTimer,
  questionCount,
  timerLabel,
}) {
  const progressPercent = questionCount ? (answeredCount / questionCount) * 100 : 0;

  return (
    <section className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-[#e9e6de] bg-white p-3 sm:p-4">
      <div aria-label="Шалгалтын горим" className="inline-flex rounded-full bg-[#f2f0ea] p-1" role="group">
        <button
          aria-pressed={mode === "practice"}
          className={`inline-flex min-h-9 items-center gap-2 rounded-full px-3 text-xs font-semibold sm:px-4 sm:text-sm ${mode === "practice" ? "bg-white text-[#355b90] shadow-sm" : "text-[#6d7887]"}`}
          onClick={() => onModeChange("practice")}
          type="button"
        >
          <Pencil className="size-4" aria-hidden="true" />
          Дасгалын горим
        </button>
        <button
          aria-pressed={mode === "browse"}
          className={`inline-flex min-h-9 items-center gap-2 rounded-full px-3 text-xs font-semibold sm:px-4 sm:text-sm ${mode === "browse" ? "bg-white text-[#355b90] shadow-sm" : "text-[#6d7887]"}`}
          onClick={() => onModeChange("browse")}
          type="button"
        >
          <BookOpen className="size-4" aria-hidden="true" />
          Үзэх горим
        </button>
      </div>

      <p className="m-0 flex-1 text-xs text-[#6d7887] sm:text-sm">
        {mode === "practice" ? "Хариултаа илгээсний дараа зөв хариулт харагдана." : "Шалгалтын PDF үзэх горим."}
      </p>

      <div className="min-w-36 flex-1 sm:flex-none">
        <div className="flex justify-between gap-3 text-xs text-[#6d7887] sm:text-sm">
          <span>
            Хариулсан <strong className="text-[#171b2b]">{answeredCount}/{questionCount}</strong>
          </span>
          <span>
            Зөв <strong className="text-[#171b2b]">{correctCount}</strong>
          </span>
        </div>
        <div
          aria-label={`Хариулсан ${answeredCount} асуулт`}
          aria-valuemax={questionCount}
          aria-valuemin={0}
          aria-valuenow={answeredCount}
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#f0f1ef]"
          role="progressbar"
        >
          <div className="h-full rounded-full bg-[#7eacd1] transition-[width]" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <button
        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#e1e4e7] bg-white px-4 text-xs font-semibold text-[#3f4b59] hover:bg-[#f7f7f5] sm:text-sm"
        onClick={onToggleTimer}
        type="button"
      >
        <Clock3 className="size-4" aria-hidden="true" />
        {isTimerRunning ? `Түр зогсоох · ${timerLabel}` : `Цаг эхлүүлэх · ${timerLabel}`}
      </button>
    </section>
  );
}
