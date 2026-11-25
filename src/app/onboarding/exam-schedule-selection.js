import { CalendarDays } from "lucide-react";

const sessions = [
  { value: "session1", label: "1-р ээлж", month: 6, monthLabel: "6-р сар" },
  { value: "session2", label: "2-р ээлж", month: 11, monthLabel: "11-р сар" },
];

const fieldClass =
  "mt-2 min-h-12 w-full rounded-xl border border-[#e2e5e8] bg-white px-3 text-sm text-[#273242] outline-none focus:border-[#80b8ec] focus:ring-2 focus:ring-[#80b8ec]/20";

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

export default function ExamScheduleSelection({
  session,
  year,
  day,
  onSelectSession,
  onSelectYear,
  onSelectDay,
}) {
  const selectedSession = sessions.find((option) => option.value === session);
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  const selectedMonth = selectedSession?.month;
  const isSelectedMonthPast = selectedMonth && selectedMonth < currentMonth;
  const isSelectedDatePast = selectedMonth === currentMonth && currentDay >= 30;
  const firstAvailableYear =
    isSelectedMonthPast || isSelectedDatePast ? currentYear + 1 : currentYear;
  const yearOptions = Array.from({ length: 10 }, (_, index) => firstAvailableYear + index);
  const dayOptions = Array.from({ length: 30 }, (_, index) => index + 1).filter((dateDay) => {
    if (Number(year) !== currentYear || selectedMonth !== currentMonth) {
      return true;
    }

    return dateDay > currentDay;
  });

  return (
    <div>
      <p className="-mt-4 mb-6 text-sm leading-6 text-[#687383]">
        1-р ээлж 6-р сард, 2-р ээлж 11-р сард болно. Төлөвлөж буй он, өдрөө сонгоно уу.
      </p>

      <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Шалгалтын ээлж">
        {sessions.map((option) => {
          const isSelected = session === option.value;

          return (
            <button
              aria-pressed={isSelected}
              className={`flex min-h-[78px] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b91c9] focus-visible:ring-offset-2 ${
                isSelected
                  ? "border-[#80b8ec] bg-[#f2f8fd]"
                  : "border-[#e2e5e8] bg-white hover:border-[#b4c5d5]"
              }`}
              key={option.value}
              onClick={() => onSelectSession(option.value)}
              type="button"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#f1f3f4] text-[#526171]">
                <CalendarDays className="size-[18px]" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-[#202a36]">{option.label}</span>
                <span className="mt-1 block text-xs text-[#78828e]">{option.monthLabel}</span>
              </span>
              <SelectionMark isSelected={isSelected} />
            </button>
          );
        })}
      </div>

      {selectedSession && (
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <label className="text-xs font-semibold text-[#526171]">
            Он
            <select
              className={fieldClass}
              onChange={(event) => onSelectYear(event.target.value)}
              value={year}
            >
              <option value="">Он сонгох</option>
              {yearOptions.map((optionYear) => (
                <option key={optionYear} value={optionYear}>
                  {optionYear}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs font-semibold text-[#526171]">
            Сар
            <div className={`${fieldClass} flex items-center bg-[#f7f6f2]`}>
              {selectedSession.monthLabel}
            </div>
          </label>

          <label className="text-xs font-semibold text-[#526171]">
            Өдөр
            <select
              className={fieldClass}
              disabled={!year}
              onChange={(event) => onSelectDay(event.target.value)}
              value={day}
            >
              <option value="">Өдөр сонгох</option>
              {dayOptions.map((optionDay) => (
                <option key={optionDay} value={optionDay}>
                  {optionDay}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

    </div>
  );
}
