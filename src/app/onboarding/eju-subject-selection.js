import {
  Atom,
  CircleHelp,
  Dna,
  FlaskConical,
  LibraryBig,
  Languages,
  Sigma,
} from "lucide-react";

const scienceChoices = [
  {
    value: "physics",
    title: "Физик",
    description: "Механик, цахилгаан соронзон үзэгдэл, долгион, дулаан, атом ба тооцоолол.",
    Icon: Atom,
  },
  {
    value: "chemistry",
    title: "Хими",
    description: "Онолын, органик бус, органик хими; цээжлэх болон тооцоолох чадвар.",
    Icon: FlaskConical,
  },
  {
    value: "biology",
    title: "Биологи",
    description: "Эс, генетик, физиологи, экологи, зураг тайлбарлах болон туршилтын сэдвүүд.",
    Icon: Dna,
  },
];

const mathChoices = [
  {
    value: "course2",
    title: "Математик II (コース2)",
    description: "Илүү өргөн хүрээний математикийн агуулгатай курс.",
  },
  {
    value: "course1",
    title: "Математик I (コース1)",
    description: "Агуулгын хүрээ бага, зарим мэргэжлийн чиглэлд тохирсон курс.",
  },
  {
    value: "none",
    title: "Математикийн шалгалт өгөхгүй",
    description: "",
  },
];

function SelectionMark({ isSelected }) {
  return (
    <span
      className={`grid size-[18px] shrink-0 place-items-center rounded-full border ${
        isSelected
          ? "border-[#5b91c9] bg-[#5b91c9] text-white"
          : "border-[#cbd2d9] bg-white text-transparent"
      }`}
      aria-hidden="true"
    >
      ✓
    </span>
  );
}

function ChoiceIcon({ children }) {
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#f1f3f4] text-[#526171]">
      {children}
    </span>
  );
}

function CompactChoice({ title, description, isSelected, onClick, Icon = Sigma, disabled = false }) {
  return (
    <button
      aria-pressed={isSelected}
      className={`flex min-h-[112px] w-full flex-col rounded-2xl border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b91c9] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        isSelected
          ? "border-[#80b8ec] bg-[#f2f8fd]"
          : "border-[#e2e5e8] bg-white hover:border-[#b4c5d5]"
      }`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <span className="mb-3 flex w-full items-start justify-between">
        <ChoiceIcon>
          <Icon className="size-[17px]" aria-hidden="true" />
        </ChoiceIcon>
        <SelectionMark isSelected={isSelected} />
      </span>
      <span className="block text-xs font-semibold text-[#202a36]">{title}</span>
      {description && (
        <span className="mt-1 block text-[10px] leading-[1.55] text-[#78828e]">
          {description}
        </span>
      )}
    </button>
  );
}

function WideChoice({ title, description, isSelected, onClick, Icon = CircleHelp }) {
  return (
    <button
      aria-pressed={isSelected}
      className={`flex min-h-[62px] w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b91c9] focus-visible:ring-offset-2 ${
        isSelected
          ? "border-[#80b8ec] bg-[#f2f8fd]"
          : "border-[#e2e5e8] bg-white hover:border-[#b4c5d5]"
      }`}
      onClick={onClick}
      type="button"
    >
      <ChoiceIcon>
        <Icon className="size-[17px]" aria-hidden="true" />
      </ChoiceIcon>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-semibold text-[#202a36]">{title}</span>
        {description && (
          <span className="mt-1 block text-[10px] leading-[1.5] text-[#78828e]">
            {description}
          </span>
        )}
      </span>
      <SelectionMark isSelected={isSelected} />
    </button>
  );
}

export default function EjuSubjectSelection({
  track,
  answers,
  onToggleScienceSubject,
  onSetScienceUndecided,
  onSelectHumanitiesSubject,
  onSelectMathCourse,
  onToggleJapanese,
}) {
  const isScienceTrack = track === "science";
  const selectedScienceSubjects = answers.scienceSubjects;
  const isHumanitiesUndecided = answers.humanitiesSubject === "undecided";

  return (
    <div className="space-y-6">
      {isScienceTrack ? (
        <section aria-label="Байгалийн ухааны хичээлүүд">
          <p className="mb-3 text-[10px] font-medium text-[#7b8490]">
            Байгалийн ухааны хичээлээс 2-ыг сонгоно уу
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {scienceChoices.map((subject) => {
              const isSelected = selectedScienceSubjects.includes(subject.value);
              const isLimitReached = selectedScienceSubjects.length === 2 && !isSelected;

              return (
                <CompactChoice
                  description={subject.description}
                  Icon={subject.Icon}
                  isSelected={isSelected}
                  key={subject.value}
                  onClick={() => onToggleScienceSubject(subject.value)}
                  title={subject.title}
                  disabled={isLimitReached}
                />
              );
            })}
          </div>
          <div className="mt-2">
            <WideChoice
              title="Одоогоор шийдээгүй"
              description="Эхлээд Физик, Хими гэж төлөвлөөд дараа нь бэлтгэлийн төлөвлөгөөндөө өөрчилж болно."
              isSelected={answers.scienceUndecided}
              onClick={() => onSetScienceUndecided(!answers.scienceUndecided)}
            />
          </div>
        </section>
      ) : (
        <section aria-label="Хүмүүнлэгийн ухааны хичээлүүд">
          <p className="mb-3 text-[10px] font-medium text-[#7b8490]">
            Хүмүүнлэгийн ухааны хичээл
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            <CompactChoice
              Icon={LibraryBig}
              title="Япон ба дэлхий"
              description="Нийгэм, газарзүй, түүх, иргэний боловсролын агуулгатай нэгдсэн хичээл."
              isSelected={answers.humanitiesSubject === "japanAndWorld"}
              onClick={() => onSelectHumanitiesSubject("japanAndWorld")}
            />
            <WideChoice
              title="Одоогоор шийдээгүй"
              description="Сонирхож буй их сургуулийнхаа шаардлагад нийцүүлэн дараа нь сонгож болно."
              isSelected={isHumanitiesUndecided}
              onClick={() => onSelectHumanitiesSubject(isHumanitiesUndecided ? "" : "undecided")}
            />
          </div>
        </section>
      )}

      <section aria-label="Математикийн хичээлүүд">
        <p className="mb-3 text-[10px] font-medium text-[#7b8490]">Математик</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {mathChoices.map((choice) => (
            <CompactChoice
              key={choice.value}
              title={choice.title}
              description={choice.description}
              isSelected={answers.mathCourse === choice.value}
              onClick={() => onSelectMathCourse(choice.value)}
            />
          ))}
        </div>
      </section>

      <section aria-label="Япон хэлний хичээл">
        <p className="mb-3 text-[10px] font-medium text-[#7b8490]">Япон хэл</p>
        <WideChoice
          Icon={Languages}
          title="Япон хэл (日本語)"
          description="Унших, сонсох зэрэг япон хэлний чадварыг шалгана. Ихэнх их сургууль шаарддаг."
          isSelected={answers.japaneseSelected}
          onClick={onToggleJapanese}
        />
      </section>

    </div>
  );
}

