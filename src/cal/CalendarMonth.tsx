import classNames from "classnames";
import { FC } from "react";
import { DataDay, DataMonth, Week } from "../model/types";
import { useAppSelector } from "../store/hooks";

interface Parameters {
  highlight: Set<string>;
  month: DataMonth;
}

interface WeekParameters {
  highlight: Set<string>;
  week: Week;
}

interface DayParameters {
  highlight: Set<string>;
  day: DataDay;
}

const grey = "text-slate-400";

export const CalendarMonth: FC<Parameters> = ({ month, highlight }) => {
  const calendarData = useAppSelector(store => store.calendar.calendarData);
  const year = calendarData.year;
  const monthName = new Date(year, month.month.value() - 1, 15).toLocaleString('de', { month: 'long' });
  const classes = classNames(
    "text-black",
    "dark:text-white",
    "font-mono",
    "w-fit",
    "grid",
    "gap-x-2",
    "grid-cols-[auto_auto_auto_auto_auto_auto_auto_auto]",
  );
  const dayHeader = [];
  for (const d of ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]) {
    dayHeader.push(<div key={'hd-' + d} className={classNames(grey, "justify-self-end")}>{d}</div>);
  }
  return (
    <div>
      <div className={classes}>
        <div></div>
        <div className="col-span-7"><pre> {monthName} {year}</pre></div>
        <div></div>
        <>{dayHeader}</>
        {month.weeks.map(week =>
          <CalendarWeek key={'w-' + year + '-' + week.kw} week={week} highlight={highlight} />)}
      </div>
    </div>);
}

const CalendarWeek: FC<WeekParameters> = ({ week, highlight }) => {
  const calendarData = useAppSelector(store => store.calendar.calendarData);
  const year = calendarData.year;
  const days = [];
  for (let i = 0; i < week.days.length; i++) {
    const key = year + '-' + week.kw + '-' + i;
    days.push(<CalendarDay key={key} day={week.days[i]} highlight={highlight} />);
  }
  return (
    <>
      <div className={grey}>{String(week.kw).padStart(2, '0')}</div>
      {days}
    </>);
}

const CalendarDay: FC<DayParameters> = ({ day, highlight }) => {
  if (!day.day) {
    return <div />
  }
  const hl = highlight.has(day.day.toString());
  const classes = classNames(
    "px-1",
    "justify-self-end",
    hl && "bg-yellow-300",
    hl && "dark:bg-indigo-800",
  );
  const text = String(day.day?.dayOfMonth()).padStart(2, ' ');
  return <div className={classes}><pre>{text}</pre></div>
}
