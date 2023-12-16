import { LocalDate } from "@js-joda/core";
import { FC } from "react";

interface Parameters {
  days: LocalDate[];
}

const Month: FC<Parameters> = ({ days }) => {
  return (
    <>{days.map(day => (
      <div className="text-xl font-bold">
        {day.toString()}
      </div>
    ))
    }</>);
}

export { Month };
