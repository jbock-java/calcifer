import { FC } from "react";
import { DataMonth, Week } from "../model/types";

interface Parameters {
  month: DataMonth;
}

export const CalendarMonth: FC<Parameters> = ({ month }) => {

  return (
    <>
      <h1>{month.month.toString()}</h1>
      <div className="font-mono w-fit grid gap-x-3 justify-items-end grid-cols-[auto_auto_auto_auto_auto_auto_auto_auto]">
        {month.weeks.map(week =>
          renderWeek(week))}
      </div>
    </>);
}

const renderWeek = (week: Week) => {
  return (
    <>
      <div className="text-slate-400">{String(week.kw).padStart(2, '0')}</div>
      {week.days.map(day =>
        <div>{day}</div>
      )}
    </>);
}
