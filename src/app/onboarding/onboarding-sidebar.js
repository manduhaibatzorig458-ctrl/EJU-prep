"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EjuBrand from "../../components/layout/eju-brand";
import {
  Award,
  BookOpen,
  BookX,
  ClipboardCheck,
  FileQuestion,
  House,
  LayoutDashboard,
  RefreshCw,
  University,
  UserRound,
} from "lucide-react";

const navigationGroups = [
  [
    { label: "Нүүр хуудас", Icon: House, href: "/" },
    { label: "Dashboard", Icon: LayoutDashboard },
    { label: "EJU бэлтгэл", Icon: BookOpen, href: "/onboarding" },
    { label: "Mock Exam", Icon: ClipboardCheck, href: "/mock-exam" },
    { label: "Wrong Answer Book", Icon: BookX },
    { label: "Spaced Repetition", Icon: RefreshCw },
    { label: "Quiz", Icon: FileQuestion },
  ],
  [
    { label: "Их сургуулиуд", Icon: University },
    { label: "Тэтгэлэг", Icon: Award },
  ],
  [{ label: "Миний профайл", Icon: UserRound, href: "/profile" }],
];

function SidebarContent() {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState(null);
  const routeActiveItem = navigationGroups
    .flat()
    .find((item) => item.href && (item.href === pathname || pathname.startsWith(`${item.href}/`)))?.label;
  const activeItem =
    selectedItem?.pathname === pathname
      ? selectedItem.label
      : routeActiveItem || "EJU бэлтгэл";

  return (
    <div className="px-4 pb-6 pt-5">
      <div className="mb-8 border-b border-[#e9e6de] px-2 pb-5">
        <EjuBrand />
      </div>

      <nav aria-label="Үндсэн цэс" className="space-y-5">
        {navigationGroups.map((items, groupIndex) => (
          <section
            className={groupIndex > 0 ? "border-t border-[#e9e6de] pt-4" : ""}
            key={items[0].label}
          >
            <ul className="m-0 list-none space-y-1 p-0">
              {items.map((item) => {
                const Icon = item.Icon;
                const isActive = activeItem === item.label;
                const itemClassName = `flex min-h-9 items-center gap-2.5 rounded-lg px-2.5 text-[13px] transition-colors ${
                  isActive
                    ? "bg-[#e9eef6] font-semibold text-[#355b90]"
                    : "text-[#4f5b69] hover:bg-[#f2f0ea]"
                }`;

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <Link
                        aria-current={isActive ? "page" : undefined}
                        className={itemClassName}
                        href={item.href}
                        onClick={() => setSelectedItem(null)}
                      >
                        <Icon className="size-4 shrink-0" aria-hidden="true" />
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <button
                        aria-pressed={isActive}
                        className={itemClassName}
                        onClick={() => setSelectedItem({ label: item.label, pathname })}
                        type="button"
                      >
                        <Icon className="size-4 shrink-0" aria-hidden="true" />
                        <span>{item.label}</span>
                      </button>
                    )}
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

function SidebarContentFallback() {
  return (
    <div className="px-4 pb-6 pt-5" aria-hidden="true">
      <div className="mb-8 border-b border-[#e9e6de] px-2 pb-5">
        <EjuBrand />
      </div>
      <nav aria-label="Үндсэн цэс" className="space-y-5">
        {navigationGroups.map((items, groupIndex) => (
          <section
            className={groupIndex > 0 ? "border-t border-[#e9e6de] pt-4" : ""}
            key={items[0].label}
          >
            <ul className="m-0 list-none space-y-1 p-0">
              {items.map(({ label, Icon }) => (
                <li key={label}>
                  <div className="flex min-h-9 items-center gap-2.5 rounded-lg px-2.5 text-[13px] text-[#4f5b69]">
                    <Icon className="size-4 shrink-0" aria-hidden="true" />
                    <span>{label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
    </div>
  );
}

function SuspendedSidebarContent() {
  return (
    <Suspense fallback={<SidebarContentFallback />}>
      <SidebarContent />
    </Suspense>
  );
}

export default function OnboardingSidebar() {
  return (
    <>
      <aside className="sticky top-0 hidden h-svh overflow-y-auto border-r border-[#e9e6de] bg-[var(--japanese-paper)] lg:block">
        <SuspendedSidebarContent />
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
          <SuspendedSidebarContent />
        </div>
      </details>
    </>
  );
}
