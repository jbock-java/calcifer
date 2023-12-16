import { LocalDate } from "@js-joda/core";
import { Month } from "./cal/Month";
import { useAppSelector } from "./store/hooks";

const App = () => {
  const days = useAppSelector(store => store.calendar.days).map(day => LocalDate.parse(day));
  return (
    <Month days={days} />
  )
}

export { App };
