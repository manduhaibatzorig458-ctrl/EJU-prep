import { ClipboardList } from "lucide-react";

export default function MockExamEmptyIndex({ subjectLabel, courseLabel }) {
  return (
    <section
      aria-label={`${subjectLabel} жилийн шалгалтын жагсаалт`}
      className="mt-6 flex min-h-40 flex-col items-center justify-center rounded-2xl border border-[#e6e8e8] bg-white px-5 py-7 text-center"
    >
      <span className="mb-3 grid size-10 place-items-center rounded-xl bg-[#f2f5f6] text-[#627284]">
        <ClipboardList className="size-5" aria-hidden="true" />
      </span>
      <h2 className="m-0 text-base font-semibold text-[#273243]">Жилийн жагсаалт алга</h2>
      <p className="mb-0 mt-1.5 max-w-lg text-xs leading-5 text-[#788391] sm:text-sm">
        {subjectLabel} {courseLabel ? `${courseLabel} ` : ""}хичээлийн жилийн шалгалтын жагсаалт хараахан нэмэгдээгүй байна.
      </p>
    </section>
  );
}
