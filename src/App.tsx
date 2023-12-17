import { Month } from "@js-joda/core";
import { CalendarMonth } from "./cal/CalendarMonth";

const App = () => {
  const months = Month.values();
  return (
    <>{months.map(month => (
      <CalendarMonth month={month} />
    ))
    }</>);
}

export { App };
