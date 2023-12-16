import { Month } from "./cal/Month";
import { useAppSelector } from "./store/hooks";

const App = () => {
  const month = useAppSelector(store => store.calendar.currentMonth);
  return (
    <h1 className="text-3xl font-bold underline">
      <Month month={month} />
    </h1>
  )
}

export { App };
