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

export const CalendarMonth: FC<Parameters> = ({ month }) => {
  const year = useAppSelector(store => store.calendar.year);
  const monthName = new Date(year, month.month.value() - 1, 15).toLocaleString('de', { month: 'long' });
  return (
    <div>
      <div className="font-mono w-fit grid gap-x-2 grid-cols-[auto_auto_auto_auto_auto_auto_auto_auto]">
        <div></div>
        <div className="col-span-7">{monthName} {year}</div>
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
      <div className="text-slate-400">{String(week.kw).padStart(2, '0')}</div>
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
    hl && "bg-yellow-300");
  const text = String(day.day?.dayOfMonth()).padStart(2, ' ');
  return <div className={classes}><pre>{text}</pre></div>
}