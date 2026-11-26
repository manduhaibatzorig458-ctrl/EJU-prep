"use client";

import { useState } from "react";
import { BookOpenCheck } from "lucide-react";
import MockExamEmptyIndex from "./mock-exam-empty-index";
import MockExamYearIndex from "./mock-exam-year-index";

const subjects = [
  {
    id: "mathematics",
    label: "Математик",
    title: "Математикийн mock exam",
    eyebrow: "MATHEMATICS / MOCK EXAM INDEX",
    description: "Математикийн шалгалтын материал энд харагдана.",
  },
  {
    id: "physics",
    label: "Физик",
    title: "Физикийн mock exam",
    eyebrow: "PHYSICS / MOCK EXAM INDEX",
    description: "Физикийн шалгалтын материал энд харагдана.",
  },
  {
    id: "chemistry",
    label: "Хими",
    title: "Химийн mock exam",
    eyebrow: "CHEMISTRY / MOCK EXAM INDEX",
    description: "Химийн шалгалтын материал энд харагдана.",
  },
  {
    id: "biology",
    label: "Биологи",
    title: "Биологийн mock exam",
    eyebrow: "BIOLOGY / MOCK EXAM INDEX",
    description: "Биологийн шалгалтын материал энд харагдана.",
  },
  {
    id: "general-subject",
    label: "Нэгдсэн хичээл",
    title: "Нэгдсэн хичээлийн mock exam",
    eyebrow: "JAPAN AND THE WORLD / MOCK EXAM INDEX",
    description: "Япон ба дэлхийн нийгэм, газарзүй, түүхийн нэгдсэн хичээл.",
  },
  {
    id: "japanese",
    label: "Япон хэл",
    title: "Япон хэлний mock exam",
    eyebrow: "JAPANESE / MOCK EXAM INDEX",
    description: "Япон хэлний шалгалтын материал энд харагдана.",
  },
];

const mathCourses = [
  { id: "course2", label: "Course 2" },
  { id: "course1", label: "Course 1" },
];

export default function MockExamIndex({
  initialCourseId = "course2",
  initialSubjectId = "mathematics",
}) {
  const [activeSubjectId, setActiveSubjectId] = useState(initialSubjectId);
  const [activeCourseId, setActiveCourseId] = useState(initialCourseId);
  const activeSubject = subjects.find((subject) => subject.id === activeSubjectId) || subjects[0];
  const activeCourse = mathCourses.find((course) => course.id === activeCourseId) || mathCourses[0];

  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-8 pt-5 sm:px-6 sm:pb-10 lg:px-8 lg:pt-7">
      <header>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="m-0 text-[10px] font-semibold tracking-[0.17em] text-[#6d7887] sm:text-xs">
            {activeSubject.eyebrow}
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#6d7887] sm:text-sm">
            <BookOpenCheck className="size-3.5" aria-hidden="true" />
            <strong className="text-sm font-semibold text-[#171b2b]">
              {String(subjects.length).padStart(2, "0")}
            </strong>
            хичээл
          </span>
        </div>
        <h1 className="mb-0 mt-3 text-2xl font-bold tracking-[-0.04em] text-[#171b2b] sm:text-3xl">
          {activeSubject.title}
        </h1>
        <p className="mb-0 mt-2 max-w-3xl text-xs leading-5 text-[#6d7887] sm:text-sm sm:leading-6">
          {activeSubject.description}
        </p>
      </header>

      <div className="mt-5 overflow-x-auto pb-1">
        <div aria-label="Хичээл сонгох" className="flex w-max min-w-full flex-nowrap gap-1.5" role="tablist">
          {subjects.map((subject) => {
            const isSelected = activeSubject.id === subject.id;
            return (
              <button
                aria-selected={isSelected}
                className={`min-h-9 shrink-0 rounded-full border px-4 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b91c9] focus-visible:ring-offset-2 sm:min-h-10 sm:text-sm ${isSelected ? "border-[#b5d9f0] bg-[#b5d9f0] text-[#24394c]" : "border-[#e1e4e7] bg-white text-[#3f4b59] hover:border-[#bccbd8]"}`}
                key={subject.id}
                onClick={() => setActiveSubjectId(subject.id)}
                role="tab"
                type="button"
              >
                {subject.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeSubject.id === "mathematics" && (
        <div className="mt-5 inline-flex max-w-full flex-wrap gap-1 rounded-full bg-[#f0f1ef] p-1" aria-label="Mathematics course">
          {mathCourses.map((course) => {
            const isSelected = activeCourseId === course.id;
            return (
              <button
                aria-pressed={isSelected}
                className={`min-h-10 rounded-full px-3 text-left text-xs font-semibold transition sm:px-4 sm:text-sm ${isSelected ? "bg-white text-[#426f93] shadow-sm" : "text-[#68727e] hover:text-[#273243]"}`}
                key={course.id}
                onClick={() => setActiveCourseId(course.id)}
                type="button"
              >
                {course.label}
              </button>
            );
          })}
        </div>
      )}

      {activeSubject.id === "mathematics" ||
      activeSubject.id === "physics" ||
      activeSubject.id === "chemistry" ||
      activeSubject.id === "biology" ? (
        <MockExamYearIndex subjectId={activeSubject.id} courseId={activeCourse.id} />
      ) : (
        <MockExamEmptyIndex
          courseLabel={activeSubject.id === "mathematics" ? activeCourse.label : ""}
          subjectLabel={activeSubject.label}
        />
      )}
    </div>
  );
}
