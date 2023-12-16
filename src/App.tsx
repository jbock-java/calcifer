import { LocalDate, Month } from "@js-joda/core";
import { CalendarMonth } from "./cal/CalendarMonth";
import { useAppSelector } from "./store/hooks";

interface Monat {
  month: Month;
  days: LocalDate[];
}

const App = () => {
  let d = LocalDate.parse(useAppSelector(store => store.calendar.start));
  const months = Month.values();
  const year: Monat[] = [];
  for (const month of months) {
    const days: LocalDate[] = [];
    while (d.month() === month) {
      days.push(d);
      d = d.plusDays(1);
    }
    year.push({ month, days });
  }
  return (
    <>{year.map(monat => (
      <CalendarMonth month={monat.month} days={monat.days} />
    ))
    }</>);
}

export { App };
