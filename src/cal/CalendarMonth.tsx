import { DayOfWeek, LocalDate, Month } from "@js-joda/core";
import { FC } from "react";
import { useAppSelector } from "../store/hooks";

interface Parameters {
  month: Month;
}

interface Week {
  days: string[];
}

export const CalendarMonth: FC<Parameters> = ({ month }) => {
  const year = useAppSelector(store => store.calendar.year);
  const weeks = createWeeks(year, month);
  return (
    <>
    <h1>{month.toString()}</h1>
    {weeks.map(week => (
      <div className="text-xl font-bold">
        {JSON.stringify(week)}
      </div>
    ))
    }</>);
}

const createWeeks = (year: number, month: Month) => {
  const result: Week[] = [];
  const daysInMonth = getDaysInMonth(year, month);
  let date = 1;
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
      result.push({days});
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