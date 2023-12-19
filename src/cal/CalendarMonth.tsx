import classNames from "classnames";
import { FC } from "react";
import { DataDay, DataMonth, Week } from "../model/types";
import { useAppSelector } from "../store/hooks";

interface Parameters {
  month: DataMonth;
}

interface WeekParameters {
  week: Week;
}

interface DayParameters {
  day: DataDay;
}

const grey = "text-slate-400";

export const CalendarMonth: FC<Parameters> = ({ month }) => {
  const year = useAppSelector(store => store.calendar.year);
  const monthName = new Date(year, month.month.value() - 1, 15).toLocaleString('de', { month: 'long' });
  const classes = classNames(
    "font-mono",
    "w-fit",
    "grid",
    "gap-x-2",
    "grid-cols-[auto_auto_auto_auto_auto_auto_auto_auto]",
  );
  const dayHeader = [];
  for (const d of ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]) {
    dayHeader.push(<div className={classNames(grey, "justify-self-end")}>{d}</div>);
  }
  return (
    <div>
      <div className={classes}>
        <div></div>
        <div className="col-span-7"><pre> {monthName} {year}</pre></div>
        <div></div>
        <>{dayHeader}</>
        {month.weeks.map(week =>
          <CalendarWeek key={'w-' + year + '-' + week.kw} week={week} />)}
      </div>
    </div>);
}

const CalendarWeek: FC<WeekParameters> = ({ week }) => {
  const year = useAppSelector(store => store.calendar.year);
  const days = [];
  for (let i = 0; i < week.days.length; i++) {
    const key = year + '-' + week.kw + '-' + i;
    days.push(<CalendarDay key={key} day={week.days[i]} />);
  }
  return (
    <>
      <div className={grey}>{String(week.kw).padStart(2, '0')}</div>
      {days}
    </>);
}

const CalendarDay: FC<DayParameters> = ({ day }) => {
  const highlight = useAppSelector(store => store.calendar.highlight);
  if (!day.day) {
    return <div />
  }
  const hl = highlight.has(day.day.toString());
  const classes = classNames(
    "px-1",
    "justify-self-end",
    hl && "bg-yellow-300",
  );
  const text = String(day.day?.dayOfMonth()).padStart(2, ' ');
  return <div className={classes}><pre>{text}</pre></div>
}