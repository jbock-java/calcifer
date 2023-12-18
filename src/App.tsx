import { DayOfWeek, LocalDate, Month } from "@js-joda/core";
import { CalendarMonth } from "./cal/CalendarMonth";
import { DataMonth, Week } from "./model/types";
import { useAppSelector } from "./store/hooks";

export const App = () => {
  const year = useAppSelector(store => store.calendar.year);
  const months: DataMonth[] = createMonths(year);
  return (
    <>{
      months.map(month => (<CalendarMonth month={month} />))
    }</>);
}

const createMonths = (year: number) => {
  let kw = getFirstKw(year);
  const months = Month.values();
  const result: DataMonth[] = [];
  for (const month of months) {
    const weeks = createWeeks(kw, year, month);
    result.push({ month, weeks });
    const lastWeek = weeks[weeks.length - 1];
    kw = lastWeek.kw;
    if (lastWeek.days[lastWeek.days.length - 1]) {
      kw++;
    }
  }
  return result;
}

const createWeeks = (startKw: number, year: number, month: Month) => {
  const result: Week[] = [];
  const daysInMonth = getDaysInMonth(year, month);
  let date = 1;
  let kw = startKw;
  while (true) {
    const days: string[] = [];
    const daysOfWeek = DayOfWeek.values();
    let anyDaysInWeek = false;
    for (const dayOfWeek of daysOfWeek) {
      if (daysInMonth.has(dayOfWeek.value() + "-" + date)) {
        days.push(date.toString());
        date++;
        anyDaysInWeek = true;
      } else {
        days.push("");
      }
    }
    if (anyDaysInWeek) {
      result.push({ kw, days });
      kw++;
    } else {
      return result;
    }
  }
}

const getDaysInMonth = (year: number, month: Month) => {
  const result: Set<string> = new Set();
  let d = LocalDate.of(year, month.value(), 1);
  while (d.month() === month) {
    result.add(d.dayOfWeek().value() + "-" + d.dayOfMonth());
    d = d.plusDays(1);
  }
  return result;
}

const getFirstKw = (year: number) => {
  const d = LocalDate.of(year, Month.JANUARY, 1);
  switch (d.dayOfWeek()) {
    case DayOfWeek.FRIDAY:
    case DayOfWeek.SATURDAY:
    case DayOfWeek.SUNDAY:
      return 0;
    default:
      return 1;
  }
}
