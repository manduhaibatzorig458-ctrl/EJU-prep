import EjuBrand from "../../components/layout/eju-brand";

const navigationGroups = [
  {
    title: "МИНИЙ СУРАЛЦАЛТ",
    items: [
      "Миний бэлтгэл",
      "Туршилтын шалгалт",
      "Сорил",
      "Давтлагын хуваарь",
      "Алдааны дэвтэр",
      "Суралцах ахиц",
    ],
  },
  {
    title: "ИХ СУРГУУЛИЙН МЭДЭЭЛЭЛ",
    items: [
      "Их сургуулиуд",
      "Мэргэжил, хөтөлбөрүүд",
      "Элсэлтийн шаардлага",
      "Их сургуулиудын харьцуулалт",
      "Хадгалсан сургуулиуд",
    ],
  },
  {
    title: "ТЭТГЭЛГИЙН МЭДЭЭЛЭЛ",
    items: [
      "Бүх тэтгэлэг",
      "MEXT тэтгэлэг",
      "Их сургуулийн тэтгэлэг",
      "Бүрэн тэтгэлэг",
      "Тэтгэлгийн шаардлага",
      "Хадгалсан тэтгэлгүүд",
    ],
  },
  {
    title: "МИНИЙ ЭЛСЭЛТ",
    items: ["Миний өргөдөл", "Бичиг баримтууд", "Хугацааны хуанли"],
  },
  {
    title: "БУСАД",
    items: ["Хиймэл оюуны туслах", "Миний профайл", "Тохиргоо"],
  },
];

function SidebarContent() {
  return (
    <div className="px-4 pb-6 pt-5">
      <div className="mb-8 border-b border-[#e9e6de] px-2 pb-5">
        <EjuBrand />
      </div>

      <nav aria-label="Үндсэн цэс" className="space-y-7">
        {navigationGroups.map((group) => (
          <section key={group.title}>
            <h2 className="mb-2 px-2 text-[10px] font-bold tracking-[0.12em] text-[#87909a]">
              {group.title}
            </h2>
            <ul className="m-0 list-none space-y-1 p-0">
              {group.items.map((item) => {
                const isCurrentPage = item === "Миний бэлтгэл";

                return (
                  <li key={item}>
                    <span
                      aria-current={isCurrentPage ? "page" : undefined}
                      className={`flex min-h-9 items-center rounded-lg px-2.5 text-[13px] transition-colors ${
                        isCurrentPage
                          ? "bg-[#e9eef6] font-semibold text-[#355b90]"
                          : "text-[#4f5b69]"
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </nav>
    </div>
  );
}

export default function OnboardingSidebar() {
  return (
    <>
      <aside className="sticky top-0 hidden h-svh overflow-y-auto border-r border-[#e9e6de] bg-[var(--japanese-paper)] lg:block">
        <SidebarContent />
      </aside>

      <details className="border-b border-[#e9e6de] bg-[var(--japanese-paper)] lg:hidden">
        <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-5 text-sm font-semibold text-[#273242] marker:hidden">
          <span className="grid size-8 place-content-center gap-1 rounded-lg border border-[#e9e6de] bg-white">
            <span className="h-0.5 w-3.5 rounded-full bg-current" />
            <span className="h-0.5 w-3.5 rounded-full bg-current" />
          </span>
          Цэс
        </summary>
        <div className="max-h-[65svh] overflow-y-auto border-t border-[#e9e6de]">
          <SidebarContent />
        </div>
      </details>
    </>
  );
}
