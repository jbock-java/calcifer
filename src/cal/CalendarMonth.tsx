import { LocalDate, Month } from "@js-joda/core";
import { FC } from "react";

interface Parameters {
  month: Month;
  days: LocalDate[];
}

export const CalendarMonth: FC<Parameters> = ({ month, days }) => {
  return (
    <>
    <h1>{month.toString()}</h1>
    {days.map(day => (
      <div className="text-xl font-bold">
        {day.toString()}
      </div>
    ))
    }</>);
}
