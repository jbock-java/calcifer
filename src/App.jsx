import {
  useState,
} from "react"
import {
  CalendarMonth,
} from "./cal/CalendarMonth"
import {
  Menu,
} from "./component/Menu.jsx"
import {
  DarkModeToggle,
} from "./component/DarkModeToggle.jsx"
import {
  createMonths,
} from "./util.js"
import {
  getHighlight,
} from "./parse.js"

export const App = () => {
  let [calendarData, setCalendarData] = useState({
    year: "2024",
    highlight: ["02-03", "02-04", "03-01_03-10"],
  })
  let year = calendarData.year.substring(0, 4)
  let highlight = calendarData.highlight
  let months = createMonths(year)
  let hl = getHighlight(year, highlight)
  return <>
      <div className="mt-12">
        <div className="grid grid-cols-[auto_auto_auto] gap-x-16 gap-y-8 justify-center">{
          months.map(month => <CalendarMonth
            highlight={hl}
            year={year}
            key={'m-' + year + '-' + month.month.value()}
            month={month} />)
        }</div>
      </div>
      <div className="mt-24 flex gap-x-3 justify-center">
        <Menu setCalendarData={setCalendarData} />
        <DarkModeToggle />
      </div>
    </>
}
